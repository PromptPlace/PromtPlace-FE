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
  admin?: boolean;
}

const primaryButtonTheme = {
  buttonType: {
    login:
      'rounded-[40px] max-lg:rounded-[4px] max-w-[171px] max-lg:max-w-[112px] w-full py-[9px] max-lg:py-[8px] max-lg:text-[10px] max-lg:font-normal max-lg:leading-[13px] max-lg:tracking-[0.46px] max-lg:border-[0.5px]',
    tip: 'rounded-[40px] max-w-[127px] w-full py-[9px]',
    square:
      'rounded-[10px] max-w-[136px] w-full py-[9px] max-lg:max-w-[77px] max-lg:w-full max-lg:rounded-[4px] max-lg:border-[0.5px] max-lg:text-[10px] max-lg:font-normal max-lg:leading-[13px] max-lg:tracking-[0.46px] max-lg:py-[6.5px] lg:text-base lg:leading-[26px]',
    squareMini:
      'rounded-[10px] max-lg:rounded-[4px] py-[2px] px-[14px] max-lg:px-[8px] max-lg:text-[10px] max-lg:font-normal max-lg:leading-[13px] max-lg:tracking-[0.46px]',
    review:
      'rounded-[50px] h-[41px] py-[5px] max-w-[152px] w-full text-xl leading-[25px] max-lg:rounded-[24px] max-lg:border-[0.5px] max-lg:h-[17px] max-lg:py-[2px] max-lg:max-w-[58px] max-lg:w-full max-lg:text-[10px] max-lg:font-normal max-lg:leading-[13px] max-lg:px-[4.8px] ',
    reviewDelete:
      'rounded-[50px] px-[9px] max-lg:px-[7px] py-[4px] hover:shadow-none max-lg:rounded-[24px] max-lg:border-[0.5px] max-lg:h-[17px] max-lg:py-[2px] max-lg:max-w-[58px] max-lg:w-full max-lg:text-[10px] max-lg:font-normal max-lg:leading-[13px] text-sm leading-[18px]',
    plus: 'rounded-[50px] px-[53px] max-lg:px-[20px] text-[32px] max-lg:text-[16px] font-bold leading-[40px] max-lg:leading-[18px]',
    change: 'rounded-[50px] px-[10px] py-[5px] text-[14px] leading-[18px]',
    admin:
      'rounded-[40px] max-w-[169px] w-full px-[24px] py-[10px] border border-alert text-[16px] font-normal leading-[26px] tracking-[0.46px]',
    squareAdmin:
      'rounded-[10px] max-w-[198px] w-full bg-alert shadow-button px-[29px] py-[10px] text-white text-[24px] font-bold leading-[30px] whitespace-nowrap shrink-0',
  },
};

type ButtonType = keyof typeof primaryButtonTheme.buttonType;

const PrimaryButton = ({ buttonType, text, onClick, type = 'button', admin }: PrimaryButtonProps) => {
  const isReviewDelete = buttonType === 'reviewDelete';
  const isAdmin = buttonType === 'admin';

  return (
    <button
      onClick={onClick}
      type={type}
      className={`border ${isReviewDelete || isAdmin || admin ? 'border-alert text-alert ' : 'border-primary hover:border-primary-hover active:border-primary-pressed text-primary hover:text-primary-hover active:text-primary-pressed active:bg-secondary text-base leading-[26px] bg-white'} flex items-center justify-center shadow-button hover:shadow-button-hover  transition-all ease-in-out duration-300 font-normal tracking-[0.46px] ${primaryButtonTheme.buttonType[buttonType]}`}>
      {text}
    </button>
  );
};

export default PrimaryButton;
