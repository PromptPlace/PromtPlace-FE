import React, { useEffect, useState } from 'react';
import renew from '@/assets/icon-round-autorenew.svg';
import arrowDown from '@/assets/icon-arrow-down.svg';
import ModelModal from './ModelModal';
import SortModal from './SortModal';

interface FilterProps {
  onModelChange?: (models: string[]) => void;
  onSortChange?: (sort: string) => void;
  onReset?: () => void;
}

const Filter = ({ onModelChange, onSortChange, onReset }: FilterProps) => {
  const [modelIsOpen, setModelIsOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string[]>([]);

  const [filterIsOpen, setFilterIsOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState<string>('');

  const modalRef = React.useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if ((modelIsOpen || filterIsOpen) && modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setModelIsOpen(false);
        setFilterIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modelIsOpen, filterIsOpen]);

  const handleModelSelect = (models: string[]) => {
    setSelectedModel(models);
    onModelChange?.(models);
    setModelIsOpen(false);
  };

  const handleSortSelect = (sort: string) => {
    setSelectedSort(sort);
    onSortChange?.(sort);
    setFilterIsOpen(false);
  };

  const handleReset = () => {
    setSelectedModel([]);
    setSelectedSort('');
    onReset?.();
  };

  return (
    <div className="inline-flex justify-start items-center gap-10">
      {/* 모델 섹션 */}
      <div className="flex justify-start items-center gap-6">
        {/* 모델 */}
        <div className="relative inline-flex flex-col justify-start items-start gap-2">
          <div
            onClick={() => {
              setModelIsOpen(!modelIsOpen);
              setFilterIsOpen(false);
            }}>
            <div className="w-20 h-5 text-base leading-6 text-text-on-white">모델</div>
            <div className="inline-flex justify-start items-center gap-2 cursor-pointer">
              <div className="max-w-[104px] h-5 text-xs font-light leading-4 text-text-on-white truncate">
                {selectedModel.length > 0 ? selectedModel.join(', ') : 'AI 모델 선택'}
              </div>
              {/* 아래 화살표 아이콘 */}
              <div className="w-3.5 h-3.5 relative flex items-center justify-center">
                <img src={arrowDown} alt="arrow down" className="w-2.5 h-[5px]"></img>
              </div>
            </div>
          </div>
          {modelIsOpen && (
            <div ref={modalRef} className="absolute top-[60px] left-0 w-96 z-[9999]">
              <ModelModal selectedModels={selectedModel} onConfirm={handleModelSelect} />
            </div>
          )}
        </div>

        {/* 필터 */}
        <div className="relative inline-flex flex-col justify-start items-start gap-2">
          <div
            onClick={() => {
              setFilterIsOpen(!filterIsOpen);
              setModelIsOpen(false);
            }}>
            <div className="w-12 h-5 text-base leading-6 text-text-on-white">필터</div>
            <div className="inline-flex justify-start items-center gap-2 cursor-pointer">
              <div className="min-w-28 text-xs font-light leading-4 text-text-on-white">
                {selectedSort || '조회순, 별점순 등 선택'}
              </div>
              <div className="w-3.5 h-3.5 relative flex items-center justify-center">
                <img src={arrowDown} alt="arrow down" className="w-2.5 h-[5px]"></img>
              </div>
            </div>
          </div>
          {filterIsOpen && (
            <div ref={modalRef} className="absolute top-[60px] left-0 w-96 z-[9999]">
              <SortModal selectedSort={selectedSort} onSelect={handleSortSelect} />
            </div>
          )}
        </div>
      </div>

      {/* 초기화 버튼 */}
      <button
        onClick={handleReset}
        className="px-1 py-0.5 flex justify-start items-center gap-1.5 text-gray-500 text-xs font-medium leading-4 hover:opacity-80 transition">
        <div className="w-4 h-4 relative flex items-center justify-center overflow-hidden">
          <img src={renew} alt="renew" className="w-2.5 h-3.5"></img>
        </div>
        <span>초기화</span>
      </button>
    </div>
  );
};

export default Filter;
