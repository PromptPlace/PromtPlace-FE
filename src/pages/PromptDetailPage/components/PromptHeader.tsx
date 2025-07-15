import Count from '@components/Count';
import ModelButton from '@components/Button/ModelButton';

interface Props {
  title: string;
  views: number;
  downloads: number;
}

const PromptHeader = ({ title, views, downloads }: Props) => (

  <div className="w-[711px] bg-[#FFFEFB] px-8">
    {/* 실제 내용 높이 고정 */}
    <div className="h-[132px] box-border flex flex-col justify-between">
      {/* ChatGPT 버튼 + X 버튼 */}
      <div className="flex items-center justify-between w-full pt-[35px]">
        <ModelButton text="ChatGPT" />
        <button className="text-xl font-bold text-[#121212] focus:outline-none">×</button>
      </div>

      {/* 제목 + 카운트 */}
      <div className="flex items-center justify-between w-full">
        <h2 className="font-bold text-[32px] pb-[10px]">{title}</h2>
        <div className="flex gap-8">
          <Count imgType="eye" count={views} />
          <Count imgType="download" count={downloads} />
        </div>
      </div>
    </div>

    {/* 하단 구분선 (132px 딱 아래) */}
    <div className="h-[1px] bg-[#CCCCCC] w-full" />
  </div>
);


export default PromptHeader;
