import { useState } from 'react';
import ChatList from './components/ChatList';
import ChattingRoom from './components/ChattingRoom';

const ChatPage = () => {
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);

  return (
    <div className="px-[102px] max-lg:px-[40px] max-phone:px-[20px]">
      <h1 className="custom-h1 mt-[64px] mb-[56px]">메시지</h1>

      <div className="flex gap-[20px]">
        <ChatList setSelectedRoomId={setSelectedRoomId} />
        <ChattingRoom selectedRoomId={selectedRoomId!} />
      </div>
    </div>
  );
};

export default ChatPage;
