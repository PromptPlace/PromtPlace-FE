import axios from 'axios';
import { axiosInstance } from '@/apis/axios.ts';
import type { ApiResponse, DownloadedPromptDTO} from '@/types/MyPage/prompt';



export const getDownloadedPrompts = async (accessToken: string): Promise<DownloadedPromptDTO[]> => {
  // 서버 응답은 DTO 형태의 데이터를 포함합니다.
  const response = await axiosInstance.get<ApiResponse<DownloadedPromptDTO[]>>('/me/prompts/downloaded', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  
  // 서버에서 받은 DTO 배열을 map 함수를 사용해 우리 모델 배열로 변환하여 반환합니다.
  return response.data;
};