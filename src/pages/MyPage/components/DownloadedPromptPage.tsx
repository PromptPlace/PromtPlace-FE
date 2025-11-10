import useGetMyDownloadedPrompts from '@/hooks/queries/MyPage/useGetMyDownloadedPrompts.tsx';
import DownloadedPromptCard from './DownlodadPromptCard';
const DownloadedPromptPage = () => {

  const { data, isLoading, isError } = useGetMyDownloadedPrompts();


  return (
     <div className="mt-[64px] w-full">
      <div className="flex">
        <label className="custom-h2 text-black">작성한 프롬프트</label>
        <div className="ml-[20px] rounded-[50px] border-[0.8px] px-[10px] py-[5px] bg-white text-gray-500 custom-h5">
          {data?.data.length || 0}
        </div>
      </div>
    <div className="flex flex-col mt-[20px] rounded-[12px]">
      {data?.data.map((prompt) => (
        <DownloadedPromptCard key={prompt.prompt_id} prompt={prompt} />
      ))}
    </div>
  </div>
  );
};

export default DownloadedPromptPage;
