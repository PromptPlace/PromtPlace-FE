/**

* Author @곽도윤

Todo
1. 검색창 debounce 적용
2. 프롬프트 카드 스켈레톤 UI 적용
3. Optimistic update를 활용한 찜, 팔로우 반영

**/

import { useEffect, useState } from 'react';
import PromptCard from './components/promptCard';
import FilterBar from './components/filterBar';
import PrompterBar from './components/prompterBar';
import { dummyCreators } from './components/../dummyData';
import GradientButton from '@/components/Button/GradientButton';
import CoachMark from '@/components/CoachMark';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import MobileFilter from './components/MobileFilter';
import MobilePrompt from './components/MobilePrompt';
import useGetPromptList from '@/hooks/queries/MainPage/useGetPromptList';
import usePostSearchPromptList from '@/hooks/mutations/MainPage/usePostSearchPromptList';
import type { Prompt } from '@/types/MainPage/prompt';

const MainPage = () => {
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState<string>('recent');
  const [onlyFree, setOnlyFree] = useState<boolean>(false);
  const navigate = useNavigate();

  // 검색 파라미터 상태
  const [keyword, setKeyword] = useState<string>('');
  const [searchParams] = useSearchParams();
  // Navbar에서 검색어를 받아오기 위한 함수
  useEffect(() => {
    const search = searchParams.get('search') || '';
    setKeyword(search);
  }, [searchParams]);

  console.log(keyword);

  // 검색 API 호출
  const searchPromptMutation = usePostSearchPromptList();

  // Use mutation only when needed, and store result in state
  const [searchPromptData, setSearchPromptData] = useState<any>(null);

  useEffect(() => {
    searchPromptMutation.mutate(
      {
        keyword: keyword,
        model: selectedModels,
        tag: selectedTags,
        sort: selectedSort,
        is_free: onlyFree,
        page: 1,
        size: 20,
      },
      {
        onSuccess: (data) => {
          setSearchPromptData(data);
        },
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword, selectedModels, selectedTags, selectedSort, onlyFree]);

  const promptResult = useGetPromptList();
  const promptList =
    keyword || selectedModels.length > 0 || selectedTags.length > 0 || onlyFree || selectedSort !== 'recent'
      ? (searchPromptData?.data ?? [])
      : (promptResult.data?.data ?? []);

  // 코치마크 관련
  const { accessToken } = useAuth();
  const [showCoachMark, setShowCoachMark] = useState(() => {
    const hasVisited = sessionStorage.getItem('visited');
    return !hasVisited;
  });

  useEffect(() => {
    if (showCoachMark) {
      sessionStorage.setItem('visited', 'true');
    }
  }, [showCoachMark]);

  // const filterPromptsByModel = filteredPromptList?.filter((prompt) => {
  //   const matchModel =
  //     selectedModels.length > 0
  //       ? Array.isArray(prompt.models) && prompt.models.some((m) => selectedModels.includes(m.model.name))
  //       : true;
  //   const matchFree = onlyFree ? prompt.price === 0 : true;
  //   return matchModel && matchFree;
  // });

  // const sortPromptByFilter = [...filterPromptsByModel].sort((a, b) => {
  //   switch (selectedSort) {
  //     case '조회순':
  //       return b.views - a.views;
  //     case '별점순':
  //       return b.rating_avg - a.rating_avg;
  //     case '다운로드순':
  //       return b.downloads - a.downloads;
  //     case '가격 낮은 순':
  //       return a.price - b.price;
  //     case '가격 높은 순':
  //       return b.price - a.price;
  //     default:
  //       return 0; // 기본 정렬
  //   }
  // });

  return (
    <div className="flex gap-[59px] justify-center bg-[#F5F5F5] relative overflow-hidden">
      {showCoachMark && !accessToken && <CoachMark setShowCoachMark={setShowCoachMark} />}
      <div className="w-[858px] h-full max-h-[950px] min-h-[700px] mb-[42px] overflow-y-auto pb-32">
        <div className="hidden lg:flex mt-[53px]">
          <FilterBar
            onModelChange={(models: string[] | null) => setSelectedModels(models ?? [])}
            onSortChange={(sort: string | null) => setSelectedSort(sort ?? 'recent')}
            onlyFree={onlyFree}
            setOnlyFree={setOnlyFree}
          />
        </div>

        <div className="flex lg:hidden">
          <MobileFilter
            onModelChange={(models: string[] | null) => setSelectedModels(models ?? [])}
            onSortChange={(sort: string | null) => setSelectedSort(sort ?? 'recent')}
            onlyFree={onlyFree}
            setOnlyFree={setOnlyFree}
          />
        </div>

        <div className="hidden lg:flex flex-col scroll-auto">
          {promptList.map((p: Prompt) => (
            <PromptCard key={p.prompt_id} prompt={p} />
          ))}
        </div>

        <div className="flex flex-col lg:hidden scroll-auto">
          {promptList.map((p: Prompt) => (
            <MobilePrompt key={p.prompt_id} prompt={p} />
          ))}
        </div>
      </div>

      <div className="hidden lg:flex">
        <div className="flex flex-col gap-[14px]">
          <PrompterBar />
        </div>
      </div>

      <div className="hidden lg:flex">
        <div className="fixed bottom-4 justify-center items-center flex flex-col gap-2.5 left-1/2 z-[10]">
          <GradientButton
            buttonType="imgButton"
            text="프롬프트 작성하기"
            onClick={() => {
              navigate('/create');
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
