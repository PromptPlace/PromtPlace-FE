import { useAuth } from '@/context/AuthContext';
import ScrollToTop from '@utils/scrollToTop';
import Navbar from '@/components/Navbar/Navbar';
import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import TabBar from '@/components/TabBar';

const AdminLayout = () => {
  const { user } = useAuth();

  if (user.role !== 'ADMIN') {
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

      <div className="phone:hidden max-phone:block">
        <TabBar />
      </div>
    </>
  );
};

export default AdminLayout;
