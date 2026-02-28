import { categoryData } from '@/pages/MainPage/components/categoryData';
import type { Prompt } from '@/types/MainPage/prompt';
import { useState } from 'react';

export function useCategoryFilter(initialCategoryName?: string, initialSubcategory?: string) {
  const [selectedCategoryName, setSelectedCategoryName] = useState<string | null>(initialCategoryName ?? null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(initialSubcategory ?? null);

  const handleCategorySelect = (categoryId: number | null, categoryName: string | null) => {
    setSelectedCategoryName(categoryName);
    setSelectedSubcategory('전체');
  };

  const handleSubcategorySelect = (subcategory: string | null) => {
    setSelectedSubcategory(subcategory);
  };

  const filterByCategory = (prompts: Prompt[]) => {
    // 카테고리 선택 안 된 상태면 필터 적용 X
    if (!selectedCategoryName) return prompts;

    const selectedCategoryData = categoryData.find((cat) => cat.name === selectedCategoryName);

    const allowedSubcategories = selectedCategoryData?.subcategories || [];

    // 대분류 + 전체
    if (!selectedSubcategory || selectedSubcategory === '전체') {
      return prompts.filter((prompt) =>
        prompt.categories.some((cat) => allowedSubcategories.includes(cat.category.name)),
      );
    }

    // 특정 소분류
    return prompts.filter((prompt) => prompt.categories.some((cat) => cat.category.name === selectedSubcategory));
  };

  return {
    selectedCategoryName,
    selectedSubcategory,
    handleCategorySelect,
    handleSubcategorySelect,
    filterByCategory,
  };
}
