import React from 'react';

export const lazyRoutes = {
  SocialLoginCallbackPage: React.lazy(() => import('../pages/callback/SocialLoginCallback')),
  MainPage: React.lazy(() => import('../pages/MainPage/NewMainPage')),
  HomePage: React.lazy(() => import('../pages/HomePage/HomePage')),
  MyMessagePage: React.lazy(() => import('../pages/MyPage/MyMessagePage')),
  MyMessageDetailPage: React.lazy(() => import('../pages/MyPage/MyMessageDetailPage')),
  MyPage: React.lazy(() => import('../pages/MyPage/MyPage')),
  MyProfilePage: React.lazy(() => import('../pages/MyPage/MyProfilePage')),
  NotFoundPage: React.lazy(() => import('../pages/NotFoundPage/NotFoundPage')),
  ProfilePage: React.lazy(() => import('../pages/ProfilePage/NewProfilePage')),
  PromptCreatePage: React.lazy(() => import('../pages/PromptCreatePage/PromptCreatePage')),
  PromptLandingPage: React.lazy(() => import('../pages/PromptCreatePage/PromptLandingPage')),
  PromptCreateTextPage: React.lazy(() => import('../pages/PromptCreatePage/PromptCreateTextPage')),
  PromptCreateImgPage: React.lazy(() => import('../pages/PromptCreatePage/PromptCreateImgPage')),
  PromptDetailPage: React.lazy(() => import('../pages/PromptDetailPage/PromptDetailPage')),
  PromptGuidePage: React.lazy(() => import('../pages/PromptGuidePage/PromptGuidePage')),
  PromptNoticePage: React.lazy(() => import('../pages/PromptGuidePage/PromptNoticePage')),
  PromptTipePage: React.lazy(() => import('../pages/PromptGuidePage/PromptTipPage')),
  PromptGuideDetailPage: React.lazy(() => import('../pages/PromptGuidePage/PromptGuideDetailPage')),
  PromptTipDetailPage: React.lazy(() => import('../pages/PromptGuidePage/PromptTipDetailPage')),
  PromptNoticeDetailPage: React.lazy(() => import('../pages/PromptGuidePage/PromptNoticeDetailPage')),
  PromptEditPage: React.lazy(() => import('../pages/PromptEdit/PromptEditPage')),
  AdminComplaintPage: React.lazy(() => import('../pages/AdminPage/AdiminComplaintPage')),
  PromptGuideCreatePage: React.lazy(() => import('../pages/AdminPage/PromptGuideCreatePage')),
  AdminComplaintDetailPage: React.lazy(() => import('../pages/AdminPage/AdminComplaintDetailPage')),
<<<<<<< HEAD
=======
  TestPage: React.lazy(() => import('../pages/TestPage')),
>>>>>>> 8a06a32 (♻️ refactor: 미사용 파일 삭제 및 라우팅 처리에서 제거(#390))
  ChatPage: React.lazy(() => import('../pages/ChatPage/ChatPage')),
  ChatRoomPage: React.lazy(() => import('../pages/ChatPage/ChatRoomPage')),
  TestPage: React.lazy(() => import('../pages/TestPage')),
};
