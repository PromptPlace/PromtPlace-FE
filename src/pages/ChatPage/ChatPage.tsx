import { useState } from 'react';
import ChatList from './components/ChatList';
import ChattingRoom from './components/ChattingRoom';

const ChatPage = () => {
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
  const isTablet = window.innerWidth < 1024;

  return (
    <div className="px-[102px] max-lg:px-[40px] max-phone:px-[20px] max-lg:bg-white max-lg:h-dvh">
      {(!isTablet || selectedRoomId === null) && (
        <h1 className="custom-h1 pt-[64px] mb-[56px] max-lg:pt-[32px] max-lg:mb-[20px]">메시지</h1>
      )}

      <div className="lg:flex gap-[20px]">
        {(!isTablet || selectedRoomId === null) && <ChatList setSelectedRoomId={setSelectedRoomId} />}
        {(!isTablet || selectedRoomId !== null) && <ChattingRoom selectedRoomId={selectedRoomId!} />}
      </div>
    </div>
  );
};

export default ChatPage;
