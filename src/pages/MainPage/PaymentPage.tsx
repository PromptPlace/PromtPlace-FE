import React, { useState } from 'react';
import PaymentModal from './components/paymentModal';

const PaymentPage = () => {
  const [open, setOpen] = useState(false);

  // 예시용 프롬프트 데이터
  const prompt = { title: '동양풍 일러스트 이미지 생성', price: '1,800 원' };

  const handleClose = () => setOpen(false);

  return (
    <div>
      <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => setOpen(true)}>
        결제 모달 오픈 버튼
      </button>
      {open && <PaymentModal prompt={prompt} onClose={handleClose} />}
    </div>
  );
};

export default PaymentPage;
