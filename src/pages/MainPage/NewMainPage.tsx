import { useSearchParams } from 'react-router-dom';
import CategorySection from './components/CategorySection';
import Filter from './components/Filter';
import useGetPromptList from '@/hooks/queries/MainPage/useGetPromptList';
import PromptGrid from '@/components/PromptGrid';
import PromptMobileCard from '../HomePage/components/PromptMobileCard';
import usePromptMode from '@/hooks/queries/MainPage/usePromptMode';
import { useCategoryFilter } from '@/hooks/queries/MainPage/useCategoryFilter';
import { useModelFilter } from '@/hooks/queries/MainPage/useModelFilter';
import { useSortFilter } from '@/hooks/queries/MainPage/useSortFilter';
import { usePagination } from '@/hooks/queries/MainPage/usePagination';
import { useFilteredPrompts } from '@/hooks/queries/MainPage/useFilteredPrompt';

const NewMainPage = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const categoryIdFromUrl = searchParams.get('categoryId');
  const subcategoryFromUrl = searchParams.get('subcategory');

  const { data } = useGetPromptList();
  const prompts = data?.data || [];

  const categoryFilter = useCategoryFilter();
  const modelFilter = useModelFilter();
  const sortFilter = useSortFilter();
  const pagination = usePagination(20);

  const filteredPrompts = useFilteredPrompts({
    prompts,
    filterFns: [categoryFilter.filterByCategory, modelFilter.filterByModels, sortFilter.sortPrompts],
  });

  const paginatedPrompts = pagination.paginate(filteredPrompts);
  const hasNext = pagination.hasNext(filteredPrompts);
  const totalCount = filteredPrompts.length;

  // //useMemo로 렌더 시점에 동기적으로 초기값 결정
  // const initialCategoryName = useMemo(() => {
  //   if (categoryNameFromUrl) return categoryNameFromUrl;
  //   if (searchQuery) return null;
  //   return '글쓰기 / 문서 작성';
  // }, [categoryNameFromUrl, searchQuery]);

  // const initialSubcategory = useMemo(() => {
  //   if (subcategoryFromUrl) return subcategoryFromUrl;
  //   if (categoryNameFromUrl) return '전체';
  //   if (searchQuery) return null;
  //   return '전체';
  // }, [categoryNameFromUrl, searchQuery, subcategoryFromUrl]);

  // const [selectedCategoryName, setSelectedCategoryName] = useState<string | null>(initialCategoryName);
  // const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(initialSubcategory);
  // const [selectedModels, setSelectedModels] = useState<string[]>([]);
  // const [selectedSort, setSelectedSort] = useState<string>('');
  // const [displayCount, setDisplayCount] = useState(20);

  // const getSortValue = (): 'recent' | 'popular' | 'download' | 'views' | 'rating_avg' => {
  //   switch (selectedSort) {
  //     case '조회순':
  //       return 'views';
  //     case '별점순':
  //       return 'rating_avg';
  //     case '다운로드순':
  //       return 'download';
  //     default:
  //       return 'recent';
  //   }
  // };

  // const { data: normalData } = useGetPromptList();
  // const { data: searchData } = useGetSearchPromptList(
  //   {
  //     model: selectedModels.length > 0 ? selectedModels : null,
  //     tag: null,
  //     keyword: searchQuery || null,
  //     page: 1,
  //     size: 100,
  //     sort: getSortValue(),
  //     is_free: false,
  //   },
  //   !!searchQuery,
  // );

  // const prompts: Prompt[] = searchQuery ? (searchData?.data ? searchData.data.prompts : []) : normalData?.data || [];
  // let filteredPrompts = prompts;

  // // 카테고리 필터링
  // if (selectedCategoryName && selectedSubcategory !== null) {
  //   const selectedCategoryData = categoryData.find((cat) => cat.name === selectedCategoryName);
  //   const allowedSubcategories = selectedCategoryData?.subcategories || [];

  //   if (selectedSubcategory === '전체') {
  //     filteredPrompts = filteredPrompts.filter((prompt) =>
  //       prompt.categories.some((cat) => allowedSubcategories.includes(cat.category.name)),
  //     );
  //   } else {
  //     filteredPrompts = filteredPrompts.filter((prompt) =>
  //       prompt.categories.some((cat) => cat.category.name === selectedSubcategory),
  //     );
  //   }
  // }

  // if (selectedModels.length > 0) {
  //   filteredPrompts = filteredPrompts.filter((prompt) =>
  //     prompt.models.some((modelObj) => selectedModels.includes(modelObj.model.name)),
  //   );
  // }

  // const sortedPrompts = [...filteredPrompts].sort((a, b) => {
  //   switch (selectedSort) {
  //     case '조회순':
  //       return b.views - a.views;
  //     case '별점순':
  //       return (b.review_rating_avg || 0) - (a.review_rating_avg || 0);
  //     case '다운로드순':
  //       return b.downloads - a.downloads;
  //     default:
  //       return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  //   }
  // });

  // const displayedPrompts = sortedPrompts.slice(0, displayCount);
  // const hasNext = sortedPrompts.length > displayCount;
  // const totalCount = sortedPrompts.length;

  // const handleCategorySelect = (categoryId: number | null, categoryName: string | null) => {
  //   setSelectedCategoryName(categoryName);
  //   setSelectedSubcategory('전체');
  //   setDisplayCount(20);
  // };

  // const handleSubcategorySelect = (subcategory: string | null) => {
  //   setSelectedSubcategory(subcategory);
  //   setDisplayCount(20);
  // };

  // const handleModelChange = (models: string[]) => {
  //   setSelectedModels(models);
  //   setDisplayCount(20);
  // };

  // const handleSortChange = (sort: string) => {
  //   setSelectedSort(sort);
  //   setDisplayCount(20);
  // };

  // const handleReset = () => {
  //   // 카테고리는 유지하고, 모델 필터와 정렬만 초기화
  //   setSelectedModels([]);
  //   setSelectedSort('');
  //   setDisplayCount(20);
  // };

  // const handleLoadMore = () => setDisplayCount((prev) => prev + 20);

  return (
    <div className="max-mypage:pl-[40px] max-phone:pl-[20px] pl-[102px] ">
      {!searchQuery && (
        <div className="py-[64px]">
          <p className="text-3xl text-gray-950 leading-10">프롬프트 보기</p>
          <p className="mt-[12px] text-gray-950 text-base font-light">
            다양한 '프롬프트'가 있는 '플레이스'에서 나를 위한 프롬프트를 찾아보세요!
          </p>
        </div>
      )}

      <div className={`${searchQuery ? 'mt-[64px]' : ''}`}>
        <CategorySection
          onCategorySelect={categoryFilter.handleCategorySelect}
          onSubcategorySelect={categoryFilter.handleSubcategorySelect}
          initialCategoryId={categoryIdFromUrl ? Number(categoryIdFromUrl) : searchQuery ? null : 1}
          initialSubcategory={subcategoryFromUrl || '전체'}
          isSearchMode={!!searchQuery}
        />
      </div>

      {searchQuery && (
        <div className="mt-[64px] justify-center text-gray-950 text-3xl max-phone:text-[24px] leading-10">
          '{searchQuery}' 검색 결과
        </div>
      )}

      <div className="mt-[40px]">
        <Filter
          onModelChange={modelFilter.handleModelChange}
          onSortChange={sortFilter.handleSortChange}
          onReset={() => {
            modelFilter.handleModelChange([]);
            sortFilter.handleSortChange('');
            pagination.resetPagination();
          }}
        />
      </div>

      <div className="mt-[56px] pr-[102px] max-phone:pr-[20px] max-mypage:pr-[40px]">
        <div className="self-stretch justify-center mb-[32px]">
          <span className="text-primary text-base font-medium leading-6">{totalCount}</span>
          <span className="text-gray-950 text-base font-light leading-6 tracking-tight">개의 프롬프트가 있습니다.</span>
        </div>

        <div className="max-phone:hidden overflow-x-scroll hide-scrollbar">
          <PromptGrid prompts={paginatedPrompts} />
        </div>

        <div className="hidden max-phone:flex flex-col gap-[8px]">
          {paginatedPrompts.map((prompt) => (
            <PromptMobileCard key={prompt.prompt_id} prompt={prompt} />
          ))}
        </div>

        {hasNext && (
          <div className="flex justify-center mt-[134px]">
            <button
              onClick={pagination.handleLoadMore}
              className="px-10 py-3 bg-background rounded-xl outline-[0.80px] outline-gray-400 inline-flex justify-center items-center gap-2 hover:bg-gray-50 transition">
              <div className="text-center justify-center text-gray-500 text-xs font-medium leading-4">
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
