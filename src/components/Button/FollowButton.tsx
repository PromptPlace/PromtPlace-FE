import clsx from 'clsx';
import FollowCheckIcon from '@assets/icon-follow-check.svg';

/**
 * 팔로우 버튼 컴포넌트입니다.
 * 팔로우 -> 완료 & 완료 -> 팔로우는 상태에 따라 토글됩니다.
 *
 * @param {boolean} follow -- 팔로우 상태. 팔로우하고 있다면 true, 아니면 false
 * @param {function} onClick -- 버튼 클릭 시 실행될 함수
 *
 * @example
 * <FollowButton
 *     follow={follow}
 *     onClick={() => {
 *       setFollow((prev) => !prev);
 *     }}
 * />
 *
 * @author 김진효
 * **/

interface FollowButtonProps {
  follow: boolean;
  onClick: () => void;
}

const FollowButton = ({ follow, onClick }: FollowButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'h-[28px] w-[77px] px-[10px] rounded-[50px] text-sm font-normal leading-[18px] transition-all duration-300 ease-in-out flex items-center justify-center',
        !follow && 'py-[5px] border border-primary hover:border-primary-hover text-primary hover:text-primary-hover',
        follow && 'bg-primary hover:bg-primary-hover text-white gap-[5.89px]',
      )}>
      {!follow && <>팔로우 +</>}
      {follow && (
        <>
          완료
          <img src={FollowCheckIcon} />
        </>
      )}
    </button>
  );
};

export default FollowButton;
