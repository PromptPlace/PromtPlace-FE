import MyPromptsTabs from './components/MyPromptsTabs';
import {PromptCard} from './components/PromptCard';
import type { Prompt } from './components/PromptCard';
import { useState, useEffect } from 'react';
import BlueArchiveIcon from '@/assets/icon-archive-blue.svg'



//더미데이터
const DUMMY_LIKED_PROMPTS: Prompt[] = [
  { id: 101, title: '강아지 그림 그려주는 프롬프트', model: 'DALL-E',tags:['개발','파이썬','코딩'],author:'홍길동' },
  { id: 102, title: '여행 계획 짜주는 프롬프트', model: 'ChatGPT-4o',tags:['개발','파이썬','코딩'],author:'매튜' },
  { id: 103, title: '블로그 글 초안 작성 프롬프트', model: 'Claude',tags:['개발','파이썬','코딩'],author:'오타니' },
];









const MyPromptPage = () => {

  const [activeTab, setActiveTab] = useState<'authored' | 'downloaded' | 'liked'>('authored'); // 'authored', 'downloaded', 'liked'
  const [prompts, setPrompts] = useState(DUMMY_LIKED_PROMPTS);

  useEffect(() => {
    // 탭이 바뀔 때마다 해당 데이터를 API로 호출하는 로직
    // const fetchedData = await api.getPrompts(activeTab);
    // setPrompts(fetchedData);
  }, [activeTab]);


  return (
    <div className="flex items-center justify-center min-h-screen ">
    <div className=" w-full max-w-[1236px] mx-[102px] ">
      <div className="flex items-center gap-[10px] mb-[56px]">
           <img src={BlueArchiveIcon} alt="BlueArchiveIcon" className="w-[24px] h-[24px]" />
           <h1 className="text-[32px] text-primary-hover font-bold">내 프롬프트</h1>
      </div>
      <MyPromptsTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="mt-4">
        {prompts.map(prompt => (
          <PromptCard key={prompt.id} type={activeTab} promptData={prompt} />
        ))}
      </div>
    </div>
    </div>
  );
  
};

export default MyPromptPage;
