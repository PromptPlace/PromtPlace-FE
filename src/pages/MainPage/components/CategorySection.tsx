import React, { useState, useEffect } from 'react';
import { categoryData } from './categoryData';

interface CategorySectionProps {
  onCategorySelect?: (categoryId: number | null, categoryName: string | null) => void;
  onSubcategorySelect?: (subcategory: string | null) => void;
  initialCategoryId?: number | null;
  initialSubcategory?: string | null;
  isSearchMode?: boolean; // 검색 모드 여부
}

const CategorySection = ({
  onCategorySelect,
  onSubcategorySelect,
  initialCategoryId = 1,
  initialSubcategory = '전체',
  isSearchMode = false,
}: CategorySectionProps) => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(initialCategoryId);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
    initialCategoryId ? initialSubcategory : null,
  );

  // URL 파라미터가 변경될 때마다 카테고리와 서브카테고리 업데이트
  useEffect(() => {
    if (initialCategoryId !== null && initialCategoryId !== undefined) {
      setSelectedCategory(initialCategoryId);
      setSelectedSubcategory(initialSubcategory);
      
      const categoryName = categoryData.find((cat) => cat.id === initialCategoryId)?.name || null;
      onCategorySelect?.(initialCategoryId, categoryName);
      onSubcategorySelect?.(initialSubcategory); // URL에서 받은 서브카테고리 사용
    } else {
      // 초기값이 null이면 선택 없음
      setSelectedCategory(null);
      setSelectedSubcategory(null);
      onCategorySelect?.(null, null);
      onSubcategorySelect?.(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCategoryId, initialSubcategory]); // URL 파라미터 변경 시 실행

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
    // 검색 모드일 때는 서브카테고리 선택 비활성화
    if (isSearchMode) return;

    const newSubcategory = selectedSubcategory === subcategory ? '전체' : subcategory;
    setSelectedSubcategory(newSubcategory);
    onSubcategorySelect?.(newSubcategory);
  };

  return (
    <div className="overflow-hidden scroll-m-0">
      {/* 데스크톱/태블릿: 아이콘 카드 형태 */}
      <div
        className="w-full max-w-[1185px] flex overflow-x-scroll gap-[20px] justify-start items-start snap-x snap-mandatory px-0 hide-scrollbar max-phone:hidden"
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
                className={`text-center text-xs leading-4 w-50 ${
                  selectedCategory === category.id ? 'font-medium' : 'font-light'
                }`}>
                {category.displayName}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 모바일: 탭 형태 */}
      <div
        className="hidden max-phone:flex overflow-x-scroll hide-scrollbar w-full"
        style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
        <div className="inline-flex gap-2">
          {categoryData.map((category) => (
            <div
              key={category.id}
              onClick={() => handleSelectCategory(category.id)}
              className={`px-1.5 py-3 h-[39px] rounded-xl flex justify-center items-center gap-2 cursor-pointer whitespace-nowrap transition-all ${
                selectedCategory === category.id ? 'bg-gray-300' : ''
              }`}>
              <div className="text-xs font-medium font-['S-Core_Dream'] leading-4">{category.displayName}</div>
            </div>
          ))}
        </div>
      </div>

      {selectedCategory !== null && !isSearchMode && (
        <>
          {/* 데스크톱/태블릿: 대분류 제목 + 밑줄 스타일 */}
          <div
            className="w-full overflow-x-scroll hide-scrollbar mt-[56px] max-phone:hidden"
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
            <div className="inline-flex justify-start items-start gap-[20px] min-w-min">
              <div className="text-center justify-center text-text-on-white text-2xl pr-[20px] whitespace-nowrap">
                {categoryData.find((cat) => cat.id === selectedCategory)?.name}
              </div>
              <div
                onClick={() => handleSelectSubcategory('전체')}
                className={`px-2.5 py-5 inline-flex justify-center items-center gap-2.5 cursor-pointer ${
                  selectedSubcategory === '전체' ? 'border-b-[3px] border-primary' : 'border-b-[3px] border-transparent'
                }`}>
                <div
                  className={`text-center justify-center text-base font-medium font-['S-Core_Dream'] leading-6 whitespace-nowrap ${
                    selectedSubcategory === '전체' ? 'text-primary' : 'text-gray-500'
                  }`}>
                  전체
                </div>
              </div>
              {categoryData
                .find((cat) => cat.id === selectedCategory)
                ?.subcategories.map((subcategory, index) => {
                  const displayText = categoryData.find((cat) => cat.id === selectedCategory)?.displaySubcategories[
                    index
                  ];
                  return (
                    <div
                      key={subcategory}
                      onClick={() => handleSelectSubcategory(subcategory)}
                      className={`px-2.5 py-5 inline-flex justify-center items-center gap-2.5 cursor-pointer ${
                        selectedSubcategory === subcategory
                          ? 'border-b-[3px] border-primary'
                          : 'border-b-[3px] border-transparent'
                      }`}>
                      <div
                        className={`text-center justify-center text-base font-medium font-['S-Core_Dream'] leading-6 whitespace-nowrap ${
                          selectedSubcategory === subcategory ? 'text-primary' : 'text-gray-500'
                        }`}>
                        {displayText}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* 모바일: 탭 형태 서브카테고리 */}
          <div
            className="hidden max-phone:flex overflow-x-scroll hide-scrollbar w-full mt-[20px]"
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
            <div className="inline-flex gap-2">
              <div
                onClick={() => handleSelectSubcategory('전체')}
                className={`px-3 py-1.5 rounded-xl flex justify-center items-center gap-2 cursor-pointer whitespace-nowrap transition-all ${
                  selectedSubcategory === '전체' ? 'bg-gray-300' : ''
                }`}>
                <div className="text-xs font-medium font-['S-Core_Dream'] leading-4">전체</div>
              </div>
              {categoryData
                .find((cat) => cat.id === selectedCategory)
                ?.subcategories.map((subcategory, index) => {
                  const displayText = categoryData.find((cat) => cat.id === selectedCategory)?.displaySubcategories[
                    index
                  ];
                  return (
                    <div
                      key={subcategory}
                      onClick={() => handleSelectSubcategory(subcategory)}
                      className={`px-1.5 py-3 rounded-xl flex justify-center items-center gap-2 cursor-pointer whitespace-nowrap transition-all ${
                        selectedSubcategory === subcategory ? 'bg-gray-300' : ''
                      }`}>
                      <div className="text-xs font-medium font-['S-Core_Dream'] leading-4">{displayText}</div>
                    </div>
                  );
                })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CategorySection;
