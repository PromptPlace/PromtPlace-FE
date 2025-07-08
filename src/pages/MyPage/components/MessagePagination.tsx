import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';

import read from '../../../assets/icon-mail-read.svg';
import notread from '../../../assets/icon-mail-notread.svg';
import { GoKebabHorizontal } from 'react-icons/go';
import { useEffect, useRef, useState } from 'react';

interface MessageList {
  id: number;
  title: string;
  is_read: boolean;
  sender_id: string;
  create_at: string;
}
// 페이지네이션 테이블
export function MessageTableList({ data, onRowClick }: { data: MessageList[]; onRowClick: (id: number) => void }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  useEffect(() => {
    function handleClickOutside() {
      if (menuRef.current) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <table className="w-[1236px] max-h-[592px] mt-[22px] mb-[73px] mx-[102px]">
      <thead>
        <tr className="h-[72px] border-b-[1px] border-[var(--color-primary-hover)] bg-[var(--color-background)]"></tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={3} className="text-center py-4 text-gray-400">
              아무 연락이 없네요...(귀뚜라미 소리)
            </td>
          </tr>
        ) : (
          data.map((message) => (
            <tr
              key={message.id}
              className="h-[65px] py-[10px] border-b-[1px]  border-[var(--color-white-stroke)] bg-[var(--color-white)] cursor-pointer">
              <td className="w-[72px] h-[65px] flex justify-center items-center pt-[13px]">
                {message.is_read ? (
                  <img className="w-[32px] h-[32px]" src={read} alt="읽음" />
                ) : (
                  <img className="w-[32px] h-[32px]" src={notread} alt="안 읽음" />
                )}
              </td>
              <td
                className="w-[563px] h-[65px] text-left font-medium text-[20px] text-[var(--color-text-on-white)] py-[20px]"
                onClick={() => onRowClick(message.id)}>
                <p className="h-[25px]">{message.title}</p>
              </td>
              <td className=" w-[223px] h-[65px] px-[10px] py-[20px]" onClick={() => onRowClick(message.id)}>
                <p className="flex justify-center items-center font-medium text-[20px] text-[var(--color-text-on-white)]">
                  {message.sender_id}
                </p>
              </td>
              <td
                className="w-[263px] h-[65px] text-center font-medium text-[20px] text-[var(--color-text-on-white)] py-[20px]"
                onClick={() => onRowClick(message.id)}>
                {message.create_at}
              </td>
              <td className="w-[115px] h-[65px] relative flex justify-center py-[16px] -translate-y-[3px]">
                <button
                  onClick={() => setOpen((v) => !v)}
                  className="flex justify-center items-center w-[28px] h-[28px] rounded-full hover:bg-[var(--color-secondary-pressed)] ">
                  <GoKebabHorizontal className="rotate-90" size={28} />
                </button>
                {open && (
                  <div
                    ref={menuRef}
                    className="absolute top-[55px] left-[90px] -translate-x-1/2 z-2 w-[91px] shadow-[0_0_8px_0_rgba(0,0,0,0.12)] bg-[var(--color-secondary)] flex flex-col">
                    <button className="w-[91px] h-[36px] felx text-center items-center text-gray-500 rounded-[4px] px-[16px] py-[8px]">
                      <p className="h-[20px] font-[400] text-[16px] text-[var(--color-text-on-background)] -translate-y-[2px]">
                        삭제하기
                      </p>
                    </button>
                  </div>
                )}
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
        className="w-[50px] h-[50px] px-[6px] py-[8px] flex justify-end items-center"
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}>
        <LuChevronRight />
      </button>
    </nav>
  );
}
