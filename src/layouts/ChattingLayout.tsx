import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const ChattingLayout = () => {
  return (
    <div className="bg-background">
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default ChattingLayout;
