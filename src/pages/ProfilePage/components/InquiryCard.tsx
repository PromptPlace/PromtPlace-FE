import clsx from 'clsx';

import CheckIcon from '@assets/icon-check-circle.svg';
import DotsIcon from '@assets/icon-dot.svg';

interface InquiryCardProps {
  sender_nickname: string;
  status: string;
  created_at: string;
  onClick: () => void;
}

const InquiryCard = ({ sender_nickname, status, created_at, onClick }: InquiryCardProps) => {
  return (
    <div className="flex justify-between items-center pl-[80px] py-[20px] bg-white border-b border-b-white-stroke">
      <div onClick={onClick} className="flex flex-col gap-[10px] flex-1 w-full max-w-[636px] w-full cursor-pointer">
        <div
          className={clsx(
            'text-[20px] font-medium leading-[25px]',
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
          <div className="flex gap-[10px]">
            <div className="w-[20px] h-[20px] rounded-full bg-primary-hover"></div>
            <p className="text-primary-hover text-[20px] font-medium leading-[25px]">읽지 않음</p>
          </div>
        )}
      </div>

      {status === 'waiting' && <div className="max-w-[223px] w-full flex justify-center"></div>}

      {status === 'read' && (
        <div className="max-w-[223px] w-full flex justify-center">
          <img src={CheckIcon} alt="읽음" />
        </div>
      )}

      <div
        className={clsx(
          'max-w-[263px] w-full text-center text-[20px] font-medium leading-[25px]',
          status === 'waiting' && 'text-text-on-white',
          status === 'read' && 'text-text-on-background',
        )}>
        {sender_nickname}
      </div>

      <div className="relative cursor-pointer max-w-[115px] w-full flex items-center justify-center">
        <div className="w-[28px] h-[28px] hover:bg-secondary-pressed flex items-center justify-center rounded-full">
          <img src={DotsIcon} alt="선택" />
        </div>
      </div>
    </div>
  );
};

export default InquiryCard;
