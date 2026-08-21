import { isAxiosError } from 'axios';
import { postCompletePurchase, postRequestPayment } from '@/apis/MainPage/prompt';
import { SESSION_STORAGE_KEY } from '@/constants/key';
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

export const usePayment = () => {
  const handlePayment = async (promptId: number, refundPolicyAgreed: boolean = true) => {
    // 페이플이 결제 취소 시 콜백 없이 PCD_RST_URL로 브라우저를 직접 리다이렉트시키는 경우가 있어,
    // 그 착지 페이지(PurchaseResultPage)에서 원래 보던 프롬프트로 돌아갈 수 있도록 미리 기록해둔다.
    sessionStorage.setItem(SESSION_STORAGE_KEY.pendingPurchasePromptId, String(promptId));

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
          PCD_USER_DEFINE1: order.PCD_USER_DEFINE1,
          PCD_RST_URL: order.PCD_RST_URL, // 백엔드 웹훅 URL — 프론트에서 임의로 덮어쓰면 안 됨
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

      return result.status === 'Succeed';
    } catch (error) {
      // 409: 이미 구매한 프롬프트 (즉시 다운로드 진행)
      if (isAxiosError(error) && error.response?.status === 409) {
        console.log('이미 구매한 프롬프트입니다. 다운로드를 진행합니다.');
        return true;
      }
      console.error('결제 처리 중 오류 발생:', error);
      throw error;
    } finally {
      // 정상적으로 콜백을 받아 이 지점까지 실행됐다면(=페이지 이동 없이 끝났다면) 더 이상 필요 없는 기록이므로 정리한다.
      sessionStorage.removeItem(SESSION_STORAGE_KEY.pendingPurchasePromptId);
    }
  };

  return { handlePayment };
};

export default usePayment;
