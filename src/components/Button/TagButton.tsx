import CancelIcon from '@assets/icon-cancel.svg';

/**
 * 태그가 달린 버튼에서 사용하는 버튼 컴포넌트입니다.
 *
 * @param {boolean} hasDelete -- 삭제 버튼 여부
 * 지우는 버튼이 있는 경우에는 true로 넘기면 됩니다.
 * @param {string} text -- 버튼 내용
 * @param {function} onClick -- 버튼 클릭 시 실행될 함수
 *
 * @example
 * <TagButton hasDelete={false} text="#글쓰기" onClick={() => {}} />
 *
 *
 * @author 김진효
 * **/

interface TagButtonProps {
  hasDelete: boolean;
  text: string;
  onClick: () => void;
}

const TagButton = ({ hasDelete, text, onClick }: TagButtonProps) => {
  return (
    <div className="py-[2px] px-[10px] flex justify-center items-center gap-[5px] rounded-[50px] border border-text-on-background bg-white text-sm font-normal leading-[18px] text-text-on-background">
      {text}
      {hasDelete && (
        <div className="cursor-pointer w-[12px] h-[12px]">
          <img src={CancelIcon} alt="닫기" onClick={onClick} className="w-full h-full" />
        </div>
      )}
    </div>
  );
};

export default TagButton;
