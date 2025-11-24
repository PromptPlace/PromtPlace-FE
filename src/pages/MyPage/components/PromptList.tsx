import AuthoredPromptCard from './AuthoredPromptCard';
import DownloadedPromptCard from './DownlodadPromptCard';
import { useGetMyPrompts } from '@/hooks/queries/MyPage/useGetMyPrompt';
import LikedPrompts from './LikedPrompts';
import useGetMyDownloadedPrompts from '@/hooks/queries/MyPage/useGetMyDownloadedPrompts.tsx';
import { NoAuthoredPrompts, NoDownloadedPrompts, NoLikedPrompts } from './NoPrompts';
import { useGetLikedPrompts } from '@/hooks/queries/MyPage/useGetPrompts';
interface PromptListProps {
  setActiveTab: (tab: 'prompt' | 'dashboard' | 'profile' | 'profileEdit' | 'authored' | 'downloaded') => void;
}

const PromptList = ({ setActiveTab }: PromptListProps) => {
  // (useQuery 등으로 writtenData, downloadedData, likedData를 가져옴)
  const { data: downloadedData } = useGetMyDownloadedPrompts();
  const { data: authoredData } = useGetMyPrompts();
  const { data: likedPromptsData } = useGetLikedPrompts();

  const AuthoredPromptsNum = authoredData?.pages[0].total_prompts || 0;
  const DownloadedPromptsNum = downloadedData?.data.length || 0;
  const LikedPromptsNum = likedPromptsData?.data.data.length || 0;
  console.log('찜한 프롬프트 수:', LikedPromptsNum);
  console.log('찜한 프롬프트 데이터 2차검증:', likedPromptsData);

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-[40px] mt-[64px]">
      <section className="flex flex-col">
        <div className="flex justify-between mb-[20px]">
          {/*<AuthoredPromptCard>*/}
          <div className="flex gap-[20px]">
            <p className="custom-h2 text-black">작성한 프롬프트</p>
            <div className="rounded-[50px] h-[32px] border-[0.8px] px-[10px] py-[5px] bg-white text-gray-500 border-gray-400 custom-h5">
              {AuthoredPromptsNum}
            </div>
          </div>
          {AuthoredPromptsNum > 6 && (
            <button onClick={() => setActiveTab('authored')} className="custom-button2 text-gray-500">
              더보기 &gt;
            </button>
          )}
        </div>
        <div className=" bg-white p-[24px] rounded-[12px]">
          {authoredData?.pages
            .flatMap((page) => page.data)
            .filter(Boolean)
            .slice(0, 6)
            .map((prompt) => (
              <AuthoredPromptCard key={prompt.prompt_id} prompt={prompt} />
            ))}
        </div>
        {AuthoredPromptsNum === 0 && (
          <div className="self-center mt-[92px] max-phone:mt-[84px]">
            <NoAuthoredPrompts />
          </div>
        )}
      </section>

      <section className=" flex flex-col">
        <div className="flex justify-between mb-[20px]">
          {/*<AuthoredPromptCard>*/}
          <div className="flex gap-[20px]">
            <p className="custom-h2 text-black">다운받은 프롬프트</p>
            <div className="rounded-[50px] h-[32px] border-[0.8px] px-[10px] py-[5px] bg-white text-gray-500 border-gray-400 custom-h5">
              {DownloadedPromptsNum}
            </div>
          </div>
          {DownloadedPromptsNum > 6 && (
            <button onClick={() => setActiveTab('downloaded')} className="custom-button2 text-gray-500">
              더보기 &gt;
            </button>
          )}
        </div>
        <div className=" bg-white rounded-[12px]">
          {downloadedData?.data
            .slice(0, 6)
            .filter(Boolean)
            .map((prompt) => (
              <DownloadedPromptCard key={prompt.prompt_id} prompt={prompt} />
            ))}
        </div>
        {DownloadedPromptsNum === 0 && (
          <div className="self-center mt-[92px] max-phone:mt-[84px]">
            <NoDownloadedPrompts />
          </div>
        )}
      </section>

      <section className="lg:col-span-2 mt-[56px] flex flex-col">
        <div className="flex gap-[20px]">
          <p className="custom-h2 text-black">찜한 프롬프트</p>
          <div className="rounded-[50px] h-[32px] border-[0.8px] px-[10px] py-[5px] bg-white text-gray-500 border-gray-400 custom-h5">
            {LikedPromptsNum}
          </div>
        </div>
        <LikedPrompts />
        {LikedPromptsNum === 0 && (
          <div className="self-center mt-[92px] max-phone:mt-[84px]">
            <NoLikedPrompts />
          </div>
        )}
      </section>
    </div>
  );
};
export default PromptList;
