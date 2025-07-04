/**
 * 가장 기본적으로 사용되는 버튼 컴포넌트입니다.
 * 로그인 / 회원가입, 프롬프트 TIP, 내역보기, 로그아웃, 탈퇴하기 버튼에 사용됩니다.
 *
 * @param {string} text -- 버튼 내용
 * @param {ButtonType} buttonType - 버튼 종류
 * 로그인 / 회원가입 버튼은 buttonType="login"
 * 프롬프트 TIP 버튼은 buttonType="tip"
 * 내역보기, 로그아웃, 탈퇴하기 버튼은 buttonType="square" 입니다.
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

interface PrimaryButtonInterface {
  buttonType: ButtonType;
  text: string;
  onClick: () => void;
  type?: 'button' | 'submit';
}

const primaryButtonTheme = {
  buttonType: {
    login: 'rounded-[40px] max-w-[171px]',
    tip: 'rounded-[40px] max-w-[127px]',
    square: 'rounded-[10px] max-w-[136px]',
  },
};

type ButtonType = keyof typeof primaryButtonTheme.buttonType;

const PrimaryButton = ({ buttonType, text, onClick, type = 'button' }: PrimaryButtonInterface) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`py-[10px] border border-primary hover:border-primary-hover active:border-primary-pressed flex items-center justify-center text-primary hover:text-primary-hover active:text-primary-pressed shadow-button hover:shadow-button-hover w-full bg-white active:bg-secondary transition-colors ease-in-out duration-300 text-base font-normal leading-[26px] tracking-[0.46px] ${primaryButtonTheme.buttonType[buttonType]}`}>
      {text}
    </button>
  );
};

export default PrimaryButton;
