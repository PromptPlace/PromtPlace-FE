


const TABS: { id: TabType; title: string }[]= [
  { id: 'authored', title: '작성한 프롬프트' },
  { id: 'downloaded', title: '다운받은 프롬프트' },
  { id: 'liked', title: '찜한 프롬프트' },
];

type TabType = 'authored' | 'downloaded' | 'liked';

const MyPromptsTabs = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: TabType) => void }) => {
  return (
    <div className="flex justify-center border-b w-full  ">
      {TABS.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex-1 text-center py-[30px] text-[24px] font-bold ${
            activeTab === tab.id
              ? 'border-b-[3px] border-primary-hover text-primary-hover'
              : 'text-text-on-background'
          }`}
        >
          {tab.title}
        </button>
      ))}
    </div>
  );
};

export default MyPromptsTabs;