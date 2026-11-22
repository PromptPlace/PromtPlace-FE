import React from 'react';

export const lazyRoutes = {
  // Shared
  NotFoundPage: React.lazy(() => import('../pages/NotFoundPage/NotFoundPage')),

  // Home and prompt browsing
  HomePage: React.lazy(() => import('../pages/HomePage/HomePage')),
  MainPage: React.lazy(() => import('../pages/MainPage/MainPage.tsx')),
  PromptDetailPage: React.lazy(() => import('../pages/PromptDetailPage/PromptDetailPage')),
  ProfilePage: React.lazy(() => import('../pages/ProfilePage/ProfilePage.tsx')),
  PurchaseResultPage: React.lazy(() => import('../pages/PurchaseResultPage/PurchaseResultPage')),

  // Prompt creation and editing
  PromptLandingPage: React.lazy(() => import('../pages/PromptCreatePage/PromptLandingPage')),
  PromptCreateTextPage: React.lazy(() => import('../pages/PromptCreatePage/PromptCreateTextPage')),
  PromptCreateImgPage: React.lazy(() => import('../pages/PromptCreatePage/PromptCreateImgPage')),

  // Guides
  PromptNoticePage: React.lazy(() => import('../pages/PromptGuidePage/PromptNoticePage')),
  PromptTipePage: React.lazy(() => import('../pages/PromptGuidePage/PromptTipPage')),
  PromptTipDetailPage: React.lazy(() => import('../pages/PromptGuidePage/PromptTipDetailPage')),
  PromptNoticeDetailPage: React.lazy(() => import('../pages/PromptGuidePage/PromptNoticeDetailPage')),

  // My page
  MyPage: React.lazy(() => import('../pages/MyPage/MyPage')),
  MyMessagePage: React.lazy(() => import('../pages/MyPage/MyMessagePage')),
  MyMessageDetailPage: React.lazy(() => import('../pages/MyPage/MyMessageDetailPage')),
  MyProfilePage: React.lazy(() => import('../pages/MyPage/MyProfilePage')),

  // Authentication
  SocialLoginCallbackPage: React.lazy(() => import('../pages/callback/SocialLoginCallback')),

  // Chat
  ChatPage: React.lazy(() => import('../pages/ChatPage/ChatPage')),
  ChatRoomPage: React.lazy(() => import('../pages/ChatPage/ChatRoomPage')),

  // Admin
  AdminComplaintPage: React.lazy(() => import('../pages/AdminPage/AdiminComplaintPage')),
  AdminComplaintDetailPage: React.lazy(() => import('../pages/AdminPage/AdminComplaintDetailPage')),
  PromptGuideCreatePage: React.lazy(() => import('../pages/AdminPage/PromptGuideCreatePage')),
  AdminDashboardPage: React.lazy(() => import('../pages/AdminPage/AdminDashboardPage.tsx')),
  AdminSellerDetailPage: React.lazy(() => import('../pages/AdminPage/AdminSellerDetailPage.tsx')),
  AdminSellerFormPage: React.lazy(() => import('../pages/AdminPage/AdminSellerFormPage.tsx')),
};
