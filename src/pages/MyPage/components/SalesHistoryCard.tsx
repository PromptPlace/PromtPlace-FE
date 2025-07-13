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
      <div className="flex items-center  pl-[40px] border-b-[1px] border-white-stroke">

        <div className="w-[635px]">
          <CardHeader
            date={sale.date}
            title={sale.title}
            linkUrl={`/prompt/${sale.id}`}
            dateFormat="dateOnly"
          />
        </div>

        <div className="text-center w-[145px]  text-[20px] text-text-on-white font-medium pb-[21.5px] pt-[49.5px]">{sale.price.toLocaleString()}원</div>
        <div className="w-[456px]  text-[20px] text-text-on-white font-medium pb-[21.5px] pt-[49.5px] pl-[10px]">구매자 : {sale.buyer}</div>
      </div>
    );
  };
  
  export default SalesHistoryCard;