import { useState, useRef, useEffect } from 'react';
import FilterDropdown from './FilterDropdown';
import TagFilter from './TagFilter';
import arrowDown from '@/assets/icon-arrow-down.svg';
import arrowDownWhite from '@/assets/icon-arrow-down-white.svg';
import checkbox from '@/assets/icon-bi-check-square.svg';
import box from '@/assets/icon-bi-noncheck-square.svg';

type FilterBarProps = {
  onModelChange: (models: string[] | null) => void;
  onSortChange: (sort: string | null) => void;
  onTagChange: (tags: string[] | null) => void;
  onlyFree?: boolean;
  setOnlyFree: (free: boolean) => void;
};

const FilterBar = ({ onModelChange, onSortChange, onTagChange, onlyFree, setOnlyFree }: FilterBarProps) => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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

  const handleModelSelect = (model: string) => {
    setSelectedModels((prev) => {
      const isAlreadySelected = prev.includes(model);
      const updated = isAlreadySelected ? prev.filter((m) => m !== model) : [...prev, model];
      onModelChange(updated.length > 0 ? updated : null);
      return updated;
    });
  };

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
    <section
      className="h-11 px-5 inline-flex justify-start items-center gap-3.5 text-text-on-background text-xl font-medium"
      ref={dropdownRef}>
      {(['모델', '필터', '태그'] as filterLabel[]).map((label) => (
        <div
          key={label}
          className="relative p-2.5 flex justify-start items-center gap-2.5 cursor-pointer"
          onClick={() => toggleDropdown(label)}>
          <span className="truncate max-w-[150px] block text-xl font-medium">
            {label === '모델'
              ? selectedModels.length > 0
                ? selectedModels.join(', ')
                : '모델'
              : label === '필터'
                ? selectedSort || '필터'
                : label === '태그'
                  ? selectedTags.length > 0
                    ? `태그 (${selectedTags.length})`
                    : '태그'
                  : label}
          </span>

          <div
            className={`w-6 h-6 p-1.5 rounded-full flex justify-center items-center
              ${selectedFilter === label ? 'bg-primary-pressed shadow-[2px_2px_30px_rgba(0,0,0,0.25)]' : ''}`}>
            <img src={selectedFilter === label ? arrowDownWhite : arrowDown} alt="arrow" className="w-3 h-3" />
          </div>

          {/* 모델 드롭다운 여러개의 item 선택 가능*/}
          {selectedFilter === label && label === '모델' && (
            <FilterDropdown
              label={label}
              items={dropdownItems[label]}
              selected={selectedFilter === label}
              onToggle={() => toggleDropdown(label)}
              onSelect={label === '모델' ? handleModelSelect : () => {}}
              selectedItems={selectedModels}
            />
          )}

          {/* 필터 드롭다운 정렬 기능. 하나의 item만 선택 가능*/}
          {selectedFilter === label && label === '필터' && (
            <FilterDropdown
              label={label}
              items={dropdownItems[label]}
              selected={selectedFilter === label}
              onToggle={() => toggleDropdown(label)}
              onSelect={handleSortSelect}
              selectedItems={selectedSort ? [selectedSort] : []}
            />
          )}

          {/* 태그 드롭다운 */}
          {selectedFilter === label && label !== '필터' && label !== '모델' && (
            <div
              className="absolute top-full left-0 w-[400px] rounded-lg p-4 z-10"
              onClick={(e) => e.stopPropagation()}>
              <TagFilter
                tags={selectedTags}
                setTags={(newTags) => {
                  setSelectedTags(newTags);
                  onTagChange(newTags.length > 0 ? newTags : null);
                }}
                placeholder="태그를 입력해주세요."
                onComplete={() => setSelectedFilter(null)}
              />
            </div>
          )}
        </div>
      ))}

      {/* 무료만 보기 */}
      <label
        className="flex items-center gap-1 px-2 py-1 text-lg cursor-pointer"
        onClick={() => setOnlyFree(!onlyFree)}>
        <div className="justify-start text-text-on-background text-lg font-normal font-['Spoqa_Han_Sans_Neo']">
          무료만 보기
        </div>
        <div className="w-5 h-5 relative flex justify-center items-center">
          <img
            className={`w-[24px] h-[24px] rounded-sm absolute ml-[10px]`}
            src={onlyFree ? checkbox : box}
            alt="checkbox"
          />
        </div>
      </label>
    </section>
  );
};

export default FilterBar;
