import ArrowIcon from '@assets/home/icon-round-arrow-forward.svg?react';
import { NavLink, useNavigate } from 'react-router-dom';

interface ImageBoxProps {
  url: string;
  to: string;
}

const ImageBox = ({ url, to }: ImageBoxProps) => {
  const navigate = useNavigate();

  return (
    <>
      <div
        onClick={() => navigate(to)}
        className="relative image-overlay w-[482px] max-lg:w-[282px] max-phone:w-[175px]! aspect-[16/9] rounded-[15px] overflow-hidden relative self-center m-auto cursor-pointer">
        <img src={url} alt="프롬프트 이미지" className="w-full h-full object-cover" />

        <button className="absolute w-[186px] max-phone:w-[113px] z-[10] right-[40px] bottom-[24px] max-lg:right-[16px] max-lg:bottom-[16px] max-phone:right-[13.71px]! max-phone:bottom-[13.71px]! rounded-[24px] bg-white py-[12px] pr-[12px] pl-[24px] max-phone:py-[6.86px] max-phone:pr-[6.86px] max-phone:pl-[13.71px] flex items-center justify-center gap-[20px] max-phone:gap-[17.14px]">
          <NavLink to={to} className="custom-button1 max-phone:text-[8px]">
            프롬프트 바로가기
          </NavLink>
          <ArrowIcon className="max-phone:w-[10px]" />
        </button>
      </div>
    </>
  );
};

export default ImageBox;
