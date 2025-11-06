import { useGetMyPrompts } from '@/hooks/queries/MyPage/useGetMyPrompt';
import AuthoredPromptCard from './AuthoredPromptCard';
import { useNavigate } from 'react-router-dom';
import usePatchDeletePrompts from '@/hooks/mutations/ProfilePage/usePatchDeletePrompts';
import type { RequestDeletePromptDto } from '@/types/ProfilePage/profile';
import { useAuth } from '@/context/AuthContext';







const AuthoredPromptPage = () => {
  const {
    data, // select로 가공된 데이터 (prompts 배열 포함)
    fetchNextPage, // 다음 페이지를 불러오는 함수
    hasNextPage, // 다음 페이지가 있는지 (getNextPageParam이 undefined가 아닐 때 true)
    isLoading,
    isError,
  } = useGetMyPrompts();

  const navigate = useNavigate();
  const EditAuthoredPrompt = (prompt_id: number) => {
    const promptId = prompt_id;
    const targetUrl = `/mypage/edit/${promptId}`;

    // 3. 생성된 URL로 페이지를 이동시킵니다.
    navigate(targetUrl);
  };
  const { user } = useAuth();
  const { mutate: mutateDeletePrompts } = usePatchDeletePrompts({ member_id: user.user_id });
  const handleDeleteAuthoredPrompts = ({ prompt_id }: RequestDeletePromptDto) => {
    mutateDeletePrompts({ prompt_id });
  };

  return (
    <div className="mt-[64px] w-full">
      <label className="custom-h2 text-black">작성한 프롬프트</label>
      <div className="ml-[20px] rounded-[50px] border-[0.8px] px-[10px] py-[5px] bg-white text-gray-500 custom-h5">{data?.prompts.length || 0}</div>
      <div className="flex flex-col gap-[20px] mt-[20px] p-[24px] rounded-[12px]">
        {data?.prompts.map((prompt) => (
          <AuthoredPromptCard
            key={prompt.prompt_id}
            prompt={prompt}
            DeletePrompt={() => handleDeleteAuthoredPrompts({ prompt_id: prompt.prompt_id })}
            EditPrompt={() => EditAuthoredPrompt(prompt.prompt_id)}
          />
        ))}
      </div>
    </div>
  );
};

export default AuthoredPromptPage;
