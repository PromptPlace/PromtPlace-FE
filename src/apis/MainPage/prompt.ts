import axios from 'axios';
import { type ResponsePromptDTO, type ResponseSearchPromptDTO, type SearchPromptDto } from '@/types/MainPage/prompt';
import type { ResponseCompletePurchaseDTO, ResponsePaymentDTO } from '@/types/PromptDetailPage/payments';

export const getPromptList = async (): Promise<ResponsePromptDTO> => {
  const { data } = await axios.get(`${import.meta.env.VITE_SERVER_API_URL}/api/prompts`);

  return data;
};

export const postSearchPromptList = async (params: SearchPromptDto): Promise<ResponseSearchPromptDTO> => {
  const { data } = await axios.post(`${import.meta.env.VITE_SERVER_API_URL}/api/prompts/searches`, params);
  return data;
};

export const postRequestPayment = async (promptId: number): Promise<ResponsePaymentDTO> => {
  const token = sessionStorage.getItem('accessToken'); // 토큰 가져오기
  const accessToken = token?.replace(/^"|"$/g, ''); // 앞뒤 큰따옴표 제거
  const { data } = await axios.post(
    `${import.meta.env.VITE_SERVER_API_URL}/api/prompts/purchases/requests`,
    { prompt_id: promptId },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return data;
};

export const postCompletePurchase = async (paymentId: string): Promise<ResponseCompletePurchaseDTO> => {
  const token = sessionStorage.getItem('accessToken'); // 토큰 가져오기
  const accessToken = token?.replace(/^"|"$/g, ''); // 앞뒤 큰따옴표 제거
  const { data } = await axios.post(
    `${import.meta.env.VITE_SERVER_API_URL}/api/prompts/purchases/complete`,
    { paymentId },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return data;
};
