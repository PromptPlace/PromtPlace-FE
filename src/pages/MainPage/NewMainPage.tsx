import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CategorySection from './components/CategorySection';
import Filter from './components/Filter';
import useGetPromptList from '@/hooks/queries/MainPage/useGetPromptList';
import useGetSearchPromptList from '@/hooks/queries/MainPage/useGetSearchList';
import PromptGrid from '@/components/PromptGrid';
import PromptMobileCard from '@/pages/HomePage/components/PromptMobileCard';
import type { Prompt } from '@/types/MainPage/prompt';
import { categoryData } from './components/categoryData';

const NewMainPage = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const categoryIdFromUrl = searchParams.get('categoryId');
  const categoryNameFromUrl = searchParams.get('categoryName');

  // 초기값 결정: URL에서 카테고리 정보가 있으면 그것을 사용, 없으면 기본값
  const getInitialCategoryName = () => {
    if (categoryNameFromUrl) return categoryNameFromUrl;
    if (searchQuery) return null;
    return '글쓰기/문서 작성';
  };

  const getInitialSubcategory = () => {
    if (categoryNameFromUrl) return '전체';
    if (searchQuery) return null;
    return '전체';
  };

  const [selectedCategoryName, setSelectedCategoryName] = useState<string | null>(getInitialCategoryName());
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(getInitialSubcategory());
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState<string>('');
  const [displayCount, setDisplayCount] = useState(20); // 표시할 프롬프트 개수

  // 정렬 값 변환
  const getSortValue = (): 'recent' | 'popular' | 'download' | 'views' | 'rating_avg' => {
    switch (selectedSort) {
      case '조회순':
        return 'views';
      case '별점순':
        return 'rating_avg';
      case '다운로드순':
        return 'download';
      default:
        return 'recent'; // 기본값은 최신순
    }
  };

  // 검색이 있을 때와 없을 때 다른 쿼리 사용
  const { data: normalData } = useGetPromptList();
  const { data: searchData } = useGetSearchPromptList(
    {
      model: selectedModels.length > 0 ? selectedModels : null,
      tag: null,
      keyword: searchQuery || null,
      page: 1,
      size: 100,
      sort: getSortValue(),
      is_free: false,
    },
    !!searchQuery, // searchQuery가 있을 때만 enabled
  );

  // 검색어 또는 URL 카테고리 파라미터가 변경될 때 처리
  useEffect(() => {
    if (categoryNameFromUrl) {
      // URL에서 카테고리 정보가 있으면 설정
      setSelectedCategoryName(categoryNameFromUrl);
      setSelectedSubcategory('전체');
    } else if (searchQuery) {
      // 검색어가 있으면 카테고리 초기화
      setSelectedCategoryName(null);
      setSelectedSubcategory(null);
    } else {
      // 둘 다 없으면 기본 카테고리로 복귀
      setSelectedCategoryName('글쓰기/문서 작성');
      setSelectedSubcategory('전체');
    }
  }, [searchQuery, categoryNameFromUrl]);

  const prompts: Prompt[] = searchQuery ? (searchData?.data ? searchData.data.prompts : []) : normalData?.data || [];

  // 선택된 카테고리와 모델에 따라 프롬프트 필터링
  let filteredPrompts = prompts;

  // 카테고리 필터링 (검색 시에도 적용)
  if (selectedCategoryName && selectedSubcategory !== null) {
    // 선택된 대분류의 모든 서브카테고리 가져오기
    const selectedCategoryData = categoryData.find((cat) => cat.name === selectedCategoryName);
    const allowedSubcategories = selectedCategoryData?.subcategories || [];

    // '전체'일 때는 대분류의 모든 서브카테고리를 포함
    if (selectedSubcategory === '전체') {
      filteredPrompts = filteredPrompts.filter((prompt) =>
        prompt.categories.some((cat) => allowedSubcategories.includes(cat.category.name)),
      );
    } else {
      // 특정 서브카테고리 선택 시
      filteredPrompts = filteredPrompts.filter((prompt) =>
        prompt.categories.some((cat) => cat.category.name === selectedSubcategory),
      );
    }
  }

  // 모델 필터링
  if (selectedModels.length > 0) {
    filteredPrompts = filteredPrompts.filter((prompt) =>
      prompt.models.some((modelObj) => selectedModels.includes(modelObj.model.name)),
    );
  }

  // 정렬 (항상 클라이언트 사이드에서 적용)
  const sortedPrompts = [...filteredPrompts].sort((a, b) => {
    switch (selectedSort) {
      case '조회순':
        return b.views - a.views;
      case '별점순':
        return (b.review_rating_avg || 0) - (a.review_rating_avg || 0);
      case '다운로드순':
        return b.downloads - a.downloads;
      default:
        // 선택 안 했을 때 기본값은 최신순
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
  });

  // 표시할 프롬프트 별도 관리
  const displayedPrompts = sortedPrompts.slice(0, displayCount);
  const hasNext = sortedPrompts.length > displayCount;

  const totalCount = sortedPrompts.length;

  console.log('displayedPrompts:', displayedPrompts);

  const handleCategorySelect = (categoryId: number | null, categoryName: string | null) => {
    setSelectedCategoryName(categoryName);
    setSelectedSubcategory('전체'); // 카테고리 변경 시 서브카테고리를 "전체"로
    setDisplayCount(20); // 카테고리 변경 시
  };

  const handleSubcategorySelect = (subcategory: string | null) => {
    setSelectedSubcategory(subcategory);
    setDisplayCount(20); // 서브카테고리 변경 시
  };

  const handleModelChange = (models: string[]) => {
    setSelectedModels(models);
    setDisplayCount(20); // 모델 변경 시
  };

  const handleSortChange = (sort: string) => {
    setSelectedSort(sort);
    setDisplayCount(20); // 정렬 변경 시
  };

  const handleReset = () => {
    if (searchQuery) {
      // 검색 모드일 때는 카테고리/서브카테고리를 null로
      setSelectedCategoryName(null);
      setSelectedSubcategory(null);
    } else {
      // 일반 모드일 때는 기본값으로
      setSelectedCategoryName('글쓰기/문서 작성');
      setSelectedSubcategory('전체');
    }
    setSelectedModels([]);
    setSelectedSort('');
    setDisplayCount(20); // 페이지 리셋
  };

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + 20);
  };

  return (
    <div className="max-mypage:[40px] max-phone:px-[20px] px-[102px] ">
      <div className="py-[40px]">
        <p className="text-3xl text-gray-950 leading-10">프롬프트 보기</p>
        <p className="mt-[12px] text-gray-950 text-base font-light ">
          다양한 '프롬프트'가 있는 '플레이스'에서 나를 위한 프롬프트를 찾아보세요!
        </p>
      </div>

      <div>
        <CategorySection
          onCategorySelect={handleCategorySelect}
          onSubcategorySelect={handleSubcategorySelect}
          initialCategoryId={categoryIdFromUrl ? Number(categoryIdFromUrl) : searchQuery ? null : 1}
        />
      </div>

      {searchQuery && (
        <div className="mt-[64px] justify-center text-gray-950 text-3xl leading-10">'{searchQuery}' 검색 결과</div>
      )}

      <div className="mt-[40px]">
        <Filter onModelChange={handleModelChange} onSortChange={handleSortChange} onReset={handleReset} />
      </div>

      <div className="mt-[56px]">
        <div className="self-stretch justify-center mb-[32px]">
          <span className="text-primary text-base font-medium font-['S-Core_Dream'] leading-6">{totalCount}</span>
          <span className="text-gray-950 text-base font-light font-['S-Core_Dream'] leading-6 tracking-tight">
            개의 프롬프트가 있습니다.
          </span>
        </div>

        {/* 데스크톱/태블릿: 그리드 형태 */}
        <div className="max-phone:hidden">
          <PromptGrid prompts={displayedPrompts} />
        </div>

        {/* 모바일: 리스트 형태 */}
        <div className="hidden max-phone:flex flex-col gap-[8px]">
          {displayedPrompts.map((prompt) => (
            <PromptMobileCard key={prompt.prompt_id} prompt={prompt} />
          ))}
        </div>

        {hasNext && (
          <div className="flex justify-center mt-[134px]">
            <button
              onClick={handleLoadMore}
              className="px-10 py-3 bg-background rounded-xl outline-[0.80px] outline-gray-400 inline-flex justify-center items-center gap-2 hover:bg-gray-50 transition">
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
