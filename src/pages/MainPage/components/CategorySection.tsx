import React, { useState, useEffect } from 'react';
import { categoryData } from './categoryData';

interface CategorySectionProps {
  onCategorySelect?: (categoryId: number | null, categoryName: string | null) => void;
  onSubcategorySelect?: (subcategory: string | null) => void;
  initialCategoryId?: number | null;
}

const CategorySection = ({
  onCategorySelect,
  onSubcategorySelect,
  initialCategoryId = 1,
}: CategorySectionProps) => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(initialCategoryId);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
    initialCategoryId ? '전체' : null,
  );

  // 초기 카테고리 및 서브카테고리
  useEffect(() => {
    if (initialCategoryId !== null && initialCategoryId !== undefined) {
      const categoryName = categoryData.find((cat) => cat.id === initialCategoryId)?.name || null;
      onCategorySelect?.(initialCategoryId, categoryName);
      onSubcategorySelect?.('전체'); // 초기 서브카테고리는 "전체"
    } else {
      // 초기값이 null이면 선택 없음
      onCategorySelect?.(null, null);
      onSubcategorySelect?.(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 마운트 시 한 번만 실행

  const handleSelectCategory = (categoryId: number) => {
    const newCategoryId = selectedCategory === categoryId ? null : categoryId;
    const categoryName =
      newCategoryId !== null ? categoryData.find((cat) => cat.id === newCategoryId)?.name || null : null;

    setSelectedCategory(newCategoryId);
    setSelectedSubcategory(newCategoryId !== null ? '전체' : null); // 카테고리 선택 시 서브카테고리를 "전체"로
    onCategorySelect?.(newCategoryId, categoryName);
    onSubcategorySelect?.(newCategoryId !== null ? '전체' : null);
  };

  const handleSelectSubcategory = (subcategory: string) => {
    const newSubcategory = selectedSubcategory === subcategory ? '전체' : subcategory;
    setSelectedSubcategory(newSubcategory);
    onSubcategorySelect?.(newSubcategory);
  };

  return (
    <div className="overflow-hidden scroll-m-0">
      <div
        className="w-full max-w-[1185px] mx-auto flex overflow-x-scroll gap-[20px] justify-start snap-x snap-mandatory px-0 hide-scrollbar"
        style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
        {categoryData.map((category) => (
          <div className="flex flex-col flex-shrink-0 snap-start" key={category.id}>
            <div
              onClick={() => handleSelectCategory(category.id)}
              className={`w-28 px-2 py-3 rounded-xl inline-flex flex-col justify-center items-center gap-4 cursor-pointer transition-all ${
                selectedCategory === category.id ? 'bg-gray-200' : ''
              }`}>
              <div
                className={`w-[80px] h-[80px] bg-white rounded-3xl flex items-center justify-center overflow-hidden shadow-[0px_4px_8px_0px_rgba(0,0,0,0.12)]`}>
                <img src={category.image} alt={category.name} className="object-cover w-12 h-12" />
              </div>
              <div
                className={`text-center text-xs leading-4 ${
                  selectedCategory === category.id ? 'font-medium' : 'font-light'
                }`}>
                {category.name}
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedCategory !== null && (
        <div className="w-[1237px] h-[62px] inline-flex justify-start itmes-start gap-[20px] mt-[56px]">
          <div className="text-center justify-center text-text-on-white text-2xl pr-[20px]">
            {categoryData.find((cat) => cat.id === selectedCategory)?.name}
          </div>
          <div
            onClick={() => handleSelectSubcategory('전체')}
            className={`px-2.5 py-5 inline-flex justify-center items-center gap-2.5 cursor-pointer ${
              selectedSubcategory === '전체' ? 'border-b-[3px] border-primary' : 'border-b-[3px] border-transparent'
            }`}>
            <div
              className={`text-center justify-center text-base font-medium font-['S-Core_Dream'] leading-6 ${
                selectedSubcategory === '전체' ? 'text-primary' : 'text-gray-500'
              }`}>
              전체
            </div>
          </div>
          {categoryData
            .find((cat) => cat.id === selectedCategory)
            ?.subcategories.map((subcategory) => (
              <div
                key={subcategory}
                onClick={() => handleSelectSubcategory(subcategory)}
                className={`px-2.5 py-5 inline-flex justify-center items-center gap-2.5 cursor-pointer ${
                  selectedSubcategory === subcategory
                    ? 'border-b-[3px] border-primary'
                    : 'border-b-[3px] border-transparent'
                }`}>
                <div
                  className={`text-center justify-center text-base font-medium font-['S-Core_Dream'] leading-6 ${
                    selectedSubcategory === subcategory ? 'text-primary' : 'text-gray-500'
                  }`}>
                  {subcategory}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default CategorySection;
