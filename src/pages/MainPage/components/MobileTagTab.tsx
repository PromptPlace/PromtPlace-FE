import React, { useState } from 'react';

type Props = {
  tags: string[];
  setTags: (tags: string[]) => void;
};

const MobileTagTab = ({ tags, setTags }: Props) => {
  const [inputTag, setInputTag] = useState('');

  const handleAddTag = () => {
    if (inputTag.trim() && !tags.includes(inputTag) && tags.length < 10) {
      setTags([...tags, inputTag.trim()]);
      setInputTag('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <span className="text-sm text-gray-600">태그 입력하기 (최대 10개)</span>
      <div className="flex gap-2">
        <input
          type="text"
          value={inputTag}
          onChange={(e) => setInputTag(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
          className="flex-1 border px-2 py-1 rounded text-sm"
          placeholder="태그를 입력하세요"
        />
        <button onClick={handleAddTag} className="px-3 py-1 bg-primary text-white rounded text-sm">
          추가
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {tags.map((tag) => (
          <div key={tag} className="px-2 py-1 rounded-full bg-gray-200 text-sm">
            {tag}
            <button onClick={() => handleRemoveTag(tag)} className="ml-1 text-red-500">
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileTagTab;
