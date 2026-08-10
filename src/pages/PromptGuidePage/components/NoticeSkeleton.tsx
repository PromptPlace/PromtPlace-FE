import Skeleton from '@/components/Skeleton';

const NoticeSkeleton = () => {
  return (
    <div className="flex flex-col items-center bg-white rounded-[12px] px-[12px] py-[16px] mb-[72px]">
      {Array.from({ length: 8 }).map((_, idx) => (
        <div
          key={idx}
          className="w-full py-[20px] px-[24px] flex flex-col gap-[12px] border-b border-gray100 last:border-none max-phone:p-[16px]">
          {/* 날짜 */}
          <Skeleton className="w-[68px] h-[16px] rounded-full" />

          {/* 제목 */}
          <div className="flex justify-between items-center">
            <div className="flex-1 flex items-center gap-[12px]">
              <Skeleton className="max-w-[450px] w-full h-[16px] rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NoticeSkeleton;
