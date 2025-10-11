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
 * @param {number} py -- padding top, bottom 값
 * square 버튼을 사용하면서 padding top, bottom 값 변경하고 싶을 때 값을 넘기면 됩니다.
 * @param {number} px -- padding left, right 값
 * square 버튼을 사용하면서 padding left, right 값 변경하고 싶을 때 값을 넘기면 됩니다.
 * @param {number} textSize -- 글씨크기
 * square 버튼이면서 12px로 사용되는 경우 textSize={12}로 넘기면 됩니다.
 * @param {boolean} disable -- 비활성화 여부
 * @param {'white' | 'primary' | 'gray'} textColor -- 글씨 색상, 기본값 primary
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

import clsx from 'clsx';

interface PrimaryButtonProps {
  buttonType: ButtonType;
  text: string;
  onClick: () => void;
  type?: 'button' | 'submit';
  py?: number;
  px?: number;
  textSize?: number;
  disable?: boolean;
  textColor?: 'white' | 'primary' | 'gray';
}

const primaryButtonTheme = {
  buttonType: {
    login:
      'rounded-[40px] max-lg:rounded-[4px] max-w-[171px] max-lg:max-w-[112px] w-full py-[9px] max-lg:py-[8px] max-lg:text-[10px] max-lg:font-normal max-lg:leading-[13px] max-lg:tracking-[0.46px] max-lg:border-[0.5px] text-base leading-[26px]',
    tip: 'rounded-[40px] max-w-[127px] w-full py-[9px] text-base leading-[26px]',
    square: 'rounded-[12px] py-[12px] px-[20px] border-[0.8px]',
    squareMini:
      'rounded-[10px] max-lg:rounded-[4px] py-[2px] px-[14px] max-lg:px-[8px] max-lg:text-[10px] max-lg:font-normal max-lg:leading-[13px] max-lg:tracking-[0.46px] text-base leading-[26px]',
    review:
      'rounded-[50px] h-[41px] py-[5px] max-w-[152px] w-full text-xl leading-[25px] max-lg:rounded-[24px] max-lg:border-[0.5px] max-lg:h-[17px] max-lg:py-[2px] max-lg:max-w-[58px] max-lg:w-full max-lg:text-[10px] max-lg:font-normal max-lg:leading-[13px] max-lg:px-[4.8px] text-base leading-[26px]',
    reviewDelete:
      'rounded-[50px] px-[9px] max-lg:px-[7px] py-[4px] hover:shadow-none max-lg:rounded-[24px] max-lg:border-[0.5px] max-lg:h-[17px] max-lg:py-[2px] max-lg:max-w-[58px] max-lg:w-full max-lg:text-[10px] max-lg:font-normal max-lg:leading-[13px]',
    plus: 'rounded-[50px] px-[53px] max-lg:px-[20px] text-[32px] max-lg:text-[16px] font-bold leading-[40px] max-lg:leading-[18px] text-base leading-[26px]',
    change: 'rounded-[50px] px-[10px] py-[5px] text-[14px] leading-[18px] text-base leading-[26px]',
    full: 'w-full custom-h4 border-none px-[20px]! py-[20px]! max-w-[544px] w-full rounded-[12px]',
  },
};

type ButtonType = keyof typeof primaryButtonTheme.buttonType;

const PrimaryButton = ({
  buttonType,
  text,
  onClick,
  type = 'button',
  py,
  px,
  textSize,
  disable = false,
  textColor = 'primary',
}: PrimaryButtonProps) => {
  const isReviewDelete = buttonType === 'reviewDelete';
  return (
    <button
      onClick={onClick}
      type={type}
      className={clsx(
        'flex items-center justify-center shadow-button hover:shadow-button-hover transition-all ease-in-out duration-300',
        isReviewDelete ? 'border-alert text-alert! text-sm leading-[18px]' : 'border-primary ',
        text === '프롬프트 더 보기' ? 'border-none' : 'border',
        buttonType === 'square' ? `custom-h4` : 'font-normal tracking-[0.46px]',
        textSize === 12 && 'custom-button2 max-lg:text-[12px] rounded-[8px]',
        textSize === 18 && 'custom-h4 bg-sub2! max-w-[260px] w-full border-none',
        disable && 'border-gray400! text-gray400! bg-gray300! hover:bg-gray300! active:bg-gray300! cursor-not-allowed',
        textColor === 'white' && 'bg-primary text-white',
        textColor === 'primary' &&
          'bg-white text-primary hover:border-primary-hover active:border-primary-pressed text-primary hover:text-primary-hover active:text-primary-pressed active:bg-secondary',
        textColor === 'gray' && 'bg-white text-gray400! border-gray400!',
        primaryButtonTheme.buttonType[buttonType],
      )}
      style={
        buttonType === 'square' ? { paddingTop: py, paddingBottom: py, paddingLeft: px, paddingRight: px } : undefined
      }>
      {text}
    </button>
  );
};

export default PrimaryButton;
