import type { Prompt } from '@/types/MainPage/prompt';
import { useState } from 'react';

export function useCategoryFilter(initialCategoryName?: string, initialSubcategory?: string) {
  const [selectedCategoryName, setSelectedCategoryName] = useState<string | null>(
    initialCategoryName || '글쓰기 / 문서 작성',
  );
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(initialSubcategory || '전체');

  const handleCategorySelect = (categoryId: number | null, categoryName: string | null) => {
    setSelectedCategoryName(categoryName);
    setSelectedSubcategory('전체');
  };

  const handleSubcategorySelect = (subcategory: string | null) => {
    setSelectedSubcategory(subcategory);
  };

  const filterByCategory = (prompts: Prompt[]) => {
    if (!selectedCategoryName || selectedSubcategory === null) return prompts;

    // const selectedCategoryData = categoryData.find((cat) => cat.name === selectedCategoryName);
    // const allowedSubcategories = selectedCategoryData?.subcategories || [];

    if (selectedSubcategory === '전체') {
      return prompts.filter((prompt) =>
        prompt.categories.some((cat: { category: { name: string } }) =>
          selectedSubcategory === '전체'
            ? cat.category.name === selectedCategoryName
            : cat.category.name === selectedSubcategory,
        ),
      );
    } else {
      return prompts.filter((prompt) =>
        prompt.categories.some((cat: { category: { name: string } }) => cat.category.name === selectedSubcategory),
      );
    }
  };

  return {
    selectedCategoryName,
    selectedSubcategory,
    handleCategorySelect,
    handleSubcategorySelect,
    filterByCategory,
  };
}
