const ChatListItemSkeleton = () => {
  return (
    <div className="flex items-center gap-[12px] px-[16px] py-[16px] animate-pulse">
      {/* 프로필 */}
      <div className="w-[48px] h-[48px] rounded-full bg-gray-200 shrink-0" />

      {/* 내용 */}
      <div className="flex-1">
        <div className="h-[14px] w-[90px] bg-gray-200 rounded mb-[8px]" />
        <div className="h-[12px] w-[180px] max-lg:w-[334px] bg-gray-100 rounded" />
      </div>

      {/* 시간 */}
      <div className="h-[10px] w-[36px] bg-gray-100 rounded" />
    </div>
  );
};

export default ChatListItemSkeleton;
