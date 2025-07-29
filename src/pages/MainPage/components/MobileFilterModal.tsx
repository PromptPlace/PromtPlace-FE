import React from 'react';

type Props = {
  visible: boolean;
  onClose: () => void;
};

const MobileFilterModal = ({ visible, onClose }: Props) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50">
      <div className="w-80 h-80 pb-5 bg-white rounded-tl-3xl rounded-tr-3xl shadow-[2px_2px_30px_0px_rgba(0,0,0,0.25)] flex flex-col items-center gap-5 px-4 pt-4">
        {/* 상단 바 */}
        <div className="w-full flex justify-center items-center relative h-7">
          <div className="w-10 h-1 bg-white-stroke rounded-full" />
        </div>

        {/* 탭 버튼들 */}
        <div className="w-72 flex justify-start items-center gap-2">
          <div className="px-5 py-1.5 bg-secondary rounded-full">
            <span className="text-primary text-xs font-medium">모델</span>
          </div>
          <div className="px-5 py-1.5 bg-white rounded-full">
            <span className="text-text-on-background text-xs font-medium">필터</span>
          </div>
          <div className="px-5 py-1.5 bg-white rounded-full">
            <span className="text-text-on-background text-xs font-medium">태그</span>
          </div>
        </div>

        {/* 선택 버튼 그룹 */}
        <div className="flex flex-col items-start gap-4">
          {[
            ['ChatGPT', 'Perplexity'],
            ['Claude', 'Gemini'],
            ['Midjourney', '기타'],
          ].map((row, rowIdx) => (
            <div key={rowIdx} className="flex gap-5">
              {row.map((label, i) => {
                const isSelected = label === 'Midjourney'; // 예시
                return (
                  <div key={i} className="w-32 flex justify-center">
                    <div
                      className={classNames(
                        'w-32 px-9 py-2 rounded outline outline-1 outline-offset-[-1px] flex justify-center items-center gap-2.5',
                        isSelected ? 'bg-secondary outline-primary' : 'bg-white outline-white-stroke',
                      )}>
                      <span
                        className={classNames(
                          'text-sm font-normal',
                          isSelected ? 'text-primary' : 'text-white-stroke',
                        )}>
                        {label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* 선택 완료 버튼 */}
        <div
          onClick={onClose}
          className="w-72 h-10 px-10 py-[5px] bg-primary rounded flex justify-center items-center gap-2.5 cursor-pointer">
          <span className="text-white text-base font-medium">선택 완료하기</span>
        </div>
      </div>
    </div>
  );
};

export default MobileFilterModal;
