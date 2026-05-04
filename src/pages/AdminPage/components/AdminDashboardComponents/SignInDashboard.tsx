import React from 'react';
import UserSignInChart from '@pages/AdminPage/components/AdminDashboardComponents/UserSignInChart.tsx';

const SignInDashboard = () => {
  return (
    <div className="px-8 py-5 rounded-xl gap-6 flex flex-col justify-center items-center">
      <div className="text-gray-800 text-lg">회원가입자 수</div>
      {/*<div className="w-48 h-48 bg-secondary-pressed rounded-full" />*/}
      <div>
        <UserSignInChart />
      </div>
      <div>
        <div className="flex justify-center items-center gap-1">
          <div className="w-3 h-3 bg-blue-400 rounded-full" />
          <div className="text-xs text-gray-500">자체 가입자</div>
          <div className="text-xs text-gray-700">300명</div>
        </div>
        <div className="mt-4 flex justify-center items-center gap-1">
          <div className="w-3 h-3 bg-blue-400 rounded-full" />
          <div className="text-xs text-gray-500">구글 가입자</div>
          <div className="text-xs text-gray-700">1030명</div>
        </div>
        <div className="mt-4 flex justify-center items-center gap-1">
          <div className="w-3 h-3 bg-blue-400 rounded-full" />
          <div className="text-xs text-gray-500">네이버 가입자</div>
          <div className="text-xs text-gray-700">670명</div>
        </div>
      </div>
    </div>
  );
};

export default SignInDashboard;
