/**
 * TODO:
 * - type에 따라 메시지함 / 알림 렌더링 분기 처리 필요
 *
 * @author 김진효
 * **/

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageTableList, Pagination } from './components/MessagePagination';

interface MyMessagePageProps {
  type: 'message' | 'notification';
}
//메시지함
interface Message {
  id: number; //message_id
  sender_id: string; // erd 상에서는 num이지만... 편의상 string으로 수정
  receiver_id: string;
  title: string;
  body: string;
  is_read: boolean;
  read_at: string;
  is_deleted: boolean;
  create_at: string;
  update_at: string;
}
// 더미 데이터 (추후 api 연동시 삭제 또는 수정)
const allMessages: Message[] = [
  {
    id: 1,
    sender_id: '관리자',
    receiver_id: '아메리카노',
    title: '프롬프트 가이드라인 위반 경고',
    body: '본문',
    is_read: false,
    read_at: '2025-07-08',
    is_deleted: false,
    create_at: '2025-07-08',
    update_at: '2025-07-08',
  },
  {
    id: 2,
    sender_id: '홍길동',
    receiver_id: '아메리카노',
    title: '홍길동님이 주토피아노님의 문의에 답변을 남기셨습니다.',
    body: '본문',
    is_read: true,
    read_at: '2025-07-08',
    is_deleted: false,
    create_at: '2025-04-12',
    update_at: '2025-04-12',
  },
];

// 페이지 값 계산
const PAGE_SIZE = 8;
const TOTAL_PAGES = Math.ceil(allMessages.length / PAGE_SIZE);

const MyMessagePage = ({ type }: MyMessagePageProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const navigate = useNavigate();

  const handleTypeChange = (nextType: 'message' | 'notification') => {
    if (nextType !== type) {
      setCurrentPage(1);
      navigate(`/mypage/message/${nextType}`);
    }
  };

  // 페이지별 데이터 슬라이싱
  const pageData = allMessages.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  // 페이지네이션에서 페이지 변경시
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleRowClick = (id: number) => {
    navigate(`/mypage/message/message/${id}`);
  };

  return (
    <div className="min-w-[1440px] min-h-[1024px] w-full h-full bg-[var(--color-background)]">
      <div className="flex justify-between items-center">
        <div className=" w-[360px] h-[60px] mt-[92px] ml-[102px]">
          <button
            onClick={() => handleTypeChange('message')}
            className={`${
              type === 'message'
                ? 'text-[var(--color-primary-hover)] font-bold text-[32px] border-r-[2px] border-r-[var(--color-primary-hover)]'
                : 'text-[var(--color-text-on-background)] font-bold text-[24px]'
            } h-[60px] pt-[10px] pb-[10px] pr-[40px]  -translate-y-[10px]`}>
            <p className="h-[40px]  -translate-y-[6px]">메시지함</p>
          </button>

          <button
            onClick={() => handleTypeChange('notification')}
            className={`${
              type === 'notification'
                ? 'text-[var(--color-primary-hover)] font-bold text-[32px] border-l-[2px] border-l-[var(--color-primary-hover)]'
                : 'text-[var(--color-text-on-background)] font-bold text-[24px] '
            } h-[60px] pt-[10px] pb-[10px] pl-[40px]  -translate-y-[10px]`}>
            <p className="h-[40px] -translate-y-[6px]">알림</p>
          </button>
        </div>
      </div>

      <div>
        <MessageTableList data={pageData} onRowClick={handleRowClick} />
        <Pagination currentPage={currentPage} totalPages={TOTAL_PAGES} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default MyMessagePage;
