import TextModal from '@/components/Modal/TextModal';
import type { ResponseMemberDto } from '@/types/ProfilePage/profile';
import ArrowIcon from '@assets/icon-arrow-left-black.svg';
import ProfileIcon from '@assets/icon-profile-gray.svg';

import PrimaryButton from '@components/Button/PrimaryButton';
import { useState } from 'react';

interface AdminMessageModalProps {
  data?: ResponseMemberDto;
  follower?: number;
  setShowAdminMessageModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminMessageModal = ({ data, follower, setShowAdminMessageModal }: AdminMessageModalProps) => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

  return (
    <>
      <div
        className="fixed inset-0 bg-overlay z-20 flex items-center justify-center"
        onClick={() => setShowAdminMessageModal(false)}>
        <div className="max-w-[758px] w-full rounded-[16px] bg-white py-[55px]" onClick={(e) => e.stopPropagation()}>
          <div className="px-[30px] py-[10px] flex gap-[10px] items-center">
            <div className="w-[24px] h-[24px] flex items-center justify-center">
              <img
                src={ArrowIcon}
                alt="뒤로 가기"
                className="w-full h-full object-contain cursor-pointer"
                onClick={() => setShowAdminMessageModal(false)}
              />
            </div>
            <p className="text-text-on-white text-[24px] font-bold leading-[30px]">메시지 보내기</p>
          </div>

          <div className="px-[65px] pt-[30px] flex flex-col gap-[30px]">
            <div className="flex flex-col gap-[16px]">
              <p className="text-text-on-background text-[20px] font-medium leading-[25px]">
                전송일 {new Date().toLocaleDateString()}
              </p>

              <div className="flex gap-[10px]">
                <img src={ProfileIcon} alt="프로필 이미지" />
                <div className="flex flex-col">
                  <p className="text-text-on-white text-[18px] font-normal leading-[26px] tracking-[0.46px]">
                    {data?.data.nickname} <span className="text-[18px]">({data?.data.email})</span>
                  </p>
                  <p className="text-[14px] font-normal leading-[26px] tracking-[0.46px]">팔로워 {follower}명</p>
                </div>
              </div>

              <div className="mt-[8px] flex flex-col gap-[12px]">
                <p className="text-text-on-white text-[20px] font-medium leading-[25px]">제목 작성</p>
                <textarea
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="작성하기"
                  id="message-title"
                  className="font-[SpoqaHanSansNeo] text-text-on-white text-[18px] leading-[23px] font-normal placeholder:font-[SpoqaHanSansNeo] placeholder:text-text-on-background placeholder:text-[18px] placeholder:leading-[23px] resize-none w-full h-[81px] p-[24px] outline-none bg-background rounded-[8px]"
                />
              </div>

              <div className="flex flex-col gap-[12px]">
                <p className="text-text-on-white text-[20px] font-medium leading-[25px]">내용 작성</p>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="작성하기"
                  id="message-content"
                  className="font-[SpoqaHanSansNeo] text-text-on-white text-[18px] leading-[23px] font-normal placeholder:font-[SpoqaHanSansNeo] placeholder:text-text-on-background placeholder:text-[18px] placeholder:leading-[23px] resize-none w-full h-[137px] p-[24px] outline-none bg-background rounded-[8px]"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <PrimaryButton
                buttonType="squareAdmin"
                text="메시지 보내기"
                onClick={() => {
                  setShowConfirmModal(true);
                }}
                admin={true}
              />
            </div>
          </div>
        </div>
      </div>

      {showConfirmModal && (
        <TextModal
          text="메시지 전송이 완료되었습니다."
          onClick={() => {
            setShowAdminMessageModal(false);
          }}
          size="lg"
        />
      )}
    </>
  );
};

export default AdminMessageModal;
