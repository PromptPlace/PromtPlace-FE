import { postCompletePurchase, postRequestPayment } from '@/apis/MainPage/prompt';

declare global {
  interface Window {
    PortOne: any;
  }
}

export const usePayment = () => {
  const handlePayment = async (promptId: number) => {
    // 1️⃣ 주문 생성
    const order = await postRequestPayment(promptId);

    const payment = await window.PortOne.requestPayment({
      storeId: order.storeId,
      channelKey: order.channelKey,
      paymentId: order.paymentId,
      orderName: order.orderName,
      totalAmount: order.totalAmount,
      currency: 'CURRENCY_KRW',
      payMethod: 'CARD',
      customData: {
        userId: order.customData.userId, // 숫자나 문자열만
        promptId: order.customData.promptId, // 숫자나 문자열만
      },
      customer: {
        customerId: String(order.customData.userId),
      },
    });

    // 사용자가 결제창에서 취소한 경우
    if (!payment || payment.code !== undefined) {
      throw new Error('결제가 취소되었습니다.');
    }

    // 3️⃣ 서버 검증
    const result = await postCompletePurchase(payment.paymentId);

    return result;
  };

  return { handlePayment };
};

export default usePayment;
