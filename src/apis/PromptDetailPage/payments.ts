import type { RequestPaymentDTO } from '@/types/PromptDetailPage/payments';
import axios from 'axios';

export const postPayment = async (data: RequestPaymentDTO, accessToken: string) => {
  const res = await axios.post(`${import.meta.env.VITE_SERVER_API_URL}/api/prompts/purchases/requests`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
};
