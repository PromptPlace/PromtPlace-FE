import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import { lazyRoutes } from './routes';
import HomeLayout from '@/layouts/HomeLayout';
import ProtectedLayout from '@/layouts/ProtectedLayout';
import TestPage from '@/pages/TestPage';

export const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <lazyRoutes.NotFoundPage />,
    children: [
      { index: true, element: <lazyRoutes.MainPage /> },
      { path: 'prompt/:id', element: <lazyRoutes.PromptDetailPage /> },
      { path: 'create', element: <lazyRoutes.PromptCreatePage /> },
      { path: 'guide/tip', element: <lazyRoutes.PromptGuidePage type="tip" /> },
      { path: 'guide/tip/:id', element: <lazyRoutes.PromptGuideDetailPage type="tip" /> },
      { path: 'guide/notice', element: <lazyRoutes.PromptGuidePage type="notice" /> },
      { path: 'guide/notice/:id', element: <lazyRoutes.PromptGuideDetailPage type="notice" /> },
      { path: 'profile/:id', element: <lazyRoutes.ProfilePage /> },
      { path: '/test', element: <TestPage /> },
      { path: 'search/:keyword', element: <lazyRoutes.SearchPage /> },
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
        element: <lazyRoutes.MyPromptPage />,
      },
      { path: 'review', element: <lazyRoutes.MyReviewPage /> },
      { path: 'pay', element: <lazyRoutes.MyPayPage /> },
      { path: 'paymentHistory', element: <lazyRoutes.MyPaymentHistory /> },
      { path: 'message/message', element: <lazyRoutes.MyMessagePage type="message" /> },
      { path: 'message/message/:id', element: <lazyRoutes.MyMessageDetailPage type="message" /> },
      { path: 'message/notification', element: <lazyRoutes.MyMessagePage type="notification" /> },
      { path: 'message/notification/:id', element: <lazyRoutes.MyMessageDetailPage type="notification" /> },
      { path: 'info', element: <lazyRoutes.MyInfoPage /> },
    ],
  },
];

export const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);
