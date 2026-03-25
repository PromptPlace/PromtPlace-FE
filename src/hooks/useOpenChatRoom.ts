import { useNavigate } from 'react-router-dom';
import usePostChatRooms from './mutations/ChatPage/usePostChatRooms';

/**
 * 채팅방을 생성 및 반환함
 * **/

export const useOpenChatRoom = () => {
  const navigate = useNavigate();
  const { mutate } = usePostChatRooms();

  const openChatRoom = (member_id: number) => {
    const isTablet = window.innerWidth < 1024;

    mutate(member_id, {
      onSuccess: (data) => {
        const roomId = data.data.room_id;

        if (isTablet) {
          navigate(`/chat/${roomId}`);
          return;
        }

        const width = 480;
        const height = Math.floor(window.innerHeight * 0.9);

        const left = window.screenX + window.outerWidth - width - 20; // 우측 끝
        const top = (window.screen.height - height) / 2; // 세로 가운데

        window.open(`/chat/${roomId}`, '_blank', `width=${width}, height=${height}, left=${left}, top=${top}`);
      },
    });
  };

  return { openChatRoom };
};
