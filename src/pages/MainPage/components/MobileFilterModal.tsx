import React, { useEffect, useRef, useState } from 'react';
import MobileModelTab from './MobileModelTab';
import MobileFilterTab from './MobileFilterTab';
import MobileTagTab from './MobileTagTab';

type Props = {
  visible: boolean;
  onClose: () => void;
  activeTab: '모델' | '필터' | '태그';
  onTabChange: (tab: '모델' | '필터' | '태그') => void;
  onApplyFilter: (data: { models: string[] | null; sort: string | null; tags: string[] }) => void;
};

const MobileFilterModal = ({ visible, onClose, activeTab, onTabChange, onApplyFilter }: Props) => {
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  if (!visible) return null;

  const handleApply = () => {
    onApplyFilter({ models: selectedModels, sort: selectedSort, tags });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40">
      <div
        ref={modalRef}
        className="w-full max-w-[425px] max-h-[80vh] pb-5 bg-white rounded-t-3xl shadow-xl flex flex-col items-center gap-5 px-4 pt-4 overflow-y-auto">
        <div className="self-stretch h-7 relative overflow-hidden">
          <div className="w-10 h-1 left-1/2 -translate-x-1/2 top-[14px] absolute bg-white-stroke rounded-full" />
        </div>

        <div className="w-full inline-flex justify-start items-center gap-2">
          {(['모델', '필터', '태그'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`px-5 py-1.5 rounded-full flex justify-start items-center gap-2.5 ${
                activeTab === tab ? 'bg-secondary' : 'bg-white'
              }`}>
              <span
                className={`text-xs font-medium font-[\'Spoqa_Han_Sans_Neo\'] ${
                  activeTab === tab ? 'text-primary' : 'text-text-on-background'
                }`}>
                {tab}
              </span>
            </button>
          ))}
        </div>

        <div className="w-full flex flex-col justify-start items-start gap-4">
          {activeTab === '모델' && (
            <MobileModelTab selectedModels={selectedModels} setSelectedModels={setSelectedModels} />
          )}
          {activeTab === '필터' && <MobileFilterTab selectedSort={selectedSort} setSelectedSort={setSelectedSort} />}
          {activeTab === '태그' && <MobileTagTab tags={tags} setTags={setTags} />}
        </div>

        <div className="w-full h-10 px-10 py-[5px] bg-primary rounded inline-flex justify-center items-center gap-2.5">
          <button onClick={handleApply} className="text-white text-base font-medium font-['Spoqa_Han_Sans_Neo']">
            {activeTab === '태그' ? '작성 완료하기' : '선택 완료하기'}
          </button>
        </div>

        <div className="mb-[77px]"></div>
      </div>
    </div>
  );
};

export default MobileFilterModal;
