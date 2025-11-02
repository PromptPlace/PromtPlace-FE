import { useAuth } from '@/context/AuthContext';
import React, { useState } from 'react';
import CategorySection from './components/CategorySection';
import PromptCard from '../../components/PromptCard';
import Filter from './components/Filter';
import useGetPromptList from '@/hooks/queries/MainPage/useGetPromptList';
import PromptGrid from '@/components/PromptGrid';

const NewMainPage = () => {
  const { user } = useAuth();
  const { data, isLoading, isError } = useGetPromptList();
  const [selectedCategoryName, setSelectedCategoryName] = useState<string | null>(null);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState<string>('조회순');
  const [displayCount, setDisplayCount] = useState(20); // 표시할 프롬프트 개수

  const prompts = data?.data || [];
  
  // 선택된 카테고리와 모델에 따라 프롬프트 필터링
  let filteredPrompts = prompts;
  
  // 카테고리 필터링
  if (selectedCategoryName) {
    filteredPrompts = filteredPrompts.filter((prompt) => prompt.categories.includes(selectedCategoryName));
  }
  
  // 모델 필터링
  if (selectedModels.length > 0) {
    filteredPrompts = filteredPrompts.filter((prompt) =>
      prompt.models.some((modelObj) => selectedModels.includes(modelObj.model.name))
    );
  }
  
  // 정렬
  const sortedPrompts = [...filteredPrompts].sort((a, b) => {
    switch (selectedSort) {
      case '조회순':
        return b.views - a.views;
      case '별점순':
        return (b.review_rating_avg || 0) - (a.review_rating_avg || 0);
      case '다운로드순':
        return b.downloads - a.downloads;
      default:
        return 0;
    }
  });
  
  // 표시할 프롬프트 (페이지네이션)
  const displayedPrompts = sortedPrompts.slice(0, displayCount);
  const hasNext = sortedPrompts.length > displayCount;
  
  const totalCount = sortedPrompts.length;

  const handleCategorySelect = (categoryId: number | null, categoryName: string | null) => {
    setSelectedCategoryName(categoryName);
    setDisplayCount(20); // 카테고리 변경 시 페이지 리셋
  };

  const handleModelChange = (models: string[]) => {
    setSelectedModels(models);
    setDisplayCount(20); // 모델 변경 시 페이지 리셋
  };

  const handleSortChange = (sort: string) => {
    setSelectedSort(sort);
    setDisplayCount(20); // 정렬 변경 시 페이지 리셋
  };

  const handleReset = () => {
    setSelectedCategoryName(null);
    setSelectedModels([]);
    setSelectedSort('조회순');
    setDisplayCount(20); // 리셋 시 페이지도 리셋
  };

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + 20);
  };

  console.log(prompts.map((p) => p.models));

  return (
    <div className="px-[102px]">
      <div className="py-[40px]">
        <p className="text-3xl text-gray-950 leading-10">프롬프트 보기</p>
        <p className="mt-[12px] text-gray-950 text-base font-light ">
          다양한 '프롬프트'가 있는 '플레이스'에서 나를 위한 프롬프트를 찾아보세요!
        </p>
      </div>

      <div>
        <CategorySection onCategorySelect={handleCategorySelect} />
      </div>

      <div className="mt-[40px]">
        <Filter
          onModelChange={handleModelChange}
          onSortChange={handleSortChange}
          onReset={handleReset}
        />
      </div>

      <div className="mt-[56px]">
        <div className="self-stretch justify-center mb-[32px]">
          {selectedCategoryName && (
            <span className="text-gray-950 text-base font-medium mr-2">
              '{selectedCategoryName}' 카테고리 ·{' '}
            </span>
          )}
          {selectedModels.length > 0 && (
            <span className="text-gray-950 text-base font-medium mr-2">
              {selectedModels.join(', ')} ·{' '}
            </span>
          )}
          <span className="text-primary text-base font-medium font-['S-Core_Dream'] leading-6">{totalCount}</span>
          <span className="text-gray-950 text-base font-light font-['S-Core_Dream'] leading-6 tracking-tight">
            개의 프롬프트가 있습니다.
          </span>
        </div>

        <PromptGrid prompts={displayedPrompts} />

        {hasNext && (
          <div className="flex justify-center mt-[134px]">
            <button
              onClick={handleLoadMore}
              className="px-10 py-3 bg-background rounded-xl outline outline-[0.80px] outline-gray-400 inline-flex justify-center items-center gap-2 hover:bg-gray-50 transition">
              <div className="text-center justify-center text-gray-500 text-xs font-medium font-['S-Core_Dream'] leading-4">
                프롬프트 더 보기
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewMainPage;
