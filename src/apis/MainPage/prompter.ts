import type { ResponsePrompterDTO } from '@/types/MainPage/prompter';
import axios from 'axios';

export const getPrompterList = async (page: 1, limit: 50): Promise<ResponsePrompterDTO> => {
  const { data } = await axios.get(`${import.meta.env.VITE_SERVER_API_URL}/api/members`, {
    params: { page, limit },
  });

  return data;
};
