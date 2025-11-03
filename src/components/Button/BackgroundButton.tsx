import clsx from 'clsx';

/**
 * 배경색이 있는 경우 사용되는 버튼 컴포넌트입니다.
 * 헤더의 로그인, 회원가입, 프롬프트 올리기 버튼에 사용됩니다.
 *
 * @param {string} background - 배경 버튼 색
 * @param {string} text -- 버튼 내용
 * @param {function} onClick -- 버튼 클릭 시 실행될 함수
 * @param {string} type -- 버튼 타입, 기본 타입은 button이며 필요에 따라 타입을 지정할 수 있습니다.
 *
 * @example
 *  <BackgroundButton background="secondary" text="로그인" onClick={() => {}} />
 *
 * @author 김진효
 * **/

interface BackgroundButtonProps {
  background: 'secondary' | 'primary';
  text: string;
  onClick: () => void;
  type?: 'button' | 'submit';
}

const BackgroundButton = ({ background, text, onClick, type }: BackgroundButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={clsx(
        'custom-button1 max-phone:text-[12px] rounded-[12px] py-[12px] px-[16px] flex justify-center items-center self-center shrink-0',
        background === 'secondary' ? 'bg-secondary text-primary' : 'bg-primary text-white',
      )}>
      {text}
    </button>
  );
};

export default BackgroundButton;
