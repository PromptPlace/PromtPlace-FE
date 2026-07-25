const ChattingRoomSkeleton = () => {
  return (
    <div className="rounded-[12px] bg-white w-full p-[32px] flex flex-col h-[717px] max-lg:h-dvh justify-between animate-pulse">
      {/* 상단 */}
      <div className="flex justify-between items-center mb-[20px]">
        <div className="flex gap-[16px] items-center">
          <div className="size-[60px] rounded-full bg-gray-200" />

          <div className="flex flex-col gap-[4px]">
            <div className="w-[158px] h-[16px] rounded-[20px] bg-gray-200" />
            <div className="w-[110px] h-[16px] rounded-[20px] bg-gray-200" />
          </div>
        </div>
      </div>

      {/* 채팅 영역 */}
      <div className="flex flex-col items-center relative h-full justify-between py-8">
        <div className="flex flex-col gap-[20px] items-center">
          <div className="size-[80px] rounded-full overflow-hidden bg-gray-200"></div>
          <div className="w-[122px] h-[16px] rounded-[20px] bg-gray-200"></div>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <div className="rounded-r-[32px] rounded-bl-[32px] bg-gray-200 w-[129px] h-[58px]" />
          <div className="rounded-r-[32px] rounded-bl-[32px] bg-gray-200 w-[316px] h-[110px]" />
        </div>
      </div>

      {/* 입력창 */}
      <div className="mt-[20px] h-[58px] rounded-[8px] bg-gray-200" />
    </div>
  );
};

export default ChattingRoomSkeleton;
