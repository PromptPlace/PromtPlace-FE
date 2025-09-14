import type { PaymentCheckRequestDTO, PaymentCheckResponseDTO, RequestPaymentDTO, ResponsePaymentDTO } from '@/types/PromptDetailPage/payments';
import { axiosInstance } from '@/apis/axios';

export const postPayment = async (data: RequestPaymentDTO): Promise<ResponsePaymentDTO> => {
  console.log('결제 API 호출:', {
    url: `/api/prompts/purchases/requests`,
    data,
  });

  const res = await axiosInstance.post(`/api/prompts/purchases/requests`, data);
  return res.data;
};

export const postPaymentCheck = async (data: PaymentCheckRequestDTO): Promise<PaymentCheckResponseDTO> => {
  console.log('결제 확인 API 호출:', {
    url: `/api/prompts/purchases/requests`,
    data,
  });

  const res = await axiosInstance.post(`/api/prompts/purchases/complete`, data);
  return res.data;
};
