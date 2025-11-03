import ProfileCard from '../ProfilePage/components/ProfileCard';
import MyProfileTabs from './components/MyProfileTabs';
import { useState } from 'react';
import prepareIcon from '@assets/icon-prepare.svg';
import ProfileView from './components/ProfileView';
import ProfileEditView from './components/ProfileEditView';
import { useAuth } from '@/context/AuthContext';
import useGetMember from '@/hooks/queries/ProfilePage/useGetMember';

const MyProfilePage = () => {
  const { user } = useAuth();
  const { data: userData } = useGetMember({ member_id: user.user_id });
  const [activeTab, setActiveTab] = useState<'prompt' | 'dashboard' | 'profile' | 'profileEdit'>('prompt');

  return (
    <div className="px-[102px] mb-[56px] max-lg:px-[40px] max-phone:px-[20px]">
      <ProfileCard mypage={true} />;
      <MyProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <main>
        {activeTab === 'prompt' && <div>프롬프트 탭 내용</div>}
        {activeTab === 'dashboard' && (
          <div className="flex flex-col items-center mt-[24px]">
            <img src={prepareIcon} alt="준비중 아이콘" className="w-[80px] h-[80px] mb-[24px]" />
            <p className="custom-h3 text-gray-500">아직 오픈하지 않은 페이지예요!</p>
            <p className="custom-body3 text-gray-500 mt-[8px]">정식 출시 때 만나요 :)</p>
          </div>
        )}
        {activeTab === 'profile' && <ProfileView userData={userData} setActiveTab={setActiveTab} />}
        {activeTab === 'profileEdit' && <ProfileEditView userData={userData} setActiveTab={setActiveTab} />}
      </main>
    </div>
  );
};

export default MyProfilePage;
