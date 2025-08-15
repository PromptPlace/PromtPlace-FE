import type { RequestPaymentDTO, ResponsePaymentDTO } from '@/types/PromptDetailPage/payments';
import axios from 'axios';

export const postPayment = async(data:RequestPaymentDTO): Promise<ResponsePaymentDTO> => {
  const res = await axios.post(`${import.meta.env.VITE_SERVER_API_URL}/api/prompts/purchases/requests`, data);
  return res.data;
};
