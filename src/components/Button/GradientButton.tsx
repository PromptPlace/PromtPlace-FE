import PencilIcon from '@assets/icon-edit.svg';

/**
 * gradient 배경과 사용되는 버튼 컴포넌트입니다.
 *
 * @param {ButtonType} buttonType -- 버튼 모양
 * 프롬프트 작성하기와 같이 연필이 있는 버튼은 imgButton, 글씨만 있는 버튼은 textButton 입니다.
 * @param {string} text -- 버튼 내용
 * @param {function} onClick -- 버튼 클릭 시 실행될 함수
 *
 * @example
 * <GradientButton buttonType="imgButton" text="프롬프트 작성하기" onClick={() => {}} />
 *
 *
 * @author 김진효
 * **/

const gradientButtonTheme = {
  buttonType: {
    imgButton:
      'rounded-[50px] py-[22px] px-[24.5px] gap-[10px] text-xl font-normal leading-[25px] h-[69px] max-w-[235px] w-full',
    textButton: 'rounded-[10px] py-[16px] px-[40px] text-2xl font-bold leading-[30px]',
  },
};

type ButtonType = keyof typeof gradientButtonTheme.buttonType;

interface GradientButtonProps {
  buttonType: ButtonType;
  text: string;
  onClick: () => void;
}

const GradientButton = ({ buttonType, text, onClick }: GradientButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex justify-center items-center shadow-gradient bg-primary-gradient text-white ${gradientButtonTheme.buttonType[buttonType]}`}>
      {buttonType === 'imgButton' && <img src={PencilIcon} alt="프롬프트 작성하기" className="w-[24px] h-[24px]" />}
      {text}
    </button>
  );
};

export default GradientButton;
