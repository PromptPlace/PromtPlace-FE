import { useAuth } from '@/context/AuthContext';
import React from 'react';
import CategorySection from './components/CategorySection';
import PromptCard from '../../components/PromptCard';
import Filter from './components/Filter';
import useGetPromptList from '@/hooks/queries/MainPage/useGetPromptList';
import PromptGrid from '@/components/PromptGrid';

const NewMainPage = () => {
  const { user } = useAuth();
  const { data, isLoading, isError } = useGetPromptList();

  const prompts = data?.data || [];
  const totalCount = prompts.length;

  console.log(prompts.map((p) => p.models));

  return (
    <div className="px-[102px]">
      <div className="py-[40px]">
        <p className="text-3xl text-gray-950 leading-10">프롬프트 보기</p>
        <p className="mt-[12px] text-gray-950 text-base font-light ">
          다양한 '프롬프트'가 있는 '플레이스'에서 나를 위한 프롬프트를 찾아보세요!
        </p>
      </div>

      <div>
        <CategorySection />
      </div>

      <div className="mt-[40px]">
        <Filter />
      </div>

      <div className="mt-[56px]">
        <div className="self-stretch justify-center mb-[32px]">
          <span className="text-primary text-base font-medium font-['S-Core_Dream'] leading-6">{totalCount}</span>
          <span className="text-gray-950 text-base font-light font-['S-Core_Dream'] leading-6 tracking-tight">
            개의 프롬프트가 있습니다.
          </span>
        </div>

        <PromptGrid prompts={prompts} />
      </div>
    </div>
  );
};

export default NewMainPage;
