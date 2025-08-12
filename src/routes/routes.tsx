import React from 'react';

export const lazyRoutes = {
  MainPage: React.lazy(() => import('../pages/MainPage/MainPage')),
  MyInfoPage: React.lazy(() => import('../pages/MyPage/MyInfoPage')),
  MyAccountPage: React.lazy(() => import('../pages/MyPage/MyAccountPage')),
  MyMessagePage: React.lazy(() => import('../pages/MyPage/MyMessagePage')),
  MyMessageDetailPage: React.lazy(() => import('../pages/MyPage/MyMessageDetailPage')),
  MyPage: React.lazy(() => import('../pages/MyPage/MyPage')),
  MyPayPage: React.lazy(() => import('../pages/MyPage/MyPayPage')),
  MyPaymentHistory: React.lazy(() => import('../pages/MyPage/MyPaymentHistoryPage')),
  MyPromptPage: React.lazy(() => import('../pages/MyPage/MyPromptPage')),
  MyReviewPage: React.lazy(() => import('../pages/MyPage/MyReviewPage')),
  NotFoundPage: React.lazy(() => import('../pages/NotFoundPage/NotFoundPage')),
  ProfilePage: React.lazy(() => import('../pages/ProfilePage/ProfilePage')),
  PromptCreatePage: React.lazy(() => import('../pages/PromptCreatePage/PromptCreatePage')),
  PromptDetailPage: React.lazy(() => import('../pages/PromptDetailPage/PromptDetailPage')),
  PromptGuidePage: React.lazy(() => import('../pages/PromptGuidePage/PromptGuidePage')),
  PromptGuideDetailPage: React.lazy(() => import('../pages/PromptGuidePage/PromptGuideDetailPage')),
  PromptEditPage: React.lazy(() => import('../pages/PromptEdit/PromptEditPage')),
};
