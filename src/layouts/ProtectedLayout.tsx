import { useAuth } from '@/context/AuthContext';
import ScrollToTop from '@utils/scrollToTop';
import Navbar from '@/components/Navbar/Navbar';
import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Footer from '@/components/Footer';

const ProtectedLayout = () => {
  const { accessToken } = useAuth();

  if (!accessToken) {
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

      {/* <div className="phone:hidden max-phone:block">
        <TabBar />
      </div> */}

      <Footer />
    </>
  );
};

export default ProtectedLayout;
