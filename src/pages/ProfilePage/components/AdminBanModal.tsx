import { useState } from 'react';

import ArrowIcon from '@assets/icon-arrow-left-black.svg';
import RadioIcon from '@assets/icon-radio-circle.svg';
import RadioMarkedIcon from '@assets/icon-radio-circle-marked.svg';

import PrimaryButton from '@components/Button/PrimaryButton';

interface AdminBanModalProps {
  setShowAdminBanModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminBanModal = ({ setShowAdminBanModal }: AdminBanModalProps) => {
  const BanDays = [
    {
      id: 1,
      days: 1,
    },
    { id: 2, days: 7 },
    { id: 3, days: 15 },
    { id: 4, days: 30 },
  ];

  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  return (
    <div
      className="fixed inset-0 bg-overlay z-20 flex items-center justify-center"
      onClick={() => setShowAdminBanModal(false)}>
      <div className="max-w-[758px] w-full rounded-[16px] bg-white py-[55px]" onClick={(e) => e.stopPropagation()}>
        <div className="px-[30px] py-[10px] flex gap-[10px] items-center">
          <div className="w-[24px] h-[24px] flex items-center justify-center">
            <img
              src={ArrowIcon}
              alt="뒤로 가기"
              className="w-full h-full object-contain cursor-pointer"
              onClick={() => setShowAdminBanModal(false)}
            />
          </div>
          <p className="text-text-on-white text-[24px] font-bold leading-[30px]">계정 정지 일수 선택</p>
        </div>

        <div className="px-[65px] pt-[30px] flex flex-col gap-[30px]">
          {BanDays.map((day) => (
            <div key={day.id} className="flex gap-[17px]">
              <img
                src={day.days === selectedDay ? RadioMarkedIcon : RadioIcon}
                alt="계정 정지 일수 선택"
                className="cursor-pointer"
                onClick={() => setSelectedDay(day.days)}
              />
              <p className="text-text-on-white text-[24px] font-bold leading-[30px]">{day.days}일</p>
            </div>
          ))}

          {selectedDay !== null && (
            <div className="flex justify-end">
              <PrimaryButton
                buttonType="squareAdmin"
                text="정지시키기"
                onClick={() => {
                  console.log('계정 정지 일수', selectedDay);
                  setShowAdminBanModal(false);
                }}
                admin={true}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminBanModal;
