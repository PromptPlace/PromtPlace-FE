import type { RequestPaymentDTO, ResponsePaymentDTO } from '@/types/PromptDetailPage/payments';
import { axiosInstance } from '@/apis/axios';

export const postPayment = async(data:RequestPaymentDTO): Promise<ResponsePaymentDTO> => {
  console.log('결제 API 호출:', {
    url: `/api/prompts/purchases/requests`,
    data
  });

  const res = await axiosInstance.post(`/api/prompts/purchases/requests`, data);
  return res.data;
};

export const completePayment = async(imp_uid: string): Promise<void> => {
  console.log('결제 완료 API 호출:', {
    url: `/api/prompts/purchases/complete/${imp_uid}`
  });

  await axiosInstance.post(`/api/prompts/purchases/complete/${imp_uid}`);
}