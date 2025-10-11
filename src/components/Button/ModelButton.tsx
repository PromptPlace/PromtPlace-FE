import CancelIcon from '@assets/modal/icon-cancel_primary-12px.svg?react';
import clsx from 'clsx';

/**
 * 모델 이름을 나타날 때 사용되는 버튼 컴포넌트입니다.
 *
 * @param {boolean} hasDelete -- 삭제 버튼 여부, 넘기지 않는 경우 기본값은 false
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
  text: string;
  onClick?: () => void;
}

const ModelButton = ({ hasDelete = false, text, onClick }: ModelButtonProps) => {
  return (
    <div
      className={clsx(
        hasDelete ? 'custom-button2' : 'custom-button1',
        'bg-sub2 rounded-[1000px] py-[6px] px-[12px] text-white flex gap-[8px] items-center',
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
