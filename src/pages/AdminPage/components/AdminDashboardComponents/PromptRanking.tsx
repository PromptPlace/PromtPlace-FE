import React from 'react';
import type { promptRankingProps, promptSalesRankingProps } from '@/types/AdminPage/dashboard';
import viewIcon from '@/assets/icon-eye.svg';
import downloadIcon from '@/assets/icon-download-gray.svg';
import { formatPrice } from '@/pages/MyPage/utils/format';

const PromptRanking = ({ prompts }: { prompts: promptRankingProps[] }) => {
  return (
    <>
      {prompts.map((prompt) => (
        <div key={prompt.rank} className="flex flex-col gap-2">
          <div className="flex gap-5">
            <div className="text-gray-700 text-xs">#{prompt.rank}</div>
            <div className="text-sm">{prompt.title}</div>
          </div>
          <div className="ml-9 flex gap-3 mb-4">
            <div className="flex justify-center items-center gap-1.5">
              <img className="w-6 h-6" src={viewIcon} />
              <span className="text-gray-500 text-sm">{prompt.views}</span>
            </div>

            <div className="flex justify-center items-center gap-1.5">
              <img className="w-6 h-6" src={downloadIcon} />
              <span className="text-gray-500 text-sm">{prompt.downloads}</span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

// 매출 상위 프롬프트는 조회수/다운로드 대신 매출액만 제공되어 아이콘 없이 금액만 표시합니다.
export const PromptSalesRanking = ({ prompts }: { prompts: promptSalesRankingProps[] }) => {
  return (
    <>
      {prompts.map((prompt) => (
        <div key={prompt.rank} className="flex flex-col gap-2">
          <div className="flex gap-5">
            <div className="text-gray-700 text-xs">#{prompt.rank}</div>
            <div className="text-sm">{prompt.title ?? '삭제된 프롬프트'}</div>
          </div>
          <div className="ml-9 flex gap-3 mb-4">
            <div className="flex justify-center items-center gap-1.5">
              <span className="text-gray-500 text-sm">{formatPrice(prompt.totalSales)}</span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default PromptRanking;
