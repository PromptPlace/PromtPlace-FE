import React from 'react';
import renew from '@/assets/icon-round-autorenew.svg';
import arrowDown from '@/assets/icon-arrow-down.svg';

const Filter = () => {
  return (
    <div className="inline-flex justify-start items-center gap-10">
      {/* 모델 섹션 */}
      <div className="flex justify-start items-center gap-6">
        {/* 모델 */}
        <div className="inline-flex flex-col justify-start items-start gap-2">
          <div className="w-20 h-5 text-base leading-6 text-text-on-white">모델</div>
          <div className="inline-flex justify-start items-center gap-2 cursor-pointer">
            <div className="w-24 h-5 text-xs font-light leading-4 text-text-on-white">AI 모델 선택</div>
            {/* 아래 화살표 아이콘 */}
            <div className="w-3.5 h-3.5 relative flex items-center justify-center">
              <img src={arrowDown} className="w-2.5 h-[5px]"></img>
            </div>
          </div>
        </div>

        {/* 필터 */}
        <div className="inline-flex flex-col justify-start items-start gap-2">
          <div className="w-12 h-5 text-base leading-6 text-text-on-white">필터</div>
          <div className="inline-flex justify-start items-center gap-2 cursor-pointer">
            <div className="min-w-28 text-xs font-light leading-4 text-text-on-white">조회순, 별점순 등 선택</div>
            <div className="w-3.5 h-3.5 relative flex items-center justify-center">
              <img src={arrowDown} className="w-2.5 h-[5px]"></img>
            </div>
          </div>
        </div>
      </div>

      {/* 초기화 버튼 */}
      <button className="px-1 py-0.5 flex justify-start items-center gap-1.5 text-gray-500 text-xs font-medium leading-4 hover:opacity-80 transition">
        <div className="w-4 h-4 relative flex items-center justify-center overflow-hidden">
          <img src={renew} className="w-2.5 h-3.5"></img>
        </div>
        <span>초기화</span>
      </button>
    </div>
  );
};

export default Filter;
