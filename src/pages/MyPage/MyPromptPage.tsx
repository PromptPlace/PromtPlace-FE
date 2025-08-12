import MyPromptsTabs from './components/MyPromptsTabs';
import { PromptCard } from './components/PromptCard';
// import type { Prompt } from './components/PromptCard';
import { useState, useEffect, useMemo } from 'react';
import BlueArchiveIcon from '@/assets/icon-archive-blue.svg';
import Dropdown from './components/Dropdown';
import { useGetDownloadedPrompts, useGetLikedPrompts } from '@/hooks/queries/MyPage/useGetPrompts';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import usePatchDeletePrompts from '@/hooks/mutations/ProfilePage/usePatchDeletePrompts';
import type { RequestDeletePromptDto } from '@/types/ProfilePage/profile';
import useGetPrompts from '@/hooks/queries/ProfilePage/useGetPrompts';
import { useAuth } from '@/context/AuthContext';
import { useUnlikePrompt } from '@/hooks/mutations/MyPage/prompt';

/**
 * TODO:
 *
 * - 리뷰 작성하기 버튼 클릭시 함수 추후 작성 예정
 * - api 연동과 관련된 함수 추후 작성 예정
 * @author_nickname 류동현
 * **/

//더미데이터

{
  /*
const DUMMY_AUTHORED_PROMPTS2: Prompt[] = [
  {
    prompt_id: 1,
    title: '강아지 그림 그려주는 프롬프트',
    models: ['ChatGPT'],
    tags: ['개발', '파이썬', '코딩'],
    author_nickname: '홍길동',
  },
  {
    prompt_id: 2,
    title: '여행 계획 짜주는 프롬프트',
    models: ['ChatGPT'],
    tags: ['개발', '파이썬', '코딩'],
    author_nickname: '매튜',
  },
  {
    prompt_id: 3,
    title: '파이썬으로 3분만에 구슬깨기 게임 만들어주는 프롬프트',
    models: ['Claude'],
    tags: ['개발', '파이썬', '코딩'],
    author_nickname: '오타니',
  },
  {
    prompt_id: 4,
    title: '파이썬으로 5분만에 구슬깨기 게임 만들어주는 프롬프트',
    models: ['Claude'],
    tags: ['개발', '파이썬', '코딩'],
    author_nickname: '오타니',
  },
  {
    prompt_id: 5,
    title: '파이썬으로 5분만에 구슬깨기 게임 만들어주는 프롬프트',
    models: ['Claude'],
    tags: ['개발', '파이썬', '코딩'],
    author_nickname: '오타니',
  },
  {
    prompt_id: 6,
    title: '파이썬으로 5분만에 구슬깨기 게임 만들어주는 프롬프트',
    models: ['Claude'],
    tags: ['개발', '파이썬', '코딩'],
    author_nickname: '오타니',
  },
  {
    prompt_id: 7,
    title: '파이썬으로 5분만에 구슬깨기 게임 만들어주는 프롬프트',
    models: ['Claude'],
    tags: ['개발', '파이썬', '코딩'],
    author_nickname: '오타니',
  },
  {
    prompt_id: 8,
    title: '파이썬으로 5분만에 구슬깨기 게임 만들어주는 프롬프트',
    models: ['Claude'],
    tags: ['개발', '파이썬', '코딩'],
    author_nickname: '오타니',
  },
  {
    prompt_id: 9,
    title: '파이썬으로 5분만에 구슬깨기 게임 만들어주는 프롬프트',
    models: ['Claude'],
    tags: ['개발', '파이썬', '코딩'],
    author_nickname: '오타니',
  },
  {
    prompt_id: 10,
    title: '파이썬으로 5분만에 구슬깨기 게임 만들어주는 프롬프트',
    models: ['Claude'],
    tags: ['개발', '파이썬', '코딩'],
    author_nickname: '오타니',
  },
];
const DUMMY_DOWNLOADED_PROMPTS2: Prompt[] = [
  {
    prompt_id: 1,
    title: '강아지 그림 그려주는 프롬프트',
    models: ['ChatGPT'],
    tags: ['개발', '파이썬', '코딩'],
    author_nickname: '홍길동',
  },
  {
    prompt_id: 2,
    title: '여행 계획 짜주는 프롬프트',
    models: ['ChatGPT'],
    tags: ['개발', '파이썬', '코딩'],
    author_nickname: '매튜',
  },
  {
    prompt_id: 3,
    title: '파이썬으로 4분만에 구슬깨기 게임 만들어주는 프롬프트',
    models: ['Claude'],
    tags: ['개발', '파이썬', '코딩'],
    author_nickname: '오타니',
  },
  {
    prompt_id: 4,
    title: '파이썬으로 5분만에 구슬깨기 게임 만들어주는 프롬프트',
    models: ['Claude'],
    tags: ['개발', '파이썬', '코딩'],
    author_nickname: '오타니',
  },
  {
    prompt_id: 5,
    title: '파이썬으로 5분만에 구슬깨기 게임 만들어주는 프롬프트',
    models: ['Claude'],
    tags: ['개발', '파이썬', '코딩'],
    author_nickname: '오타니',
  },
  {
    prompt_id: 6,
    title: '파이썬으로 5분만에 구슬깨기 게임 만들어주는 프롬프트',
    models: ['Claude'],
    tags: ['개발', '파이썬', '코딩'],
    author_nickname: '오타니',
  },
  {
    prompt_id: 7,
    title: '파이썬으로 5분만에 구슬깨기 게임 만들어주는 프롬프트',
    models: ['Claude'],
    tags: ['개발', '파이썬', '코딩'],
    author_nickname: '오타니',
  },
  {
    prompt_id: 8,
    title: '파이썬으로 5분만에 구슬깨기 게임 만들어주는 프롬프트',
    models: ['Claude'],
    tags: ['개발', '파이썬', '코딩'],
    author_nickname: '오타니',
  },
  {
    prompt_id: 9,
    title: '파이썬으로 5분만에 구슬깨기 게임 만들어주는 프롬프트',
    models: ['Claude'],
    tags: ['개발', '파이썬', '코딩'],
    author_nickname: '오타니',
  },
  {
    prompt_id: 10,
    title: '파이썬으로 5분만에 구슬깨기 게임 만들어주는 프롬프트',
    models: ['Claude'],
    tags: ['개발', '파이썬', '코딩'],
    author_nickname: '오타니',
  },
];
const DUMMY_LIKED_PROMPTS2: Prompt[] = [
  {
    prompt_id: 1,
    title: '강아지 그림 그려주는 프롬프트',
    models: ['ChatGPT'],
    tags: ['개발', '파이썬', '코딩'],
    author_nickname: '홍길동',
  },
  {
    prompt_id: 2,
    title: '여행 계획 짜주는 프롬프트',
    models: ['ChatGPT'],
    tags: ['개발', '파이썬', '코딩'],
    author_nickname: '매튜',
  },
  {
    prompt_id: 3,
    title: '파이썬으로 5분만에 구슬깨기 게임 만들어주는 프롬프트',
    models: ['Claude'],
    tags: ['개발', '파이썬', '코딩'],
    author_nickname: '오타니',
  },
  {
    prompt_id: 4,
    title: '파이썬으로 5분만에 구슬깨기 게임 만들어주는 프롬프트',
    models: ['Claude'],
    tags: ['개발', '파이썬', '코딩'],
    author_nickname: '오타니',
  },
  {
    prompt_id: 5,
    title: '파이썬으로 5분만에 구슬깨기 게임 만들어주는 프롬프트',
    models: ['Claude'],
    tags: ['개발', '파이썬', '코딩'],
    author_nickname: '오타니',
  },
  {
    prompt_id: 6,
    title: '파이썬으로 5분만에 구슬깨기 게임 만들어주는 프롬프트',
    models: ['Claude'],
    tags: ['개발', '파이썬', '코딩'],
    author_nickname: '오타니',
  },
  {
    prompt_id: 7,
    title: '파이썬으로 5분만에 구슬깨기 게임 만들어주는 프롬프트',
    models: ['Claude'],
    tags: ['개발', '파이썬', '코딩'],
    author_nickname: '오타니',
  },
  {
    prompt_id: 8,
    title: '파이썬으로 5분만에 구슬깨기 게임 만들어주는 프롬프트',
    models: ['Claude'],
    tags: ['개발', '파이썬', '코딩'],
    author_nickname: '오타니',
  },
  {
    prompt_id: 9,
    title: '파이썬으로 5분만에 구슬깨기 게임 만들어주는 프롬프트',
    models: ['Claude'],
    tags: ['개발', '파이썬', '코딩'],
    author_nickname: '오타니',
  },
  {
    prompt_id: 10,
    title: '파이썬으로 5분만에 구슬깨기 게임 만들어주는 프롬프트',
    models: ['Claude'],
    tags: ['개발', '파이썬', '코딩'],
    author_nickname: '오타니',
  },
];



 const [prompts, setPrompts] = useState(DUMMY_LIKED_PROMPTS2);

  const DeleteLikedPrompt = (prompt_id: number) => {
    setPrompts((prevPrompts) => prevPrompts.filter((prompt) => prompt.prompt_id !== prompt_id));
  };
//DeleteLikedPrompt 함수 나중에 api 연결할때 post요청해서 새로운 로직 usestate로 안됨 추가 필요

useEffect(() => {
    // 탭이 바뀔 때마다 해당 데이터를 API로 호출하는 로직
    // const fetchedData = await api.getPrompts(activeTab);
    // setPrompts(fetchedData);
    // 예시로 더미 데이터를 사용
    switch (activeTab) {
      case 'authored':
        setPrompts(DUMMY_AUTHORED_PROMPTS2);
        break;
      case 'downloaded':
        setPrompts(DUMMY_DOWNLOADED_PROMPTS2);
        break;
      case 'liked':
        setPrompts(DUMMY_LIKED_PROMPTS2);
        break;
      default:
        setPrompts(DUMMY_AUTHORED_PROMPTS2);
    }
  }, [activeTab]);
*/
}

