import ProfileCard from '../ProfilePage/components/ProfileCard';
import MyProfileTabs from './components/MyProfileTabs';
import { useState } from 'react';
import prepareIcon from '@assets/icon-prepare.svg';
import ProfileView from './components/ProfileView';
import ProfileEditView from './components/ProfileEditView';
import { useAuth } from '@/context/AuthContext';
import useGetMember from '@/hooks/queries/ProfilePage/useGetMember';
import LikedPrompts from './components/LikedPrompts';
import DownloadedPromptPage from './components/DownloadedPromptPage';
import AuthoredPromptPage from './components/AuthoredPromptPage';
import PromptList from './components/PromptList';
// MyProfilePage 컴포넌트
//PromptLIst 컴포넌트를 이용해 작성한 프롬프트, 다운받은 프롬프트, 찜한 프롬프트를 한번에 보여줌
//AuthoredPromptPage, DownloadedPromptPage 를 각각 컴포넌트로 구현하여 작성한 프롬프트 전체 목록과 다운로드한 프롬프트 전체 목록을 보여줌
//각 프롬프트는 authoredPromptCard, DownloadedPromptCard 컴포넌트를 이용해 렌더링
//현재 찜한 프롬프트 카드 컴포넌트는 구현되지 않음

const MyProfilePage = () => {
  const { user } = useAuth();
  const { data: userData } = useGetMember({ member_id: user.user_id });
  const [activeTab, setActiveTab] = useState<
    'prompt' | 'dashboard' | 'profile' | 'profileEdit' | 'authored' | 'downloaded'
  >('prompt');

  return (
    <div className="px-[102px] mb-[56px] max-lg:px-[40px] max-phone:px-[20px]">
      <ProfileCard mypage={true} />
      <MyProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <main>
        {activeTab === 'prompt' && <PromptList setActiveTab={setActiveTab} />}
        {activeTab === 'dashboard' && (
          <div className="flex flex-col items-center mt-[24px]">
            <img src={prepareIcon} alt="준비중 아이콘" className="w-[80px] h-[80px] mb-[24px]" />
            <p className="custom-h3 text-gray-500">아직 오픈하지 않은 페이지예요!</p>
            <p className="custom-body3 text-gray-500 mt-[8px]">정식 출시 때 만나요 :)</p>
          </div>
        )}
        {activeTab === 'profile' && <ProfileView userData={userData} setActiveTab={setActiveTab} />}
        {activeTab === 'profileEdit' && <ProfileEditView userData={userData} setActiveTab={setActiveTab} />}
        {activeTab === 'authored' && <AuthoredPromptPage />}
        {activeTab === 'downloaded' && <DownloadedPromptPage />}
      </main>
    </div>
  );
};

export default MyProfilePage;
