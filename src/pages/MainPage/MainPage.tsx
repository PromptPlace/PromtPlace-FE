/**

* Author @곽도윤

**/

import { useEffect, useState } from 'react';
import PromptCard from './components/promptCard';
import FilterBar from './components/filterBar';
import PrompterBar from './components/prompterBar';
import { dummyPrompts, dummyCreators } from './components/../dummyData';
import GradientButton from '@/components/Button/GradientButton';
import CoachMark from '@/components/CoachMark';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [selectedSort, setSelectedSort] = useState<string | null>(null);
  const [onlyFree, setOnlyFree] = useState<boolean>(false);
  const navigate = useNavigate();

  // 코치마크 관련
  const { accessToken } = useAuth();
  const [showCoachMark, setShowCoachMark] = useState(() => {
    const hasVisited = sessionStorage.getItem('visited');
    return !hasVisited;
  });

  // 코치마크 관련
  useEffect(() => {
    if (showCoachMark) {
      sessionStorage.setItem('visited', 'true');
    }
  }, [showCoachMark]);

  const filterPromptsByModel = dummyPrompts.filter((prompt) => {
    const matchModel = selectedModel ? prompt.model === selectedModel : true;
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
        return b.downloadCount - a.downloadCount;
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
      <div className="w-[858px] h-[820px] mt-[53px] mb-[42px] overflow-y-auto pb-32">
        <FilterBar
          onModelChange={setSelectedModel}
          onSortChange={setSelectedSort}
          onlyFree={onlyFree}
          setOnlyFree={setOnlyFree}
        />

        <div className="scroll-auto">
          {sortPromptByFilter.map((prompt) => (
            <PromptCard key={prompt.prompt_id} prompt={prompt} />
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
      </div>
    </div>
  );
};

export default MainPage;
