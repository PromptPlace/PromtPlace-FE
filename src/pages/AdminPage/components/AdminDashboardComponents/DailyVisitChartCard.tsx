import React, { useState } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import ArrowIcon from '@/pages/MyPage/utils/ArrowIcon';
import useGetVisitorStats from '@hooks/queries/AdminPage/useGetVisitorStats.ts';
import { buildRecentMonthOptions, formatChartDateLabel, getCurrentYearMonth } from '@pages/AdminPage/utils/format.ts';
import { DUMMY_VISITOR_STATS, buildDummyMonthDaily } from '@pages/AdminPage/utils/dummyDashboardData.ts';

const DailyVisitChartCard = () => {
  const [month, setMonth] = useState(getCurrentYearMonth);
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
  // 데이터 부족으로 확인이 어려워 PM 요청에 따라 더미 데이터로 대체. API 호출 자체는 유지.
  useGetVisitorStats({ params: { month } });

  const dailyVisitData = buildDummyMonthDaily(month).map((item) => ({
    label: formatChartDateLabel(item.date),
    visitors: item.count,
  }));

  const todayVisitors = DUMMY_VISITOR_STATS.daily_count;
  const monthOptions = buildRecentMonthOptions();
  const selectedMonthLabel = monthOptions.find((option) => option.value === month)?.label ?? month;

  return (
    <div className="w-full min-w-80 min-h-48 bg-white rounded-2xl p-4 inline-flex flex-col justify-start items-start gap-2 overflow-hidden">
      <div className="self-stretch pb-2 inline-flex justify-between items-center gap-3">
        <div className="text-gray-700 text-sm font-medium leading-5">
          일일 방문자 수 : <span className="text-primary text-lg font-medium leading-6">{todayVisitors}명</span>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setIsMonthDropdownOpen((prev) => !prev)}
            className="h-12 px-4 py-3 bg-gray-50 rounded-lg inline-flex justify-start items-center gap-5 text-text-on-white text-sm font-medium leading-5">
            {selectedMonthLabel}
            <ArrowIcon fillColor="#9CA3AF" />
          </button>

          {isMonthDropdownOpen && (
            <div className="absolute right-0 top-[56px] z-10 w-40 max-h-64 overflow-y-auto rounded-[8px] border border-gray-200 bg-white py-[8px] shadow-[0px_4px_8px_0px_rgba(0,0,0,0.12)]">
              {monthOptions.map((option) => {
                const isSelected = option.value === month;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      setMonth(option.value);
                      setIsMonthDropdownOpen(false);
                    }}
                    className={`w-full px-[16px] py-[8px] text-left text-sm ${isSelected ? 'bg-background text-text-on-white' : 'bg-white text-text-on-white hover:bg-gray-50'}`}>
                    {option.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="self-stretch h-40">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={dailyVisitData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="daily-visit-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid stroke="#E5E7EB" vertical={true} horizontal={true} />
            <YAxis
              domain={[0, 'auto']}
              allowDecimals={false}
              axisLine={false}
              tickLine={false}
              width={30}
              tick={{ fill: '#6B7280', fontSize: 10 }}
            />
            <XAxis
              dataKey="label"
              interval={0}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 10 }}
            />
            <Area
              type="monotone"
              dataKey="visitors"
              stroke="#3B82F6"
              strokeWidth={2}
              fill="url(#daily-visit-gradient)"
              dot={false}
              activeDot={{ r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DailyVisitChartCard;
