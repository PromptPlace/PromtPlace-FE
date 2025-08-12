/**

* Author @곽도윤

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
  const searchPromptResult = usePostSearchPromptList(
    {
      keyword: keyword,
      model: selectedModels,
      tag: selectedTags,
      sort: selectedSort,
      is_free: onlyFree,
      page: 1,
      size: 20,
    },
    !!keyword,
  );

  const promptResult = useGetPromptList();
  const promptList = promptResult.data?.data ?? [];

  const searchPromptIds =
    keyword && searchPromptResult.data?.data ? searchPromptResult.data.data.map((item) => item.prompt_id) : [];

  const filteredPromptList = keyword
    ? searchPromptIds.length > 0
      ? promptList.filter((prompt) => searchPromptIds.includes(prompt.prompt_id))
      : []
    : promptList;

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

  const filterPromptsByModel = filteredPromptList?.filter((prompt) => {
    const matchModel =
      selectedModels.length > 0
        ? Array.isArray(prompt.models) && prompt.models.some((m) => selectedModels.includes(m.model.name))
        : true;
    const matchFree = onlyFree ? prompt.price === 0 : true;
    return matchModel && matchFree;
  });

  const sortPromptByFilter = [...filterPromptsByModel].sort((a, b) => {
    switch (selectedSort) {
      case '조회순':
        return b.views - a.views;
      case '별점순':
        return b.rating_avg - a.rating_avg;
      case '다운로드순':
        return b.downloads - a.downloads;
      case '가격 낮은 순':
        return a.price - b.price;
      case '가격 높은 순':
        return b.price - a.price;
      default:
        return 0; // 기본 정렬
    }
  });

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
          {sortPromptByFilter.map((prompt) => (
            <PromptCard key={prompt.prompt_id} prompt={prompt} />
          ))}
        </div>

        <div className="flex flex-col lg:hidden scroll-auto">
          {sortPromptByFilter.map((prompt) => (
            <MobilePrompt key={prompt.prompt_id} prompt={prompt} />
          ))}
        </div>
      </div>

      <div className="hidden lg:flex">
        <div className="flex flex-col gap-[14px]">
          <PrompterBar creators={dummyCreators} />
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
        <div
          onClick={() => {
            navigate('/payment');
          }}
          className="fixed bottom-4 right-4 z-[10] cursor-pointer">
          프롬프트 결제하기
        </div>
      </div>
    </div>
  );
};

export default MainPage;
