import React from 'react';
import SellerCard from '@pages/AdminPage/components/AdminDashboardComponents/SellerCard.tsx';
import arrow from '../../assets/arrow-right.svg';
import { useNavigate } from 'react-router-dom';
import SellerDashboardSection from '@pages/AdminPage/components/AdminDashboardComponents/SellerDashboardSection.tsx';

const dummySellers = [
  {
    id: 1,
    hasImage: false,
    image: '',
    nickname: '달팽이',
    name: '정은별',
    email: 'marketstudy@naver.com',
    bank: '국민은행',
    account: '000-0000-0000',
    isBusiness: false,
    isWaiting: false,
    isCompany: false,
  },
  {
    id: 2,
    hasImage: false,
    image: '',
    nickname: '도도',
    name: '곽도윤',
    email: 'example@naver.com',
    bank: '하나은행',
    account: '000-0000-0000',
    isBusiness: true,
    isWaiting: true,
    isCompany: true,
  },
  {
    id: 3,
    hasImage: false,
    image: '',
    nickname: '도도2',
    name: '곽도윤2',
    email: 'example2@naver.com',
    bank: '하나은행',
    account: '000-0000-0000',
    isBusiness: true,
    isWaiting: true,
    isCompany: false,
  },
];

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
