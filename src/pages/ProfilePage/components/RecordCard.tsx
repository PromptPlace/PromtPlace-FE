import { useState } from 'react';

import CircleButton from '@components/Button/CircleButton';
import CloseIcon from '@assets/icon-close.svg';

interface RecordCardProps {
  history_id: number;
  description: string;
  isMyProfile: boolean;
  isEditing: boolean;
  handleDelete: (id: number) => void;
  setDescriptions: (id: number, value: string) => void;
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      setEdit(false);
      setDescriptions(history_id, input.trim());
    }
  };

  return (
    <>
      {!isMyProfile && (
        <div className="bg-white border-b border-b-white-stroke py-[30px] max-lg:p-[12px] pl-[80px] text-text-on-white text-[20px] font-medium leading-[25px] max-lg:text-[12px] max-lg:font-medium max-lg:leading-[15px]">
          {description}
        </div>
      )}

      {isMyProfile && (
        <div className="flex items-center bg-white border-b border-b-white-stroke py-[30px] pl-[80px] pr-[33px] text-text-on-white text-[20px] font-medium leading-[25px]">
          {!edit && <div className="flex-1">{description}</div>}
          {edit && (
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="이력을 입력하세요"
              className="flex-1 placeholder:text-text-on-background text-text-on-background placeholder:font-SpoqaHanSansNeo placeholder:text-[20px] placeholder:font-medium placeholder:leading-[25px] outline-none"
            />
          )}
          <div className="flex gap-[62px] items-center">
            <CircleButton
              buttonType="edit"
              size="sm"
              onClick={() => {
                setEdit((prev) => !prev);
              }}
              isActive={edit}
            />
            <div onClick={() => handleDelete(history_id)} className="w-[17px] h-[17px] cursor-pointer">
              <img src={CloseIcon} alt="삭제" className="w-full h-full object-contain" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecordCard;
