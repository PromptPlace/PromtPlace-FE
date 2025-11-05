import { useGetMyPrompts } from '@/hooks/queries/MyPage/useGetMyPrompt';

const AuthoredPromptPage = () => {
  const {
    data, // select로 가공된 데이터 (prompts 배열 포함)
    fetchNextPage, // 다음 페이지를 불러오는 함수
    hasNextPage, // 다음 페이지가 있는지 (getNextPageParam이 undefined가 아닐 때 true)
    isLoading,
    isError,
  } = useGetMyPrompts();
  return <div>
    <label>작성한 프롬프트</label>

  </div>;
};

export default AuthoredPromptPage;
