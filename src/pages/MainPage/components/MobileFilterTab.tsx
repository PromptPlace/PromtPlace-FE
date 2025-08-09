import React from 'react';
import type MobileFilter from './MobileFilter';

type Props = {
  selectedSort: string | null;
  setSelectedSort: (sort: string) => void;
};

const sortOptions = ['조회수', '별점순', '다운로드순', '가격 높은 순', '가격 낮은 순'];

const MobileFilterTab = ({ selectedSort, setSelectedSort }: Props) => {
  return (
    <>
      {sortOptions
        .reduce((rows: string[][], label, i) => {
          const rowIndex = Math.floor(i / 2);
          if (!rows[rowIndex]) rows[rowIndex] = [];
          rows[rowIndex].push(label);
          return rows;
        }, [])
        .map((row, idx) => (
          <div key={idx} className="w-full flex gap-5">
            {row.map((label) => (
              <button
                key={label}
                onClick={() => setSelectedSort(label)}
                className={`flex flex-1 px-4 py-2 rounded justify-center ${
                  selectedSort === label ? 'bg-secondary text-primary' : 'bg-white border border-gray-300 text-gray-400'
                }`}>
                {label}
              </button>
            ))}
          </div>
        ))}
    </>
  );
};

export default MobileFilterTab;
