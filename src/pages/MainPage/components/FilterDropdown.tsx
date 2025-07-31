import React from 'react';

type FilterDropdownProps = {
  label: string;
  items: string[];
  selected: boolean;
  selectedItems?: string[];
  onToggle: () => void;
  onSelect: (item: string) => void;
};

function FilterDropdown({ label, items, selected, onSelect, selectedItems }: FilterDropdownProps) {
  return (
    <div className="relative inline-block">
      {selected && (
        <div
          className="absolute top-[17px] left-1/2 -translate-x-1/2 z-10
            w-36 p-2.5 bg-white rounded-lg shadow-[0px_4px_8px_rgba(0,0,0,0.12)]
            inline-flex flex-col justify-center items-center">
          {items.map((item, index) => {
            const isSelected = selectedItems?.includes(item);

            return (
              <div
                key={item}
                className={`w-28 h-10 p-2.5 
                ${isSelected ? 'bg-secondary-pressed' : 'bg-white hover:bg-[#f5f5f5]'}
                ${index === 0 ? 'rounded-tl rounded-tr' : ''}
                ${index === items.length - 1 ? 'rounded-bl rounded-br' : 'border-b border-white-stroke'}
                inline-flex justify-center items-center gap-2.5 cursor-pointer`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onSelect(item);
                }}>
                <div className={`text-lg font-normal ${isSelected ? 'text-text-on-white' : 'text-text-on-background'}`}>
                  {item}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default FilterDropdown;
