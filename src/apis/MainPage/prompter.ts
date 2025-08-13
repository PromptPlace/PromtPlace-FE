import type { ResponsePrompterDTO } from '@/types/MainPage/prompter';
import axios from 'axios';

export const getPrompterList = async (): Promise<ResponsePrompterDTO> => {
  const { data } = await axios.get(`${import.meta.env.VITE_SERVER_API_URL}/api/prompters`);
  return data;
};
