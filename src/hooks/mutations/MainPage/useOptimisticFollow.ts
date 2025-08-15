import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';
import { postFollow, deleteFollow } from '@/apis/ProfilePage/profile';
import { useAuth } from '@/context/AuthContext';
import type { RequestMemberDto } from '@/types/ProfilePage/profile';

interface FollowingItem {
  follow_id: number;
  following_id: number;
  nickname: string;
  email: string;
  created_at: string;
  profile_img_url: string | null;
}
interface FollowingListResponse {
  message: string;
  statusCode: number;
  data: FollowingItem[];
}
type FollowContext = { previous?: FollowingListResponse };

export default function useOptimisticFollow() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const queryKey: QueryKey = ['member-following', user.user_id];

  const { mutate: follow } = useMutation({
    mutationFn: (variables: RequestMemberDto) => postFollow({ member_id: variables.member_id }),

    // --- 옵티미스틱 업데이트 로직 ---
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey });
      const previous = queryClient.getQueryData<FollowingListResponse>(queryKey);
      queryClient.setQueryData<FollowingListResponse>(queryKey, (prev) => {
        const optimisticNewItem: FollowingItem = {
          follow_id: Math.random(),
          following_id: variables.member_id,
          nickname: '...',
          email: '',
          created_at: new Date().toISOString(),
          profile_img_url: null,
        };
        const prevData = prev?.data ?? [];
        return {
          message: prev?.message ?? 'Optimistic update',
          statusCode: prev?.statusCode ?? 200,
          data: [...prevData, optimisticNewItem],
        };
      });
      return { previous };
    },
    onError: (err, variables, context) => {
      const followContext = context as FollowContext;
      if (followContext?.previous) {
        queryClient.setQueryData(queryKey, followContext.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
      queryClient.invalidateQueries({ queryKey: ['prompterList'] });
    },
  });

  const { mutate: unfollow } = useMutation({
    mutationFn: (variables: RequestMemberDto) => deleteFollow({ member_id: variables.member_id }),

    // --- 옵티미스틱 업데이트 로직 ---
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey });
      const previous = queryClient.getQueryData<FollowingListResponse>(queryKey);
      queryClient.setQueryData<FollowingListResponse>(queryKey, (prev) => {
        const prevData = prev?.data ?? [];
        return {
          message: prev?.message ?? 'Optimistic update',
          statusCode: prev?.statusCode ?? 200,
          data: prevData.filter((f) => f.following_id !== variables.member_id),
        };
      });
      return { previous };
    },
    onError: (err, variables, context) => {
      const followContext = context as FollowContext;
      if (followContext?.previous) {
        queryClient.setQueryData(queryKey, followContext.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
      queryClient.invalidateQueries({ queryKey: ['prompterList'] });
    },
  });

  const handleFollow = (member_id: number) => follow({ member_id });
  const handleUnfollow = (member_id: number) => unfollow({ member_id });

  return { follow: handleFollow, unfollow: handleUnfollow };
}
