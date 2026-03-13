import ProfileCard from '../ProfilePage/components/ProfileCard';
import MyProfileTabs from './components/MyProfileTabs';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ProfileView from './components/ProfileView';
import ProfileEditView from './components/ProfileEditView';
import { useAuth } from '@/context/AuthContext';
import useGetMember from '@/hooks/queries/ProfilePage/useGetMember';
import DownloadedPromptPage from './components/DownloadedPromptPage';
import AuthoredPromptPage from './components/AuthoredPromptPage';
import PromptList from './components/PromptList';
import DashboardTabContent from './components/DashboardTabContent';
// MyProfilePage 컴포넌트
// PromptList 컴포넌트를 이용해 작성한 프롬프트, 다운받은 프롬프트, 찜한 프롬프트를 한번에 보여줌
// AuthoredPromptPage, DownloadedPromptPage 를 각각 컴포넌트로 구현하여 작성한 프롬프트 전체 목록과 다운로드한 프롬프트 전체 목록을 보여줌

const MyProfilePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const { data: userData } = useGetMember({ member_id: user.user_id });
  const tabFromQuery = useMemo(() => {
    const tab = searchParams.get('tab');

    if (
      tab === 'dashboard' ||
      tab === 'profile' ||
      tab === 'profileEdit' ||
      tab === 'authored' ||
      tab === 'downloaded'
    ) {
      return tab;
    }

    return 'prompt';
  }, [searchParams]);
  const sellerStatusFromQuery = useMemo(() => searchParams.get('sellerStatus'), [searchParams]);

  const [activeTab, setActiveTab] = useState<
    'prompt' | 'dashboard' | 'profile' | 'profileEdit' | 'authored' | 'downloaded'
  >(tabFromQuery);

  useEffect(() => {
    setActiveTab(tabFromQuery);
  }, [tabFromQuery]);

  return (
    <div className="px-[102px] mb-[56px] max-lg:px-[40px] max-phone:px-[20px]">
      <ProfileCard mypage={true} />
      <MyProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <main>
        {activeTab === 'prompt' && <PromptList setActiveTab={setActiveTab} />}
        {activeTab === 'dashboard' && <DashboardTabContent sellerStatusFromQuery={sellerStatusFromQuery} />}
        {activeTab === 'profile' && <ProfileView userData={userData} setActiveTab={setActiveTab} />}
        {activeTab === 'profileEdit' && <ProfileEditView userData={userData} setActiveTab={setActiveTab} />}
        {activeTab === 'authored' && <AuthoredPromptPage />}
        {activeTab === 'downloaded' && <DownloadedPromptPage />}
      </main>
    </div>
  );
};

export default MyProfilePage;
