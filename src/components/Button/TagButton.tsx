import CancelIcon from '@assets/modal/icon-cancel_primary-12px.svg?react';
import clsx from 'clsx';
import { CATEGORY_ICON_BY_LABEL } from '@/constants/PromptCreatePage/categoryLabels';

/**
 * 태그가 달린 버튼 및 카테고리에서 사용하는 버튼 컴포넌트입니다.
 *
 * @param {boolean} hasDelete -- 삭제 버튼 여부
 * 지우는 버튼이 있는 경우에는 true로 넘기면 되고, 기본값은 false입니다.
 * @param {boolean} hasActive -- 선택 여부에 따라 달라지는 버튼이라면 true로 넘기면 되며, 기본값은 false입니다.
 * @param {string} text -- 버튼 내용
 * 버튼 내용에 맞게 이미지가 선택됩니다.
 * @param {function} onClick -- 버튼 클릭 시 실행될 함수
 *
 * @example
 * <TagButton hasDelete={false} text="글쓰기•문서작성" onClick={() => {}} />
 *
 * @author 김진효
 * **/

interface TagButtonProps {
  hasDelete?: boolean;
  hasActive?: boolean;
  text: string;
  onClick?: () => void;
  className?: string;
}

const TagButton = ({ hasDelete = false, hasActive = false, text, onClick, className }: TagButtonProps) => {
  const icon = CATEGORY_ICON_BY_LABEL[text];

  return (
    <div
      className={clsx(
        'custom-button2 py-[6px] px-[12px] flex justify-center items-center gap-[8px] rounded-[50px] whitespace-nowrap text-primary shrink-0 transition-all max-phone:text-[10px]',
        icon && hasDelete ? 'bg-secondary!' : hasDelete ? 'bg-sub2! text-white!' : 'active:bg-secondary border-none',
        hasActive ? 'cursor-pointer bg-white border border-primary border-[0.8px]' : 'cursor-pointer bg-secondary',
        className,
      )}>
      {icon && <img src={icon} alt="이미지" />}
      {text}
      {hasDelete && (
        <div className="cursor-pointer">
          <CancelIcon
            onClick={onClick}
            className={clsx('w-full h-full text-primary', hasDelete && icon ? 'text-primary' : 'text-white')}
          />
        </div>
      )}
    </div>
  );
};

export default TagButton;
