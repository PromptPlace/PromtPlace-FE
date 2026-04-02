import { postChatRooms } from '@/apis/ChatPage/chat';
import { useMutation } from '@tanstack/react-query';

function usePostChatRooms() {
  return useMutation({
    mutationFn: postChatRooms,
  });
}

export default usePostChatRooms;
