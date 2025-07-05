import { useAuth } from '@/context/AuthContext';
import Navbar from '@components/Navbar';
import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedLayout = () => {
  const { accessToken } = useAuth();

  if (!accessToken) {
    alert('로그인 필요 - 로컬스토리지에서 임의의 accessToekn 등록 후 작업해주세요');
    return <Navigate to={'/'} replace />;
  }
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
