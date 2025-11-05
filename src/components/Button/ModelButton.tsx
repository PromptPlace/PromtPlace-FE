import CancelIcon from '@assets/modal/icon-cancel_primary-12px.svg?react';
import clsx from 'clsx';

/**
 * 모델 이름을 나타날 때 사용되는 버튼 컴포넌트입니다.
 *
 * @param {boolean} hasDelete -- 삭제 버튼 여부, 넘기지 않는 경우 기본값은 false
 * @param {boolean} hasActive -- 선택 여부에 따라 달라지는 버튼이라면 true로 넘기면 되며, 기본값은 false입니다.
 * @param {string} text -- 모델 이름
 * @param {function} onClick -- 버튼 클릭 시 실행될 함수
 *
 * @example
 * <ModelButton text="ChatGPT" />
 * <ModelButton hasDelete={true} text="ChatGPT" onClick={() => {}} />
 *
 * @author 김진효
 * **/

interface ModelButtonProps {
  hasDelete?: boolean;
  hasActive?: boolean;
  text: string;
  onClick?: () => void;
}

const ModelButton = ({ hasDelete = false, hasActive = false, text, onClick }: ModelButtonProps) => {
  return (
    <div
      className={clsx(
        hasDelete ? 'custom-button2' : 'custom-button1',
        hasActive
          ? 'custom-button2 cursor-pointer bg-white active:bg-secondary-pressed text-primary border border-primary border-[0.8px]'
          : 'bg-sub2 text-gray-50',
        'rounded-[50px] py-[6px] px-[12px] flex gap-[8px] items-center',
      )}>
      {text}
      {hasDelete && (
        <div className="cursor-pointer w-[12px] h-[12px]">
          <CancelIcon onClick={onClick} className="w-full h-full text-white" />
        </div>
      )}
    </div>
  );
};

export default ModelButton;
