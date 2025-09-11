import { useMutation } from '@tanstack/react-query';
import { postPayment, postPaymentCheck } from '@apis/PromptDetailPage/payments';
import type {
  PaymentCheckRequestDTO,
  PaymentCheckResponseDTO,
  RequestPaymentDTO,
  ResponseError,
  ResponsePaymentDTO,
} from '@/types/PromptDetailPage/payments';

export function usePostPayment() {
  return useMutation<ResponsePaymentDTO, ResponseError, RequestPaymentDTO>({
    mutationFn: postPayment,
  });
}

export function usePostPaymentCheck() {
  return useMutation<PaymentCheckResponseDTO, ResponseError, PaymentCheckRequestDTO>({
    mutationFn: postPaymentCheck,
  });
}
