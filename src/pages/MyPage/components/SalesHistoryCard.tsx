import CardHeader from './CardHeader';

interface Sale {
  id: number;
  date: string;
  title: string;
  price: number;
  buyer: string;
}

interface SalesHistoryCardProps {
  sale: Sale;
}

const SalesHistoryCard: React.FC<SalesHistoryCardProps> = ({ sale }) => {
  return (
    <div className="overflow-hidden whitespace-nowrap flex items-center  border-b-[1px] border-white-stroke bg-white text-[20px] text-text-on-white font-medium max-lg:border-b-[0.5px] max-lg:px-[12px] max-lg:flex max-lg:justify-between max-lg:text-[12px] max-lg:h-[39px] ">
      <div className="w-[635px] max-lg:w-[155px] max-lg:h-[15px] pl-[40px] max-lg:pl-[0px]">
        <CardHeader
          date={sale.date}
          title={sale.title}
          linkUrl={`/prompt/${sale.id}`}
          dateFormat="dateOnly"
          showDateOnMobile={false}
        />
      </div>

      <div className="text-center w-[145px] pb-[21.5px] pt-[49.5px] max-lg:w-[43px] max-lg:pt-[0px] max-lg:pb-[0px]">
        {sale.price.toLocaleString()}원
      </div>
      <div className="w-[440px]   pb-[21.5px] pt-[49.5px] pl-[10px] max-lg:hidden">구매자 : {sale.buyer}</div>
      <div className="lg:hidden w-[34px]">{sale.buyer}</div>
    </div>
  );
};

export default SalesHistoryCard;
