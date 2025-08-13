import { registerAccountInfo, updateAccountInfo } from '@/apis/MyPage/account';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useRegisterAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerAccountInfo,
    onSuccess: (data) => {
      console.log('계좌 등록 성공:', data);
      alert('계좌가 성공적으로 등록되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['myAccountInfo'] });
    },

    // onError: 뮤테이션이 실패했을 때 실행됩니다.
    onError: (error) => {
      console.error('계좌 등록 실패:', error);
      alert('계좌 등록에 실패했습니다. 입력 정보를 확인해주세요.');
    },
  });
};

//api 명세서 반영하여 수정 필요
export const useUpdateAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAccountInfo,
    onSuccess: (data) => {
      console.log('계좌 수정 성공:', data);
      alert('계좌가 성공적으로 수정되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['myAccountInfo'] });
    },

    // onError: 뮤테이션이 실패했을 때 실행됩니다.
    onError: (error) => {
      console.error('계좌 수정 실패:', error);
      alert('계좌 수정에 실패했습니다. 입력 정보를 확인해주세요.');
    },
  });
};
