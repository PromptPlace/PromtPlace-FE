import React from 'react';

type FilterDropdownProps = {
  label: string;
  items: string[];
  selected: boolean;
  onToggle: () => void;
};

function FilterDropdown({ label, items, selected, onToggle }: FilterDropdownProps) {
  return (
    <div className="relative">
      {selected && (
        <div className="absolute left-0 mt-2 w-40 rounded-md border border-gray-300 bg-white shadow-md z-10">
          {items.map((item) => (
            <div
              key={item}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FilterDropdown;
