import { getChatRoomsDetail } from '@/apis/ChatPage/chat';
import { QUERY_KEY } from '@/constants/key';
import type { ResponseChatRoomsDetailDto } from '@/types/ChatPage/chat';
import { useInfiniteQuery } from '@tanstack/react-query';

function useGetChatRoomsDetail(roomId: number, limit?: number) {
  return useInfiniteQuery<ResponseChatRoomsDetailDto>({
    queryKey: [QUERY_KEY.chatRooms, roomId, limit],
    queryFn: ({ pageParam }) => getChatRoomsDetail(roomId, { cursor: pageParam as number, limit }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      if (!lastPage.data.page.has_more) return undefined;

      return lastPage.data.messages[0]?.message_id ?? undefined;
    },
  });
}

export default useGetChatRoomsDetail;
