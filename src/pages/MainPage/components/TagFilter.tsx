import React from 'react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { useTagInput, getTruncatedTag } from '@hooks/queries/MainPage/useTagInput';
import deleteButton from '@assets/icon-delete-Xbutton.svg';
import TagButton from '@/components/Button/TagButton';

type TagFilterProps = {
  tags: string[];
  setTags: (newTags: string[]) => void;
  placeholder?: string;
  onComplete?: () => void;
};

export default function TagFilter({ placeholder = '태그를 입력해주세요.', tags, setTags }: TagFilterProps) {
  const {
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
  } = useTagInput(tags, setTags);

  // 편집 모드 UI
  if (isEdit) {
    return (
      <div className="w-[490px] min-h-[58px] flex flex-wrap items-center gap-2 rounded-lg border border-blue-500 bg-white px-4 py-3 shadow-md">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleComplete();
            }
          }}
          placeholder={placeholder}
          className="flex-grow min-w-[100px] border-none text-sm text-gray-800 focus:outline-none"
        />
        <button
          onClick={handleComplete}
          className="h-8 rounded-lg border border-blue-500 bg-white px-4 text-sm font-medium text-blue-600 shadow-sm hover:bg-blue-50 transition">
          완료
        </button>
      </div>
    );
  }

  // 읽기 모드 UI
  return (
    <div
      className="w-[490px] min-h-[58px] flex items-center gap-2 rounded-lg border border-blue-500 bg-white px-4 py-3 shadow-md cursor-text"
      onClick={handleAreaClick}
      tabIndex={0}>
      {totalPages > 1 && page > 0 ? (
        <button
          type="button"
          className="text-gray-500 hover:text-gray-700"
          onClick={(e) => {
            e.stopPropagation();
            setPage(page - 1);
          }}
          aria-label="이전 태그">
          <LuChevronLeft size={20} />
        </button>
      ) : (
        totalPages > 1 && <div className="w-[20px]" />
      )}

      <div className="flex-1 flex items-center gap-2 overflow-hidden">
        {pageTags.map((tag, i) => (
          <div key={i} onClick={(e) => e.stopPropagation()}>
            <TagButton
              hasDelete={true}
              text={`#${getTruncatedTag(tag)}`}
              onClick={() => handleDeleteTag(pageTagGlobalIdxs[i])}
            />
          </div>
        ))}
      </div>

      {totalPages > 1 && page < totalPages - 1 ? (
        <button
          type="button"
          className="text-gray-500 hover:text-gray-700"
          onClick={(e) => {
            e.stopPropagation();
            setPage(page + 1);
          }}
          aria-label="다음 태그">
          <LuChevronRight size={20} />
        </button>
      ) : (
        totalPages > 1 && <div className="w-[20px]" />
      )}
    </div>
  );
}
