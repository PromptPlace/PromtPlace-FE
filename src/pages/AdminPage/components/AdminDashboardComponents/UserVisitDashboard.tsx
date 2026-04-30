import React from 'react';
import arrowDown from '../../assets/icon-arrow-orange.svg';
import arrowUp from '../../assets/icon-arrow-blue.svg';

const UserVisitDashboard = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-6">
      <div className="text-gray-800 text-lg">사용자 지표</div>
      <div className="w-120 h-56">사용자 그래프</div>
      <div className="flex mt-4 justify-center items-center gap-[15px]">
        {/*이번 달 방문자*/}
        <div className="bg-background rounded-xl w-58 h-20 px-4 py-3 gap-2">
          <div className="text-gray-500 text-sm">이번달 방문자</div>
          <div className="flex mt-2 gap-2">
            <div className="text-lg text-gray-700">270명</div>
            <div className="flex">
              <img className="w-5 h-5" src={arrowUp} />
              <div className="h-[21px] text-sm text-primary justify-center items-center">28.6% 전달 대비</div>
            </div>
          </div>
        </div>

        {/*이번 달 활성 사용자*/}
        <div className="bg-background rounded-xl w-58 h-20 px-4 py-3 gap-2">
          <div className="text-gray-500 text-sm">이번달 방문자</div>
          <div className="flex mt-2 gap-2">
            <div className="text-lg text-gray-700">270명</div>
            <div className="flex">
              <img className="w-5 h-5" src={arrowUp} />
              <div className="h-[21px] text-sm text-primary justify-center items-center">28.6% 전달 대비</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserVisitDashboard;
