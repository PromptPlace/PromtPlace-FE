import MyPromptsTabs from './components/MyPromptsTabs';
import { PromptCard } from './components/PromptCard';
import type { Prompt } from './components/PromptCard';
import { useState, useEffect } from 'react';
import BlueArchiveIcon from '@/assets/icon-archive-blue.svg';

/**
 * TODO:
 *
 * - 리뷰 작성하기 버튼 클릭시 함수 추후 작성 예정
 * - api 연동과 관련된 함수 추후 작성 예정
 * @author 류동현
 * **/

//더미데이터

const DUMMY_AUTHORED_PROMPTS2: Prompt[] = [
  {
    id: 1,
    title: '강아지 그림 그려주는 프롬프트',
    model: 'ChatGPT',
    tags: ['개발', '파이썬', '코딩'],
    author: '홍길동',
  },
  { id: 2, title: '여행 계획 짜주는 프롬프트', model: 'ChatGPT', tags: ['개발', '파이썬', '코딩'], author: '매튜' },
  {
    id: 3,
    title: '파이썬으로 3분만에 구슬깨기 게임 만들어주는 프롬프트',
    model: 'Claude',
    tags: ['개발', '파이썬', '코딩'],
    author: '오타니',
  },
  {
    id: 4,
    title: '파이썬으로 5분만에 구슬깨기 게임 만들어주는 프롬프트',
    model: 'Claude',
    tags: ['개발', '파이썬', '코딩'],
    author: '오타니',
  },
  {
    id: 5,
    title: '파이썬으로 5분만에 구슬깨기 게임 만들어주는 프롬프트',
    model: 'Claude',
    tags: ['개발', '파이썬', '코딩'],
    author: '오타니',
  },
  {
    id: 6,
    title: '파이썬으로 5분만에 구슬깨기 게임 만들어주는 프롬프트',
    model: 'Claude',
    tags: ['개발', '파이썬', '코딩'],
    author: '오타니',
  },
  {
    id: 7,
    title: '파이썬으로 5분만에 구슬깨기 게임 만들어주는 프롬프트',
    model: 'Claude',
    tags: ['개발', '파이썬', '코딩'],
    author: '오타니',
  },
  {
    id: 8,
    title: '파이썬으로 5분만에 구슬깨기 게임 만들어주는 프롬프트',
    model: 'Claude',
    tags: ['개발', '파이썬', '코딩'],
    author: '오타니',
  },
  {
    id: 9,
    title: '파이썬으로 5분만에 구슬깨기 게임 만들어주는 프롬프트',
    model: 'Claude',
    tags: ['개발', '파이썬', '코딩'],
    author: '오타니',
  },
  {
    id: 10,
    title: '파이썬으로 5분만에 구슬깨기 게임 만들어주는 프롬프트',
    model: 'Claude',
    tags: ['개발', '파이썬', '코딩'],
    author: '오타니',
  },
];
const DUMMY_DOWNLOADED_PROMPTS2: Prompt[] = [
  {
    id: 1,
    title: '강아지 그림 그려주는 프롬프트',
    model: 'ChatGPT',
    tags: ['개발', '파이썬', '코딩'],
    author: '홍길동',
  },
  { id: 2, title: '여행 계획 짜주는 프롬프트', model: 'ChatGPT', tags: ['개발', '파이썬', '코딩'], author: '매튜' },
  {
    id: 3,
    title: '파이썬으로 4분만에 구슬깨기 게임 만들어주는 프롬프트',
    model: 'Claude',
    tags: ['개발', '파이썬', '코딩'],
    author: '오타니',
  },
  {
    id: 4,
    title: '파이썬으로 5분만에 구슬깨기 게임 만들어주는 프롬프트',
    model: 'Claude',
    tags: ['개발', '파이썬', '코딩'],
    author: '오타니',
  },
  {
    id: 5,
    title: '파이썬으로 5분만에 구슬깨기 게임 만들어주는 프롬프트',
    model: 'Claude',
    tags: ['개발', '파이썬', '코딩'],
    author: '오타니',
  },
  {
    id: 6,
    title: '파이썬으로 5분만에 구슬깨기 게임 만들어주는 프롬프트',
    model: 'Claude',
    tags: ['개발', '파이썬', '코딩'],
    author: '오타니',
  },
  {
    id: 7,
    title: '파이썬으로 5분만에 구슬깨기 게임 만들어주는 프롬프트',
    model: 'Claude',
    tags: ['개발', '파이썬', '코딩'],
    author: '오타니',
  },
  {
    id: 8,
    title: '파이썬으로 5분만에 구슬깨기 게임 만들어주는 프롬프트',
    model: 'Claude',
    tags: ['개발', '파이썬', '코딩'],
    author: '오타니',
  },
  {
    id: 9,
    title: '파이썬으로 5분만에 구슬깨기 게임 만들어주는 프롬프트',
    model: 'Claude',
    tags: ['개발', '파이썬', '코딩'],
    author: '오타니',
  },
  {
    id: 10,
    title: '파이썬으로 5분만에 구슬깨기 게임 만들어주는 프롬프트',
    model: 'Claude',
    tags: ['개발', '파이썬', '코딩'],
    author: '오타니',
  },
];
const DUMMY_LIKED_PROMPTS2: Prompt[] = [
  {
    id: 1,
    title: '강아지 그림 그려주는 프롬프트',
    model: 'ChatGPT',
    tags: ['개발', '파이썬', '코딩'],
    author: '홍길동',
  },
  { id: 2, title: '여행 계획 짜주는 프롬프트', model: 'ChatGPT', tags: ['개발', '파이썬', '코딩'], author: '매튜' },
  {
    id: 3,
    title: '파이썬으로 5분만에 구슬깨기 게임 만들어주는 프롬프트',
    model: 'Claude',
    tags: ['개발', '파이썬', '코딩'],
    author: '오타니',
  },
  {
    id: 4,
    title: '파이썬으로 5분만에 구슬깨기 게임 만들어주는 프롬프트',
    model: 'Claude',
    tags: ['개발', '파이썬', '코딩'],
    author: '오타니',
  },
  {
    id: 5,
    title: '파이썬으로 5분만에 구슬깨기 게임 만들어주는 프롬프트',
    model: 'Claude',
    tags: ['개발', '파이썬', '코딩'],
    author: '오타니',
  },
  {
    id: 6,
    title: '파이썬으로 5분만에 구슬깨기 게임 만들어주는 프롬프트',
    model: 'Claude',
    tags: ['개발', '파이썬', '코딩'],
    author: '오타니',
  },
  {
    id: 7,
    title: '파이썬으로 5분만에 구슬깨기 게임 만들어주는 프롬프트',
    model: 'Claude',
    tags: ['개발', '파이썬', '코딩'],
    author: '오타니',
  },
  {
    id: 8,
    title: '파이썬으로 5분만에 구슬깨기 게임 만들어주는 프롬프트',
    model: 'Claude',
    tags: ['개발', '파이썬', '코딩'],
    author: '오타니',
  },
  {
    id: 9,
    title: '파이썬으로 5분만에 구슬깨기 게임 만들어주는 프롬프트',
    model: 'Claude',
    tags: ['개발', '파이썬', '코딩'],
    author: '오타니',
  },
  {
    id: 10,
    title: '파이썬으로 5분만에 구슬깨기 게임 만들어주는 프롬프트',
    model: 'Claude',
    tags: ['개발', '파이썬', '코딩'],
    author: '오타니',
  },
];

