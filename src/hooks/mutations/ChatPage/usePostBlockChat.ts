import { postBlockChat } from '@/apis/ChatPage/chat';
import { useMutation } from '@tanstack/react-query';

function usePostBlockChat() {
  return useMutation({
    mutationFn: postBlockChat,
  });
}

export default usePostBlockChat;
