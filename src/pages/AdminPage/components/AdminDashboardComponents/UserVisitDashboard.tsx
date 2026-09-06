import React from 'react';
import arrowUp from '../../assets/icon-arrow-blue.svg';
import arrowDown from '../../assets/icon-arrow-orange.svg';
import DailyVisitChartCard from './DailyVisitChartCard';
import useGetVisitorStats from '@hooks/queries/AdminPage/useGetVisitorStats.ts';
import useGetActiveUserStats from '@hooks/queries/AdminPage/useGetActiveUserStats.ts';
import { formatChangeRate } from '@pages/AdminPage/utils/format.ts';
import { DUMMY_VISITOR_STATS, DUMMY_ACTIVE_USER_STATS } from '@pages/AdminPage/utils/dummyDashboardData.ts';

const UserVisitDashboard = () => {
  // 데이터 부족으로 확인이 어려워 PM 요청에 따라 더미 데이터로 대체. API 호출 자체는 유지.
  useGetVisitorStats();
  useGetActiveUserStats();
  const visitorStats = DUMMY_VISITOR_STATS;
  const activeUserStats = DUMMY_ACTIVE_USER_STATS;

  const visitorChange = formatChangeRate(visitorStats.change_rate);
  const activeUserChange = formatChangeRate(activeUserStats.change_rate);

  return (
    <div className="flex flex-col justify-center items-center gap-6">
      <div className="text-gray-800 text-lg">사용자 지표</div>
      <DailyVisitChartCard />

      <div className="flex mt-4 justify-center items-center gap-[15px]">
        {/*최근 30일 방문자*/}
        <div className="bg-background rounded-xl w-58 h-20 px-4 py-3 gap-2">
          <div className="text-gray-500 text-sm">최근 30일 방문자</div>
          <div className="flex mt-2 gap-2">
            <div className="text-lg text-gray-700">{visitorStats.current_count.toLocaleString()}명</div>
            {visitorChange && (
              <div className="flex">
                <img
                  className="w-5 h-5"
                  src={visitorChange.isPositive ? arrowUp : arrowDown}
                  alt={visitorChange.isPositive ? '상승 아이콘' : '하락 아이콘'}
                />
                <div
                  className={`h-[21px] text-sm justify-center items-center ${visitorChange.isPositive ? 'text-primary' : 'text-alert'}`}>
                  {visitorChange.percent} 전달 대비
                </div>
              </div>
            )}
          </div>
        </div>

        {/*최근 30일 활성 사용자*/}
        <div className="bg-background rounded-xl w-58 h-20 px-4 py-3 gap-2">
          <div className="text-gray-500 text-sm">최근 30일 활성 사용자</div>
          <div className="flex mt-2 gap-2">
            <div className="text-lg text-gray-700">{activeUserStats.current_count.toLocaleString()}명</div>
            {activeUserChange && (
              <div className="flex">
                <img
                  className="w-5 h-5"
                  src={activeUserChange.isPositive ? arrowUp : arrowDown}
                  alt={activeUserChange.isPositive ? '상승 아이콘' : '하락 아이콘'}
                />
                <div
                  className={`h-[21px] text-sm justify-center items-center ${activeUserChange.isPositive ? 'text-primary' : 'text-alert'}`}>
                  {activeUserChange.percent} 전달 대비
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserVisitDashboard;
