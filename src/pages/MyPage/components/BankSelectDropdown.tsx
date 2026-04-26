import { useEffect, useRef, useState } from 'react';
import ArrowIcon from './ArrowIcon';
import { BANKS, getBankLogoUrl, type Bank } from '../utils/banks';

interface BankSelectDropdownProps {
  selectedBank: Bank | null;
  onSelectBank: (bank: Bank) => void;
  label: string;
  labelClassName: string;
  placeholder?: string;
}

const BankSelectDropdown = ({
  selectedBank,
  onSelectBank,
  label,
  labelClassName,
  placeholder = '은행을 선택해 주세요.',
}: BankSelectDropdownProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="relative flex flex-col gap-[12px]" ref={dropdownRef}>
      <label className={labelClassName}>{label}</label>

      <button
        type="button"
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        className="h-[56px] w-full rounded-lg border-[0.8px] border-gray-400 bg-white px-[16px] py-[12px] text-[14px] font-light leading-[1.6] tracking-[0.02em]">
        <div className="flex items-center justify-between">
          <div className="flex min-w-0 items-center gap-[12px]">
            {selectedBank && (
              <img
                src={getBankLogoUrl(selectedBank.fileName)}
                alt={selectedBank.name}
                className="h-[28px] w-[28px] md:h-[32px] md:w-[32px]"
              />
            )}
            <span className={`${selectedBank ? 'custom-h5 max-phone:!text-[14px] text-gray-700' : 'text-gray-400'} truncate`}>
              {selectedBank ? selectedBank.name : placeholder}
            </span>
          </div>
          <ArrowIcon fillColor="#999898" />
        </div>
      </button>

      {isDropdownOpen && (
        <div className="absolute left-0 top-[94px] z-20 h-[368px] w-full overflow-y-auto rounded-[8px] border-[0.8px] border-gray-400 bg-white">
          <div className="py-[8px]">
            {BANKS.map((bank) => (
              <button
                type="button"
                key={bank.name}
                onClick={() => {
                  onSelectBank(bank);
                  setIsDropdownOpen(false);
                }}
                className={`flex h-[48px] w-full items-center gap-[12px] px-[16px] text-left hover:bg-gray-50 ${
                  selectedBank?.code === bank.code ? 'bg-gray-50' : 'bg-white'
                }`}>
                <img
                  src={getBankLogoUrl(bank.fileName)}
                  alt={bank.name}
                  className="h-[28px] w-[28px] shrink-0 md:h-[32px] md:w-[32px]"
                />
                <span className="truncate text-[14px] font-light leading-[1.6] tracking-[0.02em] text-text-on-white">
                  {bank.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BankSelectDropdown;
