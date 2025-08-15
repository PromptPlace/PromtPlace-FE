import React, { useState } from 'react';
import MobileFilterBar from './MobileFilterBar';
import MobileFilterModal from './MobileFilterModal';

type FilterTab = '모델' | '필터' | '태그' | null;

type Props = {
  onModelChange: (models: string[] | null) => void;
  onSortChange: (sort: string | null) => void;
  onTagChange: (tags: string[] | null) => void;
  onlyFree: boolean;
  setOnlyFree: (free: boolean) => void;
};

const MobileFilter = ({ onlyFree, setOnlyFree, onModelChange, onSortChange, onTagChange }: Props) => {
  const [activeTab, setActiveTab] = useState<FilterTab>(null);

  const handleOnlyFreeToggle = () => setOnlyFree(!onlyFree);

  const handleOpenTab = (tab: FilterTab) => setActiveTab(tab);
  const handleClose = () => setActiveTab(null);

  const handleApplyFilter = (data: { models: string[] | null; sort: string | null; tags: string[] }) => {
    onModelChange(data.models);
    onSortChange(data.sort);
    onTagChange(data.tags.length > 0 ? data.tags : null);
    setActiveTab(null);
  };

  return (
    <>
      <MobileFilterBar
        onlyFree={onlyFree}
        onOnlyFreeToggle={handleOnlyFreeToggle}
        onOpenModel={() => handleOpenTab('모델')}
        onOpenSort={() => handleOpenTab('필터')}
        onOpenTag={() => handleOpenTab('태그')}
        activeTab={activeTab as '모델' | '필터' | '태그'}
      />
      {activeTab && (
        <MobileFilterModal
          visible={activeTab !== null}
          onClose={handleClose}
          activeTab={activeTab as '모델' | '필터' | '태그'}
          onTabChange={setActiveTab}
          onApplyFilter={handleApplyFilter}
        />
      )}
    </>
  );
};

export default MobileFilter;
