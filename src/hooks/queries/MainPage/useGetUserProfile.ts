import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants/key';
import { getPromptList } from '@/apis/MainPage/prompt';
import type { ResponsePromptDTO } from '@/types/MainPage/prompt';

function useGetUserProfile() {
  return useQuery<ResponseUserProfileDTO>({
    queryKey: [QUERY_KEY.userProfile],
    queryFn: () => getUserProfile(),
    staleTime: 1000 * 6 * 5,
    gcTime: 1000 * 6 * 10,
  });
}

export default useGetUserProfile;
