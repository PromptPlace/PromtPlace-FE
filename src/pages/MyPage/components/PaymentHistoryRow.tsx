import CardHeader from './CardHeader';
// 이 컴포넌트가 받을 데이터의 타입을 정의
interface Transaction {
  prompt_id: number;
  purchase_at: string;
  title: string;
  amount: number;
  paymentMethod: string; // 예시
}

interface PaymentHistoryRowProps {
  transaction: Transaction;
}

const PaymentHistoryRow: React.FC<PaymentHistoryRowProps> = ({ transaction }) => {
  // 날짜 포맷 변경이 필요하다면 여기서 처리
  const displayDate = new Date(transaction.purchase_at).toLocaleString();

  return (
    <div className="flex max-lg:flex-col lg:items-center py-[10px] max-lg:p-[12px] border-b-[1px] max-lg:border-b-[0.5px] border-white-stroke h-[116px] max-lg:h-auto bg-white max-lg:gap-[6px]">
      <div className="flex flex-col w-[946px] max-lg:w-auto pl-[40px] max-lg:pl-[0px] gap-[10px] max-lg:gap-[0px]">
        <CardHeader
          date={displayDate}
          dateFormat="dateOnly"
          title={transaction.title}
          linkUrl={`/prompt/${transaction.prompt_id}`}
          showDateOnMobile={true}
        />
      </div>
      <div className="lg:hidden flex gap-[20px]">
        <div className="flex items-center justify-center w-[145px] max-lg:w-auto text-[20px] max-lg:text-[12px] text-text-on-white font-medium">
          {transaction.amount.toLocaleString()}원
        </div>
        <div className="flex items-center justify-center w-[145px] max-lg:w-auto text-[20px] max-lg:text-[12px] text-text-on-white font-medium">
          {transaction.paymentMethod}
        </div>
      </div>
    </div>
  );
};

export default PaymentHistoryRow;
