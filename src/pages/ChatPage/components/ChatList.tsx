import ChatListData from '@data/ChatPage/chatlist.json';
import ChatListItem from './ChatListItem';
import SearchIcon from '@assets/icon-search.svg?react';
import clsx from 'clsx';
import { useState } from 'react';

const BUTTONS = [
  { id: 1, label: '전체' },
  { id: 2, label: '안읽은 메시지' },
  { id: 3, label: '고정된 메시지' },
];

const ChatList = () => {
  const [search, setSearch] = useState('');
  const [activeButtonId, setActiveButtonId] = useState<number>(1);

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
            onClick={() => setActiveButtonId(button.id)}
            className={clsx(
              'custom-button2 rounded-[50px] py-[8px] px-[16px] whitespace-nowrap',
              activeButtonId === button.id ? 'bg-primary text-white' : 'bg-secondary text-primary',
            )}>
            {button.label}
          </button>
        ))}
      </section>

      <section>
        {ChatListData.map((data) =>
          data.data.rooms.map((list) => (
            <ChatListItem
              key={list.partner.user_id}
              partner={list.partner}
              last_message={list.last_message}
              unread_count={list.unread_count}
              is_pinned={list.is_pinned}
            />
          )),
        )}
      </section>
    </div>
  );
};

export default ChatList;
