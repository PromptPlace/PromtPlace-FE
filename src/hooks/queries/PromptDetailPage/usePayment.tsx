// import { useState } from 'react';
// import { useAuth } from '@/context/AuthContext';
// import { usePayment } from '@/hooks/mutations/MainPage/usePostRequestPayment';

// // 포트원 결제 요청 데이터 타입
// interface PortOnePaymentData {
//   pg: string;
//   pay_method: string;
//   merchant_uid: string;
//   name: string;
//   amount: number;
//   buyer_email: string;
//   buyer_name: string;
//   buyer_tel: string;
//   buyer_addr: string;
//   buyer_postcode: string;
//   m_redirect_url: string;
//   custom_data: {
//     promptId: number;
//   };
// }

// // 포트원 결제 응답 타입
// interface PortOneResponse {
//   success: boolean;
//   imp_uid?: string;
//   merchant_uid?: string;
//   error_msg?: string;
//   paid_amount?: number;
//   pay_method?: string;
// }

// // 포트원 v1 타입 정의
// declare global {
//   interface Window {
//     IMP: {
//       init: (impCode: string) => void;
//       request_pay: (paymentData: PortOnePaymentData, callback: (response: PortOneResponse) => void) => void;
//     };
//   }
// }

// const usePayment = () => {
//   const [loading, setLoading] = useState(false);
//   const { user } = useAuth();
//   const [phoneNumber, setPhoneNumber] = useState<string>('');

//   const { handlePayment } = usePayment();

//   if (!window.PortOne) return; // SDK 없으면 막기
//   setLoading(true);
//   try {
//     const result = await handlePayment(promptId);
//     console.log('결제 완료:', result);
//     _onPaid();
//     onClose();
//   } catch (err: any) {
//     console.error(err);
//     alert(err.message || '결제 실패');
//   } finally {
//     setLoading(false);
//   }
// };

// export default usePayment;
