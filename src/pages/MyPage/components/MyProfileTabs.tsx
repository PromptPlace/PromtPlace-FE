const TABS: { id: TabType; title: string }[] = [
  { id: 'prompt', title: '프롬프트' },
  { id: 'dashboard', title: '정산관리' },
  { id: 'profile', title: '프로필 설정' },
];

type TabType = 'prompt' | 'dashboard' | 'profile';

const MyProfileTabs = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: TabType) => void }) => {
  return (
    <div className="flex justify-center border-b w-full min-w-[1080px]">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex-1 text-center py-[30px] custom-h4 ${
            activeTab === tab.id ? 'border-b-[3px] border-primary-hover text-primary-hover' : 'text-text-on-background'
          }`}>
          {tab.title}
        </button>
      ))}
    </div>
  );
};

export default MyProfileTabs;
