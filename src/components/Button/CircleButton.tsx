import SendIcon from '@assets/icon-send-primary.svg?react';
import PencilIcon from '@assets/icon-edit-primary.svg?react';
import clsx from 'clsx';

/**
 * 아이콘만 있는 원형 버튼 컴포넌트입니다.
 *
 * @param {string} buttonType -- 이미지 종류. 문의하기는 send, 프로필 수정 및 목록 수정은 edit
 * @param {Size} size -- 버튼 크기. 목록 수정은 sm
 * @param {function} onClick -- 버튼 클릭 시 실행될 함수
 *
 * @example
 * <CircleButton buttonType="send" size="md" onClick={() => {}} />
 *
 * @author 김진효
 * **/

const circleButtonTheme = {
  size: {
    sm: 'w-[32px] h-[32px]',
    md: 'w-[48px] h-[48px]',
  },
};

type Size = keyof typeof circleButtonTheme.size;

interface CircleButtonProps {
  buttonType: 'send' | 'edit';
  size: Size;
  onClick: () => void;
}

const CircleButton = ({ buttonType, size, onClick }: CircleButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border border-primary hover:border-primary-hover active:border-primary-pressed flex justify-center items-center text-primary hover:text-primary-hover active:text-primary-pressed transition-all duration-300 ease-in-out bg-white active:bg-secondary shadow-button hover:shadow-button-hover ${circleButtonTheme.size[size]}`}>
      {buttonType === 'send' && <SendIcon className="w-[25px] h-[24px]" />}
      {buttonType === 'edit' && (
        <PencilIcon className={clsx(size === 'sm' && 'w-[16.5px] h-[16.5px]', size === 'md' && 'w-[22px] h-[22px]')} />
      )}
    </button>
  );
};

export default CircleButton;
