import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants/key';
import { getPrompterList } from '@/apis/MainPage/prompter';
import type { ResponsePrompterDTO } from '@/types/MainPage/prompter';

export const useGetPrompterList = (page = 1, limit = 50) => {
  return useQuery<ResponsePrompterDTO>({
    queryKey: [QUERY_KEY.prompters, page, limit],
    queryFn: () => getPrompterList(page, limit),
    staleTime: 1000 * 60,
  });
};

export default useGetPrompterList;
