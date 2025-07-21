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
export const MessageTableList = ({
  data,
  onRowClick,
  onDelete,
  onRead,
}: {
  data: MessageList[];
  onRowClick: (id: number) => void;
  onDelete: (id: number) => void;
  onRead: (id: number) => void;
}) => {
  const [openId, setOpenId] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenId(null);
      }
    }
    if (openId !== null) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openId]);
  return (
    <table className="w-full max-w-[1236px] max-h-[592px] mt-[22px] mb-[73px] mx-[102px]">
      <thead>
        <tr className="h-[72px] border-b-[1px] border-primary-hover bg-background"></tr>
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
              className="h-[65px] py-[10px] border-b-[1px]  border-white-stroke bg-white cursor-pointer">
              <td className="w-[72px] h-[65px] flex justify-center items-center pt-[13px]">
                {message.is_read ? (
                  <img className="w-[32px] h-[32px]" src={read} alt="읽음" />
                ) : (
                  <img className="w-[32px] h-[32px]" src={notread} alt="안 읽음" />
                )}
              </td>
              <td
                className="w-[563px] h-[65px] text-left font-medium text-[20px] text-text-on-white py-[20px]"
                onClick={() => onRowClick(message.id)}>
                <p className="h-[25px]">{message.title}</p>
              </td>
              <td className=" w-[223px] h-[65px] px-[10px] py-[20px]" onClick={() => onRowClick(message.id)}>
                <p className="flex justify-center items-center font-medium text-[20px] text-text-on-white">
                  {message.sender_id}
                </p>
              </td>
              <td
                className="w-[263px] h-[65px] text-center font-medium text-[20px] text-text-on-white py-[20px]"
                onClick={() => onRowClick(message.id)}>
                {message.create_at}
              </td>
              <td className="w-[115px] h-[65px] flex justify-center py-[16px] -translate-y-[3px]">
                <div className="relative z-2">
                  <button
                    onClick={() => setOpenId(openId === message.id ? null : message.id)}
                    className="flex justify-center items-center w-[28px] h-[28px] rounded-full hover:bg-secondary-pressed z-10">
                    <GoKebabHorizontal className="rotate-90" size={28} />
                  </button>
                </div>
                {openId === message.id && (
                  <div
                    ref={menuRef}
                    className="z-30 absolute top-[55px] left-[90px] bg-secondary rounded-[4px]
                    -translate-x-1/2 w-[91px] shadow-[0_0_8px_0_rgba(0,0,0,0.12 flex flex-col">
                    <button
                      className="w-[91px] h-[36px] flex text-center items-center text-gray-500 rounded-t-[4px] px-[16px] py-[8px]
                      border-b-[1px] border-white-stroke"
                      onClick={() => {
                        onDelete(message.id);
                        setOpenId(null);
                      }}>
                      <p className="h-[20px] font-[400] text-[16px] text-text-on-background -translate-y-[2px]">
                        삭제하기
                      </p>
                    </button>
                    <button
                      className="w-[91px] h-[36px] flex text-center items-center text-gray-500 rounded-b-[4px] px-[16px] py-[8px]"
                      onClick={() => {
                        onRead(message.id);
                        setOpenId(null);
                      }}>
                      <p className="h-[20px] font-[400] text-[16px] text-text-on-background -translate-y-[2px]">
                        읽음표시
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
};

//  페이지네이션 컴포넌트
export function MessagePagination({
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
    <nav className="flex items-center justify-center h-[50px] mx-[545px] mb-[60px]">
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
  );
}
