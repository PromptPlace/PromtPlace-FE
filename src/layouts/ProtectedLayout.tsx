import { useAuth } from '@/context/AuthContext';
import ScrollToTop from '@utils/scrollToTop';
import Navbar from '@/components/Navbar/Navbar';
import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedLayout = () => {
  const { accessToken } = useAuth();

  if (!accessToken) {
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

      {/* <div className="lg:hidden max-lg:block">
        <TabBar />
      </div> */}
    </>
  );
};

export default ProtectedLayout;
