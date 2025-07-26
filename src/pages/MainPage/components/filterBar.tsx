import { useState, useRef, useEffect } from 'react';
import FilterDropdown from './FilterDropdown';
import TagFilter from './TagFilter';
import arrowDown from '@/assets/icon-arrow-down.svg';

type FilterBarProps = {
  onModelChange : (model: string|null) => void;
  onSortChange : (sort: string|null) => void;
  onlyFree?: boolean;
  setOnlyFree: (free: boolean) => void;
};

const FilterBar = ({ onModelChange, onSortChange, onlyFree, setOnlyFree }: FilterBarProps) => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [selectedSort, setSelectedSort] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if(
        dropdownRef.current&&
        !dropdownRef.current.contains(event.target as Node)
      ){
        setSelectedFilter(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = (label: string) => {
    setSelectedFilter((prev) => (prev === label ? null : label));
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleModelSelect = (model : string) => {
    const isModel = selectedModel === model ? null : model;
    setSelectedModel(isModel);
    onModelChange(isModel);
    setSelectedFilter(null); // 드롭다운 닫기
  }

  const handleSortSelect = (sort: string) => {
    const isSort = selectedSort === sort ? null : sort;
    setSelectedSort(isSort);
    onSortChange(isSort);
  };

  const dropdownItems = {
    모델: ['ChatGPT', 'Perplexity', 'Claude', 'Gemini', 'Midjourney', '기타'],
    필터: ['조회순', '별점순', '다운로드순', '가격 낮은 순', '가격 높은 순'],
  };

  type filterLabel = keyof typeof dropdownItems;

  return (
    <section className="h-11 px-5 inline-flex justify-center items-center gap-3.5 font-['Spoqa_Han_Sans_Neo'] text-text-on-background text-xl font-medium"
      ref={dropdownRef}
    >
      {(['모델', '필터', '태그'] as filterLabel[]).map((label) => (
        <div
          key={label}
          className="relative p-2.5 flex justify-start items-center gap-2.5 cursor-pointer"
          onClick={() => toggleDropdown(label)}
        >
          <span>{label}</span>

          {/* 화살표 버튼 */}
          <div
            className={`w-6 h-6 p-1.5 rounded-full flex justify-center items-center
              ${selectedFilter === label
                ? 'bg-primary-pressed shadow-[2px_2px_30px_rgba(0,0,0,0.25)]'
                : ''
              }`}
          >
            <img src={arrowDown} alt="arrow" className="w-3 h-3" />
          </div>

          {/* 일반 드롭다운 */}
          {selectedFilter === label && label === '모델' && (
            <FilterDropdown
              label={label}
              items={dropdownItems[label]}
              selected={selectedFilter === label}
              onToggle={() => toggleDropdown(label)}
              onSelect={label === '모델' ? handleModelSelect : () => {}}
            />
          )}

          {selectedFilter === label && label === '필터' && (
            <FilterDropdown
              label={label}
              items={dropdownItems[label]}
              selected={selectedFilter === label}
              onToggle={() => toggleDropdown(label)}
              onSelect={label === '필터' ? handleSortSelect : () => {}}
            />
          )}

          {/* 태그 드롭다운 */}
          {selectedFilter === label && label !== '필터' && label !== '모델' && (
            <div
              className="absolute top-full left-0 w-[400px] rounded-lg p-4 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <TagFilter
                tags={tags}
                setTags={setTags}
                placeholder="태그를 입력해주세요."
              />
            </div>
          )}
        </div>
      ))}

      {/* 무료만 보기 */}
      <label className="ml-2 flex items-center gap-1 px-2 py-1 text-lg cursor-pointer">
        <span>무료만 보기</span>
        <input
          type="checkbox"
          checked={onlyFree}
          onChange={() => setOnlyFree(!onlyFree)}
          className="accent-primary-pressed w-4 h-4"
        />
      </label>
    </section>
  );
};

export default FilterBar;
