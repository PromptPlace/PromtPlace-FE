/**
 * TODO:
 * - type에 따라 메시지함 / 알림 렌더링 분기 처리 필요
 *
 * @author 김진효
 * **/

import { axiosInstance } from '@/apis/axios';
import { useEffect, useState } from 'react';
import { LuChevronLeft } from 'react-icons/lu';
import { useNavigate, useParams } from 'react-router-dom';

interface MyMessageDetailPageProps {
  type: 'message' | 'notification';
}
interface Message {
  message_id: number; //message_id
  sender_nickname: string;
  title: string;
  content: string;
  is_read: boolean;
  created_at: string;
}
const MyMessageDetailPage = ({ type }: MyMessageDetailPageProps) => {
  const { id } = useParams<{ id: string }>();
  const [message, setMessage] = useState<Message>({
    message_id: Number(id),
    sender_nickname: '작성자',
    title: '제목',
    content: `본문`,
    is_read: true,
    created_at: '2025-07-22',
  });

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/mypage/message/message`);
  };

  useEffect(() => {
    const fetchMessageDetail = async () => {
      const base = import.meta.env.VITE_SERVER_API_URL;
      const res = await axiosInstance.get(`${base}/api/messages/${id}`);
      const formattedMessage: Message = {
        message_id: res.data.message_id,
        sender_nickname: res.data.sender,
        title: res.data.title,
        content: res.data.content,
        is_read: res.data.is_read,
        created_at: res.data.created_at.slice(0, 10),
      };
      setMessage(formattedMessage);
      try {
      } catch (error) {
        console.error(`상세 메시지 내용 불러오기 실패:`, error);
      }
    };
    fetchMessageDetail();
  }, [id]);

  return (
    <>
      <div className="hidden lg:block">
        <div className="pt-[35px] bg-background flex justify-center items-center">
          {/**min-h-[calc(100vh-24px)] : pt 오류나면 이걸로 고쳐야 함 */}
          <div className="w-[994px] h-[868px] bg-white rounded-t-[16px] rounded-b-[16px]">
            <div className="w-[994px] h-[105px] pt-[35px] pl-[20px] pr-[10px]">
              <div className="w-[187px] h-[50px] flex items-center gap-[10px] p-[10px]" onClick={handleNavigate}>
                <LuChevronLeft size={24} />
                <span className="text-text-on-white font-bold text-[24px] ">메시지함</span>
              </div>
            </div>

            <div className="w-[994px] h-[153px] flex flex-col justify-center border-b-[1px] border-white-stroke px-[65px]">
              <h1 className="font-bold text-[32px] text-text-on-white pt-[30px]">{message.title}</h1>
              <div className="w-[404px]  flex justify-between gap-[10px] items-center">
                <p className="w-[197px] font-medium text-[20px] text-text-on-background pt-[10px] pb-[30px]">
                  {message.created_at}
                </p>
                <p className="w-[197px] font-medium text-[20px] text-text-on-background pt-[10px] pb-[30px]">
                  보낸 사람 : {message.sender_nickname}
                </p>
              </div>
            </div>

            <div className="w-[994px] h-[485px] flex justify-center overflow-y-auto prose prose-neutral max-w-none text-base">
              <div className="w-[864px] border-b-[1px] border-white-stroke font-medium text-[20px] text-text-on-white py-[30px]">
                {message.content}
              </div>
              {/**추후 다시 markdown 적용해보기... */}
            </div>

            {/**하단 */}
            <div className="w-[994px] h-[125px]  flex justify-center">
              <div className="w-[864px] h-[45px] flex justify-between mt-[33px] mb-[47px]"></div>
            </div>
          </div>
        </div>
      </div>

      {/*모바일 화면 */}
      <div className="lg:hidden block">
        <div className="relative w-full h-12  flex items-center">
          <button className="ml-[12px] flex items-center cursor-pointer" onClick={handleNavigate}>
            <LuChevronLeft size={24} />
          </button>
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-xl tracking-wide">
            <p className="text-[16px] text-black font-medium"> 메시지함</p>
          </span>
        </div>
        <div className=" flex justify-center items-center mt-[20px]">
          <div className="w-full max-w-[280px] h-full min-h-[420px] bg-white">
            {/*상단 */}
            <div className="w-full max-w-[280px] h-full max-h-[80px] border-b-[0.5px] border-white-stroke px-[20px]">
              <h1 className="font-medium text-[12px] text-text-on-white mt-[20px]">{message.title}</h1>
              <div className="h-[13px] flex justify-start items-center mt-[12px] mb-[23px] gap-[24px]">
                <p className="font-normal text-[8px] text-text-on-background ">{message.created_at}</p>
                <p className="font-medium text-[10px] text-text-on-white">보낸 사람 : {message.sender_nickname}</p>
              </div>
            </div>
            {/*본문 */}
            <div className="w-full max-w-[280px] h-full min-h-[275px] border-white-stroke p-[20px] ">
              <div className="text-[10px] text-text-on-white font-medium">{message.content}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyMessageDetailPage;
