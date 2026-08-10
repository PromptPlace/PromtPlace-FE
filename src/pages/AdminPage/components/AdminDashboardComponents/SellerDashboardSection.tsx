import React, { useState } from 'react';
import SellerCard from '@pages/AdminPage/components/AdminDashboardComponents/SellerCard.tsx';
import SearchSellerBar from '@pages/AdminPage/components/AdminDashboardComponents/SearchSellerBar.tsx';
import Pagination from '@pages/AdminPage/components/Pagination.tsx';
import useGetIndividualSellers from '@hooks/queries/AdminPage/useGetIndividualSellers.ts';
import useGetBusinessSellers from '@hooks/queries/AdminPage/useGetBusinessSellers.ts';
import useGetPendingSellers from '@hooks/queries/AdminPage/useGetPendingSellers.ts';
import {
  mapBusinessSellerToCard,
  mapIndividualSellerToCard,
  mapPendingSellerToCard,
} from '@pages/AdminPage/utils/sellerMapper.ts';
import {
  getDummyIndividualSellers,
  getDummyBusinessSellers,
  getDummyPendingSellers,
} from '@pages/AdminPage/utils/dummyDashboardData.ts';

type SellerTab = 'individual' | 'business' | 'pending';

const SELLER_TABS: { key: SellerTab; label: string }[] = [
  { key: 'individual', label: '개인 판매자' },
  { key: 'business', label: '사업자 판매자' },
  { key: 'pending', label: '승인 대기' },
];

const PREVIEW_LIMIT = 3;
const DETAIL_LIMIT = 10;

interface SellerDashboardSectionProps {
  isDetailView?: boolean;
}

const SellerDashboardSection = ({ isDetailView = false }: SellerDashboardSectionProps) => {
  const [activeTab, setActiveTab] = useState<SellerTab>('individual');
  const [searchInput, setSearchInput] = useState('');
  const [page, setPage] = useState(1);

  const limit = isDetailView ? DETAIL_LIMIT : PREVIEW_LIMIT;
  const trimmedSearch = searchInput.trim();
  // user_id 검색은 백엔드 search 파라미터가 지원하지 않아(닉네임/이메일/실명 부분 일치만 지원) 클라이언트에서 후처리합니다.
  const isNumericSearch = trimmedSearch !== '' && /^\d+$/.test(trimmedSearch);
  const backendSearch = !isNumericSearch && trimmedSearch ? trimmedSearch : undefined;

  // 데이터 부족으로 확인이 어려워 PM 요청에 따라 더미 데이터로 대체. API 호출 자체는 유지.
  useGetIndividualSellers({
    params: { page, limit, search: backendSearch },
    enabled: activeTab === 'individual',
  });
  useGetBusinessSellers({
    params: { page, limit, search: backendSearch },
    enabled: activeTab === 'business',
  });
  useGetPendingSellers({
    params: { page, limit },
    enabled: activeTab === 'pending',
  });

  const dummyIndividualData = getDummyIndividualSellers({ page, limit, search: backendSearch });
  const dummyBusinessData = getDummyBusinessSellers({ page, limit, search: backendSearch });
  const dummyPendingData = getDummyPendingSellers({ page, limit });

  const handleTabChange = (tab: SellerTab) => {
    setActiveTab(tab);
    setPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    setPage(1);
  };

  const sellers =
    activeTab === 'individual'
      ? dummyIndividualData.items.map(mapIndividualSellerToCard)
      : activeTab === 'business'
        ? dummyBusinessData.items.map(mapBusinessSellerToCard)
        : dummyPendingData.items.map(mapPendingSellerToCard);

  // 현재 페이지에 이미 불러온 목록 안에서만 user_id를 매칭합니다 (다른 페이지에 있는 대상은 찾지 못하는 한계가 있음).
  const filteredSellers = isNumericSearch
    ? sellers.filter((seller) => String(seller.userId).includes(trimmedSearch))
    : sellers;

  const pagination =
    activeTab === 'individual'
      ? dummyIndividualData.pagination
      : activeTab === 'business'
        ? dummyBusinessData.pagination
        : dummyPendingData.pagination;

  return (
    <div>
      <div className="pl-4 py-5 gap-3 flex items-center justify-between">
        <SearchSellerBar value={searchInput} onChange={handleSearchChange} disabled={activeTab === 'pending'} />
        <div className="justify-end flex gap-3 shrink-0">
          {SELLER_TABS.map(({ key, label }) => (
            <div
              key={key}
              onClick={() => handleTabChange(key)}
              className={`px-4 py-2 rounded-[50px] items-center justify-center text-sm cursor-pointer ${
                activeTab === key ? 'bg-primary text-white' : 'bg-secondary text-primary'
              }`}>
              {label}
            </div>
          ))}
        </div>
      </div>
      {filteredSellers.map((seller) => (
        <SellerCard key={seller.userId} seller={seller} />
      ))}

      {isDetailView && pagination && pagination.total_pages > 1 && (
        <div className="mt-6">
          <Pagination currentPage={pagination.page} totalPages={pagination.total_pages} onPageChange={setPage} />
        </div>
      )}
    </div>
  );
};

export default SellerDashboardSection;
