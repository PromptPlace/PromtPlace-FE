import { useAuth } from '@/context/AuthContext';
import ScrollToTop from '@utils/scrollToTop';
import Navbar from '@/components/Navbar/Navbar';
import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import TabBar from '@/components/TabBar';
import Footer from '@/components/Footer';

const AdminLayout = () => {
  const { user } = useAuth();

  if (user.role !== 'ADMIN') {
    return <Navigate to={'/'} replace />;
  }
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <div className="bg-background" style={{ minHeight: 'calc(100vh - 140px)' }}>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </div>

      <div className="phone:hidden max-phone:block">
        <TabBar />
      </div>

      <Footer />
    </>
  );
};

export default AdminLayout;
