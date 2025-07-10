import React from 'react';
import PromptCard from './components/promptCard';
import FilterBar from './components/filterBar';
import PrompterBar from './components/prompterBar';
import { dummyPrompts, dummyCreators } from './components/../dummyData';

const MainPage = () => {
  return (
    <div className="flex gap-6 justify-center bg-[#F5F5F5]">
      <div className="w-[832px]">
        <FilterBar />
        <div className="mt-4">
          {dummyPrompts.map((prompt) => (
            <PromptCard
              key={prompt.id}
              prompt={prompt}
            />
          ))}
        </div>
      </div>

      <PrompterBar
        creators={[
          { id: '1', name: '프롬프터1', avatar: '', followed: false },
          { id: '2', name: '프롬프터2', avatar: '', followed: true },
        ]}
      />
    </div>
  );
};

export default MainPage;  