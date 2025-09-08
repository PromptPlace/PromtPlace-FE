import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';

import read from '../../../assets/icon-mail-read.svg';
import notread from '../../../assets/icon-mail-notread.svg';
import { GoKebabHorizontal } from 'react-icons/go';
import { useEffect, useRef, useState } from 'react';

import kebabMenu from '@/assets/icon-kebabMenu.svg';

interface MessageList {
  message_id: number;
  title: string;
  sender: string;
  created_at: string;
  is_read: boolean;
}
// 페이지네이션 테이블
export const MessageTableList = ({
  data,
  handleMessageRowClick,
  onDelete,
  onRead,
}: {
  data: MessageList[];
  handleMessageRowClick: (id: number) => void;
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
            <td colSpan={3} className="text-center py-4 text-text-on-background pt-[96px]">
              <p>메시지가 없습니다</p>
            </td>
          </tr>
        ) : (
          data.map((message) => (
            <tr
              key={message.message_id}
              className={`h-[65px] py-[10px] border-b-[1px]  border-white-stroke bg-white cursor-pointer ${message.is_read ? 'text-text-on-white' : 'text-text-on-background'}`}>
              <td className="w-[72px] h-[65px] flex justify-center items-center pt-[13px]">
                {message.is_read ? (
                  <img className="w-[32px] h-[32px]" src={read} alt="읽음" />
                ) : (
                  <img className="w-[32px] h-[32px]" src={notread} alt="안 읽음" />
                )}
              </td>
              <td
                className="w-[563px] h-[65px] text-left font-medium text-[20px]  py-[20px]"
                onClick={() => handleMessageRowClick(message.message_id)}>
                <p className="h-[25px]">{message.title}</p>
              </td>
              <td
                className=" w-[223px] h-[65px] px-[10px] py-[20px]"
                onClick={() => handleMessageRowClick(message.message_id)}>
                <p className="flex justify-center items-center font-medium text-[20px] ">{message.sender}</p>
              </td>
              <td
                className="w-[263px] h-[65px] text-center font-medium text-[20px]  py-[20px]"
                onClick={() => handleMessageRowClick(message.message_id)}>
                {message.created_at}
              </td>
              <td className="w-[115px] h-[65px] flex justify-center py-[16px]">
                <div className="relative">
                  <button
                    onClick={() => setOpenId(openId === message.message_id ? null : message.message_id)}
                    className="flex justify-center items-center w-[28px] h-[28px] rounded-full hover:bg-secondary-pressed">
                    <img className="w-[28px] h-[28px]" src={kebabMenu} alt="...버튼" />
                  </button>
                  {/*드롭다운 */}
                  {openId === message.message_id && (
                    <div
                      ref={menuRef}
                      className="z-30 absolute top-[40px] -left-[5px] bg-secondary rounded-[4px]
                    -translate-x-1/2 w-[91px] flex flex-col">
                      <button
                        className="w-[91px] h-[36px] flex text-center items-center text-gray-500 rounded-t-[4px] px-[16px] py-[8px]
                      border-b-[1px] border-white-stroke"
                        onClick={() => {
                          onDelete(message.message_id);
                          setOpenId(null);
                        }}>
                        <p className="h-[20px] font-[400] text-[16px] text-text-on-background -translate-y-[2px]">
                          삭제하기
                        </p>
                      </button>
                      <button
                        className="w-[91px] h-[36px] flex text-center items-center text-gray-500 rounded-b-[4px] px-[16px] py-[8px]"
                        onClick={() => {
                          onRead(message.message_id);
                          setOpenId(null);
                        }}>
                        <p className="h-[20px] font-[400] text-[16px] text-text-on-background -translate-y-[2px]">
                          읽음표시
                        </p>
                      </button>
                    </div>
                  )}
                </div>
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
  data,
  currentPage,
  totalPages,
  onPageChange,
}: {
  data: MessageList[];
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
    <>
      {data.length === 0 ? (
        <></>
      ) : (
        <div className="absolute top-[900px] ">
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
        </div>
      )}
    </>
  );
}

// 모바일 화면
export const MobileMessage = ({
  data,
  handleMessageRowClick,
  onDelete,
  onRead,
}: {
  data: MessageList[];
  handleMessageRowClick: (id: number) => void;
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
    <div className="w-full max-w-[280px] my-[12px] cursor-pointer flex flex-col justify-center">
      {data.length === 0 ? (
        <div className="w-full flex justify-center items-center h-[60vh]">
          <div className="text-center text-text-on-background">메시지가 없습니다</div>
        </div>
      ) : (
        data.map((message) => (
          <div
            key={message.message_id}
            className="w-full max-w-[280px] h-[81px] flex flex-col justify-center border-b-[1px] border-white-stroke bg-white ">
            <div className="flex justify-center">
              <div className="flex justify-between w-full max-w-[256px]">
                <p className="text-[8px] text-text-on-background font-normal">{message.created_at}</p>
                <div className="relative">
                  <button
                    onClick={() => setOpenId(openId === message.message_id ? null : message.message_id)}
                    className={`flex items-center justify-center h-[16px] w-[16px] rounded-[50px] ${
                      openId === message.message_id ? 'bg-secondary-pressed' : 'bg-transparent'
                    }`}>
                    <img className="w-[10px] h-[10px]" src={kebabMenu} alt="...버튼" />
                  </button>
                  {/*드롭다운 */}
                  {openId === message.message_id && (
                    <div
                      className="absolute right-0 top-full mt-[11px] w-[91px] bg-white rounded-md shadow-lg z-10"
                      ref={menuRef}>
                      <button
                        onClick={() => {
                          onDelete(message.message_id);
                          setOpenId(null);
                        }}
                        className="block w-full h-[36px] text-[16px] border-b-[1px] border-b-white-stroke text-text-on-background bg-secondary active:bg-secondary-pressed rounded-t-[4px]">
                        삭제하기
                      </button>
                      <button
                        onClick={() => {
                          onRead(message.message_id);
                          setOpenId(null);
                        }}
                        className="block w-full h-[36px] text-[16px] text-text-on-background bg-secondary active:bg-secondary-pressed rounded-b-[4px]">
                        읽음표시
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div
                className={`w-full max-w-[256px] h-[16px] flex justify-start items-center mt-[6px] ${message.is_read ? 'text-text-on-background' : 'text-text-on-white'}`}
                onClick={() => handleMessageRowClick(message.message_id)}>
                {message.is_read ? (
                  <img className="w-[16px] h-[16px]" src={read} alt="읽음" />
                ) : (
                  <img className="w-[16px] h-[16px] " src={notread} alt="안 읽음" />
                )}
                <p className={`text-[12px] font-medium ml-[6px]`}>
                  {/*20자까지만 표시 */}
                  {message.title.length > 20 ? message.title.slice(0, 20) + '...' : message.title}
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-[256px] h-[16px] flex justify-start items-center mt-[6px]">
                <p
                  className={`text-[10px] ${message.is_read ? 'text-text-on-background' : 'text-text-on-white'} font-medium`}>
                  {message.sender}
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
