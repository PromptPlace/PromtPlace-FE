// src/components/Dropdown.tsx

import { useState, useEffect, useRef } from 'react';
import { LuChevronDown } from 'react-icons/lu';

// Dropdown 컴포넌트가 받을 props 타입 정의
interface DropdownProps {
  options: { value: string; label: string }[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

const Dropdown = ({ options, selectedValue, onSelect }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 이벤트 핸들러 함수
    const handleClickOutside = (event: MouseEvent) => {
      // ref가 있고, 클릭된 곳이 ref가 감싼 영역의 바깥쪽일 때
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false); // 드롭다운 닫기
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // 현재 선택된 값의 label을 찾음
  const selectedLabel = options.find((option) => option.value === selectedValue)?.label;

  const handleOptionClick = (value: string) => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center rounded-[8px] px-[12px] py-[8px] gap-[8px] text-[12px] font-medium text-text-on-white bg-white shadow-[0_1px_3px_0_rgba(0,0,0,0.08)] ">
        <span>{selectedLabel}</span>
        <LuChevronDown size={10} />
      </button>

      {isOpen && (
        <div className="absolute z-10  mt-[6px] bg-white border-[0.5px] border-white-stroke rounded-[8px] px-[12px] py-[6px] shadow-[0_4px_8px_0_rgba(0,0,0,0.12)]">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              className={`flex justify-center px-[9px] py-[6px] border-b-[0.5px] last:border-b-[0px] border-white-stroke cursor-pointer text-[12px] font-normal ${option.value === selectedValue ? 'text-text-on-white' : 'text-text-on-background'}`}>
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
