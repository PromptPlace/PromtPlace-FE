import React from 'react';
import arrow from '../../assets/arrow-right.svg';
import { useNavigate } from 'react-router-dom';
import SellerDashboardSection from '@pages/AdminPage/components/AdminDashboardComponents/SellerDashboardSection.tsx';

const AdminSellerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex felx-col gap-10 items-center mb-5">
        <div className="text-2xl">판매자 관리</div>
        <div
          className="flex gap-1 items-center justify-center cursor-pointer"
          onClick={() => {
            navigate('sellers');
          }}>
          <div className="text-gray-500 text-sm">더 많은 판매자 보기</div>
          <img className="left-2 w-1.5 h-3" src={arrow} alt="arrow" />
        </div>
      </div>
      <SellerDashboardSection />
    </div>
  );
};

export default AdminSellerDashboard;
