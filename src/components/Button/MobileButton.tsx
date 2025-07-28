/**
 * 모바일 화면에서만 사용되는 버튼 컴포넌트입니다.
 *
 * @param {string} type -- 버튼 타입, 기본 타입은 button이며 필요에 따라 타입을 지정할 수 있습니다.
 * @param {string} text -- 버튼 내용
 *
 * @example
 * <MobileButton text="선택 완료하기" />
 *
 * @author 김진효
 * **/

interface MobileButtonProps {
  type?: 'button' | 'submit';
  text: string;
}

const MobileButton = ({ type, text }: MobileButtonProps) => {
  return (
    <div className="w-full px-[20px] flex justify-center">
      <button
        type={type}
        className="max-w-[385px] w-full h-[40px] py-[5px] flex items-center justify-center rounded-[4px] bg-primary active:bg-primary-pressed text-white text-[16px] font-medium leading-[20px]">
        {text}
      </button>
    </div>
  );
};

export default MobileButton;
