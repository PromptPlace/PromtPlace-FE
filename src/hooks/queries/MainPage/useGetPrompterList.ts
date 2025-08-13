import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants/key';
import { getPrompterList } from '@/apis/MainPage/prompter';
import type { ResponsePrompterDTO } from '@/types/MainPage/prompter';

function useGetPrompterList() {
  return useQuery<ResponsePrompterDTO>({
    queryKey: [QUERY_KEY.prompterList],
    queryFn: () => getPrompterList(),
    staleTime: 1000 * 6 * 5,
    gcTime: 1000 * 6 * 10,
  });
}

export default useGetPrompterList;
