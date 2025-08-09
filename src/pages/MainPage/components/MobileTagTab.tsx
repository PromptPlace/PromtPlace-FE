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
      <div className="relative w-full h-9 rounded border border-primary shadow-[0_4px_8px_0_rgba(0,0,0,0.12)]">
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
          className="absolute top-[3px] right-[3px] w-[44px] h-[26px] bg-primary text-white text-[10px] font-medium rounded">
          완료
        </button>
      </div>

      {/* 입력한 태그들 */}
      <div className="flex flex-col gap-1">
        <span className="text-primary text-[10px] font-medium">입력한 태그</span>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <div
              key={tag}
              className="h-5 px-2.5 py-0.5 bg-white text-text-on-background rounded-full shadow-md border border-gray-300 flex items-center gap-1">
              <span className="text-[10px] font-medium">#{tag}</span>
              <button
                onClick={() => handleRemoveTag(tag)}
                className="text-[10px] text-gray-800 w-3 h-3 flex items-center justify-center">
                {<img src={cancel} alt="cancel" className="w-3 h-3" />}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileTagTab;
