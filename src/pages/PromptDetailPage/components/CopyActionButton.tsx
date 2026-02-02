import CopyIcon from '@assets/icon-copy.svg?react';
import clsx from 'clsx';

interface CopyButtonProps {
  onClick: () => void;
  className?: string;
}

export default function CopyActionButton({ onClick, className }: CopyButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        //adius 8, gap 8
        'flex items-center justify-center gap-[8px] rounded-[8px]',
        'bg-primary text-white shadow-button hover:shadow-button-hover transition-all duration-300 ease-in-out',
        'hover:bg-primary-hover active:bg-primary-pressed',
        'py-[6px] px-[12px] max-lg:py-[4px] max-lg:px-[10px]',
        // 폰트: 데스크탑 CTA / 모바일 칩
        'custom-button1 max-lg:custom-button2',
        className,
      )}>
      <span>복사하기</span>
      {/*아이콘 20 / 모바일 16 */}
      <CopyIcon className="w-[20px] h-[20px] max-lg:w-[16px] max-lg:h-[16px]" />
    </button>
  );
}
