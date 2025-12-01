import useGetNotifications from '@/hooks/queries/Navbar/useGetNotification';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import NavbarNotificatioinModalCard from './NavbarNotificatioinModalCard';
import TwinkleIcon from '@assets/profile/icon-twinkle.svg?react';

interface NavbarNotificationModalProps {
  setIsNotificationModalShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavbarNotificationModal = ({ setIsNotificationModalShow }: NavbarNotificationModalProps) => {
  const { ref, inView } = useInView({ threshold: 0 });

  // 회원 알림 목록 조회
  const { data: notificationData, isFetching, hasNextPage, fetchNextPage } = useGetNotifications();

  const count =
    notificationData?.pages.reduce((acc, page) => {
      return acc + page.data.notifications.length;
    }, 0) ?? 0;

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  return (
    <div className="w-[409px] max-phone:w-[335px] p-[32px] rounded-[16px] border border-transparent-inverse bg-white shadow-gradient flex flex-col gap-[16px] max-phone:absolute max-phone:left-1/2 max-phone:-translate-x-1/2 max-phone:top-[70px] max-phone:z-[50]">
      <div className="custom-h4 pb-[16px] border-b border-b-gray200 text-center">알림</div>
      <div className="max-h-[401px] h-full overflow-y-auto">
        {count > 0 &&
          notificationData?.pages
            .map((page) => page.data.notifications)
            .flat()
            .map((data) => (
              <NavbarNotificatioinModalCard
                key={data.notification_id}
                img={null}
                content={data.content}
                date={data.created_at}
                link={data.link_url}
                setIsNotificationModalShow={setIsNotificationModalShow}
              />
            ))}

        {count === 0 && (
          <div className="flex flex-col gap-[20px] items-center">
            <TwinkleIcon />
            <div className="text-gray500 flex flex-col gap-[8px] items-center">
              <p className="custom-h5 max-phone:text-[14px]">아직 받은 알림이 없어요.</p>
              <p className="custom-button2 max-phone:text-[10px]">새로운 소식이 생기면 알려드릴게요!</p>
            </div>
          </div>
        )}

        <div ref={ref}></div>
      </div>
    </div>
  );
};

export default NavbarNotificationModal;
