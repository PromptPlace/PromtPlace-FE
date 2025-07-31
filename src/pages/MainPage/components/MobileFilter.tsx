import React, { useState } from 'react';
import MobileFilterBar from './MobileFilterBar';
import MobileFilterModal from './MobileFilterModal';

type FilterTab = '모델' | '필터' | '태그' | null;

type Props = {
  onModelChange: (models: string[]) => void;
  onSortChange: (sort: string | null) => void;
  onlyFree: boolean;
  setOnlyFree: (free: boolean) => void;
};

const MobileFilter = ({ onlyFree, setOnlyFree, onModelChange, onSortChange }: Props) => {
  const [activeTab, setActiveTab] = useState<FilterTab>(null);

  const handleOnlyFreeToggle = () => setOnlyFree((prev) => !prev);

  const handleOpenTab = (tab: FilterTab) => setActiveTab(tab);
  const handleClose = () => setActiveTab(null);

  const handleApplyFilter = (data: { models: string[]; sort: string | null; tags: string[] }) => {
    onModelChange(data.models);
    onSortChange(data.sort);
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
