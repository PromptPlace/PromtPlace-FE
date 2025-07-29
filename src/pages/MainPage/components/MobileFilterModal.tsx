import React, { useEffect, useRef, useState } from 'react';
import MobileModelTab from './MobileModelTab';
import MobileFilterTab from './MobileFilterTab';
import MobileTagTab from './MobileTagTab';

type Props = {
  visible: boolean;
  onClose: () => void;
  activeTab: '모델' | '필터' | '태그';
  onTabChange: (tab: '모델' | '필터' | '태그') => void;
  onApplyFilter: (data: { model: string | null; sort: string | null; tags: string[] }) => void;
};

const MobileFilterModal = ({ visible, onClose, activeTab, onTabChange, onApplyFilter }: Props) => {
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);
  const [selectedTab, setSelectedTab] = useState(activeTab);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  useEffect(() => {
    if (activeTab !== selectedTab) {
      setSelectedTab(activeTab);
    }
  }, [activeTab]);

  if (!visible) return null;

  const handleApply = () => {
    onApplyFilter({ model: selectedModel, sort: selectedSort, tags });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40">
      <div
        ref={modalRef}
        className="w-[320px] max-h-[80vh] pb-5 bg-white rounded-t-3xl shadow-xl flex flex-col items-center gap-5 px-4 pt-4 overflow-y-auto">
        <div className="w-full flex justify-center items-center relative h-7">
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>

        <div className="w-72 flex justify-start items-center gap-2">
          {(['모델', '필터', '태그'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-5 py-1.5 rounded-full ${selectedTab === tab ? 'bg-secondary' : 'bg-white'}`}>
              <span
                className={`text-xs font-medium ${selectedTab === tab ? 'text-primary' : 'text-text-on-background'}`}>
                {tab}
              </span>
            </button>
          ))}
        </div>

        <div className="flex flex-col items-start gap-4 w-full">
          {selectedTab === '모델' && (
            <MobileModelTab selectedModels={selectedModels} setSelectedModels={setSelectedModels} />
          )}
          {selectedTab === '필터' && <MobileFilterTab selectedSort={selectedSort} setSelectedSort={setSelectedSort} />}
          {selectedTab === '태그' && <MobileTagTab tags={tags} setTags={setTags} />}
        </div>

        <button onClick={handleApply} className="w-72 h-10 bg-primary rounded text-white font-medium mt-4">
          {selectedTab === '태그' ? '작성 완료하기' : '선택 완료하기'}
        </button>
      </div>
    </div>
  );
};

export default MobileFilterModal;
