import { useMutation } from '@tanstack/react-query';
import { postPayment } from '@apis/PromptDetailPage/payments';
import type { RequestPaymentDTO, ResponseError, ResponsePaymentDTO } from '@/types/PromptDetailPage/payments';

export function usePostPayment() {
  return useMutation<ResponsePaymentDTO, ResponseError, RequestPaymentDTO>({
    mutationFn: async (paymentData) => {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw {
          error: 'Unauthorized',
          message: '로그인이 필요합니다.',
          statusCode: 401,
        };
      }
      return postPayment(paymentData, accessToken);
    },
  });
}

export default usePostPayment;