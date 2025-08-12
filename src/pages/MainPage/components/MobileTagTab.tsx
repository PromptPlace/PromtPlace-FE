import React, { useState } from 'react';
import cancel from '@/assets/icon-cancel-gray.svg';

type Props = {
  tags: string[];
  setTags: (tags: string[]) => void;
};

const MobileTagTab = ({ tags, setTags }: Props) => {
  const [inputTag, setInputTag] = useState('');

  const handleAddTag = () => {
    const trimmed = inputTag.trim();
    if (trimmed && !tags.includes(trimmed) && tags.length < 10) {
      setTags([...tags, trimmed]);
      setInputTag('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* 입력 라벨 */}
      <span className="text-primary text-[10px] font-medium">태그 입력하기</span>

      {/* 입력창 + 완료 버튼 포함 */}
      <div className="relative w-full h-[35px] rounded border-[0.5px] border-primary">
        <input
          type="text"
          value={inputTag}
          onChange={(e) => setInputTag(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
          placeholder="태그를 입력해 주세요(최대 10개)"
          className="w-full h-full rounded pl-3 pr-[52px] text-[10px] text-text-on-background placeholder:text-text-disable focus:outline-none"
        />
        <button
          onClick={handleAddTag}
          className="absolute top-[5px] right-[6px] w-[39px] h-[23px] bg-primary text-white text-[10px] font-medium text-xs rounded-md radius-6 tracking-wide">
          완료
        </button>
      </div>

      {/* 입력한 태그들 */}
      <div className="flex flex-col gap-1">
        <span className="text-primary text-[10px] font-medium">입력한 태그</span>
        <div className="w-full max-w-72 inline-flex flex-wrap justify-start items-center gap-2">
          {tags.map((tag) => (
            <div
              key={tag}
              className="h-5 px-2.5 py-0.5 bg-white rounded-[50px] shadow-[0px_4px_8px_0px_rgba(0,0,0,0.12)] outline-[0.50px] outline-offset-[-0.50px] outline-text-on-background flex justify-center items-center gap-[5px]">
              <div className="justify-start text-text-on-background text-[10px] font-medium font-['Spoqa_Han_Sans_Neo']">
                #{tag}
              </div>
              <button
                onClick={() => handleRemoveTag(tag)}
                className="w-3 h-3 relative overflow-hidden flex items-center justify-center"
                aria-label="태그 삭제"
                type="button">
                <div className="w-3 h-3 left-0 top-0 absolute opacity-90 border-text-on-background" />
                <div className="w-2.5 h-2.5 left-[1px] top-[1px] absolute bg-text-on-background border-text-on-background rounded-[2px]" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileTagTab;
