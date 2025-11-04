import axios from 'axios';
import { type ResponsePromptDTO, type ResponseSearchPromptDTO, type SearchPromptDto } from '@/types/MainPage/prompt';

export const getPromptList = async (): Promise<ResponsePromptDTO> => {
  const { data } = await axios.get(`${import.meta.env.VITE_SERVER_API_URL}/api/prompts`);

  return data;
};

export const postSearchPromptList = async (params: SearchPromptDto): Promise<ResponseSearchPromptDTO> => {
  const { data } = await axios.post(`${import.meta.env.VITE_SERVER_API_URL}/api/prompts/searches`, params);
  return data;
};
