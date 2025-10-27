import { getNotification } from '@/apis/Navbar/notification';
import type { ResponseNotificationDto } from '@/types/Navbar/notification';
import { useInfiniteQuery } from '@tanstack/react-query';

function useGetNotifications() {
  return useInfiniteQuery({
    queryKey: ['notification'],
    queryFn: ({ pageParam }) => getNotification(pageParam),
    getNextPageParam: (lastPage: ResponseNotificationDto) => {
      const notificationList = lastPage.data.notifications;
      const hasMore = lastPage.data.has_more;

      if (hasMore && notificationList.length > 0) {
        const lastNotification = notificationList[notificationList.length - 1];
        return lastNotification.notification_id;
      }

      return undefined;
    },
    initialPageParam: undefined,
  });
}

export default useGetNotifications;
