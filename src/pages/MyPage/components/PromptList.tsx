import AuthoredPromptCard from './AuthoredPromptCard';
import DownloadedPromptCard from './DownlodadPromptCard';
import { useGetMyPrompts } from '@/hooks/queries/MyPage/useGetMyPrompt';
import LikedPrompts from './LikedPrompts';
import useGetMyDownloadedPrompts from '@/hooks/queries/MyPage/useGetMyDownloadedPrompts.tsx';

interface PromptListProps {
  setActiveTab: (tab: 'prompt' | 'dashboard' | 'profile' | 'profileEdit' | 'authored' | 'downloaded') => void;
}

const PromptList = ({ setActiveTab }: PromptListProps) => {
  // (useQuery 등으로 writtenData, downloadedData, likedData를 가져옴)
  const { data: downloadedData } = useGetMyDownloadedPrompts();
  const { data: authoredData } = useGetMyPrompts();

  const AuthoredPromptsNum = authoredData?.prompts.length || 0;
  const DownloadedPromptsNum = downloadedData?.data.length || 0;

  return (
    <div className="w-full grid grid-cols-2 gap-[40px] mt-[64px]">
      <section className="max-lg:col-span-2">
        <div className="flex justify-between mb-[20px]">
          {/*<AuthoredPromptCard>*/}
          <div className="flex gap-[20px]">
            <p className="custom-h2 text-black">작성한 프롬프트</p>
            <div className="rounded-[50px] border-[0.8px] px-[10px] py-[5px] bg-white text-gray-500 border-gray-400 custom-h5">
              {AuthoredPromptsNum}
            </div>
          </div>
          {AuthoredPromptsNum > 6 && (
            <button onClick={() => setActiveTab('authored')} className="custom-button2 text-gray-500">
              더보기 &gt;
            </button>
          )}
        </div>
        {authoredData?.prompts
          .filter(Boolean)
          .slice(0, 6)
          .map((prompt) => (
            <AuthoredPromptCard key={prompt.prompt_id} prompt={prompt} />
          ))}
      </section>

      <section className="max-lg:col-span-2">
        <div className="flex justify-between mb-[20px]">
          {/*<AuthoredPromptCard>*/}
          <div className="flex gap-[20px]">
            <p className="custom-h2 text-black">다운받은 프롬프트</p>
            <div className="rounded-[50px] border-[0.8px] px-[10px] py-[5px] bg-white text-gray-500 border-gray-400 custom-h5">
              {DownloadedPromptsNum}
            </div>
          </div>
          {DownloadedPromptsNum > 6 && (
            <button onClick={() => setActiveTab('downloaded')} className="custom-button2 text-gray-500">
              더보기 &gt;
            </button>
          )}
        </div>
        {downloadedData?.data
          .slice(0, 6)
          .filter(Boolean)
          .map((prompt) => (
            <DownloadedPromptCard key={prompt.prompt_id} prompt={prompt} />
          ))}
      </section>

      <section className="col-span-2 mt-[56px]">
        <p className="custom-h2 text-black">찜한 프롬프트</p>
        <LikedPrompts />
      </section>
    </div>
  );
};
export default PromptList;
