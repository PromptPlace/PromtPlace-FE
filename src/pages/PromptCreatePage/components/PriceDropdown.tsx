import React, { useState, useRef, useEffect } from 'react';
import { LuChevronDown } from 'react-icons/lu';

interface PriceDropdownProps {
  priceType: '무료' | '유료' | null;
  setPriceType: (type: '무료' | '유료') => void;
  cost: number | null;
  setCost: (cost: number | null) => void;
  onComplete: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isSummary: boolean;
}

// number만 인수로 받는 formatNumber 함수
const formatNumber = (num: number) => num.toLocaleString('ko-KR');

const PriceDropdown: React.FC<PriceDropdownProps> = ({
  priceType,
  setPriceType,
  cost,
  setCost,
  onComplete,
  isOpen,
  setIsOpen,
  isSummary,
}) => {
  // 입력값은 string, 저장값은 number
  const [input, setInput] = useState(cost !== null ? cost.toString() : '');
  useEffect(() => {
    setInput(cost !== null ? cost.toString() : '');
  }, [cost]);

  const [showError, setShowError] = useState(false);
  const [showPriceInput, setShowPriceInput] = useState(false);

  // 외부 클릭시 닫힘
  const dropdownRef = useRef<HTMLDivElement>(null);
  const priceInputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen && !showPriceInput) return;
    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        (!priceInputRef.current || !priceInputRef.current.contains(e.target as Node))
      ) {
        if (showPriceInput && priceType === '유료') {
          if (isValidPrice(input)) {
            setCost(Number(input));
          } else {
            setCost(null);
          }
        }
        setIsOpen(false);
        setShowPriceInput(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen, showPriceInput, setIsOpen, input, priceType, setCost, setPriceType]);

  // 최소 | 최대 금액 설정
  const isValidPrice = (value: string) => {
    const num = Number(value);
    return !isNaN(num) && num >= 100 && num <= 100000;
  };

  // 요약 모드 (선택 완료 & 드롭다운 닫힘)
  if (isSummary && !isOpen && !showPriceInput) {
    return (
      <div className="relative w-full max-w-[178px] h-[59px]">
        <button
          className="flex items-center gap-[10px] w-full h-full text-left rounded-xl font-medium text-[var(--color-text-on-white)] text-[20px] cursor-pointer transition-colors"
          onClick={() => setIsOpen(true)}
          type="button">
          <span className="font-medium text-[var(--color-text-on-white)] text-[20px]">
            {priceType === '유료' && cost !== null
              ? `유료, ${formatNumber(cost)}원`
              : priceType === '무료'
                ? '무료'
                : '가격'}
          </span>
          <LuChevronDown size={24} />
        </button>
      </div>
    );
  }

  // 드롭다운 모드
  return (
    <div className="relative w-full max-w-[178px] h-[59px]">
      <button
        className="flex items-center gap-[10px] w-full h-full text-left rounded-xl font-medium text-[var(--color-text-on-white)] text-[20px] cursor-pointer transition-colors"
        onClick={() => setIsOpen(true)}
        type="button">
        <span className="font-medium text-[var(--color-text-on-white)] text-[20px]">
          {priceType === '유료' && input !== '' && isValidPrice(input)
            ? `유료, ${formatNumber(Number(input))}원`
            : priceType === '유료'
              ? '유료'
              : priceType === '무료'
                ? '무료'
                : '가격'}
        </span>
        <div className={`${isOpen ? 'rounded-xl bg-primary-pressed text-white' : ''}`}>
          <LuChevronDown size={24} />
        </div>
      </button>
      {/* 드롭다운 (무료/유료) */}
      {isOpen && (
        <div
          className="absolute z-20 left-0 py-[10px] max-w-[142px] w-full h-[102px] bg-white  rounded-[8px] border-[1px] border-[var(--color-white-stroke)]"
          style={{ boxShadow: '0px 4px 8px 0px rgba(0,0,0,0.12)' }}
          ref={dropdownRef}>
          <div
            className={`w-[112px] h-[41px] mx-auto py-[9px] px-[10px] text-center cursor-pointer border-[var(--color-white-stroke)] font-normal ${
              priceType === '무료'
                ? 'bg-[var(--color-secondary-pressed)] text-[var(--color-text-on-white)] rounded-t-[4px]'
                : 'text-[var(--color-text-on-background)]'
            }`}
            onClick={() => {
              setPriceType('무료');
              setInput('');
              setShowError(false);
              setShowPriceInput(false);
              setIsOpen(false);
              setCost(0);
              onComplete();
            }}>
            무료
          </div>
          <div
            className={`w-[112px] h-[41px] mx-auto py-[9px] px-[10px] text-center cursor-pointer font-normal ${
              priceType === '유료'
                ? 'bg-[var(--color-secondary-pressed)] text-[var(--color-text-on-white)] rounded-b-[4px]'
                : 'text-[var(--color-text-on-background)]'
            }`}
            onClick={() => {
              setPriceType('유료');
              setShowError(false);
              setShowPriceInput(true);
            }}>
            유료
          </div>
        </div>
      )}
      {/* 유료 선택 시 가격 입력 모달 */}
      {showPriceInput && (
        <div
          className={`absolute z-30 left-36 top-25 w-[354px] ${showError ? 'h-[122px]' : 'h-[102px]'} bg-white border border-[var(--color-white-stroke)] rounded-xl shadow-xl p-4`}
          style={{ boxShadow: '0px 4px 8px 0px rgba(0,0,0,0.12)' }}
          ref={priceInputRef}>
          <div className="flex w-full items-center gap-[10px]">
            <div className="flex flex-col">
              <div
                className="flex items-center rounded-[8px] w-full max-w-[244px] border-[1px]
                border-[var(--color-primary)]
                hover:border-[var(--color-primary-hover)] group
                focus-within:border-[var(--color-primary-pressed)] transition-colors">
                <input
                  type="number"
                  value={input}
                  min={100}
                  max={100000}
                  className="ml-[24px] outline-none border-none max-w-[244px] h-[59px] w-full text-[18px] text-text-on-white"
                  onChange={(e) => {
                    setInput(e.target.value.replace(/[^0-9]/g, ''));
                    setShowError(false);
                  }}
                  placeholder="가격을 입력해 주세요"
                  autoFocus
                />
                <span className="mr-[24px] text-[18px]">원</span>
              </div>
              <div className="text-[14px] text-text-on-background ml-[30px]">100원부터 100,000원까지 가능해요.</div>
              {showError && (
                <div className="text-alert text-[10px] ml-[30px]">금액을 다시 확인해 주세요 (100~100,000)</div>
              )}
            </div>
            <button
              className="w-full max-w-[60px] h-[32px] py-[1px] 
              border border-primary rounded-[10px] text-blue-700 text-[16px] font-normal text-center 
              active:bg-secondary items-center"
              onClick={() => {
                if (priceType === '유료') {
                  if (!isValidPrice(input)) {
                    setShowError(true);
                    return;
                  }
                  setCost(Number(input)); // 저장: number
                  setShowPriceInput(false);
                  setIsOpen(false);
                } else {
                  setCost(null);
                  setIsOpen(false);
                }
                onComplete();
              }}
              type="button">
              완료
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceDropdown;
