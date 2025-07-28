import clsx from 'clsx';
import FollowCheckIcon from '@assets/icon-follow-check.svg';

/**
 * 팔로우 버튼 컴포넌트입니다.
 * 팔로우 -> 완료 & 완료 -> 팔로우는 상태에 따라 토글됩니다.
 *
 * @param {boolean} follow -- 팔로우 상태. 팔로우하고 있다면 true, 아니면 false
 * @param {function} onClick -- 버튼 클릭 시 실행될 함수
 * @param {string} size -- 팔로우 버튼 크기, 기본은 "sm"이며 프롬프트 TIP에서만 "lg" 사이즈 사용.
 *                         프롬프트 TIP페이지 외에서는 size 넘기지 않아도 됨.
 * @param {string} type -- 버튼 타입, 기본 타입은 button이며 필요에 따라 타입을 지정할 수 있습니다.
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
  size?: string;
  type?: 'button' | 'submit';
}

const FollowButton = ({ follow, onClick, size = 'sm', type = 'button' }: FollowButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        'rounded-[50px] transition-all duration-300 ease-in-out flex items-center justify-center',
        size === 'sm' && 'h-[28px] w-[77px] px-[10px] text-sm font-normal leading-[18px]',
        size === 'lg' && 'h-[37px] w-[108px] px-[17px] py-[5px] text-[20px] font-bold leading-[25px]',
        !follow &&
          'bg-white py-[5px] border border-primary hover:border-primary-hover text-primary hover:text-primary-hover',
        !follow && size === 'lg' && 'border border-primary-hover text-primary-hover',
        follow && 'bg-primary hover:bg-primary-hover text-white gap-[5.89px]',
        follow && size === 'lg' && 'bg-primary-hover',
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
