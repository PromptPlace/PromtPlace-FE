import { registerAccountInfo } from "@/apis/MyPage/account";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export const useRegisterAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // mutationFn에는 API를 호출하는 함수를 전달합니다.
    mutationFn: registerAccountInfo,

    // onSuccess: 뮤테이션이 성공했을 때 실행됩니다.
    onSuccess: (data) => {
      console.log('계좌 등록 성공:', data);
      alert('계좌가 성공적으로 등록되었습니다.');

      // 중요: 계좌 등록 후, 'accounts'라는 키를 가진 쿼리를 무효화합니다.
      // 이렇게 하면 useQuery(['accounts'])를 사용하는 컴포넌트가 자동으로
      // 최신 계좌 목록을 다시 불러옵니다.
      queryClient.invalidateQueries({ queryKey: ['myAccountInfo'] });
    },

    // onError: 뮤테이션이 실패했을 때 실행됩니다.
    onError: (error) => {
      console.error('계좌 등록 실패:', error);
      // 실제 서비스에서는 error.response.data.message 등을 활용해
      // 사용자에게 더 친절한 에러 메시지를 보여주는 것이 좋습니다.
      alert('계좌 등록에 실패했습니다. 입력 정보를 확인해주세요.');
    },
  });
};