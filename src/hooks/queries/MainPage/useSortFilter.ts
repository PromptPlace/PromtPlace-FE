import { useState } from 'react';

export function useSortFilter() {
  const [selectedSort, setSelectedSort] = useState<string>('');

  const handleSortChange = (sort: string) => {
    setSelectedSort(sort);
  };

  const sortPrompts = (prompts: any[]) => {
    const sorted = [...prompts];
    switch (selectedSort) {
      case '조회순':
        return sorted.sort((a, b) => b.views - a.views);
      case '별점순':
        return sorted.sort((a, b) => (b.review_rating_avg || 0) - (a.review_rating_avg || 0));
      case '다운로드순':
        return sorted.sort((a, b) => b.downloads - a.downloads);
      default:
        return sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }
  };

  const getSortValue = (): 'recent' | 'popular' | 'download' | 'views' | 'rating_avg' => {
    switch (selectedSort) {
      case '조회순':
        return 'views';
      case '별점순':
        return 'rating_avg';
      case '다운로드순':
        return 'download';
      default:
        return 'recent';
    }
  };

  return {
    selectedSort,
    handleSortChange,
    sortPrompts,
    getSortValue,
  };
}
