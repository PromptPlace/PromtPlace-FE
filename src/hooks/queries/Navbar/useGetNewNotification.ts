import { getNewNotification } from '@/apis/Navbar/notification';
import { useQuery } from '@tanstack/react-query';

function useGetNewNotification() {
  return useQuery({
    queryKey: ['new-notification'],
    queryFn: getNewNotification,
  });
}

export default useGetNewNotification;
