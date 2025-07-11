import React, { useState } from 'react';

const FilterBar = () => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const toggleDropdown = (label: string) => {
    setSelectedFilter((prev) => (prev === label ? null : label));
  };

  const dropdownItems = {
    모델: ['ChatGPT', 'Perplexity', 'Claude', 'Gemini', 'Midjourney', '기타'],
    필터: ['인기순', '최신순', '저장순'],
    태그: ['#글쓰기', '#디자인', '#스타트업', '#IT'],
  };

  return (
    <section className="relative flex w-full items-center gap-4">
      {['모델', '필터', '태그'].map((label) => (
        <div key={label} className="relative">
          <button
            onClick={() => toggleDropdown(label)}
            className="flex items-center gap-1 px-2 py-1 border rounded hover:bg-gray-100"
          >
            {label}
          </button>

          {selectedFilter === label && (
            <div className="absolute z-10 mt-1 bg-white border rounded shadow w-32">
              {dropdownItems[label].map((item) => (
                <div
                  key={item}
                  className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      <button className="flex items-center gap-1 px-2 py-1 border rounded hover:bg-gray-100">
        무료만 보기
      </button>
    </section>
  );
};

export default FilterBar;