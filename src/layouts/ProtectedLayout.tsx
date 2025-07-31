import { useAuth } from '@/context/AuthContext';
import ScrollToTop from '@utils/scrollToTop';
import Navbar from '@components/Navbar';
import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import TabBar from '@components/TabBar';

const ProtectedLayout = () => {
  const { accessToken } = useAuth();

  if (!accessToken) {
    alert('로그인 필요 - 로컬스토리지에서 임의의 accessToekn 등록 후 작업해주세요');
    return <Navigate to={'/'} replace />;
  }
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <div className="bg-background lg:pb-0 max-lg:pb-[64px]" style={{ minHeight: 'calc(100vh - 75px)' }}>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </div>

      <div className="lg:hidden max-lg:block">
        <TabBar />
      </div>
    </>
  );
};

export default ProtectedLayout;
