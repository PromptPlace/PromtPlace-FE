import Navbar from '@components/Navbar';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const ProtectedLayout = () => {
  return (
    <>
      <Navbar />
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default ProtectedLayout;
