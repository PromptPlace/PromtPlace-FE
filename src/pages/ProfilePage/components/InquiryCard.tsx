import clsx from 'clsx';

import CheckIcon from '@assets/icon-check-circle.svg';
import DotsIcon from '@assets/icon-dot.svg';
import { useEffect, useRef, useState } from 'react';

interface InquiryCardProps {
  inquiry_id: number;
  sender_nickname: string;
  status: string;
  created_at: string;
  onClick: () => void;
  onRead: (id: number) => void;
  onDelete: (id: number) => void;
}

const InquiryCard = ({
  inquiry_id,
  sender_nickname,
  status,
  created_at,
  onClick,
  onRead,
  onDelete,
}: InquiryCardProps) => {
  const [isDotsClicked, setIsDotsClicked] = useState(false);

  const clickPosition = useRef<HTMLDivElement | null>(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateModalPosition = () => {
      if (clickPosition.current) {
        const rect = clickPosition.current.getBoundingClientRect();

        setModalPosition({
          top: rect.top + window.scrollY + 40,
          left: rect.left + window.scrollX - 65,
        });
      }
    };

    if (isDotsClicked) {
      updateModalPosition();
      window.addEventListener('scroll', updateModalPosition);
    }

    return () => {
      window.removeEventListener('scroll', updateModalPosition);
    };
  }, [isDotsClicked]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current?.contains(e.target as Node) &&
        clickPosition.current &&
        !clickPosition.current?.contains(e.target as Node)
      ) {
        setIsDotsClicked(false);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="flex justify-between items-center pl-[80px] py-[20px] max-lg:p-[12px] max-lg:mr-[4px] bg-white border-b border-b-white-stroke">
      <div onClick={onClick} className="flex w-full justify-between items-center">
        <div className="flex flex-col gap-[10px] max-lg:gap-[4px] flex-1 w-full max-w-[636px] max-lg:max-w-[116px] w-full cursor-pointer">
          <div
            className={clsx(
              'text-[20px] font-medium leading-[25px] max-lg:text-[12px] max-lg:leading-[15px]',
              status === 'waiting' && 'text-text-on-white',
              status === 'read' && 'text-text-on-background',
            )}>
            {new Date(created_at).toLocaleDateString().slice(0, 11)}{' '}
            {new Date(created_at)
              .toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
                timeZone: 'Asia/Seoul',
              })
              .replace(/(\d+:\d+) (\w+)/, '$2 $1')}
          </div>
          {status === 'waiting' && (
            <div className="flex gap-[10px] max-lg:gap-[8px] items-center">
              <div className="w-[20px] h-[20px] max-lg:w-[8px] max-lg:h-[8px] rounded-full bg-primary-hover"></div>
              <p className="text-primary-hover text-[20px] font-medium leading-[25px] max-lg:text-[12px] max-lg:leading-[15px] max-lg:font-normal">
                읽지 않음
              </p>
            </div>
          )}
        </div>

        {status === 'waiting' && <div className="max-w-[223px] max-lg:max-w-[16px] w-full flex justify-center"></div>}

        {status === 'read' && (
          <div className="max-w-[223px] max-lg:max-w-[15px] max-lg:max-h-[15px] w-full flex justify-center">
            <div className="w-[32px] h-[32px] max-lg:max-w-[15px] max-lg:max-h-[15px]">
              <img src={CheckIcon} alt="읽음" className="w-full h-full object-contain" />
            </div>
          </div>
        )}

        <div
          className={clsx(
            'max-w-[263px] max-lg:max-w-[67px] w-full text-center text-[20px] font-medium leading-[25px] max-lg:text-[12px] max-lg:leading-[15px] flex justify-center items-center',
            status === 'waiting' && 'text-text-on-white',
            status === 'read' && 'text-text-on-background',
          )}>
          {sender_nickname}
        </div>
      </div>

      <div className="cursor-pointer max-w-[115px] max-lg:max-w-none w-full max-lg:w-auto flex items-center justify-center">
        <div
          ref={clickPosition}
          onClick={() => setIsDotsClicked(true)}
          className="w-[28px] h-[28px] max-lg:w-[16px] max-lg:h-[16px] hover:bg-secondary-pressed flex items-center justify-center rounded-full">
          <img src={DotsIcon} alt="선택" />

          {isDotsClicked && (
            <>
              <div
                ref={menuRef}
                style={{ top: modalPosition.top, left: modalPosition.left }}
                className="max-lg:hidden absolute flex flex-col whitespace-nowrap">
                <button
                  onClick={() => onDelete(inquiry_id)}
                  className="py-[8px] px-[16px] max-lg:py-[4px] max-lg:px-[12px] bg-secondary rounded-t-[4px] border-b border-b-white-stroke text-text-on-background text-[16px] font-normal leading-[20px] max-lg:text-[10px] max-lg:leading-[13px] active:bg-secondary-pressed active:text-text-on-white">
                  삭제하기
                </button>
                <button
                  onClick={() => {
                    onRead(inquiry_id);
                    setTimeout(() => setIsDotsClicked(false), 0);
                  }}
                  className="py-[8px] px-[16px] max-lg:py-[4px] max-lg:px-[12px] bg-secondary rounded-b-[4px] text-text-on-background text-[16px] font-normal leading-[20px] max-lg:text-[10px] max-lg:leading-[13px] active:bg-secondary-pressed active:text-text-on-white">
                  읽음표시
                </button>
              </div>

              <div
                ref={menuRef}
                style={{ top: modalPosition.top - 18, left: modalPosition.left + 20 }}
                className="lg:hidden absolute flex flex-col whitespace-nowrap">
                <button
                  onClick={() => onDelete(inquiry_id)}
                  className="py-[8px] px-[16px] max-lg:py-[4px] max-lg:px-[12px] bg-secondary rounded-t-[4px] border-b border-b-white-stroke text-text-on-background text-[16px] font-normal leading-[20px] max-lg:text-[10px] max-lg:leading-[13px] active:bg-secondary-pressed active:text-text-on-white">
                  삭제하기
                </button>
                <button
                  onClick={() => {
                    onRead(inquiry_id);
                    setTimeout(() => setIsDotsClicked(false), 0);
                  }}
                  className="py-[8px] px-[16px] max-lg:py-[4px] max-lg:px-[12px] bg-secondary rounded-b-[4px] text-text-on-background text-[16px] font-normal leading-[20px] max-lg:text-[10px] max-lg:leading-[13px] active:bg-secondary-pressed active:text-text-on-white">
                  읽음표시
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default InquiryCard;
