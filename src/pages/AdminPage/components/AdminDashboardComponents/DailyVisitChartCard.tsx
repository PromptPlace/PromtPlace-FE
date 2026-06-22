import React from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import arrowDown from '../../assets/icon-arrow-orange.svg';

type DailyVisitPoint = {
  label: string;
  visitors: number;
};

const dailyVisitData: DailyVisitPoint[] = [
  { label: '4.5', visitors: 110 },
  { label: '4.6', visitors: 145 },
  { label: '4.7', visitors: 95 },
  { label: '4.8', visitors: 130 },
  { label: '4.9', visitors: 120 },
  { label: '4.10', visitors: 160 },
  { label: '4.11', visitors: 170 },
  { label: '오늘', visitors: 180 },
];

const DailyVisitChartCard = () => {
  const todayVisitors = dailyVisitData[dailyVisitData.length - 1]?.visitors ?? 0;

  return (
    <div className="w-full min-w-80 min-h-48 bg-white rounded-2xl p-4 inline-flex flex-col justify-start items-start gap-2 overflow-hidden">
      <div className="self-stretch pb-2 inline-flex justify-between items-center gap-3">
        <div className="text-gray-700 text-sm font-medium leading-5">
          일일 방문자 수 : <span className="text-primary text-lg font-medium leading-6">{todayVisitors}명</span>
        </div>

        <button
          type="button"
          className="h-12 px-4 py-3 bg-gray-50 rounded-lg inline-flex justify-start items-center gap-5 text-text-on-white text-sm font-medium leading-5">
          2026년 4월
          <img className="w-5 h-5" src={arrowDown} alt="월 선택" />
        </button>
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
              ticks={[0, 50, 100, 150, 200]}
              domain={[0, 200]}
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

