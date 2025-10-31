import ArrowIcon from '@assets/home/icon-round-arrow-forward.svg?react';
import { NavLink } from 'react-router-dom';

interface ImageBoxProps {
  url: string;
  to: string;
}

const ImageBox = ({ url, to }: ImageBoxProps) => {
  return (
    <div className="image-overlay w-[30vw] aspect-[16/9] rounded-[15px] overflow-hidden relative self-center m-auto">
      <img src={url} alt="프롬프트 이미지" className="w-full h-full object-cover" />

      <button className="w-[186px] absolute z-[10] right-[2.7vw] bottom-[1.6vw] rounded-[24px] bg-white py-[12px] pr-[12px] pl-[24px] flex items-center justify-center gap-[20px]">
        <NavLink to={to} className="custom-button1">
          프롬프트 바로가기
        </NavLink>
        <ArrowIcon />
      </button>
    </div>
  );
};

export default ImageBox;
