import { useQueryClient } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';
import usePatchFollow from './usePatchFollow';
import useDeleteFollow from './useDeleteFollow';
import { useAuth } from '@/context/AuthContext';

// 1. API 응답 데이터에 대한 정확한 타입 정의
// GET /following 목록의 개별 아이템 타입
interface FollowingItem {
  follow_id: number;
  following_id: number;
  nickname: string;
  email: string;
  created_at: string;
  profile_img_url: string | null;
}

// GET /following API의 전체 응답 타입
interface FollowingListResponse {
  message: string;
  statusCode: number;
  data: FollowingItem[];
}

// onMutate의 context 타입
type FollowContext = { previous?: FollowingListResponse };

export default function useOptimisticFollow() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const queryKey: QueryKey = ['member-following', user.user_id];

  const patchFollow = usePatchFollow();
  const deleteFollow = useDeleteFollow();

  // 2. 팔로우 함수
  const follow = (targetUserId: number) => {
    patchFollow.mutate(
      { member_id: targetUserId },
      {
        onMutate: async () => {
          await queryClient.cancelQueries({ queryKey });
          const previous = queryClient.getQueryData<FollowingListResponse>(queryKey);

          // 옵티미스틱 업데이트: 캐시를 직접 수정
          queryClient.setQueryData<FollowingListResponse>(queryKey, (prev) => {
            // 임시로 추가할 팔로우 아이템 (UI 즉시 반영용)
            const optimisticNewItem: FollowingItem = {
              follow_id: Math.random(), // 임시 고유 ID
              following_id: targetUserId,
              nickname: '...', // 닉네임 등은 서버 응답 후 채워짐
              email: '',
              created_at: new Date().toISOString(),
              profile_img_url: null,
            };

            const prevData = prev?.data ?? [];
            const newData = [...prevData, optimisticNewItem];

            // ⭐️ 핵심: 캐시가 비어있든(prev=undefined) 아니든, 항상 완전한 데이터 구조를 반환
            return {
              message: prev?.message ?? 'Optimistic update',
              statusCode: prev?.statusCode ?? 200,
              data: newData,
            };
          });

          return { previous };
        },
        onError: (_err, _vars, context) => {
          // 에러 발생 시, 이전 데이터로 롤백
          if (context?.previous) {
            queryClient.setQueryData(queryKey, context.previous);
          }
        },
        onSettled: () => {
          // 최종적으로 서버 데이터와 동기화
          queryClient.invalidateQueries({ queryKey });
          queryClient.invalidateQueries({ queryKey: ['prompterList'] });
        },
      },
    );
  };

  // 3. 언팔로우 함수
  const unfollow = (targetUserId: number) => {
    deleteFollow.mutate(
      { member_id: targetUserId },
      {
        onMutate: async () => {
          await queryClient.cancelQueries({ queryKey });
          const previous = queryClient.getQueryData<FollowingListResponse>(queryKey);

          queryClient.setQueryData<FollowingListResponse>(queryKey, (prev) => {
            const prevData = prev?.data ?? [];
            const newData = prevData.filter((f) => f.following_id !== targetUserId);

            // ⭐️ 핵심: 여기도 마찬가지로 항상 완전한 데이터 구조를 반환
            return {
              message: prev?.message ?? 'Optimistic update',
              statusCode: prev?.statusCode ?? 200,
              data: newData,
            };
          });

          return { previous };
        },
        onError: (_err, _vars, context) => {
          if (context?.previous) {
            queryClient.setQueryData(queryKey, context.previous);
          }
        },
        onSettled: () => {
          queryClient.invalidateQueries({ queryKey });
          queryClient.invalidateQueries({ queryKey: ['prompterList'] });
        },
      },
    );
  };

  return { follow, unfollow };
}
