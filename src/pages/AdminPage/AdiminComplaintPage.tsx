import ComplaintCard from './components/ComplaintCard';
import { useState } from 'react';
import Pagination from './components/Pagination';
import { useComplaintsInfiniteQuery } from '@/hooks/queries/AdminPage/useGetComplaints';
import { useEffect } from 'react';


/**
 * TODO:
 *
 * - 전체적인 아웃라인 UI구현
 * - 신고 상세 페이지로 이동하는 Link 컴포넌트 구현
 * - 신고 목록 페이지 페이징 UI 구현
 *
 * - api 연동과 관련된 함수 추후 작성 예정
 * @author_nickname 류동현
 * **/

//더미데이터
const dummyData = [
  {
    report_id: 56,
    prompt_id: 2069,
    prompt_title: '프롬프트 제목프롬프트 제목프롬프트 제목프롬롬프트 제목프롬프트 프트 제목프롬프트 제목',
    reporter_id: 12,
    reporter_nickname: '밍밍 닉네임1',
    created_at: '2025-07-27T12:11:02.000Z',
    is_read: 'false',
  },
  {
    report_id: 57,
    prompt_id: 12,
    prompt_title: '프롬프트 제목2',
    reporter_id: 13,
    reporter_nickname: '신고자 닉네임2',
    created_at: '2025-07-28T12:11:02.000Z',
    is_read: 'true',
  },
  {
    report_id: 58,
    prompt_id: 15,
    prompt_title: '프롬프트 제목3',
    reporter_id: 14,
    reporter_nickname: '신고자 닉네임3',
    created_at: '2025-07-29T12:11:02.000Z',
    is_read: 'false',
  },
  {
    report_id: 56,
    prompt_id: 2069,
    prompt_title: '프롬프트 제목프롬프트 제목프롬프트 제목프롬롬프트 제목프롬프트 프트 제목프롬프트 제목',
    reporter_id: 12,
    reporter_nickname: '신고자 닉네임1',
    created_at: '2025-07-27T12:11:02.000Z',
    is_read: 'false',
  },
  {
    report_id: 57,
    prompt_id: 12,
    prompt_title: '프롬프트 제목2',
    reporter_id: 13,
    reporter_nickname: '신고자 닉네임2',
    created_at: '2025-07-28T12:11:02.000Z',
    is_read: 'true',
  },
  {
    report_id: 58,
    prompt_id: 15,
    prompt_title: '프롬프트 제목3',
    reporter_id: 14,
    reporter_nickname: '신고자 닉네임3',
    created_at: '2025-07-29T12:11:02.000Z',
    is_read: 'false',
  },
] as const;

const AdminComplaintPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useComplaintsInfiniteQuery();

  //임시방편
  useEffect(() => {
    const loadedPages = data?.pages.length || 0;
    if (currentPage > loadedPages && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [currentPage, data, hasNextPage, fetchNextPage, isFetchingNextPage]);

  const currentReports = data?.pages?.[currentPage - 1]?.data?.reports || [];
  const totalPages = hasNextPage ? currentPage + 1 : data?.pages.length;

  return (
    <div className="w-[1236px]  mx-auto pt-[64px]">
      <div className="custom-h1 text-black mb-[56px]">신고함</div>
      <div className="flex mb-[20px]">
      <p className="custom-body3 text-black mr-[5.5px]">총</p>
      <p className="custom-body3 text-primary">{currentReports.length}</p>
      <p className="custom-body3 text-black">건</p>
      </div>
      <div className="bg-white rounded-[12px] py-[16px] px-[12px]">
      {currentReports.map((complaint) => (
        <ComplaintCard key={complaint.report_id} complaint={complaint} />
      ))}
      </div>

      <footer className="mt-[97px]">
        <Pagination currentPage={currentPage} totalPages={totalPages || 1} onPageChange={setCurrentPage} />
      </footer>
    </div>
  );
};
export default AdminComplaintPage;
