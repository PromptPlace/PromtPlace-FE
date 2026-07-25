import Skeleton from '@/components/Skeleton';

const TipSkeleton = () => {
  return (
    <div className="flex flex-col bg-white rounded-[12px] px-[12px] py-[16px] mb-[72px]">
      {Array.from({ length: 8 }).map((_, idx) => (
        <div key={idx} className="flex gap-[24px] px-[12px] py-[16px] max-lg:flex-col">
          <Skeleton className="w-[200px] h-[75px]" />

          <div className="flex flex-col gap-2 flex-1">
            <div className="flex w-full justify-between">
              <Skeleton className="w-[96px] h-[16px]" />
              <Skeleton className="w-[96px] h-[16px] max-lg:hidden" />
            </div>
            <div className="flex flex-col gap-4 w-full">
              <Skeleton className="max-w-[450px] w-full h-[16px]" />
              <Skeleton className="max-w-[532px] w-full h-[16px]" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TipSkeleton;
