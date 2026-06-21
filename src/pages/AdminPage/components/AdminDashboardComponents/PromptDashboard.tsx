import React from 'react';
import PromptRanking from '@pages/AdminPage/components/AdminDashboardComponents/PromptRanking.tsx';

const dummyPromptRanking = [
  {
    rank: 1,
    title: '동양풍 일러스트 이미지 생성 프롬프트',
    views: 2109,
    downloads: 120,
  },
  {
    rank: 2,
    title: '동양풍 일러스트 이미지 생성 프롬프트',
    views: 2119,
    downloads: 120,
  },
  {
    rank: 3,
    title: '동양풍 일러스트 이미지 생성 프롬프트',
    views: 2129,
    downloads: 120,
  },
  {
    rank: 4,
    title: '동양풍 일러스트 이미지 생성 프롬프트',
    views: 2139,
    downloads: 120,
  },
  {
    rank: 5,
    title: '동양풍 일러스트 이미지 생성 프롬프트',
    views: 2149,
    downloads: 120,
  },
];

const PromptDashboard = () => {
  return (
    <div className="px-5 py-8 bg-white rounded-xl">
      <div className="pb-5 text-2xl">프롬프트</div>
      <div>
        <div className="flex flex-col items-center justify-center py-5 gap-8">
          <div className="flex flex-col items-center justify-center">
            <div className="text-gray-800 text-lg">신규 프롬프트</div>
            <div className="text-gray-500 text-xs">기본 조회 기간 : 7일 기준</div>
          </div>
          <div className="w-[288px] h-[200px]">프롬프트 개수 그래프</div>
          <div className="flex items-center justify-center w-full gap-[15px]">
            <div className="bg-background rounded-xl px-4 py-3 w-full">
              <div className="text-gray-500 text-sm">일일 업로드</div>
              <div className="text-gray-700 text-lg">6개</div>
            </div>
            <div className="bg-background rounded-xl px-4 py-3 w-full">
              <div className="text-gray-500 text-sm">주간 업로드</div>
              <div className="text-gray-700 text-lg">55개</div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex flex-col items-center justify-center py-8 gap-1">
            <div className="text-gray-800 text-lg">인기 프롬프트</div>
            <div className="text-gray-500 text-xs">기본 조회 기간 : 7일 기준</div>
          </div>
          <PromptRanking prompts={dummyPromptRanking} />
        </div>
        <div>
          <div className="flex flex-col items-center justify-center py-8 gap-1">
            <div className="text-gray-800 text-lg">매출 상위 프롬프트</div>
            <div className="text-gray-500 text-xs">기본 조회 기준 : 최근 한 달 매출액</div>
          </div>
          <PromptRanking prompts={dummyPromptRanking} />
        </div>
      </div>
    </div>
  );
};

export default PromptDashboard;
