import { useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { getAdjustmentDetail } from '@apis/MyPage/settlement.ts';

function useGetSettlementAccountDetail() {
  return useQuery({
    queryKey: ['settlementAccountDetail'],
    queryFn: () => getAdjustmentDetail(),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    // 404(판매자 미등록)는 정상 케이스라 재시도할 필요 없음 — 재시도 없이 바로 판단해야
    // 대시보드 탭 진입 시 등록 여부 판정이 지연되지 않음
    retry: (count, err) => !(isAxiosError(err) && err.response?.status === 404) && count < 1,
  });
}

export default useGetSettlementAccountDetail;
