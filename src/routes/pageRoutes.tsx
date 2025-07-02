import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import { lazyRoutes } from './routes';
import HomeLayout from '@/layouts/HomeLayout';
import ProtectedLayout from '@/layouts/ProtectedLayout';

export const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <lazyRoutes.NotFoundPage />,
    children: [
      { index: true, element: <lazyRoutes.MainPage /> },
      { path: 'prompt/:id', element: <lazyRoutes.PromptDetailPage /> },
      { path: 'create', element: <lazyRoutes.PromptCreatePage /> },
      { path: 'guide/tip', element: <lazyRoutes.PromptGuidePage /> },
      { path: 'guide/tip/:id', element: <lazyRoutes.PromptGuideDetailPage /> },
      { path: 'guide/notice', element: <lazyRoutes.PromptGuidePage /> },
      { path: 'guide/notice/:id', element: <lazyRoutes.PromptGuideDetailPage /> },
      { path: 'profile/:id', element: <lazyRoutes.ProfilePage /> },
    ],
  },
];

export const protectedRoutes: RouteObject[] = [
  {
    path: '/mypage',
    element: <ProtectedLayout />,
    children: [
      {
        path: 'prompt',
        element: <lazyRoutes.MyPromtPage />,
      },
      { path: 'review', element: <lazyRoutes.MyReviewPage /> },
      { path: 'pay', element: <lazyRoutes.MyPayPage /> },
      { path: 'message', element: <lazyRoutes.MyMessagePage /> },
      { path: 'info', element: <lazyRoutes.MyInfoPage /> },
    ],
  },
];

export const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);
