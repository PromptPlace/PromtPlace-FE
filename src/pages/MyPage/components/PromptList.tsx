import AuthoredPromptCard from './AuthoredPromptCard';
import DownloadedPromptCard from './DownlodadPromptCard';
import { Link } from 'react-router-dom';
import { useGetDownloadedPrompts, useGetLikedPrompts } from '@/hooks/queries/MyPage/useGetPrompts';
import PromptCard from '@/pages/ProfilePage/components/PromptCard';

const PromptList = () => {
  // (useQuery 등으로 writtenData, downloadedData, likedData를 가져옴)
  const { data: downloadedData } = useGetDownloadedPrompts();
  const { data: likedData } = useGetLikedPrompts();

  return (
    <div>
      <section>
       {/*<AuthoredPromptCard>*/}
        <Link to="/profile/written">더보기 &gt;</Link>
      </section>

      <section>
        <h2>다운받은 프롬프트</h2>
        {/*}
        {downloadedData?.data.map((prompt) => (
          <DownloadedPromptCard key={prompt.prompt_id} prompt={prompt} />
        ))}
        <Link to="/profile/downloaded">더보기 &gt;</Link>
        */}
      </section>

      <section>
        <h2>찜한 프롬프트</h2>

      </section>
    </div>
  );
};
export default PromptList;
