import { postPresignUrl } from '@/apis/ChatPage/chat';
import { useMutation } from '@tanstack/react-query';

function usePostPresignUrl() {
  return useMutation({
    mutationFn: postPresignUrl,
  });
}

export default usePostPresignUrl;
