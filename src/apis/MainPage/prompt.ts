import axios from 'axios';

import { type ResponsePromptDTO } from '@/types/MainPage/prompt';

export const getPromptList = async (): Promise<ResponsePromptDTO> => {
  const { data } = await axios.get(`${import.meta.env.VITE_SERVER_API_URL}/prompts`);

  return data;
};
