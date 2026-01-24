const TABS: { id: TabType; title: string }[] = [
  { id: 'prompt', title: '프롬프트' },
  { id: 'dashboard', title: '정산관리' },
  { id: 'profile', title: '프로필 설정' },
];

type TabType = 'prompt' | 'dashboard' | 'profile';

const MyProfileTabs = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: TabType) => void }) => {
  const isTabActive = (tabId: string) => {
    if (tabId === 'prompt') {
      return ['prompt', 'authored', 'downloaded'].includes(activeTab);
    }
    if (tabId === 'dashboard') {
      return activeTab === 'dashboard';
    }
    if (tabId === 'profile') {
      return ['profile', 'profileEdit'].includes(activeTab);
    }
    return false;
  };

  return (
    <div className="flex justify-center w-full w-full my-[56px] max-phone:my-[40px]">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex-1 text-center py-[20px] max-phone:py-[16px] custom-h4 ${
            isTabActive(tab.id) ? 'border-b-[3px] border-primary text-primary' : 'text-text-on-background'
          }`}>
          {tab.title}
        </button>
      ))}
    </div>
  );
};

export default MyProfileTabs;
