import React from 'react';

type FilterDropdownProps = {
  label: string;
  items: string[];
  selected: boolean;
  selectedModel?: string;
  onToggle: () => void;
  onSelect: (item: string) => void;
};

function FilterDropdown({ label, items, selected, onToggle, onSelect, selectedModel }: FilterDropdownProps) {
  return (
    <div className="relative inline-block">
      {/* Dropdown List */}
      {selected && (
        <div
          className="absolute top-[17px] left-1/2 -translate-x-1/2 z-10
          w-36 p-2.5 bg-white rounded-lg shadow-[0px_4px_8px_0px_rgba(0,0,0,0.12)]
          inline-flex flex-col justify-center items-center">
          {items.map((item, index) => (
            <div
              key={item}
              className={`w-28 h-10 p-2.5 bg-white 
                ${index === 0 ? 'rounded-tl rounded-tr' : ''}
                ${index === items.length - 1 ? 'rounded-bl rounded-br' : 'border-b border-white-stroke'}
                inline-flex justify-center items-center gap-2.5
                ${selectedModel === item ? 'bg-[#f5f5f5]' : 'hover:bg-[#f5f5f5]'}
                cursor-pointer`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onSelect(item);
                onToggle();
              }}>
              <div className="justify-start text-text-on-background text-lg font-normal font-['Spoqa_Han_Sans_Neo']">
                {item}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FilterDropdown;
