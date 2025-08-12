import { axiosInstance } from '@/apis/axios.ts';
import { LOCAL_STORAGE_KEY } from '@constants/key';

export const withdrawUser = async () => {
  try {
    const response = await axiosInstance.delete('/api/members/withdraw');

    localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
    console.log('Access token removed from local storage');
    localStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);
    console.log('회원탈퇴 성공:', response);
    window.location.href = '/';
  } catch (error) {
    console.error('회원탈퇴중 오류 발생:', error);
    throw error;
  }
};
