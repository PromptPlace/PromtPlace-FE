import useGetMyDownloadedPrompts from '@/hooks/queries/MyPage/useGetMyDownloadedPrompts.tsx';
import DownloadedPromptCard from './DownlodadPromptCard';

const DownloadedPromptPage = () => {
  const { data, isLoading, isError } = useGetMyDownloadedPrompts();
  return (
    <div>
      {data?.data.map((prompt) => (
        <DownloadedPromptCard key={prompt.prompt_id} prompt={prompt} />
      ))}
    </div>
  );
};

export default DownloadedPromptPage;
