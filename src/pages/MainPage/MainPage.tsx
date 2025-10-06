/**

* Author @곽도윤

**/

import { useEffect, useState } from 'react';
import PromptCard from './components/promptCard';
import FilterBar from './components/filterBar';
import PrompterBar from './components/prompterBar';
import GradientButton from '@/components/Button/GradientButton';
import CoachMark from '@/components/CoachMark';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import MobileFilter from './components/MobileFilter';
import MobilePrompt from './components/MobilePrompt';
import useGetPromptList from '@/hooks/queries/MainPage/useGetPromptList';
import usePostSearchPromptList from '@/hooks/mutations/MainPage/usePostSearchPromptList';
import type {
  Prompt,
  ResponsePromptDTO,
  SearchPromptDto,
  ResponseSearchPromptDTO,
  searchPrompt,
} from '@/types/MainPage/prompt';
import SocialLoginModal from '@/components/Modal/SocialLoginModal';

const MainPage = () => {
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState<string>('recent');
  const [onlyFree, setOnlyFree] = useState<boolean>(false);
  const [loginModalShow, setLoginModalShow] = useState<boolean>(false);
  const navigate = useNavigate();

  // 검색 파라미터 상태
  const [keyword, setKeyword] = useState<string>('');
  const [searchParams] = useSearchParams();
  // Navbar에서 검색어를 받아오기 위한 함수
  useEffect(() => {
    const search = searchParams.get('search') || '';
    setKeyword(search);
  }, [searchParams]);

  // 검색 API 호출
  const searchPromptMutation = usePostSearchPromptList();
  const [searchPromptData, setSearchPromptData] = useState<ResponsePromptDTO | null>(null);

  // 정렬 값 매핑 함수 - 백엔드 API 스펙에 맞게 수정
  const mapSortValue = (sort: string | null): 'recent' | 'popular' | 'download' | 'views' | 'rating_avg' => {
    switch (sort) {
      case '조회순':
        return 'views';
      case '별점순':
        return 'rating_avg'; // 백엔드에서는 rating_avg 사용
      case '다운로드순':
        return 'download';
      case '인기순':
        return 'popular';
      default:
        return 'recent';
    }
  };

  // 검색어와 태그가 있을 때만 백엔드 API 호출
  useEffect(() => {
    if (keyword || selectedTags.length > 0) {
      const searchParams: SearchPromptDto = {
        keyword: keyword || null,
        model: null, // 모델 필터링은 프론트엔드에서 처리
        tag: selectedTags.length > 0 ? selectedTags : null,
        sort: mapSortValue(selectedSort) as SearchPromptDto['sort'],
        is_free: false, // 기본값으로 설정 (무료 필터링은 프론트엔드에서 처리)
        page: 1,
        size: 20,
      };

      searchPromptMutation.mutate(searchParams, {
        onSuccess: (data) => {
          setSearchPromptData(data);
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword, selectedTags, selectedSort]); // 정렬 조건도 dependency에 추가

  const promptResult = useGetPromptList();

  // 백엔드 검색 결과와 기본 프롬프트 리스트를 안전하게 처리
  const basePromptList: Prompt[] = (() => {
    if (keyword || selectedTags.length > 0) {
      const responseData = searchPromptData?.data;

      if (
        responseData &&
        typeof responseData === 'object' &&
        !Array.isArray(responseData) &&
        'prompts' in responseData &&
        Array.isArray((responseData as { prompts?: unknown }).prompts)
      ) {
        return (responseData as { prompts: Prompt[] }).prompts;
      }

      return [];
    } else {
      // 기본 프롬프트 리스트 (기존 코드와 동일)
      return Array.isArray(promptResult.data?.data) ? promptResult.data.data : [];
    }
  })();

  // const promptList =
  //   keyword || selectedModels.length > 0 || selectedTags.length > 0 || onlyFree || selectedSort !== 'recent'
  //     ? Array.isArray(searchPromptData?.data)
  //       ? searchPromptData.data
  //       : []
  //     : Array.isArray(promptResult.data?.data)
  //       ? promptResult.data.data
  //       : [];

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

  // 프론트엔드에서 모델 필터링 및 정렬 처리 (검색어/태그는 백엔드에서 처리됨)
  const filterPromptsByModel = Array.isArray(basePromptList)
    ? basePromptList.filter((prompt: Prompt) => {
        const modelsArray = Array.isArray(prompt.models) ? prompt.models : [];
        const matchModel =
          selectedModels.length > 0 ? modelsArray.some((m) => selectedModels.includes(m.model.name)) : true;

        const matchFree = onlyFree ? prompt.price === 0 : true;

        return matchModel && matchFree;
      })
    : [];

  // 태그와 키워드 필터링은 제거 (백엔드에서 처리)
  // const matchTag =
  //   selectedTags.length > 0
  //     ? Array.isArray(prompt.tags) && prompt.tags.some((tag: any) => selectedTags.includes(tag.tag.name))
  //     : true;
  // const matchKeyword = keyword ? prompt.title.toLowerCase().includes(keyword.toLowerCase()) : true;
  //   return matchModel && matchFree; // && matchTag && matchKeyword;
  // }) || [];

  const sortPromptByFilter = [...filterPromptsByModel].sort((a, b) => {
    // 검색어나 태그가 있을 때는 백엔드에서 이미 정렬된 결과이므로 추가 정렬 안함
    if (keyword || selectedTags.length > 0) {
      return 0; // 순서 유지
    }

    // 기본 프롬프트 리스트에 대해서만 프론트엔드 정렬 적용
    switch (selectedSort) {
      case '조회순':
        return b.views - a.views;
      case '별점순':
        return b.review_rating_avg - a.review_rating_avg;
      case '다운로드순':
        return b.downloads - a.downloads;
      case '가격 낮은 순':
        return a.price - b.price;
      case '가격 높은 순':
        return b.price - a.price;
      default:
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime(); // 기본 정렬
    }
  });

  const promptList = sortPromptByFilter;

  return (
    <div className="flex gap-[59px] justify-center bg-[#F5F5F5] relative overflow-hidden">
      {showCoachMark && !accessToken && <CoachMark setShowCoachMark={setShowCoachMark} />}
      {/* 미로그인 시 로그인 모달 연결 */}
      {loginModalShow && (
        <SocialLoginModal isOpen={loginModalShow} onClose={() => setLoginModalShow(false)} onClick={() => {}} />
      )}

      <div className="w-[858px] h-full max-h-[950px] min-h-[700px] mb-[42px] overflow-y-auto pb-32">
        {keyword && (
          <div className="hidden lg:flex mt-[53px] px-5 justify-start text-black text-2xl font-bold font-['Spoqa_Han_Sans_Neo']">
            '{keyword}' 검색결과
          </div>
        )}

        <div className="hidden lg:flex flex-col mt-[53px]">
          <FilterBar
            onModelChange={(models: string[] | null) => setSelectedModels(models ?? [])}
            onSortChange={(sort: string | null) => setSelectedSort(sort ?? 'recent')}
            onTagChange={(tags: string[] | null) => setSelectedTags(tags ?? [])}
            onlyFree={onlyFree}
            setOnlyFree={setOnlyFree}
          />
        </div>

        <div className="flex lg:hidden">
          <MobileFilter
            onModelChange={(models: string[] | null) => setSelectedModels(models ?? [])}
            onSortChange={(sort: string | null) => setSelectedSort(sort ?? 'recent')}
            onTagChange={(tags: string[] | null) => setSelectedTags(tags ?? [])}
            onlyFree={onlyFree}
            setOnlyFree={setOnlyFree}
          />
        </div>

        <div className="hidden lg:flex flex-col scroll-auto">
          {Array.isArray(promptList) && promptList.map((p: Prompt) => <PromptCard key={p.prompt_id} prompt={p} />)}
        </div>

        <div className="flex flex-col lg:hidden scroll-auto">
          {promptList.map((p: Prompt) => (
            <MobilePrompt key={p.prompt_id} prompt={p} />
          ))}
        </div>
      </div>

      <div className="hidden lg:flex">
        <div className="flex flex-col gap-[14px]">
          {/* {keyword ? <PrompterBar /> : <SearchPrompter creators={Prompter} />} */}
          <PrompterBar />

          {/* Right-side footer links (desktop only) */}
          <div className="mt-6 ml-2 w-[291px] mb-12">
            <div className="inline-flex flex-col justify-start items-start gap-4">
              <div className="inline-flex justify-center items-center gap-2.5">
                <div className="w-72 justify-start text-text-on-background text-lg font-normal font-['Spoqa_Han_Sans_Neo'] leading-relaxed">
                  <div>대표자 : 안송연</div>
                  <div>사업자 등록번호 : 760-20-02108</div>
                  <div>서울특별시 관악구 인헌동 12가길 7</div>
                  <div>promptplace.official@gmail.com</div>
                  <div>고객센터 : 010-6279-0934</div>
                </div>
              </div>

              <div className="flex flex-col justify-start items-start gap-8">
                <div className="inline-flex justify-start items-center gap-[12px]">
                  <a
                    href="https://guiltless-wedelia-8cd.notion.site/27087a067207808b9b96f648f236c2e5?pvs=74"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-center justify-start text-text-on-background text-lg font-bold font-['Spoqa_Han_Sans_Neo']">
                    이용약관
                  </a>
                  <a
                    href="https://guiltless-wedelia-8cd.notion.site/27087a06720780889090f88b0d499ebc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="justify-start text-text-on-background text-lg font-bold">
                    개인정보처리방침
                  </a>
                  <a
                    href="https://guiltless-wedelia-8cd.notion.site/27087a067207800b8c78ed4508fcf698?pvs=74"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-center justify-start text-text-on-background text-lg font-bold">
                    운영정책
                  </a>
                </div>
                <div className="justify-start text-text-on-background text-lg font-normal font-['Spoqa_Han_Sans_Neo']">
                  © PromptPlace. All rights reserved
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex">
        <div className="fixed bottom-4 justify-center items-center flex flex-col gap-2.5 left-1/2 z-[10]">
          <GradientButton
            buttonType="imgButton"
            text="프롬프트 작성하기"
            onClick={() => {
              if (!accessToken) {
                alert('로그인이 필요합니다.');
                setLoginModalShow(true);
                return;
              }
              navigate('/create');
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
