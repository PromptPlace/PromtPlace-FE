import { BsPaperclip } from 'react-icons/bs';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
interface Postlist {
  post_id: number;
  title: string;
  file_url: null | string;
  created_at: string;
}
// 페이지네이션 테이블
export function PromptTableList({ data, onRowClick }: { data: Postlist[]; onRowClick: (id: number) => void }) {
  return (
    <div className="flex justify-center">
      <table className="w-full max-w-[1236px] max-h-[530px] mt-[53px] mb-[104px] mx-[102px] cursor-pointer">
        <thead>
          <tr className="h-[90px] border-b-[1px] border-text-on-white pt-[10px] pb-[10px] bg-background font-bold text-[24px] text-text-on-white">
            <th className="w-[750px] h-[70px] px-[10px] py-[20px] ">제목</th>
            <th className="w-[223px] h-[70px] px-[10px] py-[20px] ">첨부</th>
            <th className="w-[263px] h-[70px] px-[10px] py-[20px] ">등록일</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr key="no-data">
              <td colSpan={3} className="text-center py-4 text-gray-400">
                게시글이 없습니다.
              </td>
            </tr>
          ) : (
            data.map((post) => (
              <tr
                key={post.post_id}
                className="h-[88px] py-[10px] border-b-[1px]  border-white-stroke bg-white hover:bg-secondary focus:bg-secondary-pressed"
                onClick={() => onRowClick(post.post_id)}>
                <td className="w-[750px] h-[65px] px-[80px] py-[20px] text-left font-medium text-[20px] text-text-on-white">
                  {post.title}
                </td>
                <td className=" w-[223px] h-[65px] px-[10px] py-[20px]">
                  <div className="flex justify-center items-center">
                    {post.file_url ? <BsPaperclip size={28} /> : ''}
                  </div>
                </td>
                <td className="w-[263px] h-[65px] text-center font-medium text-[20px] text-text-on-background">
                  {post.created_at}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
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
            ? 'bg-primary-hover font-medium text-[20px] text-white'
            : 'font-medium text-[20px] text-text-on-background hover:bg-background'
        }`}
        disabled={currentPage === i}>
        {i}
      </button>,
    );
  }
  return (
    <div className="absolute top-[900px] left-[60px]">
      <nav className="flex items-center justify-center h-[50px] mx-[545px] mb-[60px] text-text-on-background">
        <button
          className="w-[50px] h-[50px] px-[6px] py-[8px] rounded-[50px] flex items-center 
        justify-center hover:bg-secondary active:bg-primary-hover active:text-white"
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}>
          <LuChevronLeft />
        </button>
        {pageButtons}
        <button
          className="w-[50px] h-[50px] px-[6px] py-[8px] rounded-[50px] flex items-center 
        justify-center hover:bg-secondary active:bg-primary-hover active:text-white"
          onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}>
          <LuChevronRight />
        </button>
      </nav>
    </div>
  );
}
