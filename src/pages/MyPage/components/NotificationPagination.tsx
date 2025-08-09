import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';

import alarm from '@assets/icon-alarm-black.svg';

interface NotificationList {
  id: number; //notification_id
  content: string;
  created_at: string;
}
// 페이지네이션 테이블
export function NotificationTableList({ data }: { data: NotificationList[] }) {
  return (
    <table className="w-full max-w-[1236px] max-h-[592px] mt-[22px] mb-[73px] mx-[102px]">
      <thead>
        <tr className="h-[72px] border-b-[1px] border-[var(--color-primary-hover)] bg-[var(--color-background)]"></tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={3} className="text-center py-4 text-text-on-background">
              아무 알림이 없네요...(귀뚜라미 소리)
            </td>
          </tr>
        ) : (
          data.map((Notification) => (
            <tr
              key={Notification.id}
              className="h-[65px] py-[10px] border-b-[1px]  border-[var(--color-white-stroke)] bg-[var(--color-white)] cursor-pointer">
              <td className="w-[72px] h-[65px] flex justify-center items-center pt-[10px]">
                <img src={alarm} alt="알림" className="w-[22px] h-[26px]" />
              </td>
              <td className="w-[901px] h-[65px] text-left font-medium text-[20px] text-[var(--color-text-on-white)] py-[20px]">
                <p className="h-[25px]">{Notification.content}</p>
              </td>
              <td className="w-[263px] h-[65px] text-center font-medium text-[20px] text-[var(--color-text-on-white)] py-[20px]">
                {Notification.created_at}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

//  페이지네이션 컴포넌트
export function NotificationPagination({
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
    <div className="absolute top-[900px] ">
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
    </div>
  );
}

// 모바일 화면
export function MobileNotification({ data }: { data: NotificationList[] }) {
  return (
    <div className="w-full max-w-[280px] my-[12px] cursor-pointer flex flex-col justify-center">
      {data.length === 0 ? (
        <div>
          <div className="text-center py-4 text-text-on-background">아무 알림이 없네요...(귀뚜라미 소리)</div>
        </div>
      ) : (
        data.map((Notification) => (
          <div
            key={Notification.id}
            className="h-[56px] border-b-[1px] border-[var(--color-white-stroke)] bg-[var(--color-white)] cursor-pointer">
            <div className="ml-[12px] mt-[12px]">
              <p className="text-[8px] text-text-on-background font-normal">{Notification.created_at}</p>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-[256px] h-[16px] flex justify-start items-center mt-[6px]">
                <img className="w-[16px] h-[16px]" src={alarm} alt="읽음" />

                <p className={`text-[12px] text-text-on-white' font-medium ml-[6px]`}>
                  {/*20자까지만 표시 */}
                  {Notification.content.length > 22 ? Notification.content.slice(0, 22) + '...' : Notification.content}
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
