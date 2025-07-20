/*import Navbar from '@components/Navbar';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
  return (
    <>
      <Navbar />
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default HomeLayout;*/

import ScrollToTop from '@/utils/scrollToTop';
import Navbar from '@components/Navbar';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <div className="bg-background" style={{ height: 'calc(100vh - 75px)' }}>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
};

export default HomeLayout;
//마진영역에 배경색 적용이 안돼서 네브바 부분 제외하고 배경색 적용 코드 추가했습니다.
