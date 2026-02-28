import { postCompletePurchase, postRequestPayment } from '@/apis/MainPage/prompt';

declare global {
  interface Window {
    PortOne: any;
  }
}

export const usePayment = () => {
  const handlePayment = async (promptId: number) => {
    try {
      // 1. 주문서 생성
      const order = await postRequestPayment(promptId);
      console.log('주문서 생성', order);

      // 2. 포트원 결제 SDK 호출
      const payment = await window.PortOne.requestPayment({
        storeId: order.storeId,
        channelKey: order.channelKey,
        paymentId: order.paymentId,
        orderName: order.orderName,
        totalAmount: order.totalAmount,
        currency: 'CURRENCY_KRW',
        payMethod: 'CARD',
        customData: {
          user_id: order.customData.user_id, // 숫자 또는 문자열
          prompt_id: order.customData.prompt_id, // 숫자 또는 문자열, 백엔드 검증용 필수
        },
        customer: {
          customerId: String(order.customData.user_id),
        },
      });

      console.log('Payment Result:', payment);

      // 3. 사용자가 결제창에서 취소한 경우
      if (!payment || payment.code !== undefined) {
        throw new Error('결제가 취소되었습니다.');
      }

      // 4. SDK 결제 완료 이후 해당 정보를 서버에서 검증
      // postCompletePurchase 함수는 (paymentId: string, promptId: number) 인자로 받도록 구현되어 있어야 함
      const result = await postCompletePurchase(payment.paymentId, Number(order.customData.prompt_id));

      console.log('서버 검증 결과:', result);

      return result;
    } catch (error: any) {
      console.error('결제 처리 중 오류 발생:', error);
      throw error;
    }
  };

  return { handlePayment };
};

export default usePayment;
