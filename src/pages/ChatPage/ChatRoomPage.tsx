import { useParams } from 'react-router-dom';
import ChattingRoom from './components/ChattingRoom';

const ChatRoomPage = () => {
  const { roomId } = useParams();

  return <ChattingRoom selectedRoomId={Number(roomId)} />;
};

export default ChatRoomPage;
