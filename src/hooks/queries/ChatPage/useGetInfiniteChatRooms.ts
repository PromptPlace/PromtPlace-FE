import { getChatRooms } from '@/apis/ChatPage/chat';
import { QUERY_KEY } from '@/constants/key';
import type { RequestChatDto } from '@/types/ChatPage/chat';
import { useInfiniteQuery } from '@tanstack/react-query';

function useGetInfiniteChatRooms({ filter, search, limit }: RequestChatDto) {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY.chatRooms, filter, search, limit],
    queryFn: ({ pageParam }) => getChatRooms({ filter, search, cursor: pageParam, limit }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.data.page.has_more) return undefined;

      const lastRoom = lastPage.data.rooms.at(-1); // 배열의 마지막 아이템 -> 마지막 채팅방 room_id가 다음 cursor
      return lastRoom?.room_id ?? undefined;
    },
  });
}

export default useGetInfiniteChatRooms;
