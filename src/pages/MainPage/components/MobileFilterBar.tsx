import React from 'react';
import arrow from '@/assets/icon-arrow-down.svg';
import checkbox from '@/assets/icon-bi-check-square.svg';
import box from '@/assets/icon-bi-noncheck-square.svg';

type MobileFilterBarProps = {
  onlyFree: boolean;
  onOnlyFreeToggle: () => void;
  onOpenModel: () => void;
  onOpenSort: () => void;
  onOpenTag: () => void;
  activeTab: '모델' | '필터' | '태그' | null;
};

const MobileFilterBar = ({
  onlyFree,
  onOnlyFreeToggle,
  onOpenModel,
  onOpenSort,
  onOpenTag,
  activeTab,
}: MobileFilterBarProps) => {
  return (
    <div className="flex justify-start items-center gap-2 px-4 py-2 bg-[#F5F5F5]">
      {/* 무료만 */}
      <div className="w-7 flex flex-col justify-start items-center cursor-pointer" onClick={onOnlyFreeToggle}>
        <div className="w-5 h-5 relative flex justify-center items-center">
          <img className={`w-[20px] h-[20px] rounded-sm absolute`} src={onlyFree ? checkbox : box} />
        </div>
        <div className="text-[10px] text-text-on-background font-medium text-center">무료만</div>
      </div>

      {/* 필터 버튼들 */}
      <div className="flex gap-2">
        {[
          { label: '모델', onClick: onOpenModel },
          { label: '필터', onClick: onOpenSort },
          { label: '태그', onClick: onOpenTag },
        ].map(({ label, onClick }) => {
          const active = activeTab === label;
          return (
            <button
              key={label}
              onClick={onClick}
              className={`px-2.5 py-1 bg-white rounded-full outline-1 outline-offset-[-1px] outline-white-stroke flex items-center gap-1
      ${active ? 'bg-[#F0F7FF] text-primary' : 'text-text-on-background'}`}>
              <span className="text-[10px] font-medium">{label}</span>
              <div className="w-2.5 h-2.5 relative overflow-hidden">
                <img className="w-1.5 h-[3px] absolute left-[2px] top-[3.5px]" src={arrow} alt="화살표 아이콘" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileFilterBar;
