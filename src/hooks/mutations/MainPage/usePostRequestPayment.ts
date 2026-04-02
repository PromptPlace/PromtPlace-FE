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

      // 2. 포트원 결제 SDK 호출 => sdk/결제 요청/결제 완료 순차적 실행하도록 구현
      const payment: any = await new Promise((resolve, reject) => {
        if (!window.PortOne) return reject(new Error('PortOne SDK 미로드'));

        window.PortOne.requestPayment(
          {
            storeId: order.storeId,
            channelKey: order.channelKey,
            paymentId: order.paymentId,
            orderName: order.orderName,
            totalAmount: order.totalAmount,
            currency: 'CURRENCY_KRW',
            payMethod: 'CARD',
            customData: {
              user_id: order.customData.user_id,
              prompt_id: order.customData.prompt_id,
            },
            customer: {
              customerId: String(order.customData.user_id),
            },
          },
          (result: any) => {
            console.log('Payment Result Callback:', result);

            // 사용자가 결제창에서 취소했거나 오류가 있는 경우
            if (!result || result.code !== undefined) {
              reject(new Error('결제가 취소되었습니다.'));
            } else {
              resolve(result);
            }
          },
        );
      });

      // 3. SDK 결제 완료 이후 해당 정보를 서버에서 검증
      const result = await postCompletePurchase(payment.paymentId, Number(order.customData.prompt_id));

      console.log('서버 검증 결과:', result);
      return result;
    } catch (error: any) {
      // 409: 이미 구매한 프롬프트 (즉시 다운로드 진행)
      if (error.response?.status === 409) {
        console.log('이미 구매한 프롬프트입니다. 다운로드를 진행합니다.');
        return { success: true, message: '이미 구매한 프롬프트입니다.' };
      }

      console.error('결제 처리 중 오류 발생:', error);
      throw error;
    }
  };

  return { handlePayment };
};

export default usePayment;
