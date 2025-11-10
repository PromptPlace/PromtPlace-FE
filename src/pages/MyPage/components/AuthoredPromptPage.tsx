import { useGetMyPrompts } from '@/hooks/queries/MyPage/useGetMyPrompt';
import AuthoredPromptCard from './AuthoredPromptCard';
import { useNavigate } from 'react-router-dom';

const AuthoredPromptPage = () => {
  const {
    data, // select로 가공된 데이터 (prompts 배열 포함)
    fetchNextPage, // 다음 페이지를 불러오는 함수
    hasNextPage, // 다음 페이지가 있는지 (getNextPageParam이 undefined가 아닐 때 true)
    isLoading,
    isError,
  } = useGetMyPrompts();

  const navigate = useNavigate();

  return (
    <div className="mt-[64px] w-full">
      <div className="flex">
        <label className="custom-h2 text-black">작성한 프롬프트</label>
        <div className="ml-[20px] rounded-[50px] border-[0.8px] px-[10px] py-[5px] bg-white text-gray-500 custom-h5">
          {data?.prompts.length || 0}
        </div>
      </div>
      <div className="flex flex-col mt-[20px] rounded-[12px]">
        {data?.prompts.map((prompt) => (
          <AuthoredPromptCard key={prompt.prompt_id} prompt={prompt} />
        ))}
      </div>
    </div>
  );
};

export default AuthoredPromptPage;