const MyPromptPage = () => {
  const [activeTab, setActiveTab] = useState<'authored' | 'downloaded' | 'liked'>('authored'); // 'authored', 'downloaded', 'liked'
  const [prompts, setPrompts] = useState(DUMMY_LIKED_PROMPTS2);

  const DeleteLikedPrompt = (id: number) => {
    setPrompts((prevPrompts) => prevPrompts.filter((prompt) => prompt.id !== id));
  };

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

  return (
    <div className="flex  justify-center pt-[92px] min-h-screen bg-background">
      <div className=" w-full max-w-[1236px] mx-[102px] ">
        <div className="flex items-center gap-[10px] mb-[56px]">
          <img src={BlueArchiveIcon} alt="BlueArchiveIcon" className="w-[24px] h-[24px]" />
          <h1 className="text-[32px] text-primary-hover font-bold">내 프롬프트</h1>
        </div>
        <MyPromptsTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className=" bg-white">
          <div className="mr-[8px] overflow-y-auto max-h-[368px]">
            {prompts.map((prompt) => (
              <PromptCard
                key={prompt.id}
                type={activeTab}
                promptData={prompt}
                DeletePrompt={() => {}}
                EditPrompt={() => {}}
                DeleteLike={() => DeleteLikedPrompt(prompt.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPromptPage;
