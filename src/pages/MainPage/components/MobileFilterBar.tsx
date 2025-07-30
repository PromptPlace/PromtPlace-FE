import React from 'react';

type MobileFilterBarProps = {
  onlyFree: boolean;
  onOnlyFreeToggle: () => void;
  onOpenModel: () => void;
  onOpenSort: () => void;
  onOpenTag: () => void;
};

const MobileFilterBar = ({ onlyFree, onOnlyFreeToggle, onOpenModel, onOpenSort, onOpenTag }: MobileFilterBarProps) => {
  return (
    <div className="flex justify-start items-center gap-2 px-4 py-2 bg-white">
      {/* 무료만 */}
      <div className="w-7 flex flex-col justify-start items-center cursor-pointer" onClick={onOnlyFreeToggle}>
        <div className="w-5 h-5 relative flex justify-center items-center">
          <div className={`w-3.5 h-3.5 rounded-sm ${onlyFree ? 'bg-primary' : 'bg-text-on-background'}`} />
        </div>
        <div className="text-[10px] text-text-on-background font-medium">무료만</div>
      </div>

      {/* 필터들 */}
      <div className="flex gap-2">
        {/* 모델 */}
        <button
          onClick={onOpenModel}
          className="px-2.5 py-1 bg-white rounded-full outline outline-1 outline-offset-[-1px] outline-white-stroke flex items-center gap-1">
          <span className="text-[10px] text-text-on-background font-medium">모델</span>
          <div className="w-2.5 h-2.5 relative">
            <div className="w-1.5 h-[3px] absolute left-[2px] top-[3.5px] outline outline-1 outline-offset-[-0.5px] outline-text-on-background" />
          </div>
        </button>

        {/* 필터 */}
        <button
          onClick={onOpenSort}
          className="px-2.5 py-1 bg-white rounded-full outline outline-1 outline-offset-[-1px] outline-white-stroke flex items-center gap-1">
          <span className="text-[10px] text-text-on-background font-medium">필터</span>
          <div className="w-2.5 h-2.5 relative">
            <div className="w-1.5 h-[3px] absolute left-[2px] top-[3.5px] outline outline-1 outline-offset-[-0.5px] outline-text-on-background" />
          </div>
        </button>

        {/* 태그 */}
        <button
          onClick={onOpenTag}
          className="px-2.5 py-1 bg-white rounded-full outline outline-1 outline-offset-[-1px] outline-white-stroke flex items-center gap-1">
          <span className="text-[10px] text-text-on-background font-medium">태그</span>
          <div className="w-2.5 h-2.5 relative">
            <div className="w-1.5 h-[3px] absolute left-[2px] top-[3.5px] outline outline-1 outline-offset-[-0.5px] outline-text-on-background" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default MobileFilterBar;
