/**
* SearchPage.tsx
* MainPage에서 검색 기능을 활용할 경우 본 페이지로 이동합니다.
* url로부터 keyword를 받아 활용합니다.

* Author @곽도윤

**/

import React, { useEffect, useState } from 'react';
import PromptCard from './components/promptCard';
import FilterBar from './components/filterBar';
import { dummyPrompts, dummyCreators } from './components/../dummyData';
import GradientButton from '@/components/Button/GradientButton';
import { data, useParams } from 'react-router-dom';
import SearchPrompter from './components/SearchPrompter';

const SearchPage = () => {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [selectedSort, setSelectedSort] = useState<string | null>(null);
  const [onlyFree, setOnlyFree] = useState<boolean>(false);
  const [, setSearch] = useState('');
  const { keyword } = useParams<{ keyword: string }>();
  const [isPending, setIsPending] = useState(true);
  const [isError, setIsError] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      setIsPending(true);
      setIsError('');

      try {
        const response = await fetch(`/api/search?keyword=${keyword}`);
        const data = await response.json();

        if (response.ok) {
          setSearch(data.search.keyword);
          setIsPending(false);
        } else {
          setIsError(data.error || '검색 결과를 불러오는 데 실패했습니다.');
        }
      } catch (error) {
        setIsError('검색 결과를 불러오는 데 실패했습니다.');
      } finally {
        setIsPending(false);
      }
    };
    fetchResults();
    console.log(keyword);
    console.log(data);
  }, [keyword]);

  if (isPending) {
    return <div className="mt-20">Loading</div>;
  }

  if (isError) {
    return <div className="mt-20">Error</div>;
  }

  const filteredByKeyword = dummyPrompts.filter((prompt) => {
    return prompt.keyword?.includes(keyword || '');
  });

  const filterPromptsByModel = filteredByKeyword.filter((prompt) => {
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
    <div className="flex gap-6 justify-center bg-[#F5F5F5] relative overflow-hidden">
      <div className="w-[858px] h-[820px] mt-[53px] mb-[42px] overflow-y-auto pb-32">
        <div className="justify-start text-black text-2xl font-bold">'{keyword}' 검색 결과</div>

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

      <div className="flex flex-col gap-[14px]">
        <SearchPrompter creators={dummyCreators} />
      </div>

      <div className="fixed bottom-4 justify-center items-center flex flex-col gap-2.5">
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

export default SearchPage;
