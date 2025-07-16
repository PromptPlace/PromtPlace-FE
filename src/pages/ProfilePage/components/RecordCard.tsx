interface RecordCardProps {
  description: string;
}

const RecordCard = ({ description }: RecordCardProps) => {
  return (
    <div className="bg-white border-b border-b-white-stroke py-[30px] pl-[80px] text-text-on-white text-[20px] font-medium leading-[25px]">
      {description}
    </div>
  );
};

export default RecordCard;
