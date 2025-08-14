import React, { useState, useRef, useEffect } from 'react';
import { LuChevronDown, LuEllipsis } from 'react-icons/lu';

const MODEL_OPTIONS = ['ChatGPT', 'Perplexity', 'Claude', 'Gemini', 'Midjourney', '기타'];

interface ModelDropdownProps {
  selectedModels: string[];
  setSelectedModels: (models: string[]) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isSummary: boolean;
}

const getModelSummary = (models: string[]) => {
  const joined = models.join(', ');
  const maxLen = 12;
  if (joined.length > maxLen) {
    let cut = joined.slice(0, maxLen);
    cut = cut.replace(/,$/, '');
    return (
      <span className="font-medium text-[var(--color-text-on-white)] text-[20px] flex items-center">
        {cut}
        <LuEllipsis className="inline ml-1 align-middle" />
      </span>
    );
  }
  return joined || '모델';
};

const ModelDropdown: React.FC<ModelDropdownProps> = ({
  selectedModels,
  setSelectedModels,
  isOpen,
  setIsOpen,
  isSummary,
}) => {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 외부 클릭시 닫힘
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, setIsOpen]);

  const handleToggle = (model: string) => {
    if (selectedModels.includes(model)) {
      setSelectedModels(selectedModels.filter((m) => m !== model));
    } else {
      setSelectedModels([...selectedModels, model]);
    }
  };

  // 요약 모드 (선택 완료 & 드롭다운 닫힘)
  if (isSummary && !isOpen) {
    return (
      <div className="relative w-full max-w-[185px] h-[59px]">
        <button
          className="flex items-center gap-[10px] w-full h-full text-left rounded-[8px] font-medium text-[var(--color-text-on-white)] text-[20px] cursor-pointer transition-colors"
          onClick={() => setIsOpen(true)}
          type="button">
          <span className="font-medium text-[var(--color-text-on-white)] text-[20px]">
            {getModelSummary(selectedModels)}
          </span>
          <LuChevronDown size={24} />
        </button>
      </div>
    );
  }

  // 드롭다운 모드
  return (
    <div className="relative w-full max-w-[185px] h-[59px]">
      <button
        className="flex items-center gap-[10px] w-full h-full text-left rounded-[8px] font-medium text-[var(--color-text-on-white)] text-[20px] cursor-pointer transition-colors"
        onClick={() => setIsOpen(true)}
        type="button">
        <span className="font-medium text-[var(--color-text-on-white)] text-[20px]">
          {getModelSummary(selectedModels)}
        </span>
        <LuChevronDown size={24} />
      </button>
      {isOpen && (
        <div
          className="max-w-[142px] w-full absolute z-10 mt-2 bg-white rounded-[8px] border-[1px] border-[var(--color-white-stroke)]"
          ref={dropdownRef}
          style={{ boxShadow: '0px 4px 8px 0px rgba(0,0,0,0.12)' }}>
          {MODEL_OPTIONS.map((model, idx) => (
            <div
              key={model}
              className={[
                'w-[112px] h-[41px] mx-auto py-[9px] px-[10px] border-b-[1px] border-[var(--color-white-stroke)] flex flex-col items-center text-[var(--color-text-on-background)] cursor-pointer',
                selectedModels.includes(model)
                  ? 'bg-[var(--color-secondary-pressed)] text-[var(--color-text-on-white)] font-[400]'
                  : '',
                idx === 0 ? 'mt-[10px]' : '',
                hoverIdx === idx ? 'bg-[var(--color-secondary)]' : '',
                model === '기타' ? 'border-none mb-[10px]' : '',
              ].join(' ')}
              onMouseEnter={() => setHoverIdx(idx)}
              onMouseLeave={() => setHoverIdx(null)}
              onClick={() => handleToggle(model)}>
              {model}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ModelDropdown;
