/**
 * TODO:
 * - type에 따라 메시지함 / 알림 렌더링 분기 처리 필요
 *
 * @author 김진효
 * **/

import { useState } from 'react';
import { LuChevronLeft } from 'react-icons/lu';
import { useNavigate, useParams } from 'react-router-dom';

interface MyMessageDetailPageProps {
  type: 'message' | 'notification';
}
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
const MyMessageDetailPage = ({ type }: MyMessageDetailPageProps) => {
  const { id } = useParams<{ id: string }>();
  const [message, setMessage] = useState<Message>({
    id: Number(id),
    sender_id: '관리자',
    receiver_id: '주토피아노',
    title: '프롬프트 가이드라인 위반 경고',
    body: `안녕하세요 주토피아노님. 
    주토피아노님의 “파이썬으로 5분만에 구슬깨기 게임 만들어주는 프롬프트”가 프롬프트 가이드라인을 위반한 것으로 확인되었습니다.
    해당 프롬프트는 설명 내용이 실제 결과와 다르거나,사용자가 기대할 수 있는 기능을 과도하게 부풀려 안내하고 있어허위 또는 과장된 콘텐츠로 판단되었습니다.
    PromptPlace는 사용자 간의 신뢰를 바탕으로 운영되며,정확하고 성실한 정보 제공은 모든 창작자의 기본 의무입니다.
    이에 따라 해당 프롬프트는 일시적으로 비공개 처리되었으며,가이드라인에 맞게 수정하신 후 다시 등록하실 수 있습니다.
    가이드라인 전문은 [업로드 가이드라인 보기] 링크를 통해 확인하실 수 있습니다.또한, 추가 문의 사항이 있으실 경우 언제든지 고객센터로 연락주시기 바랍니다.
    앞으로도 더 나은 프롬프트 생태계를 함께 만들어주시길 바랍니다.
    감사합니다. PromptPlace 운영팀 드림.`,
    is_read: true,
    read_at: '2025-07-22',
    is_deleted: false,
    create_at: '2025-07-22',
    update_at: '2025-07-22',
  });

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/mypage/message/message`);
  };

  return (
    <>
      <div className="hidden lg:block">
        {' '}
        <div className="min-h-[calc(100vh-24px)] bg-background flex justify-center items-center ">
          {/**min-h-[calc(100vh-24px)] : 추후 min-h 부분은 navbar에 따라서 수정 필요 */}
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
                  {message.create_at}
                </p>
                <p className="w-[197px] font-medium text-[20px] text-text-on-background pt-[10px] pb-[30px]">
                  보낸 사람 : {message.sender_id}
                </p>
              </div>
            </div>

            <div className="w-[994px] h-[485px] flex justify-center overflow-y-auto prose prose-neutral max-w-none text-base">
              <div className="w-[864px] border-b-[1px] border-white-stroke font-medium text-[20px] text-text-on-white py-[30px]">
                {message.body}
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
                <p className="font-normal text-[8px] text-text-on-background ">{message.create_at}</p>
                <p className="font-medium text-[10px] text-text-on-white">보낸 사람 : {message.sender_id}</p>
              </div>
            </div>
            {/*본문 */}
            <div className="w-full max-w-[280px] h-full min-h-[275px] border-white-stroke p-[20px] ">
              <div className="text-[10px] text-text-on-white font-medium">{message.body}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyMessageDetailPage;
