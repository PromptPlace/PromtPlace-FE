import React from 'react';
import UserSignInChart from '@pages/AdminPage/components/AdminDashboardComponents/UserSignInChart.tsx';
import useGetMemberSignupStats from '@hooks/queries/AdminPage/useGetMemberSignupStats.ts';

const SIGNUP_CHANNELS = [
  { key: 'email', label: '자체 가입자', color: '#3B82F6' }, // blue-500
  { key: 'google', label: '구글 가입자', color: '#93C5FD' }, // blue-300
  { key: 'naver', label: '네이버 가입자', color: '#DBEAFE' }, // secondary-pressed
] as const;

const SignInDashboard = () => {
  const { data } = useGetMemberSignupStats();
  const byChannel = data?.data.by_signup_channel;

  const chartData = SIGNUP_CHANNELS.map(({ key, label, color }) => ({
    name: label,
    value: byChannel?.[key].count ?? 0,
    color,
  }));

  return (
    <div className="px-8 py-5 rounded-xl gap-6 flex flex-col justify-center items-center">
      <div className="text-gray-800 text-lg">회원가입자 수</div>
      {/*<div className="w-48 h-48 bg-secondary-pressed rounded-full" />*/}
      <div>
        <UserSignInChart data={chartData} total={data?.data.total_members ?? 0} />
      </div>
      <div>
        {SIGNUP_CHANNELS.map(({ key, label }) => (
          <div key={key} className="mt-4 first:mt-0 flex justify-center items-center gap-1">
            <div className="w-3 h-3 bg-blue-400 rounded-full" />
            <div className="text-xs text-gray-500">{label}</div>
            <div className="text-xs text-gray-700">{(byChannel?.[key].count ?? 0).toLocaleString()}명</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SignInDashboard;
