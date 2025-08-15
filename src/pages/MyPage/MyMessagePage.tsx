/**
 * TODO:
 * - type에 따라 메시지함 / 알림 렌더링 분기 처리 필요
 *
 * @author 김진효
 * **/

import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageTableList, MessagePagination, MobileMessage } from './components/MessagePagination';
import { NotificationTableList, NotificationPagination, MobileNotification } from './components/NotificationPagination';

import { LuChevronDown } from 'react-icons/lu';
import { axiosInstance } from '@/apis/axios';

interface MyMessagePageProps {
  type: 'message' | 'notification';
}
//메시지함
interface Message {
  message_id: number;
  sender: string;
  title: string;
  created_at: string;
  is_read: boolean;
}

//알림
interface Notification {
  notification_id: number;
  content: string;
  created_at: string;
  link_url: string | null;
}

const MyMessagePage = ({ type }: MyMessagePageProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [messages, setMessages] = useState<Message[]>([]);
  const [notice, setNotice] = useState<Notification[]>([]);
  const navigate = useNavigate();

  const handleTypeChange = (nextType: 'message' | 'notification') => {
    if (nextType !== type) {
      setCurrentPage(1);
      navigate(`/mypage/message/${nextType}`);
    }
  };

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        if (type === 'message') {
          const base = import.meta.env.VITE_SERVER_API_URL;
          const res = await axiosInstance.get(`${base}/api/messages`, {
            params: {
              page: 1,
              size: 30,
            },
          });

          console.log('message 받은 데이터', res.data.messages);

          const mapped: Message[] = res.data.messages.map((item: any) => ({
            message_id: item.message_id,
            sender: item.sender,
            title: item.title,
            created_at: item.created_at,
            is_read: item.is_read,
          }));

          setMessages(mapped);
        } else if (type === 'notification') {
          const base = import.meta.env.VITE_SERVER_API_URL;
          const res = await axiosInstance.get(`${base}/api/notifications/me`, {
            params: {
              page: 1,
              limit: 30,
            },
          });
          console.log('noti 받은 데이터', res.data.data.notifications);

          const mapped: Notification[] = res.data.data.notifications.map((item: any, index: number) => {
            let link: string | null = item.link_url;
            console.log(`${index}번째 처리 전 link:`, link);

            if (link) {
              if (link.includes('/inquires/') || link.includes('/inquiries/')) {
                // 두 경우 모두 처리 (백엔드 수정 전까지 임시)
                //inquiries가 맞음 (원래는)
                link = '/mypage';
              } else if (link.includes('/announcements/')) {
                console.log(`${index}번째: announcements 변환`);
                const segs = link.split('/').filter(Boolean);
                const id = segs[segs.length - 1];
                link = `/guide/notice/${id}`;
              }
            }

            console.log(`${index}번째 처리 후 link:`, link);

            return {
              notification_id: item.notification_id,
              content: item.content,
              created_at: item.created_at.slice(0, 10),
              link_url: link,
            };
          });

          console.log('최종 결과:', mapped);

          setNotice(mapped);
        }
      } catch (error) {
        console.error(`${type === 'message' ? '메시지' : '알림'} 불러오기 실패:`, error);
      }
    };

    fetchAllPosts();
  }, [type]);

  // 페이지 값 계산
  const PAGE_SIZE = 8;
  const TOTAL_MESSAGE_PAGES = Math.ceil(messages.length / PAGE_SIZE);
  const TOTAL_Notification_PAGES = Math.ceil(notice.length / PAGE_SIZE);

  // 페이지별 데이터 슬라이싱
  const pageMessageData = messages.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const pageNotificationData = notice.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  // 페이지네이션에서 페이지 변경시
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleMessageRowClick = (id: number) => {
    navigate(`/mypage/message/message/${id}`);
  };

  // 메시지 삭제
  const handleDelete = async (id: number) => {
    console.log('삭제 시도하는 ID:', id);
    console.log('현재 messages:', messages);

    // 낙관적 업데이트
    setMessages((prev) => prev.filter((msg) => msg.message_id !== id));

    try {
      console.log('API 호출 URL:', `/api/messages/${id}/delete`);
      const res = await axiosInstance.patch(`/api/messages/${id}/delete`);
      console.log('삭제 성공:', res);
    } catch (err) {
      // 실패 시 롤백 - 삭제된 항목 복구
      setMessages((prev) => {
        // 현재 messages에서 삭제하려던 항목 찾기
        const originalItem = messages.find((m) => m.message_id === id);
        if (originalItem && !prev.some((m) => m.message_id === id)) {
          return [...prev, originalItem].sort((a, b) => b.message_id - a.message_id);
        }
        return prev;
      });
    }
  };

  // 메시지 읽음
  const handleRead = async (id: number) => {
    // 낙관적 업데이트
    setMessages((prev) => prev.map((m) => (m.message_id === id ? { ...m, is_read: true } : m)));

    try {
      const res = await axiosInstance.patch(`/api/messages/${id}/read`);
      console.log(res);
    } catch (err) {
      // 실패 시 롤백
      setMessages((prev) => prev.map((m) => (m.message_id === id ? { ...m, is_read: false } : m)));
      console.error('읽음 처리 실패:', err);
    }
  };

  //모바일 화면 전용
  const [openType, setOpenType] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  //알림 이동
  const handleNoticeRowClick = (noticelink: string | null) => {
    if (!noticelink) return; // 링크 없으면 무시
    //혹시 모를 외부경로
    if (/^https?:\/\//.test(noticelink)) {
      window.location.href = noticelink;
    } else {
      navigate(noticelink);
    }
  };

  return (
    <>
      <div className="hidden lg:block">
        <div className="min-w-[1440px] min-h-[1024px] w-full h-full bg-background">
          <div className="flex justify-center">
            <div className="w-full max-w-[1236px] flex justify-between items-center pt-[92px]">
              <div className="w-[360px] h-[60px] ">
                <button
                  onClick={() => handleTypeChange('message')}
                  className={`${
                    type === 'message'
                      ? 'text-primary-hover font-bold text-[32px] border-r-[2px] border-r-primary-hover'
                      : 'text-text-on-background font-bold text-[24px]'
                  } h-[60px] pt-[10px] pb-[10px] pr-[40px]  -translate-y-[10px]`}>
                  <p className="h-[40px]  -translate-y-[6px]">메시지함</p>
                </button>

                <button
                  onClick={() => handleTypeChange('notification')}
                  className={`${
                    type === 'notification'
                      ? 'text-primary-hover font-bold text-[32px] border-l-[2px] border-l-primary-hover'
                      : 'text-text-on-background font-bold text-[24px] '
                  } h-[60px] pt-[10px] pb-[10px] pl-[40px]  -translate-y-[10px]`}>
                  <p className="h-[40px] -translate-y-[6px]">알림</p>
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center">
            {type === 'message' ? (
              <>
                <MessageTableList
                  data={pageMessageData}
                  handleMessageRowClick={handleMessageRowClick}
                  onDelete={handleDelete}
                  onRead={handleRead}
                />
                <MessagePagination
                  data={pageMessageData}
                  currentPage={currentPage}
                  totalPages={TOTAL_MESSAGE_PAGES}
                  onPageChange={handlePageChange}
                />
              </>
            ) : (
              <>
                <NotificationTableList data={pageNotificationData} handleNoticeRowClick={handleNoticeRowClick} />
                <NotificationPagination
                  data={pageNotificationData}
                  currentPage={currentPage}
                  totalPages={TOTAL_Notification_PAGES}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </div>
        </div>
      </div>
      {/*모바일 화면 */}
      <div className="lg:hidden block">
        <div>
          <p className="ml-[20px] mt-[12px] text-primary-hover text-[20px] font-bold">메시지함</p>
        </div>
        <div className="relative inline-block w-full max-w-[108px] h-[31px] mt-[20px] ml-[20px]" ref={ref}>
          <button
            type="button"
            className="flex items-center justify-center gap-[8px] w-full px-[12px] py-[8px] rounded-[8px] bg-white"
            style={{ boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.08)' }}
            onClick={() => setOpenType((prev) => !prev)}>
            <span className="text-[12px] text-text-on-white font-medium">
              {type === 'message' ? '메시지함' : '알림함'}
            </span>
            <LuChevronDown size={10} />
          </button>
          {/*드롭다운 */}
          {openType && (
            <ul
              className="absolute left-0 z-10 w-[111px] h-[66px] mt-[6px] flex flex-col justify-center items-center
               bg-white border-[0.5px] border-white-stroke rounded-[8px]"
              style={{ boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.08)' }}>
              <li
                className="w-[87px] h-[27px] flex justify-center items-center border-b-[0.5px] border-white-stroke"
                onClick={() => {
                  navigate(`/mypage/message/message`);

                  setOpenType(false);
                }}>
                <p
                  className={`text-[12px] font-normal ${type === 'message' ? 'text-text-on-white' : 'text-text-on-background'}`}>
                  메시지함
                </p>
              </li>
              <li
                className="w-[87px] h-[27px] flex justify-center items-center "
                onClick={() => {
                  navigate(`/mypage/message/notification`);
                  setOpenType(false);
                }}>
                <p
                  className={`text-[12px] font-normal ${type === 'notification' ? 'text-text-on-white' : 'text-text-on-background'}`}>
                  알림함
                </p>
              </li>
            </ul>
          )}
        </div>

        <div className="flex justify-center">
          {type === 'message' ? (
            <>
              <MobileMessage
                data={pageMessageData}
                handleMessageRowClick={handleMessageRowClick}
                onDelete={handleDelete}
                onRead={handleRead}
              />
            </>
          ) : (
            <>
              <MobileNotification data={pageNotificationData} handleNoticeRowClick={handleNoticeRowClick} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MyMessagePage;
