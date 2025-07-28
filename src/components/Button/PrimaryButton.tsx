/**
 * 가장 기본적으로 사용되는 버튼 컴포넌트입니다.
 * 로그인 / 회원가입, 프롬프트 TIP, 내역보기, 로그아웃, 탈퇴하기 버튼에 사용됩니다.
 *
 * @param {string} text -- 버튼 내용
 * @param {ButtonType} buttonType - 버튼 종류
 * 로그인 / 회원가입 버튼은 buttonType="login"
 * 프롬프트 TIP 버튼은 buttonType="tip"
 * 내역보기, 로그아웃, 탈퇴하기 버튼은 buttonType="square" 입니다.
 * 완료, 등록 버튼은 buttonType="squareMini"입니다.
 * 리뷰 작성하기는 buttonType="review" 입니다.
 * 리뷰 삭제는 buttonType="reviewDelete" 입니다.
 * + 버튼은 buttonType="plus" 입니다.
 * @param {function} onClick -- 버튼 클릭 시 실행될 함수
 * @param {string} type -- 버튼 타입, 기본 타입은 button이며 필요에 따라 타입을 지정할 수 있습니다.
 *
 * @example
 * <PrimaryButton
 *    buttonType="login"
 *    text="로그인 / 회원가입"
 *    onClick={() => alert('로그인 / 회원가입 버튼')}
 *    type="button"
 * />
 *
 * @author 김진효
 * **/

interface PrimaryButtonProps {
  buttonType: ButtonType;
  text: string;
  onClick: () => void;
  type?: 'button' | 'submit';
}

const primaryButtonTheme = {
  buttonType: {
    login: 'rounded-[40px] max-w-[171px] w-full py-[9px]',
    tip: 'rounded-[40px] max-w-[127px] w-full py-[9px]',
    square: 'rounded-[10px] max-w-[136px] w-full py-[9px]',
    squareMini: 'rounded-[10px] py-[2px] px-[14px]',
    review: 'rounded-[50px] h-[41px] py-[5px] max-w-[152px] w-full text-xl leading-[25px]',
    reviewDelete: 'rounded-[50px] px-[9px] py-[4px] hover:shadow-none',
    plus: 'rounded-[50px] px-[53px] text-[32px] font-bold leading-[40px]',
    change: 'rounded-[50px] px-[10px] py-[5px] text-[14px] leading-[18px]',
  },
};

type ButtonType = keyof typeof primaryButtonTheme.buttonType;

const PrimaryButton = ({ buttonType, text, onClick, type = 'button' }: PrimaryButtonProps) => {
  const isReviewDelete = buttonType === 'reviewDelete';
  return (
    <button
      onClick={onClick}
      type={type}
      className={`border ${isReviewDelete ? 'border-alert text-alert text-sm leading-[18px]' : 'border-primary hover:border-primary-hover active:border-primary-pressed text-primary hover:text-primary-hover active:text-primary-pressed active:bg-secondary text-base leading-[26px]'} flex items-center justify-center shadow-button hover:shadow-button-hover bg-white transition-all ease-in-out duration-300 font-normal tracking-[0.46px] ${primaryButtonTheme.buttonType[buttonType]}`}>
      {text}
    </button>
  );
};

export default PrimaryButton;
