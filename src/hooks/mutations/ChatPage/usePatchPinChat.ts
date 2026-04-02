import { patchPinChat } from '@/apis/ChatPage/chat';
import { QUERY_KEY } from '@/constants/key';
import type { ResponseChatRoomsDetailDto } from '@/types/ChatPage/chat';
import { useMutation, useQueryClient, type InfiniteData } from '@tanstack/react-query';

function usePatchPinChat() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchPinChat,

    // API 요청 이전에 호출
    onMutate: async (roomId) => {
      const queryKey = [QUERY_KEY.chatRooms, roomId];

      // 관련 쿼리 취소
      await queryClient.cancelQueries({
        queryKey,
      });

      // 현재 채팅방 데이터
      const prev = queryClient.getQueryData<ResponseChatRoomsDetailDto>(queryKey);
      if (!prev) return { prev };

      // 낙관적 업데이트
      queryClient.setQueryData<InfiniteData<ResponseChatRoomsDetailDto>>(queryKey, (old) => {
        if (!old) return old;

        return {
          ...old,
          pages: old.pages.map((page: ResponseChatRoomsDetailDto) => ({
            ...page,
            data: {
              ...page.data,
              room: {
                ...page.data.room,
                is_pinned: !page.data.room.is_pinned,
              },
            },
          })),
        };
      });

      return { prev, queryKey };
    },

    // 실패하면 롤백
    onError: (_, _roomId, context) => {
      if (context?.prev && context.queryKey) {
        queryClient.setQueryData(context.queryKey, context.prev);
      }
    },

    // 성공, 실패 상관없이 서버 데이터 동기화
    onSettled: (_, _err, roomId) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.chatRooms, roomId],
      });
    },
  });
}

export default usePatchPinChat;
