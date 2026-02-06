import usePostMsgAdmin from '@/hooks/mutations/ProfilePage/usePostMsgAdmin';
import type { RequestMsgAdminDto } from '@/types/ProfilePage/admin';
import type { ResponseMemberDto } from '@/types/ProfilePage/profile';
import ArrowIcon from '@assets/icon-arrow-left-black.svg';
import ProfileIcon from '@assets/icon-profile-gray.svg';

import PrimaryButton from '@components/Button/PrimaryButton';
import { useState } from 'react';

interface AdminMessageModalProps {
  data?: ResponseMemberDto;
  id?: number;
  follower?: number;
  setShowAdminMessageModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminMessageModal = ({ data, id, follower, setShowAdminMessageModal }: AdminMessageModalProps) => {
  const receiver_id = data?.data.member_id;

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const { mutate } = usePostMsgAdmin();

  const handlePostMsg = ({ sender_id, receiver_id, title, body }: RequestMsgAdminDto) => {
    mutate({ sender_id, receiver_id, title, body });
  };

  if (receiver_id === undefined || id === undefined) return;

  return (
    <>
      <div
        className="fixed inset-0 bg-overlay z-20 flex items-center justify-center px-[20px] py-[20px]"
        onClick={() => setShowAdminMessageModal(false)}>
        <div
          className="max-w-[758px] w-full max-h-[670px] h-full overflow-y-auto rounded-[16px] bg-white py-[44px]"
          onClick={(e) => e.stopPropagation()}>
          <div className="px-[30px] py-[10px] flex gap-[10px] items-center">
            <div className="w-[24px] h-[24px] max-phone:w-[22px] max-phone:h-[22px] flex items-center justify-center">
              <img
                src={ArrowIcon}
                alt="뒤로 가기"
                className="w-full h-full object-contain cursor-pointer"
                onClick={() => setShowAdminMessageModal(false)}
              />
            </div>
            <p className="text-text-on-white text-[24px] max-phone:text-[22px] font-bold leading-[30px]">
              메시지 보내기
            </p>
          </div>

          <div className="px-[65px] pt-[30px] flex flex-col gap-[30px]">
            <div className="flex flex-col gap-[16px]">
              <p className="text-text-on-background text-[20px] max-phone:text-[18px] font-medium leading-[25px]">
                전송일 {new Date().toLocaleDateString()}
              </p>

              <div className="flex gap-[10px]">
                <img src={ProfileIcon} alt="프로필 이미지" />
                <div className="flex flex-col">
                  <p className="text-text-on-white text-[18px] max-phone:text-[16px] font-normal leading-[26px] tracking-[0.46px]">
                    {data?.data.nickname}
                    <span className="text-[18px] max-phone:text-[16px]">({data?.data.email})</span>
                  </p>
                  <p className="text-[14px] max-phone:text-[12px] font-normal leading-[26px] tracking-[0.46px]">
                    팔로워 {follower}명
                  </p>
                </div>
              </div>

              <div className="mt-[8px] flex flex-col gap-[12px]">
                <p className="text-text-on-white text-[20px] max-phone:text-[18px] font-medium leading-[25px]">
                  제목 작성
                </p>
                <textarea
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="작성하기"
                  id="message-title"
                  className="font-[SCoreDream] text-text-on-white text-[18px] max-phone:text-[16p] leading-[23px] font-light placeholder:font-[SCoreDream] placeholder:text-text-on-background placeholder:text-[18px] placeholder:leading-[23px] placeholder:max-phone:text-[16px] resize-none w-full h-[81px] p-[24px] outline-none bg-background rounded-[8px]"
                />
              </div>

              <div className="flex flex-col gap-[12px]">
                <p className="text-text-on-white text-[20px] max-phone:text-[18px] font-medium leading-[25px]">
                  내용 작성
                </p>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="작성하기"
                  id="message-content"
                  className="font-[SCoreDream] text-text-on-white text-[18px] max-phone:text-[16px] leading-[23px] font-light placeholder:font-[SCoreDream] placeholder:text-text-on-background placeholder:text-[18px] placeholder:leading-[23px] placeholder:max-phone:text-[16px] resize-none w-full h-[137px] p-[24px] outline-none bg-background rounded-[8px]"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <PrimaryButton
                buttonType="adminBG"
                text="메시지 보내기"
                borderRadius={8}
                py={8}
                onClick={() => {
                  handlePostMsg({ receiver_id, sender_id: id, title, body: content });
                  alert('메시지 전송이 완료되었습니다.');
                  setShowAdminMessageModal(false);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminMessageModal;
