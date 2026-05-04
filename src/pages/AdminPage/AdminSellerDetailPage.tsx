import React from 'react';
import SellerCard from '@pages/AdminPage/components/AdminDashboardComponents/SellerCard.tsx';
import leftArrow from '../../assets/icon-arrow-left.svg';

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

const AdminSellerDetailPage = () => {
  return (
    <div className="mx-[102px]">
      <div className="py-10 text-gray-950 text-3xl">관리자 대시보드</div>

      <div className="bg-white p-8 rounded-xl w-full">
        <div className="flex gap-4 mb-5">
          <img src={leftArrow} className="w-2 h-8" alt="뒤로가기 버튼" />
          <div className="text-2xl">판매자 관리</div>
        </div>
        <div className="pl-4 py-5 gap-3 flex items-center justify-between">
          <input
            className="flex-1 px-5 py-4 bg-background rounded-lg w-100 h-[54px]"
            placeholder="검색어를 입력해주세요. "
          />
          <div className="justify-end flex gap-3 shrink-0">
            <div className="px-4 py-2 bg-secondary rounded-[50px] items-center justify-center text-primary text-sm">
              개인 판매자
            </div>
            <div className="px-4 py-2 bg-secondary rounded-[50px] items-center justify-center text-primary text-sm">
              사업자 판매자
            </div>
            <div className="px-4 py-2 bg-secondary rounded-[50px] items-center justify-center text-primary text-sm">
              승인 대기
            </div>
          </div>
        </div>
        {dummySellers.map((item) => (
          <SellerCard key={item.id} seller={item} />
        ))}
      </div>
    </div>
  );
};

export default AdminSellerDetailPage;
