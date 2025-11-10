import ScrollToTop from '@/utils/scrollToTop';
import Navbar from '@/components/Navbar/Navbar';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '@/components/Footer';

const HomeLayout = () => {
  return (
    <div className="max-w-[1920px] w-full m-auto">
      <ScrollToTop />
      <Navbar />

      <div className="bg-background" style={{ minHeight: 'calc(100vh - 140px)' }}>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </div>

      <Footer />
    </div>
  );
};

export default HomeLayout;
