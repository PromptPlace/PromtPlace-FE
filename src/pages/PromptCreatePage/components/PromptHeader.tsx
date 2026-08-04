import help from '@assets/promptCreate/icon-help.svg';

interface Props {
  title: string;
  description: string;
}

const PromptHeader = ({ title, description }: Props) => {
  return (
    <>
      <div className="mt-[64px] flex flex-col gap-[12px]">
        <p className="text-black custom-h1 max-phone:text-[24px]">{title}</p>
        <p className="custom-h3 text-gray950 max-phone:text-[14px]">{description}</p>
      </div>

      <div className="flex items-center justify-end gap-[8px] cursor-pointer mt-[20px]">
        <img className="w-[24px] h-[24px] max-phone:w-[16px] max-phone:h-[16px]" src={help} alt="작성 꿀팁 보기" />
        <p className="text-black text-[14px] font-light leading-[16px] border-b max-phone:text-[12px]">
          작성 꿀팁 보기
        </p>
      </div>
    </>
  );
};

export default PromptHeader;
