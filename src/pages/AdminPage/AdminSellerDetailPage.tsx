import React from 'react';
import SellerCard from '@pages/AdminPage/components/AdminDashboardComponents/SellerCard.tsx';
import leftArrow from '../../assets/icon-arrow-left.svg';
import SellerDashboardSection from '@pages/AdminPage/components/AdminDashboardComponents/SellerDashboardSection.tsx';

const AdminSellerDetailPage = () => {
  return (
    <div className="mx-[102px]">
      <div className="py-10 text-gray-950 text-3xl">관리자 대시보드</div>

      <div className="bg-white p-8 rounded-xl w-full">
        <div className="flex gap-4 mb-5">
          <img src={leftArrow} className="w-2 h-8" alt="뒤로가기 버튼" />
          <div className="text-2xl">판매자 관리</div>
        </div>
        <SellerDashboardSection />
      </div>
    </div>
  );
};

export default AdminSellerDetailPage;
