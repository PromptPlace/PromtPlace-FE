import DefaultImg from '@assets/logo/app/app-logo-default.svg?react';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../Button/PrimaryButton';
import { useState } from 'react';
import AdminModal from '../Modal/AdminModal';

interface NavbarNotificatioinModalCardProps {
  img: string | null;
  content: string;
  date: string;
  link: string;
  type: string;
  setIsNotificationModalShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavbarNotificatioinModalCard = ({
  img,
  content,
  date,
  link,
  type,
  setIsNotificationModalShow,
}: NavbarNotificatioinModalCardProps) => {
  const [showAdminModal, setShowAdminModal] = useState<boolean>(false);

  const navigate = useNavigate();

  return (
    <>
      <div className="pt-[8px] pr-[24px] pb-[20px]">
        <div
          onClick={() => {
            setIsNotificationModalShow((prev) => !prev);
            navigate(link);
          }}
          className="flex gap-[24px]">
          {img ? (
            <img src={img} className="w-[48px] h-[48px] rounded-full object-cover" />
          ) : (
            <DefaultImg className="w-[48px] h-[48px]" />
          )}

          <div className="flex flex-col gap-[8px]">
            <p className="custom-body2">{content}</p>
            <p className="custom-body3 text-gray400">{date.slice(0, 10)}</p>
          </div>
        </div>

        {type === 'ADMIN' && (
          <div className="flex justify-end">
            <PrimaryButton
              buttonType="square"
              text="확인하기"
              py={6}
              px={12}
              textSize={12}
              textColor="white"
              borderRadius={8}
              width={47}
              onClick={() => {
                setShowAdminModal(true);
              }}
            />
          </div>
        )}
      </div>

      {showAdminModal && <AdminModal />}
    </>
  );
};

export default NavbarNotificatioinModalCard;
