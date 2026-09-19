import { isAxiosError } from 'axios';
import { postCompletePurchase, postRequestPayment } from '@/apis/MainPage/prompt';
import type { RequestCompletePurchaseDTO } from '@/types/PromptDetailPage/payments';

// 페이플 callbackFunction이 넘겨주는 결과 객체.
// /api/prompts/purchases/complete 요청 바디(PCD_PAY_REQKEY 등)와 1:1로 맞춰서 그대로 전달한다.
type PaypleAuthResult = RequestCompletePurchaseDTO;

declare global {
  interface Window {
    PaypleCpayAuthCheck: (payObj: Record<string, unknown>) => void;
  }
}

// payment.js(PaypleCpayPopup)는 PCD_PAY_URL을 PCD_PAY_HOST와 조합하지 않고 폼 action에 그대로 사용한다.
// 백엔드가 PCD_PAY_URL을 상대경로로 내려줘도 결제창이 뜰 수 있도록 여기서 절대경로로 보정한다.
const resolvePayUrl = (host: string | undefined, url: string | undefined) => {
  if (!url) return url ?? '';
  if (/^https?:\/\//i.test(url)) return url;
  const normalizedHost = (host ?? '').replace(/\/+$/, '');
  const normalizedPath = url.startsWith('/') ? url : `/${url}`;
  return `${normalizedHost}${normalizedPath}`;
};

// payment.js는 PCD_USER_DEFINE1을 <input value="..."> HTML 문자열로 그대로 조립한다.
// JSON의 "가 속성을 끊어 값이 "{"로 잘리므로, HTML 엔티티로 치환해 파싱 후 원본 JSON으로 복원되게 한다.
const escapeForPaypleForm = (value: string) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

export const usePayment = () => {
  const handlePayment = async (promptId: number, refundPolicyAgreed: boolean = true) => {
    try {
      // 1. 주문서 생성 (페이플 인증에 필요한 PCD_* 필드 반환)
      const order = await postRequestPayment(promptId, refundPolicyAgreed);
      console.log('주문서 생성', order);

      // 2. 페이플 결제창(PaypleCpayAuthCheck) 호출
      const authResult = await new Promise<PaypleAuthResult>((resolve, reject) => {
        if (!window.PaypleCpayAuthCheck) return reject(new Error('Payple SDK 미로드'));

        const payObj: Record<string, unknown> = {
          clientKey: import.meta.env.VITE_PAYPLE_CLIENT_KEY,
          PCD_CST_ID: order.PCD_CST_ID,
          PCD_CUST_KEY: order.PCD_CUST_KEY,
          PCD_AUTH_KEY: order.PCD_AUTH_KEY,
          PCD_PAY_TYPE: order.PCD_PAY_TYPE,
          PCD_PAY_WORK: order.PCD_PAY_WORK,
          PCD_PAY_HOST: order.PCD_PAY_HOST,
          PCD_PAY_URL: resolvePayUrl(order.PCD_PAY_HOST, order.PCD_PAY_URL),
          PCD_PAY_OID: order.PCD_PAY_OID,
          PCD_PAY_GOODS: order.PCD_PAY_GOODS,
          PCD_PAY_TOTAL: order.PCD_PAY_TOTAL,
          PCD_USER_DEFINE1: escapeForPaypleForm(order.PCD_USER_DEFINE1),
          // PCD_RST_URL은 의도적으로 넘기지 않는다. https URL이 있으면 payment.js가 결제창을 페이지 전체 이동으로
          // 띄워 callbackFunction과 /complete 호출이 실행되지 않는다. (BE는 콜백 결과를 /complete로 받는 흐름)
          callbackFunction: (result: PaypleAuthResult) => {
            console.log('Payple Auth Result:', result);

            if (!result || result.PCD_PAY_RST !== 'success') {
              reject(new Error(result?.PCD_PAY_MSG || '결제가 취소되었습니다.'));
            } else {
              resolve(result);
            }
          },
        };

        window.PaypleCpayAuthCheck(payObj);
      });

      // 3. 결제 인증 완료 이후 페이플 콜백 결과를 그대로 서버에 전달해 검증
      // (PCD_PAY_REQKEY로 서버가 페이플에 재검증하므로 콜백 결과 원본을 유지해야 함)
      const result = await postCompletePurchase(authResult);

      console.log('서버 검증 결과:', result);

      // 결제창 인증은 끝났지만 서버 검증/구매 확정이 실패한 경우.
      // 조용히 false를 반환하면 호출부에서 성공으로 오인하므로 백엔드 메시지로 예외를 던진다.
      if (result.status !== 'Succeed') {
        throw new Error(result.message || '결제 검증에 실패했습니다.');
      }

      return true;
    } catch (error) {
      // 409: 이미 구매한 프롬프트 (즉시 다운로드 진행)
      if (isAxiosError(error) && error.response?.status === 409) {
        console.log('이미 구매한 프롬프트입니다. 다운로드를 진행합니다.');
        return true;
      }
      console.error('결제 처리 중 오류 발생:', error);
      throw error;
    }
  };

  return { handlePayment };
};

export default usePayment;
