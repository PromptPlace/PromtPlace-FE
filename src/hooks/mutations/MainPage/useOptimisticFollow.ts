import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';
import { postFollow, deleteFollow } from '@/apis/ProfilePage/profile';
import { useAuth } from '@/context/AuthContext';
import type { RequestMemberDto } from '@/types/ProfilePage/profile';
import { QUERY_KEY } from '@/constants/key';

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

interface Prompter {
  user_id: number;
  follower_cnt: number;
  [key: string]: any;
}
interface PrompterListResponse {
  message: string;
  statusCode: number;
  data: {
    members: Prompter[];
  };
}

type OptimisticContext = {
  previousFollowing?: FollowingListResponse;
  previousPrompters?: PrompterListResponse;
};

export default function useOptimisticFollow() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const followingQueryKey: QueryKey = ['member-following', user.user_id];
  const prompterListQueryKey: QueryKey = [QUERY_KEY.prompters, 1, 50];

  const { mutate: followMutation } = useMutation({
    // onMutate, onError, onSettled 로직은 기존과 동일합니다.
    mutationFn: (variables: RequestMemberDto) => postFollow({ member_id: variables.member_id }),
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: followingQueryKey });
      await queryClient.cancelQueries({ queryKey: prompterListQueryKey });
      const previousFollowing = queryClient.getQueryData<FollowingListResponse>(followingQueryKey);
      const previousPrompters = queryClient.getQueryData<PrompterListResponse>(prompterListQueryKey);
      // ... (기존 팔로잉 목록 업데이트 로직)
      queryClient.setQueryData<FollowingListResponse>(followingQueryKey, (prev) => {
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
      // ... (기존 팔로워 수 업데이트 로직)
      queryClient.setQueryData<PrompterListResponse>(prompterListQueryKey, (prev) => {
        if (!prev) return undefined;
        const updatedMembers = prev.data.members.map((p) =>
          p.user_id === variables.member_id ? { ...p, follower_cnt: p.follower_cnt + 1 } : p,
        );
        return { ...prev, data: { ...prev.data, members: updatedMembers } };
      });
      return { previousFollowing, previousPrompters };
    },
    // ... (onError, onSettled 로직은 동일)
    onError: (err, variables, context) => {
      const { previousFollowing, previousPrompters } = context as OptimisticContext;
      if (previousFollowing) {
        queryClient.setQueryData(followingQueryKey, previousFollowing);
      }
      if (previousPrompters) {
        queryClient.setQueryData(prompterListQueryKey, previousPrompters);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: followingQueryKey });
      queryClient.invalidateQueries({ queryKey: prompterListQueryKey });
    },
  });

  // ✨ 이름 변경: unfollowMutation
  const { mutate: unfollowMutation } = useMutation({
    // onMutate, onError, onSettled 로직은 기존과 동일합니다.
    mutationFn: (variables: RequestMemberDto) => deleteFollow({ member_id: variables.member_id }),
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: followingQueryKey });
      await queryClient.cancelQueries({ queryKey: prompterListQueryKey });
      const previousFollowing = queryClient.getQueryData<FollowingListResponse>(followingQueryKey);
      const previousPrompters = queryClient.getQueryData<PrompterListResponse>(prompterListQueryKey);
      // ... (기존 팔로잉 목록 업데이트 로직)
      queryClient.setQueryData<FollowingListResponse>(followingQueryKey, (prev) => {
        const prevData = prev?.data ?? [];
        return {
          message: prev?.message ?? 'Optimistic update',
          statusCode: prev?.statusCode ?? 200,
          data: prevData.filter((f) => f.following_id !== variables.member_id),
        };
      });
      // ... (기존 팔로워 수 업데이트 로직)
      queryClient.setQueryData<PrompterListResponse>(prompterListQueryKey, (prev) => {
        if (!prev) return undefined;
        const updatedMembers = prev.data.members.map((p) =>
          p.user_id === variables.member_id ? { ...p, follower_cnt: Math.max(0, p.follower_cnt - 1) } : p,
        );
        return { ...prev, data: { ...prev.data, members: updatedMembers } };
      });
      return { previousFollowing, previousPrompters };
    },
    // ... (onError, onSettled 로직은 동일)
    onError: (err, variables, context) => {
      const { previousFollowing, previousPrompters } = context as OptimisticContext;
      if (previousFollowing) {
        queryClient.setQueryData(followingQueryKey, previousFollowing);
      }
      if (previousPrompters) {
        queryClient.setQueryData(prompterListQueryKey, previousPrompters);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: followingQueryKey });
      queryClient.invalidateQueries({ queryKey: prompterListQueryKey });
    },
  });

  // ✨ 핵심: 숫자(ID)를 받아서 객체로 감싸주는 핸들러 함수를 새로 만듭니다.
  const follow = (member_id: number) => {
    followMutation({ member_id });
  };

  const unfollow = (member_id: number) => {
    unfollowMutation({ member_id });
  };

  // ✨ 이 핸들러 함수들을 반환합니다.
  return { follow, unfollow };
}
