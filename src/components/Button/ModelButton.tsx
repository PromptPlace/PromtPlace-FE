/**
 * 모델 이름을 나타날 때 사용되는 버튼 컴포넌트입니다.
 *
 * @param {string} text -- 모델 이름
 *
 * @example
 * <ModelButton text="ChatGPT" />
 *
 * @author 김진효
 * **/

interface ModelButtonProps {
  text: string;
}

const ModelButton = ({ text }: ModelButtonProps) => {
  return (
    <div className="bg-primary rounded-[50px] py-[5px] px-[15px] text-white text-base font-normal leading-[20px]">
      {text}
    </div>
  );
};

export default ModelButton;