const promptOptions = [
  { value: 'authored', label: '작성 프롬프트' },
  { value: 'downloaded', label: '다운받은 프롬프트' },
  { value: 'liked', label: '찜한 프롬프트' },
];

const MyPromptPage = () => {
  const [activeTab, setActiveTab] = useState<'authored' | 'downloaded' | 'liked'>('authored'); // 'author', 'downloaded', 'liked'

  const navigate = useNavigate();

  const { user } = useAuth();

  const EditAuthoredPrompt = (prompt_id: number) => {
    const promptId = prompt_id;
    const targetUrl = `/mypage/edit/${promptId}`;

    // 3. 생성된 URL로 페이지를 이동시킵니다.
    navigate(targetUrl);
  };
  const { mutate: unlikePromptMutation, isPending } = useUnlikePrompt();

  const DeleteLikedPrompt = (prompt_id: number) => {
    unlikePromptMutation(prompt_id);
  };

  //iserror, isLoading 처리는 추후 작성 예정
  // 1. useGetPrompts 훅으로 데이터를 가져옵니다.
  const {
    data: promptsResponse,
    hasNextPage: hasNextPageAuthoredPrompts,
    isFetching: isFetchingAuthoredPrompts,
    isFetchingNextPage: isFetchingNextAuthoredPage,
    fetchNextPage: fetchNextAuthoredPage,
  } = useGetPrompts({ member_id: user.user_id });

  const { ref, inView } = useInView({ threshold: 0 });
  useEffect(() => {
    if (inView) {
      fetchNextAuthoredPage();
      console.log('더 많은 프롬프트를 불러옵니다.');
    }
  }, [
    inView,
    hasNextPageAuthoredPrompts,
    isFetchingAuthoredPrompts,
    isFetchingNextAuthoredPage,
    fetchNextAuthoredPage,
  ]);

  const { data: downloadedPromptsData } = useGetDownloadedPrompts({
    enabled: activeTab === 'downloaded',
  });

  const { data: likedPromptsData } = useGetLikedPrompts({
    enabled: activeTab === 'liked',
  });

  // 프롬프트 삭제 함수
  const { mutate: mutateDeletePrompts } = usePatchDeletePrompts({ member_id: user.user_id });
  const handleDeleteAuthoredPrompts = ({ prompt_id }: RequestDeletePromptDto) => {
    mutateDeletePrompts({ prompt_id });
  };

  // 2. useMemo를 사용해 원하는 형태로 데이터를 가공합니다.
  const authoredPromptsData = useMemo(() => {
    // 데이터가 아직 없으면 빈 배열을 반환합니다.
    if (!promptsResponse) {
      return [];
    }

    // `flatMap`을 사용해 각 페이지의 'prompts' 배열을 하나의 배열로 합칩니다.
    return promptsResponse.pages.flatMap((page) =>
      // 각 페이지 내부의 prompts 배열을 순회하며 구조를 변경합니다.
      page.data.prompts.map((prompt) => ({
        prompt_id: prompt.prompt_id,
        title: prompt.title,
        // models 배열에서 이름(name)만 추출해 새 배열을 만듭니다.
        models: prompt.models.map((item) => item.model.name),
        // tags 배열에서 이름(name)만 추출해 새 배열을 만듭니다.
        tags: prompt.tags.map((item) => item.tag.name),
        // 'author_nickname'은 아래 "중요" 부분을 참고하세요.
      })),
    );
  }, [promptsResponse]); // promptsResponse 데이터가 변경될 때만 이 로직이 다시 실행됩니다.

  const getPromptsForCurrentTab = () => {
    switch (activeTab) {
      case 'downloaded':
        return downloadedPromptsData?.data || []; // 다운로드한 프롬프트 데이터
      case 'authored':
        return authoredPromptsData; // TODO: 작성 프롬프트 데이터로 교체
      case 'liked':
        return likedPromptsData?.data || []; // 찜한 프롬프트 데이터
      default:
        return [];
    }
  };

  const promptsToDisplay = getPromptsForCurrentTab();
  console.log('promptsToDisplay:', promptsToDisplay);

  return (
    <div className="flex  justify-center pt-[92px] max-lg:pt-[12px] min-h-screen bg-background">
      <div className=" w-full max-w-[1236px] mx-[102px] max-lg:mx-[0px] max-lg:px-[20px]">
        <div className="flex items-center gap-[10px] max-lg:gap-[6px] mb-[56px] max-lg:mb-[20px]">
          <img
            src={BlueArchiveIcon}
            alt="BlueArchiveIcon"
            className="w-[24px] max-lg:w-[20px] h-[24px] max-lg:h-[20px]"
          />
          <h1 className="text-[32px] max-lg:text-[20px] text-primary-hover font-bold">내 프롬프트</h1>
        </div>
        <div className="max-lg:hidden">
          <MyPromptsTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        <div className="lg:hidden mb-[12px] w-[135px]">
          <Dropdown
            options={promptOptions}
            selectedValue={activeTab}
            onSelect={(value) => setActiveTab(value as 'authored' | 'downloaded' | 'liked')}
          />
        </div>
        <div className=" bg-white">
          <div className="mr-[8px] overflow-y-auto overflow-x-hidden max-h-[368px]">
            {promptsToDisplay.map((prompt) => (
              <PromptCard
                key={prompt.prompt_id}
                type={activeTab}
                promptData={prompt}
                DeletePrompt={() => handleDeleteAuthoredPrompts({ prompt_id: prompt.prompt_id })}
                EditPrompt={() => EditAuthoredPrompt(prompt.prompt_id)}
                DeleteLike={() => DeleteLikedPrompt(prompt.prompt_id)}
              />
            ))}
            <div ref={ref} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyPromptPage;
