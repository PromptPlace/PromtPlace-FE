import usePatchLeaveChat from '@/hooks/mutations/ChatPage/usePatchLeaveChat';

interface ChatMenuProps {
  roomId: number;
}

const MENUS = [
  { id: 1, label: '나가기' },
  { id: 2, label: '메시지 차단' },
];

const ChatMenu = ({ roomId }: ChatMenuProps) => {
  const { mutate: mutatePatchLeaveChat } = usePatchLeaveChat(); // 채팅방 나가기

  return (
    <div className="w-[142px] h-[94px] p-[10px] rounded-[8px] border border-white-stroke shadow-md flex flex-col items-center justify-center">
      {MENUS.map((menu) => (
        <div
          key={menu.id}
          onClick={() => {
            if (menu.id === 1) mutatePatchLeaveChat(roomId);
          }}
          className="custom-body3 text-text-on-background p-[10px] cursor-pointer hover:text-gray600 duration-100">
          {menu.label}
        </div>
      ))}
    </div>
  );
};

export default ChatMenu;
