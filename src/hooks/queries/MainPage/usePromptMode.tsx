import React from 'react';
import { useSearchParams } from 'react-router-dom';

function usePromptMode() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');

  return {
    isSearchMode: !!searchQuery, // search 파라미터가 존재하면 검색 모드로 간주
    searchQuery,
  };
}

export default usePromptMode;
