import React from 'react';
import Likes from '@pages/MainPage/components/likes.tsx';
import iconEye from '@assets/icon-eye.svg';
import iconDownload from '@assets/icon-download-gray.svg';
import Stars from '@components/Stars.tsx';

const PromptCardSkeleton = () => {
  return (
    <div className="w-[294px] h-[533px] rounded-lg">
      <div className="relative w-full h-[263px] rounded-t-lg overflow-hidden bg-[#E6E6E6]"></div>

      <div className="w-full h-[270px] px-6 py-5 inline-flex flex-col justify-start gap-3 bg-white rounded-b-lg cursor-pointer">
        <div className="inline-flex justify-between items-start w-[96px] h-4 rounded-[20px] bg-[#E6E6E6]"></div>

        <div className="w-[162px] h-[16px] bg-[#E6E6E6] rounded-[20px]"></div>

        <div className="w-[96px] h-[16px] mt-[24px] rounded-[22.5px] bg-[#E6E6E6]"></div>
        <div className="mt-2.5">
          <div className="w-[246px] h-4 rounded-[20px] bg-[#E6E6E6]"></div>
          <div className="mt-1 w-[162px] h-4 rounded-[20px] bg-[#E6E6E6]"></div>
        </div>
        <div className="mt-2.5">
          <div className="w-[96px] h-4 rounded-[22px] bg-[#E6E6E6]"></div>
          <div className="mt-1 w-[162px] h-4 rounded-[20px] bg-[#E6E6E6]"></div>
        </div>
      </div>
    </div>
  );
};

export default PromptCardSkeleton;
