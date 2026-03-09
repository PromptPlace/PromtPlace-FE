import { useState } from 'react';

export function usePagination(initialCount = 20) {
  const [displayCount, setDisplayCount] = useState<number>(initialCount);

  const handleLoadMore = () => setDisplayCount((prev) => prev + initialCount);

  const paginate = (items: any[]) => items.slice(0, displayCount);

  const hasNext = (items: any[]) => items.length > displayCount;

  const resetPagination = () => setDisplayCount(initialCount);

  return { displayCount, handleLoadMore, paginate, hasNext, resetPagination };
}
