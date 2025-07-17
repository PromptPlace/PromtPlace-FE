import React from 'react';
import PromptCard from './components/promptCard';
import FilterBar from './components/filterBar';
import PrompterBar from './components/prompterBar';
import { dummyPrompts, dummyCreators } from './components/../dummyData';
import GradientButton from '@/components/Button/GradientButton';

const MainPage = () => {
  return (
    <div className="flex gap-6 justify-center bg-[#F5F5F5] relative overflow-hidden">
      <div className="w-[858px] h-[820px] mt-[17px] overflow-y-auto pb-32">
        <FilterBar />
        <div className="mt-6 scroll-auto">
          {dummyPrompts.map((prompt) => (
            <PromptCard
              key={prompt.id}
              prompt={prompt}
            />
          ))}
        </div>
      </div>

      <div className='flex flex-col gap-[14px]'>
      <PrompterBar creators={dummyCreators}/>
      </div>

      <div className='fixed bottom-4 justify-center items-center flex flex-col gap-2.5'>
      <GradientButton
        buttonType="imgButton"
        text="프롬프트 작성하기"
        onClick={() => {
          // 프롬프트 작성하기 버튼 클릭 시 실행될 함수
          console.log('프롬프트 작성하기 클릭됨');
        }}
      />
      </div>
    </div>
  );
};

export default MainPage;  