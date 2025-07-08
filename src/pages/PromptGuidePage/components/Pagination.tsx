import { BsPaperclip } from 'react-icons/bs';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
interface Postlist {
  id: number;
  title: string;
  file_url: null | string;
  create_at: string;
}
// 페이지네이션 테이블
export function PromptTableList({ data, onRowClick }: { data: Postlist[]; onRowClick: (id: number) => void }) {
  return (
    <table className="w-[1236px] h-[530px] mt-[53px] mb-[104px] mx-[102px]">
      <thead>
        <tr className="h-[90px] border-b-[1px] border-[var(--color-text-on-white)] pt-[10px] pb-[10px] bg-[var(--color-background)] font-bold text-[24px] text-[var(--color-text-on-white)]">
          <th className="w-[750px] h-[70px] px-[10px] py-[20px] ">제목</th>
          <th className="w-[223px] h-[70px] px-[10px] py-[20px] ">첨부</th>
          <th className="w-[263px] h-[70px] px-[10px] py-[20px] ">등록일</th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={3} className="text-center py-4 text-gray-400">
              게시글이 없습니다.
            </td>
          </tr>
        ) : (
          data.map((post) => (
            <tr
              key={post.id}
              className="h-[88px] py-[10px] border-b-[1px]  border-[var(--color-white-stroke)] bg-[var(--color-white)] hover:bg-[var(--color-secondary)] focus:bg-[var(--color-secondary-pressed)]"
              onClick={() => onRowClick(post.id)}>
              <td className="w-[750px] h-[65px] px-[80px] py-[20px] text-left font-medium text-[20px] text-[var(--color-text-on-white)]">
                {post.title}
              </td>
              <td className=" w-[223px] h-[65px] px-[10px] py-[20px]">
                <div className="flex justify-center items-center">{post.file_url ? <BsPaperclip size={28} /> : ''}</div>
              </td>
              <td className="w-[263px] h-[65px] text-center font-medium text-[20px] text-[var(--color-text-on-background)]">
                {post.create_at}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

//  페이지네이션 컴포넌트
export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  const pageButtons = [];
  for (let i = 1; i <= totalPages; i++) {
    pageButtons.push(
      <button
        key={i}
        onClick={() => onPageChange(i)}
        className={`w-[50px] h-[50px] rounded-[50px] p-[10px] ${
          currentPage === i
            ? 'bg-[var(--color-primary-hover)] font-medium text-[20px] text-[var(--color-white)]'
            : 'font-medium text-[20px] text-[var(--color-text-on-background)] hover:bg-[#F0F7FF]'
        }`}
        disabled={currentPage === i}>
        {i}
      </button>,
    );
  }
  return (
    <nav className="flex items-center justify-center h-[50px] mx-[545px] mb-[60px]">
      <button
        className="w-[50px] h-[50px] px-[6px] py-[8px]"
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}>
        <LuChevronLeft />
      </button>
      {pageButtons}
      <button
        className="w-[50px] h-[50px] px-[6px] py-[8px]"
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}>
        <LuChevronRight />
      </button>
    </nav>
  );
}
