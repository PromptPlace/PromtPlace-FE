import React from 'react';

interface SortModalProps {
  selectedSort: string;
  onSelect: (sort: string) => void;
}

const SortModal = ({ selectedSort, onSelect }: SortModalProps) => {
  const sortOptions = ['조회순', '별점순', '다운로드순'];

  return (
    <div className="w-36 p-2.5 bg-white rounded-lg shadow-[0px_4px_8px_0px_rgba(0,0,0,0.12)] outline-1 outline-offset-[-1px] outline-white-stroke inline-flex flex-col justify-center items-center">
      {sortOptions.map((option, index) => (
        <div
          key={option}
          onClick={() => onSelect(option)}
          className={`w-28 p-2.5 bg-white inline-flex justify-center items-center gap-2.5 cursor-pointer hover:bg-gray-50 transition ${
            index === 0 ? 'rounded-tl rounded-tr' : index === sortOptions.length - 1 ? 'rounded-bl rounded-br' : ''
          }`}>
          <div
            className={`justify-start text-xs leading-4 ${
              selectedSort === option ? 'text-primary font-medium' : 'text-text-on-background font-light'
            }`}>
            {option}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SortModal;
