import { useState, useRef, useEffect } from 'react';

const PAGE_MAX_LEN = 15;
const PAGE_MAX_TAGS = 10;

function splitTags(input: string) {
  return input
    .split('#')
    .map((tag) => tag.trim().replace(/\s+/g, '')) // 공백 제거
    .map((tag) => tag.slice(0, 5)) // 각 태그를 최대 5글자로 제한
    .filter((tag) => tag.length > 0); // 빈 태그 제거
}

function getPageTags(tags: string[], page: number) {
  const sortedTags = [...tags].sort((a, b) => {
    if (a.length !== b.length) return a.length - b.length;
    return a.localeCompare(b);
  });

  const pages: string[][] = [];
  let currentPage: string[] = [];
  let currentLengthSum = 0;

  sortedTags.forEach((tag) => {
    if (currentLengthSum + tag.length > PAGE_MAX_LEN || currentPage.length >= PAGE_MAX_TAGS) {
      pages.push(currentPage);
      currentPage = [];
      currentLengthSum = 0;
    }
    currentPage.push(tag);
    currentLengthSum += tag.length;
  });

  if (currentPage.length > 0) pages.push(currentPage);

  const pageStartIdxs = pages.reduce<number[]>((acc, currPage, i) => {
    const prevPagesLength = i > 0 ? acc[i - 1] + pages[i - 1].length : 0;
    acc.push(prevPagesLength);
    return acc;
  }, []);

  return {
    pageTags: pages[page] ?? [],
    totalPages: pages.length,
    pageStartIdxs,
    sortedTags,
  };
}
export function getTruncatedTag(tag: string) {
  return tag.length > 10 ? tag.slice(0, 10) + '...' : tag;
}

export const useTagInput = (tags: string[], setTags: (tags: string[]) => void) => {
  const [input, setInput] = useState('');
  const [isEdit, setIsEdit] = useState(tags.length === 0);
  const [page, setPage] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsEdit(tags.length === 0);
  }, [tags.length]);

  useEffect(() => {
    if (isEdit) inputRef.current?.focus();
  }, [isEdit]);

  // 완료 버튼 핸들러
  const handleComplete = () => {
    const value = input.trim();
    if (value) {
      const newTags = splitTags(value);
      // 기존태그, 새로운 태그 중복 제거
      const updatedTags = Array.from(new Set([...tags, ...newTags])).slice(0, 10);
      setTags(updatedTags);
    }
    setInput('');
    setPage(0);
    setIsEdit(false);
  };

  const handleAreaClick = () => {
    setInput(tags.map((tag) => `#${tag}`).join(' '));
    setIsEdit(true);
  };

  // 태그 삭제 핸들러
  const handleDeleteTag = (sortedIdx: number) => {
    const { sortedTags } = getPageTags(tags, 0);
    const tagToDelete = sortedTags[sortedIdx];
    if (!tagToDelete) return;

    const newTags = tags.filter((tag) => tag !== tagToDelete);
    setTags(newTags);

    const { totalPages } = getPageTags(newTags, page);
    if (page >= totalPages) {
      setPage(Math.max(totalPages - 1, 0));
    }
  };

  const { pageTags, totalPages, pageStartIdxs, sortedTags } = getPageTags(tags, page);
  const pageTagGlobalIdxs = pageTags.map((_, i) => (pageStartIdxs[page] ?? 0) + i);

  return {
    input,
    setInput,
    isEdit,
    page,
    setPage,
    inputRef,
    handleComplete,
    handleAreaClick,
    handleDeleteTag,
    pageTags,
    totalPages,
    pageTagGlobalIdxs,
    sortedTags,
  };
};
