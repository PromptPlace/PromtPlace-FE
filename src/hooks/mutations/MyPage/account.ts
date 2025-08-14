import { registerAccountInfo, updateAccountInfo, requestWithdrawal } from '@/apis/MyPage/account';
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

export const useRequestWithdrawal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: requestWithdrawal, // (amount) => requestWithdrawal(amount)와 동일
    onSuccess: (data) => {
      // 출금이 성공하면, 관련된 데이터들을 모두 '오래된 데이터'로 만들어 새로고침합니다.
      alert('출금 신청이 완료되었습니다.');
      //'출금 가능 금액' 새로고침
      console.log('출금 요청 응답:', data);
      queryClient.invalidateQueries({ queryKey: ['withdrawableAmount'] });
    },
    onError: (error) => {
      console.error('출금 요청에 실패했습니다:', error);
      alert('출금 요청 중 오류가 발생했습니다.');
    },
  });
};
