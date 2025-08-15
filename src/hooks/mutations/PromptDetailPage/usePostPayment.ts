import { useMutation } from '@tanstack/react-query';
import { postPayment } from '@apis/PromptDetailPage/payments';
import type { RequestPaymentDTO, ResponseError, ResponsePaymentDTO } from '@/types/PromptDetailPage/payments';

export function usePostPayment() {
  return useMutation<ResponsePaymentDTO, ResponseError, RequestPaymentDTO>({
    mutationFn: postPayment,
  });
}

export default usePostPayment;