import useGetNotifications from '@/hooks/queries/Navbar/useGetNotification';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import NavbarNotificatioinModalCard from './NavbarNotificatioinModalCard';

interface NavbarNotificationModalProps {
  setIsNotificationModalShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavbarNotificationModal = ({ setIsNotificationModalShow }: NavbarNotificationModalProps) => {
  const { ref, inView } = useInView({ threshold: 0 });

  // 회원 알림 목록 조회
  const { data: notificationData, isFetching, hasNextPage, fetchNextPage } = useGetNotifications();

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  return (
    <div className="w-[409px] p-[32px] rounded-[16px] border border-transparent-inverse bg-white shadow-gradient flex flex-col gap-[16px]">
      <div className="custom-h4 pb-[16px] border-b border-b-gray200 text-center">알림</div>
      <div className="max-h-[401px] h-full overflow-y-auto">
        {notificationData?.pages
          .map((page) => page.data.notifications)
          .flat()
          .map((data) => (
            <NavbarNotificatioinModalCard
              img={null}
              content={data.content}
              date={data.created_at}
              link={data.link_url}
              setIsNotificationModalShow={setIsNotificationModalShow}
            />
          ))}

        <div ref={ref}></div>
      </div>
    </div>
  );
};

export default NavbarNotificationModal;
