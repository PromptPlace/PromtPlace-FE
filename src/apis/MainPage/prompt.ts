import axios from 'axios';

import { type RequestSearchPrompt, type ResponsePromptDTO } from '@/types/MainPage/prompt';

export const getPromptList = async (): Promise<ResponsePromptDTO> => {
  const { data } = await axios.get(`${import.meta.env.VITE_SERVER_API_URL}/api/prompts`);

  return data;
};

export const getSearchPromptList = async (params: RequestSearchPrompt): Promise<ResponsePromptDTO> => {
  const { data } = await axios.post(`${import.meta.env.VITE_SERVER_API_URL}/api/prompts/searches`, { params });
  return data;
};
