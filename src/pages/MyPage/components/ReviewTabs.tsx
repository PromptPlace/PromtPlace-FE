import React from 'react';

// 컴포넌트가 받을 props의 타입을 정의
interface ReviewTabsProps {
  activeTab: 'written' | 'received';
  setActiveTab: (tab: 'written' | 'received') => void;
}

// 탭 정보를 담은 배열을 만들어두면 코드가 더 깔끔해집니다.
const TABS = [
  { id: 'written', title: '작성한 리뷰' },
  { id: 'received', title: '받은 리뷰' },
];

const ReviewTabs: React.FC<ReviewTabsProps> = ({ activeTab, setActiveTab }) => {
  return (

    <div className="flex w-full h-[90px]">

      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id as 'written' | 'received')}
          // 현재 활성화된 탭에만 다른 스타일을 적용 (조건부 스타일링)

          className={`flex-1 text-[24px] font-bold   ${
            activeTab === tab.id
              ? 'border-b-[3px] border-primary-hover text-primary-hover'
              : 'border-b-[1px] border-text-on-background text-text-on-background'

          }`}
        >
          {tab.title}
        </button>
      ))}
    </div>
  );
};

export default ReviewTabs;

