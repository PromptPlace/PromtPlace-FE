import React, { useState } from 'react';

interface CategorySectionProps {
  onSelect?: (category: number) => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({ onSelect }) => {
  const categories = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const handleSelectCategory = (category: number) => {
    setSelectedCategory(category);
    onSelect?.(category);
  };

  return (
    <div className="w-[1185px] h-[138px] flex gap-[20px]">
      {categories.map((category) => (
        <div
          key={category}
          role="button"
          tabIndex={0}
          onClick={() => handleSelectCategory(category)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleSelectCategory(category);
            }
          }}
          className={`category-item w-[111px] h-[138px] flex flex-col items-center justify-center text-center cursor-pointer ${selectedCategory === category ? 'ring-2 ring-primary' : ''}`}
        >
          <div className="w-[80px] h-[80px] bg-white rounded-3xl flex items-center justify-center overflow-hidden">
            <img src="" alt={`카테고리 ${category}`} className="object-cover w-full h-full" />
          </div>
          <div className="pt-[12px]">카테고리 {category}</div>
        </div>
      ))}
    </div>
  );
};

export default CategorySection;
