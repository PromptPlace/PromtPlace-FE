import DefaultImg from '@assets/logo/app/app-logo-default.svg?react';

interface NavbarNotificatioinModalCardProps {
  img: string | null;
  content: string;
  date: string;
  link: string;
}

const NavbarNotificatioinModalCard = ({ img, content, date }: NavbarNotificatioinModalCardProps) => {
  return (
    <div className="pt-[8px] pr-[24px] pb-[20px] flex gap-[24px]">
      {img ? <img src={img} /> : <DefaultImg className="w-[48px] h-[48px]" />}
      <div className="flex flex-col gap-[8px]">
        <p className="custom-body2">{content}</p>
        <p className="custom-body3 text-gray400">{date.slice(0, 10)}</p>
      </div>
    </div>
  );
};

export default NavbarNotificatioinModalCard;
