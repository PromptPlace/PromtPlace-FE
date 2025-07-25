/**
 * TODO:
 * - type에 따라 메시지함 / 알림 렌더링 분기 처리 필요
 *
 * @author 김진효
 * **/

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageTableList, MessagePagination } from './components/MessagePagination';
import { NotificationTableList, NotificationPagination } from './components/NotificationPagination';

interface MyMessagePageProps {
  type: 'message' | 'notification';
}
//메시지함
interface Message {
  id: number; //message_id
  sender_id: string; // erd 상에서는 num이지만... 편의상 string으로 수정
  receiver_id: string;
  title: string;
  body: string;
  is_read: boolean;
  read_at: string;
  is_deleted: boolean;
  create_at: string;
  update_at: string;
}
// 더미 데이터 (추후 api 연동시 삭제 또는 수정)
const allMessages: Message[] = [
  {
    id: 1,
    sender_id: '관리자',
    receiver_id: '아메리카노',
    title: '프롬프트 가이드라인 위반 경고',
    body: '본문',
    is_read: false,
    read_at: '2025-07-08',
    is_deleted: false,
    create_at: '2025-07-08',
    update_at: '2025-07-08',
  },
  {
    id: 2,
    sender_id: '홍길동',
    receiver_id: '아메리카노',
    title: '홍길동님이 주토피아노님의 문의에 답변을 남기셨습니다.',
    body: '본문',
    is_read: true,
    read_at: '2025-07-08',
    is_deleted: false,
    create_at: '2025-04-12',
    update_at: '2025-04-12',
  },
];
//알림
interface Notification {
  id: number; //notification_id
  content: string;
  create_at: string;
  user_id: string;
}

const allNotification: Notification[] = [
  { id: 1, content: '프롬프트에 새로운 문의가 도착했습니다.', create_at: '2025-07-22', user_id: '주토피아노' },
  { id: 2, content: '신고가 접수되었습니다.', create_at: '2025-07-22', user_id: '주토피아노' },
  { id: 3, content: '‘홍길동’님이 새 프롬프트를 업로드하셨습니다. ', create_at: '2025-07-22', user_id: '주토피아노' },
  { id: 4, content: '‘콩쥐’님이 새 프롬프트를 업로드하셨습니다.', create_at: '2025-07-22', user_id: '주토피아노' },
  { id: 5, content: '‘뽀또’님이 회원님을 팔로우합니다.', create_at: '2025-07-22', user_id: '주토피아노' },
  { id: 6, content: '프롬프트에 새로운 문의가 도착했습니다. ', create_at: '2025-07-22', user_id: '주토피아노' },
  { id: 7, content: '프롬프트에 새로운 문의가 도착했습니다.', create_at: '2025-07-22', user_id: '주토피아노' },
  { id: 8, content: '신고가 접수되었습니다.', create_at: '2025-07-22', user_id: '주토피아노' },
  {
    id: 9,
    content: '‘아메리카노’님이 새 프롬프트를 업로드하셨습니다. ',
    create_at: '2025-07-22',
    user_id: '주토피아노',
  },
  { id: 10, content: '프롬프트에 새로운 문의가 도착했습니다.', create_at: '2025-07-22', user_id: '주토피아노' },
];
// 페이지 값 계산
const PAGE_SIZE = 8;
const TOTAL_MESSAGE_PAGES = Math.ceil(allMessages.length / PAGE_SIZE);
const TOTAL_Notification_PAGES = Math.ceil(allNotification.length / PAGE_SIZE);

const MyMessagePage = ({ type }: MyMessagePageProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [messages, setMessages] = useState<Message[]>(allMessages); // allMessages 복제
  const navigate = useNavigate();

  const handleTypeChange = (nextType: 'message' | 'notification') => {
    if (nextType !== type) {
      setCurrentPage(1);
      navigate(`/mypage/message/${nextType}`);
    }
  };

  // 페이지별 데이터 슬라이싱
  const pageMessageData = messages.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const pageNotificationData = allNotification.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  // 페이지네이션에서 페이지 변경시
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleRowClick = (id: number) => {
    navigate(`/mypage/message/message/${id}`);
  };

  // 메시지 삭제
  const handleDelete = (id: number) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  // 메시지 읽음
  const handleRead = (id: number) => {
    setMessages((prev) => prev.map((msg) => (msg.id === id ? { ...msg, is_read: true } : msg)));
  };

  return (
    <div className="">
      <div className="min-w-[1440px] min-h-[1024px] w-full h-full bg-background">
        <div className="flex justify-between items-center">
          <div className=" w-[360px] h-[60px] mt-[92px] ml-[102px]">
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

        <div className="flex flex-col justify-center items-center">
          {type === 'message' ? (
            <>
              <MessageTableList
                data={pageMessageData}
                onRowClick={handleRowClick}
                onDelete={handleDelete}
                onRead={handleRead}
              />
              <MessagePagination
                currentPage={currentPage}
                totalPages={TOTAL_MESSAGE_PAGES}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <>
              <NotificationTableList data={pageNotificationData} />
              <NotificationPagination
                currentPage={currentPage}
                totalPages={TOTAL_Notification_PAGES}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyMessagePage;
