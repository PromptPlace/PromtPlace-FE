import Count from '@components/Count';
import ModelButton from '@components/Button/ModelButton';

interface Props {
  title: string;
  views: number;
  downloads: number;
}

const PromptHeader = ({ title, views, downloads }: Props) => (
  <div className="mb-6 bg-[#FFFEFB] w-[711px] h-[132px] box-border">
    {/* ChatGPT 버튼 + X 버튼 */}
    <div className="mb-2 flex items-center justify-between w-full">
      <ModelButton text="ChatGPT" />
      <button className="text-xl font-bold text-[#121212]">×</button>
    </div>

    {/* 제목 + 카운트 */}
    <div className="mb-2 flex items-center justify-between w-full">
      <h2 className="font-bold text-[32px]">{title}</h2>
      <div className="flex gap-8">
        <Count imgType="eye" count={views} />
        <Count imgType="download" count={downloads} />
      </div>
    </div>

    {/* 하단 구분선 */}
    <div className="h-[1px] bg-[#CCCCCC] w-full" />
  </div>
);
export default PromptHeader;
