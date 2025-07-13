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
      <div className="flex items-center py-[10px] border-b-[1px] border-white-stroke h-[116px] bg-white">
        <div className="flex flex-col w-[946px] pl-[40px] gap-[10px]">
          <CardHeader
            date={displayDate}
            dateFormat="dateOnly"
            title={transaction.title}
            linkUrl={`/prompt/${transaction.prompt_id}`}
          />
         
        </div>
        
          <div className="flex items-center justify-center w-[145px] text-[20px] text-text-on-white font-medium">{transaction.amount.toLocaleString()}원</div>
          <div className="flex items-center justify-center w-[145px] text-[20px] text-text-on-white font-medium">{transaction.paymentMethod}</div>
         
      </div>
    );
  };

  export default PaymentHistoryRow;