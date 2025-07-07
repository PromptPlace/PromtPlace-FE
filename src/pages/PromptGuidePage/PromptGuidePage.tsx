/**
 * TODO:
 * - type에 따라 TIP/공지사항 렌더링 분기 처리 필요
 *
 * @author 김진효
 * **/

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagination, PromptTableList } from './components/Pagination';

/**
 * Memo
 * 1. url : guide/tip, guide/notice
 * 2. 현재 데이터를 더미데이터로 사용하는 중임
 */

interface PromptGuidePageProps {
  type: 'tip' | 'notice';
}
interface Post {
  id: number;
  title: string;
  content: string;
  is_pinned?: boolean; // Notice에서만 사용
  create_at: string;
  update_at: string;
  is_visible: boolean;
  file_url: null | string;
  view_count: number;
}
// 더미 데이터 (추후 api 연동시 삭제 또는 수정)
const allPosts: Post[] = [
  {
    id: 1,
    title: '첫 번째 글',
    content: 'qwerasdf',
    is_pinned: true,
    create_at: '2025-07-01',
    update_at: '2025-07-01,',
    is_visible: true,
    file_url: 'a',
    view_count: 1,
  },
  {
    id: 2,
    title: '두 번째 글',
    content: 'qwerasdf',
    is_pinned: true,
    create_at: '2025-07-01',
    update_at: '2025-07-01,',
    is_visible: true,
    file_url: null,
    view_count: 1,
  },
  {
    id: 3,
    title: '세 번째 글',
    content: 'qwerasdf',
    is_pinned: true,
    create_at: '2025-07-01',
    update_at: '2025-07-01,',
    is_visible: true,
    file_url: 'a',
    view_count: 1,
  },
  {
    id: 4,
    title: '네 번째 글',
    content: 'qwerasdf',
    is_pinned: true,
    create_at: '2025-07-01',
    update_at: '2025-07-01,',
    is_visible: true,
    file_url: null,
    view_count: 1,
  },
  {
    id: 5,
    title: '다섯 번째 글',
    content: 'qwerasdf',
    is_pinned: true,
    create_at: '2025-07-01',
    update_at: '2025-07-01,',
    is_visible: true,
    file_url: 'a',
    view_count: 1,
  },
  {
    id: 6,
    title: '여섯 번째 글',
    content: 'qwerasdf',
    is_pinned: true,
    create_at: '2025-07-01',
    update_at: '2025-07-01,',
    is_visible: true,
    file_url: 'a',
    view_count: 1,
  },
  {
    id: 7,
    title: '일곱 번째 글',
    content: 'qwerasdf',
    is_pinned: true,
    create_at: '2025-07-01',
    update_at: '2025-07-01,',
    is_visible: true,
    file_url: null,
    view_count: 1,
  },
  {
    id: 8,
    title: '여덟 번째 글',
    content: 'qwerasdf',
    is_pinned: true,
    create_at: '2025-07-01',
    update_at: '2025-07-01,',
    is_visible: true,
    file_url: 'a',
    view_count: 1,
  },
  {
    id: 9,
    title: '아홉 번째 글',
    content: 'qwerasdf',
    is_pinned: true,
    create_at: '2025-07-01',
    update_at: '2025-07-01,',
    is_visible: true,
    file_url: null,
    view_count: 1,
  },
  {
    id: 10,
    title: '열 번째 글',
    content: 'qwerasdf',
    is_pinned: true,
    create_at: '2025-07-01',
    update_at: '2025-07-01,',
    is_visible: true,
    file_url: 'a',
    view_count: 1,
  },
];

// 페이지 값 계산
const PAGE_SIZE = 5;
const TOTAL_PAGES = Math.ceil(allPosts.length / PAGE_SIZE);

const PromptGuidePage = ({ type }: PromptGuidePageProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const navigate = useNavigate();

  // useEffect 등으로 api 호출 필요 (데이터 전체 받아올지는 ? 그리고 의존성 배열에 type)

  //팁 <> 공지사항 전환
  const handleTypeChange = (nextType: 'tip' | 'notice') => {
    if (nextType !== type) {
      setCurrentPage(1);
      navigate(`/guide/${nextType}`);
    }
  };

  // 페이지별 데이터 슬라이싱
  const pageData = allPosts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  // 페이지네이션에서 페이지 변경시
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 게시글 클릭시 상세로 이동
  const handleRowClick = (id: number) => {
    navigate(`/guide/${type}/${id}`, { state: { type } });
    //이렇게 안 하면 pageRoutes에서 <Route path="/guide/:type/:id" element={<PromptGuideDetailPage />} />
    //이런 식으로 해야 함 (아마도?)
  };

  return (
    <>
      <div className="flex justify-between items-center w-[360px] h-[60px] ml-[102px] mt-[92px]">
        <button
          onClick={() => handleTypeChange('tip')}
          className={`${
            type === 'tip'
              ? 'text-[var(--color-primary-hover)] font-bold text-[32px] border-r-[2px] border-r-[var(--color-primary-hover)]'
              : 'text-[var(--color-text-on-background)] font-bold text-[24px]'
          } pt-[10px] pb-[10px] pr-[40px]`}>
          프롬프트 TIP
        </button>

        <button
          onClick={() => handleTypeChange('notice')}
          className={`${
            type === 'notice'
              ? 'text-[var(--color-primary-hover)] font-bold text-[32px] border-l-[2px] border-l-[var(--color-primary-hover)]'
              : 'text-[var(--color-text-on-background)] font-bold text-[24px]'
          } pt-[10px] pb-[10px] pl-[40px]`}>
          공지사항
        </button>
      </div>
      <div>
        <PromptTableList data={pageData} onRowClick={handleRowClick} />
        <Pagination currentPage={currentPage} totalPages={TOTAL_PAGES} onPageChange={handlePageChange} />
      </div>
    </>
  );
};

export default PromptGuidePage;
