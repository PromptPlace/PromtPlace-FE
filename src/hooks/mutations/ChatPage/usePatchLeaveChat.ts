import { patchLeaveChat } from '@/apis/ChatPage/chat';
import { useMutation } from '@tanstack/react-query';

function usePatchLeaveChat() {
  return useMutation({
    mutationFn: patchLeaveChat,
  });
}

export default usePatchLeaveChat;
