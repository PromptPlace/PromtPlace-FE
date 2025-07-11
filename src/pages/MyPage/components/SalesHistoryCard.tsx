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
          <p className="text-[14px] text-text-on-background pt-[20px]">{sale.date}</p>
          <a href="#" className="text-[22px] font-bold text-text-on-white mt-[10px] gap-[10px] pb-[20px] flex items-center">
            {sale.title}
            <span className="ml-2 w-[24px] h-[24px] flex items-center ">{'>'}</span>
          </a>
        </div>

        <div className="text-center w-[145px]  text-[20px] text-text-on-white font-medium pb-[21.5px] pt-[49.5px]">{sale.price.toLocaleString()}원</div>
        <div className="w-[456px]  text-[20px] text-text-on-white font-medium pb-[21.5px] pt-[49.5px] pl-[10px]">구매자 : {sale.buyer}</div>
      </div>
    );
  };
  
  export default SalesHistoryCard;