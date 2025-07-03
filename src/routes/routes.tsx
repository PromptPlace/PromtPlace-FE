import React from 'react';

export const lazyRoutes = {
  MainPage: React.lazy(() => import('../pages/MainPage/MainPage')),
  MyInfoPage: React.lazy(() => import('../pages/MyPage/MyInfoPage')),
  MyMessagePage: React.lazy(() => import('../pages/MyPage/MyMessagePage')),
  MyMessageDetailPage: React.lazy(() => import('../pages/MyPage/MyMessageDetailPage')),
  MyPayPage: React.lazy(() => import('../pages/MyPage/MyPayPage')),
  MyPromptPage: React.lazy(() => import('../pages/MyPage/MyPromptPage')),
  MyReviewPage: React.lazy(() => import('../pages/MyPage/MyReviewPage')),
  NotFoundPage: React.lazy(() => import('../pages/NotFoundPage/NotFoundPage')),
  ProfilePage: React.lazy(() => import('../pages/ProfilePage/ProfilePage')),
  PromptCreatePage: React.lazy(() => import('../pages/PromptCreatePage/PromptCreatePage')),
  PromptDetailPage: React.lazy(() => import('../pages/PromptDetailPage/PromptDetailPage')),
  PromptGuidePage: React.lazy(() => import('../pages/PromptGuidePage/PromptGuidePage')),
  PromptGuideDetailPage: React.lazy(() => import('../pages/PromptGuidePage/PromptGuideDetailPage')),
};
