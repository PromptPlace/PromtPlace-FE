import React, { useState } from 'react';
import MobileFilterBar from './MobileFilterBar';
import MobileFilterModal from './MobileFilterModal';

type FilterTab = '모델' | '필터' | '태그' | null;

const MobileFilter = () => {
  const [onlyFree, setOnlyFree] = useState(false);
  const [activeTab, setActiveTab] = useState<FilterTab>(null);

  const handleOnlyFreeToggle = () => setOnlyFree((prev) => !prev);

  const handleOpenTab = (tab: FilterTab) => setActiveTab(tab);
  const handleClose = () => setActiveTab(null);

  const handleApplyFilter = (data: { model: string | null; sort: string | null; tags: string[] }) => {
    console.log('필터 적용:', data);
    // 실제 정렬, 필터 로직은 여기에
    setActiveTab(null); // 모달 닫기
  };

  return (
    <>
      <MobileFilterBar
        onlyFree={onlyFree}
        onOnlyFreeToggle={handleOnlyFreeToggle}
        onOpenModel={() => handleOpenTab('모델')}
        onOpenSort={() => handleOpenTab('필터')}
        onOpenTag={() => handleOpenTab('태그')}
      />
      <MobileFilterModal
        visible={activeTab !== null}
        onClose={handleClose}
        activeTab={activeTab as '모델' | '필터' | '태그'}
        onTabChange={setActiveTab}
        onApplyFilter={handleApplyFilter}
      />
    </>
  );
};

export default MobileFilter;
