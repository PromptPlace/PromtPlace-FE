import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants/key';
import { getPromptList } from '@/apis/MainPage/prompt';
import type { PromptQueryState, ResponsePromptDTO } from '@/types/MainPage/prompt';
import type { ResponseAccountAdminDto } from '@/types/ProfilePage/admin.ts';
import { getSettlementAccount } from '@apis/AdminPage/settlement.ts';
import type { Account, CommonSettlementResponseDTO } from '@/types/AdminPage/settlement.ts';

function useGetPromptList(queryParams?: PromptQueryState) {
  return useQuery<ResponsePromptDTO>({
    queryKey: [QUERY_KEY.prompts, queryParams],
    queryFn: () => getPromptList(),
    staleTime: 1000 * 6 * 5,
    gcTime: 1000 * 6 * 10,
  });
}

export default function useGetSettlementAccount() {
  return useQuery<CommonSettlementResponseDTO<Account>>({
    queryKey: ['settlementAccount'],
    queryFn: () => getSettlementAccount(),
    staleTime: 1000 * 6 * 5,
    gcTime: 1000 * 6 * 10,
  });
}
