import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import { lazyRoutes } from './routes';
import HomeLayout from '@/layouts/HomeLayout';
import ProtectedLayout from '@/layouts/ProtectedLayout';
import AdminLayout from '@/layouts/AdminLayout';

export const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <lazyRoutes.NotFoundPage />,
    children: [
      { index: true, element: <lazyRoutes.HomePage /> },
      { path: 'prompt', element: <lazyRoutes.MainPage /> },
      { path: 'prompt/:id', element: <lazyRoutes.PromptDetailPage /> },
      { path: 'create', element: <lazyRoutes.PromptLandingPage /> },
      { path: 'create/text', element: <lazyRoutes.PromptCreateTextPage /> },
      { path: 'create/img', element: <lazyRoutes.PromptCreateImgPage /> },
      { path: 'guide/tip', element: <lazyRoutes.PromptTipePage /> },
      { path: 'guide/tip/:id', element: <lazyRoutes.PromptTipDetailPage /> },
      { path: 'guide/notice', element: <lazyRoutes.PromptNoticePage /> },
      { path: 'guide/notice/:id', element: <lazyRoutes.PromptNoticeDetailPage /> },
      { path: 'profile/:id', element: <lazyRoutes.ProfilePage /> },
      // { path: '/test', element: <TestPage /> },
      { path: 'mypage', element: <lazyRoutes.MyPage /> },
      { path: '/auth/callback', element: <lazyRoutes.SocialLoginCallbackPage /> },
      // { path: 'guide/tip', element: <lazyRoutes.PromptGuidePage type="tip" /> },
      // { path: 'guide/notice', element: <lazyRoutes.PromptNoticePage /> },
      // { path: 'guide/tip/create', element: <lazyRoutes.PromptGuideCreatePage type="tip" /> },
      // { path: 'guide/notice/create', element: <lazyRoutes.PromptGuideCreatePage type="notice" /> },
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
      { path: 'info/account', element: <lazyRoutes.MyAccountPage /> },
      { path: 'edit/:id', element: <lazyRoutes.PromptEditPage /> },
      { path: 'profile', element: <lazyRoutes.MyProfilePage /> },
    ],
  },
];

export const adminRoutes: RouteObject[] = [
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      //ex: { path: 'report', element: <lazyRoutes.AdminReportPage /> },
      { path: 'complaint', element: <lazyRoutes.AdminComplaintPage /> },
      { path: 'guide/tip/create', element: <lazyRoutes.PromptGuideCreatePage type="tip" /> },
      { path: 'guide/notice/create', element: <lazyRoutes.PromptGuideCreatePage type="notice" /> },
      { path: 'complaint/:id', element: <lazyRoutes.AdminComplaintDetailPage /> },
    ],
  },
];

export const router = createBrowserRouter([...publicRoutes, ...protectedRoutes, ...adminRoutes]);
