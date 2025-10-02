import ComplaintCard from './components/ComplaintCard';
import { useState } from 'react';
import Pagination from './components/Pagination';

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
  const itemsPerPage = 8;

  return (
    <div className="w-[1236px]  mx-auto pt-[102px]">
      <div className="text-[32px] font-bold text-alert mb-[72px]">신고함</div>
      {dummyData.map((complaint) => (
        <ComplaintCard key={complaint.report_id} complaint={complaint} />
      ))}

      <footer className="mt-[97px]">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(dummyData.length / itemsPerPage)}
          onPageChange={setCurrentPage}
        />
      </footer>
    </div>
  );
};
export default AdminComplaintPage;
