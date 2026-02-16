import ChatListItem from './ChatListItem';
import SearchIcon from '@assets/icon-search.svg?react';
import clsx from 'clsx';
import { useState } from 'react';
import useGetInfiniteChatRooms from '@/hooks/queries/ChatPage/useGetInfiniteChatRooms';

interface ChatListProps {
  setSelectedRoomId: (roomId: number) => void;
}

type ActiveButton = {
  id: number;
  label: string;
  filter: 'all' | 'unread' | 'pinned';
};

const BUTTONS: ActiveButton[] = [
  { id: 1, label: '전체', filter: 'all' },
  { id: 2, label: '안읽은 메시지', filter: 'unread' },
  { id: 3, label: '고정된 메시지', filter: 'pinned' },
];

const ChatList = ({ setSelectedRoomId }: ChatListProps) => {
  const [search, setSearch] = useState('');
  const [activeButton, setActiveButton] = useState<ActiveButton>(BUTTONS[0]);

  const { data } = useGetInfiniteChatRooms({ filter: activeButton.filter, search, limit: 20 }); // 채팅 목록 조회

  const handleSearch = () => {
    setSearch('');
    console.log(search);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearch('');
      handleSearch();
    }
  };

  return (
    <div className="max-w-[357px] w-full bg-white rounded-[12px] h-[717px] px-[20px] py-[32px]">
      <h1 className="custom-h4 text-text-on-white pl-[16px] mb-[20px]">메시지 주고받은 사람</h1>

      <div className="relative h-[54px] flex items-center justify-end pr-[20px]">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleEnter}
          placeholder="검색어를 입력해주세요."
          className="absolute inset-0 rounded-[8px] bg-background py-[16px] px-[20px] w-full custom-body2 plcaeholder:font-['SCoreDream'] placeholder:custom-body2 placeholder:text-gray500"
        />
        <SearchIcon className="absolute cursor-pointer" onClick={handleSearch} />
      </div>

      <section className="py-[20px] px-[16px] flex gap-[12px] justify-between">
        {BUTTONS.map((button) => (
          <button
            key={button.id}
            onClick={() => setActiveButton(button)}
            className={clsx(
              'custom-button2 rounded-[50px] py-[8px] px-[16px] whitespace-nowrap',
              activeButton.id === button.id ? 'bg-primary text-white' : 'bg-secondary text-primary',
            )}>
            {button.label}
          </button>
        ))}
      </section>

      <section>
        {data?.pages
          .map((page) => page.data.rooms)
          .flat()
          .map((list) => (
            <ChatListItem
              key={list.room_id}
              partner={list.partner}
              last_message={list.last_message}
              unread_count={list.unread_count}
              is_pinned={list.is_pinned}
              onClick={() => setSelectedRoomId(list.room_id)}
            />
          ))}
      </section>
    </div>
  );
};

export default ChatList;
