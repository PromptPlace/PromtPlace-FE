import { useEffect, useState } from 'react';

import CircleButton from '@components/Button/CircleButton';
import CloseIcon from '@assets/icon-close.svg';
import AdminCancleIcon from '@assets/icon-cancle-admin.svg';
import { useAuth } from '@/context/AuthContext';
import DualModal from '@/components/Modal/DualModal';
import TextModal from '@/components/Modal/TextModal';
import useDeleteHistoriesAdmin from '@/hooks/mutations/ProfilePage/useDeleteHistoriesAdmin';

interface RecordCardProps {
  history_id: number;
  description: string;
  isMyProfile: boolean;
  isEditing?: boolean;
  handleDelete: ({ history_id }: { history_id: number }) => void;
  setDescriptions: ({ history_id, history }: { history_id: number; history: string }) => void;
}

const RecordCard = ({
  history_id,
  description,
  isMyProfile,
  isEditing,
  handleDelete,
  setDescriptions,
}: RecordCardProps) => {
  const [input, setInput] = useState(description);
  const [edit, setEdit] = useState(isEditing);

  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showAdminConfirmModal, setShowAdminConfirmModal] = useState(false);

  const { user } = useAuth();

  // 회원 이력 삭제
  const { mutate: mutateDeleteHistoriesAdmin } = useDeleteHistoriesAdmin({ member_id: user.user_id });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      setEdit(false);
      setDescriptions({ history_id: history_id, history: input.trim() });
    }
  };

  useEffect(() => {
    if (!description.trim()) {
      setEdit(true);
      setInput('');
    }
  }, [description]);

  return (
    <>
      {!isMyProfile && (
        <div className="bg-white border-b border-b-white-stroke py-[30px] max-lg:p-[12px] pl-[80px] text-text-on-white text-[20px] font-medium leading-[25px] max-lg:text-[12px] max-lg:font-medium max-lg:leading-[15px] flex justify-between pr-[43px]">
          {description}

          {user.role === 'ADMIN' && (
            <img
              src={AdminCancleIcon}
              alt="이력 삭제"
              className="cursor-pointer"
              onClick={() => setShowAdminModal(true)}
            />
          )}
        </div>
      )}

      {isMyProfile && (
        <div className="flex items-center bg-white border-b border-b-white-stroke py-[30px] pl-[80px] max-lg:p-[12px] pr-[33px] text-text-on-white text-[20px] font-medium leading-[25px] max-lg:text-[12px] max-lg:leading-[15px]">
          {!edit && <div className="flex-1">{description}</div>}
          {edit && (
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="이력을 입력하세요"
              className="flex-1 placeholder:text-text-on-background text-text-on-white placeholder:font-SpoqaHanSansNeo placeholder:text-[20px] placeholder:font-medium placeholder:leading-[25px] max-lg:placeholder:text-[12px] max-lg:placeholder:leading-[15px] outline-none"
            />
          )}
          <div className="flex gap-[62px] items-center max-lg:gap-[12px]">
            <CircleButton
              buttonType="edit"
              size="sm"
              onClick={() => {
                setEdit((prev) => !prev);
                setDescriptions({ history_id: history_id, history: input.trim() });
              }}
              isActive={edit}
            />
            <div
              onClick={() => handleDelete({ history_id })}
              className="w-[17px] h-[17px] max-lg:p-[4px] cursor-pointer">
              <img src={CloseIcon} alt="삭제" className="w-full h-full object-contain" />
            </div>
          </div>
        </div>
      )}

      {showAdminModal && (
        <DualModal
          text="해당 이력을 삭제 조치 하시겠습니까?"
          onClickYes={() => {
            setShowAdminModal(false);
            setShowAdminConfirmModal(true);
            mutateDeleteHistoriesAdmin({ history_id });
          }}
          onClickNo={() => {
            setShowAdminModal(false);
          }}
        />
      )}

      {showAdminConfirmModal && (
        <TextModal text="이력 삭제가 완료되었습니다." onClick={() => setShowAdminConfirmModal(false)} size="lg" />
      )}
    </>
  );
};

export default RecordCard;
