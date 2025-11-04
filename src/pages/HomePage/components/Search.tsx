import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { categoryData } from '@/pages/MainPage/components/categoryData';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/prompt?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleCategoryClick = (categoryId: number, categoryName: string) => {
    // 카테고리 ID와 이름을 쿼리 파라미터로 전달
    navigate(`/prompt?categoryId=${categoryId}&categoryName=${encodeURIComponent(categoryName)}`);
  };

  return (
    <div className="w-full mx-auto flex flex-col justify-center items-center gap-8 relative">
      <div className="absolute w-full h-[564px] bg-gradient-to-b from-white/40 to-white z-0 top-0 left-0">
        {/* 왼쪽 배경 blob */}
        <div className="absolute left-0 top-0 w-44 h-44 mx-[106px] mt-[157px] pointer-events-none">
          <img src="/src/assets/icon-left-blob.svg" />
        </div>

        {/* 오른쪽 배경 blob */}
        <div className="absolute right-[72px] top-[104px] w-48 h-48 pointer-events-none">
          <img src="/src/assets/icon-right-blob.svg" />
        </div>
      </div>

      <div className="self-stretch mt-[176px] flex flex-col justify-center items-center gap-6 z-10">
        <div className="self-stretch flex flex-col justify-center items-center gap-5">
          <div className="px-4 py-2 bg-secondary rounded-[50px] inline-flex justify-center items-center gap-2">
            <div className="text-center justify-center text-primary text-xs font-medium font-['S-Core_Dream'] leading-4">
              프롬프트 탐색하기
            </div>
          </div>
          <div className="text-center justify-center text-black text-2xl font-medium font-['S-Core_Dream'] leading-8">
            원하는 프롬프트를 찾아보세요.
          </div>
        </div>
        <div className="w-[708px] px-8 py-5 bg-white rounded-[53.84px] shadow-[1.8210526704788208px_1.8210526704788208px_27.3157901763916px_0px_rgba(41,121,255,0.25)] flex justify-center items-center gap-[570.70px]">
          <div className="flex-1 flex justify-between items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="원하는 프롬프트를 검색해보세요."
              className="flex-1 justify-start text-text-on-background text-sm font-light font-['S-Core_Dream'] leading-6 tracking-tight outline-none bg-transparent"
            />
            <div
              onClick={handleSearch}
              className="w-5 h-5 bg-gray-400 cursor-pointer hover:bg-gray-500 transition"></div>
          </div>
        </div>
      </div>
      <div className="inline-flex justify-start items-center gap-3 z-10">
        <div className="flex justify-start items-center">
          <div className="text-center justify-center text-text-on-white text-xs font-medium font-['S-Core_Dream'] leading-4">
            추천 카테고리 Top
          </div>
          <div className="w-3 h-5 relative overflow-hidden">
            <div className="left-[-2px] top-[-1.38px] absolute origin-top-left rotate-[-13.81deg] text-center justify-center text-primary-hover text-base font-normal font-['Figma_Hand'] leading-6">
              3
            </div>
          </div>
        </div>
        <div className="flex justify-start items-start gap-5">
          <div className="px-3 py-1.5 bg-secondary rounded-full flex justify-center items-center gap-2">
            <div className="w-4 h-4 relative overflow-hidden">
              <img
                src="/src/assets/icon-category-workbook.svg"
                className="w-3 h-3.5 left-[3px] top-[2.25px] absolute"></img>
            </div>
            <div className="text-center justify-center text-primary text-xs font-medium font-['S-Core_Dream'] leading-4">
              학습•과제 요약
            </div>
          </div>
          <div className="px-3 py-1.5 bg-secondary rounded-full flex justify-center items-center gap-2">
            <div className="w-4 h-4 relative overflow-hidden">
              <img
                src="/src/assets/icon-category-marketing.svg"
                className="w-3.5 h-3.5 left-[2px] top-[2px] absolute"></img>
            </div>
            <div className="text-center justify-center text-primary text-xs font-medium font-['S-Core_Dream'] leading-4">
              시장조사•분석
            </div>
          </div>
          <div className="px-3 py-1.5 bg-secondary rounded-full flex justify-center items-center gap-2">
            <div className="w-4 h-4 relative overflow-hidden">
              <img
                src="/src/assets/icon-category-script.svg"
                className="w-3 h-3.5 left-[3.19px] top-[1.69px] absolute"></img>
              <div className="w-[2.77px] h-1 left-[11.81px] top-[1.95px] absolute bg-blue-500"></div>
            </div>
            <div className="text-center justify-center text-blue-500 text-xs font-medium font-['S-Core_Dream'] leading-4">
              광고•카피라이팅
            </div>
          </div>
        </div>
      </div>
      <div
        className="w-full max-w-[1185px] mx-auto flex overflow-x-scroll gap-[20px] justify-start snap-x snap-mandatory px-0 hide-scrollbar mt-[84px] z-10"
        style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
        {categoryData.map((category) => (
          <div className="flex flex-col flex-shrink-0 snap-start" key={category.id}>
            <div
              onClick={() => handleCategoryClick(category.id, category.name)}
              className="w-28 px-2 py-3 rounded-xl inline-flex flex-col justify-center items-center gap-4 cursor-pointer hover:bg-gray-100 transition">
              <div className="w-[80px] h-[80px] bg-white rounded-3xl flex items-center justify-center overflow-hidden shadow-[0px_4px_8px_0px_rgba(0,0,0,0.12)]">
                <img src={category.image} alt={category.name} className="object-cover w-12 h-12" />
              </div>
              <div className="text-center text-xs leading-4 font-light">{category.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
