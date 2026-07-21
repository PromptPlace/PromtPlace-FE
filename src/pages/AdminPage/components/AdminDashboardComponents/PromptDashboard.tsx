import React from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import PromptRanking, {
  PromptSalesRanking,
} from '@pages/AdminPage/components/AdminDashboardComponents/PromptRanking.tsx';
import useGetNewPromptStats from '@hooks/queries/AdminPage/useGetNewPromptStats.ts';
import useGetPopularPrompts from '@hooks/queries/AdminPage/useGetPopularPrompts.ts';
import useGetTopSalesPrompts from '@hooks/queries/AdminPage/useGetTopSalesPrompts.ts';
import { formatChartDateLabel } from '@pages/AdminPage/utils/format.ts';

const PromptDashboard = () => {
  const { data: newPromptStats } = useGetNewPromptStats();
  const { data: popularPrompts } = useGetPopularPrompts();
  const { data: topSalesPrompts } = useGetTopSalesPrompts();

  const dailyUploadsChartData = (newPromptStats?.data.daily_uploads ?? []).map((item) => ({
    label: formatChartDateLabel(item.date),
    count: item.count,
  }));

  const popularRanking = (popularPrompts?.data.items ?? []).map((item) => ({
    rank: item.rank,
    title: item.title,
    views: item.views_delta,
    downloads: item.downloads_delta,
  }));

  const topSalesRanking = (topSalesPrompts?.data.items ?? []).map((item) => ({
    rank: item.rank,
    title: item.title,
    totalSales: item.total_sales,
  }));

  return (
    <div className="px-5 py-8 bg-white rounded-xl">
      <div className="pb-5 text-2xl">프롬프트</div>
      <div>
        <div className="flex flex-col items-center justify-center py-5 gap-8">
          <div className="flex flex-col items-center justify-center">
            <div className="text-gray-800 text-lg">신규 프롬프트</div>
            <div className="text-gray-500 text-xs">기본 조회 기간 : 7일 기준</div>
          </div>
          <div className="w-[288px] h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyUploadsChartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid stroke="#E5E7EB" vertical={false} />
                <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 10 }} />
                <YAxis
                  allowDecimals={false}
                  axisLine={false}
                  tickLine={false}
                  width={24}
                  tick={{ fill: '#6B7280', fontSize: 10 }}
                />
                <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center w-full gap-[15px]">
            <div className="bg-background rounded-xl px-4 py-3 w-full">
              <div className="text-gray-500 text-sm">일일 업로드</div>
              <div className="text-gray-700 text-lg">{newPromptStats?.data.daily_count ?? 0}개</div>
            </div>
            <div className="bg-background rounded-xl px-4 py-3 w-full">
              <div className="text-gray-500 text-sm">주간 업로드</div>
              <div className="text-gray-700 text-lg">{newPromptStats?.data.weekly_count ?? 0}개</div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex flex-col items-center justify-center py-8 gap-1">
            <div className="text-gray-800 text-lg">인기 프롬프트</div>
            <div className="text-gray-500 text-xs">기본 조회 기간 : 7일 기준</div>
          </div>
          <PromptRanking prompts={popularRanking} />
        </div>
        <div>
          <div className="flex flex-col items-center justify-center py-8 gap-1">
            <div className="text-gray-800 text-lg">매출 상위 프롬프트</div>
            <div className="text-gray-500 text-xs">기본 조회 기준 : 최근 한 달 매출액</div>
          </div>
          <PromptSalesRanking prompts={topSalesRanking} />
        </div>
      </div>
    </div>
  );
};

export default PromptDashboard;
