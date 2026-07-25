interface SkeletonProps {
  className?: string;
}

const Skeleton = ({ className }: SkeletonProps) => {
  return <div className={`animate-pulse rounded-[20px] bg-gray200 ${className}`} />;
};

export default Skeleton;
