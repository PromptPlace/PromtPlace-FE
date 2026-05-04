import React from 'react';
import SignInDashboard from '@pages/AdminPage/components/AdminDashboardComponents/SignInDashboard.tsx';
import UserVisitDashboard from '@pages/AdminPage/components/AdminDashboardComponents/UserVisitDashboard.tsx';

const AdminUserDashboard = () => {
  return (
    <div>
      <div className="justify-center text-2xl mb-5">사용자</div>
      <div className="flex gap-5 mb-8">
        <SignInDashboard />
        <UserVisitDashboard />
      </div>
    </div>
  );
};

export default AdminUserDashboard;
