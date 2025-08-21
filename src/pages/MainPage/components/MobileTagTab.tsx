import React from 'react';
import { useTagInput } from '@hooks/queries/MainPage/useTagInput';
import deleteButton from '@/assets/icon-delete-Xbutton.svg';
import TagButton from '@/components/Button/TagButton';

type Props = {
  tags: string[];
  setTags: (tags: string[]) => void;
};

const MobileTagTab = ({ tags, setTags }: Props) => {
  const {
    input,
    setInput,
    inputRef,
    handleComplete: handleAddTags,
    handleDeleteTag,
    sortedTags,
  } = useTagInput(tags, setTags);

  return (
    <div className="w-full flex flex-col gap-6 p-4">
      {/* --- 태그 입력 섹션 --- */}
      <div className="flex flex-col gap-2">
        <span className="text-primary text-[10px]">태그 입력하기</span>
        <div className="relative w-full h-11">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddTags();
              }
            }}
            placeholder="태그를 입력해 주세요 (최대 10개)"
            className="w-full h-full rounded-lg border border-gray-300 pl-4 pr-20 text-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddTags}
            className="absolute top-1/2 -translate-y-1/2 right-2 w-[39px] h-[23px] bg-blue-500 text-white text-xs uppercase
tracking-wide font-medium rounded-md hover:bg-blue-600 transition">
            완료
          </button>
        </div>
      </div>

      {/* --- 입력한 태그 섹션 --- */}
      <div className="flex flex-col gap-3">
        <span className="text-gray-800 text-[10px]">입력한 태그</span>
        <div className="w-full flex flex-wrap items-center gap-2 min-h-[30px]">
          {tags.map((tag) => {
            const sortedIdx = sortedTags.indexOf(tag);
            return (
              <TagButton
                key={tag}
                hasDelete={true}
                text={`#${tag}`}
                onClick={() => {
                  if (sortedIdx > -1) {
                    handleDeleteTag(sortedIdx);
                  }
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MobileTagTab;
