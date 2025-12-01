import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { categoryData } from '@/pages/MainPage/components/categoryData';
import leftblob from '@/assets/icon-left-blob.svg';
import rightblob from '@/assets/icon-right-blob.svg';
import search from '@/assets/icon-search.svg';
import workbook from '@/assets/icon-category-book.svg';
import marketing from '@/assets/icon-category-market.svg';
import script from '@/assets/icon-category-paper.svg';

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

  const handleCategoryClick = (categoryId: number, categoryName: string, subcategory?: string) => {
    // 카테고리 ID, 이름, 서브카테고리를 쿼리 파라미터로 전달
    const params = new URLSearchParams({
      categoryId: categoryId.toString(),
      categoryName: categoryName,
    });

    if (subcategory) {
      params.append('subcategory', subcategory);
    }

    navigate(`/prompt?${params.toString()}`);
  };

  return (
    <div className="w-full mx-auto flex flex-col justify-center items-center gap-8 relative">
      <div className="absolute w-full h-[564px] bg-gradient-to-b from-white/40 to-white z-0 top-0 left-0">
        {/* 왼쪽 배경 blob */}
        <div
          className="absolute 
        w-[100px] h-[100px] left-[48px] top-[92px]
        lg:w-[180px] lg:w-[180px] lg:left-[106px] lg:mt-[157px] 
        max-mypage:w-[100px] max-mypage:h-[100px] max-mypage:left-[16px] max-mypage:top-[92px]
        max-phone:w-[80px] max-phone:h-[80px] max-phone:left-[20px] max-phone:top-[64px]
        sm:left-[20px] sm:top-[64px] pointer-events-none">
          <img src={leftblob} />
        </div>

        {/* 오른쪽 배경 blob */}
        <div
          className="absolute
        w-[120px] h-[120px] right-[32px] top-[72px]
        lg:w-[200px] lg:w-[200px] lg:right-[21px] lg:top-[104px] 
        max-mypage:w-[120px] max-mypage:h-[120px] max-mypage:right-[15px] max-mypage:top-[72px]
        max-phone:w-[64px] max-phone:h-[64px] max-phone:right-[5px] max-phone:top-[309px]
        pointer-events-none">
          <img src={rightblob} />
        </div>
      </div>

      <div className="self-stretch mt-[176px] max-mypage:mt-[144px] max-phone:!mt-[104px] flex flex-col justify-center items-center gap-6 z-10">
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
        <div className="w-[510px] lg:w-[708px] max-mypage:w-[438px] max-phone:w-[335px] h-[62px] lg:h-[62px] max-phone:h-[43px] px-8 py-5 bg-white rounded-[53.84px] shadow-[1.8210526704788208px_1.8210526704788208px_27.3157901763916px_0px_rgba(41,121,255,0.25)] flex justify-center items-center gap-[570.70px]">
          <div className="flex-1 flex justify-between items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="원하는 프롬프트를 검색해보세요."
              className="flex-1 justify-start text-text-on-background text-sm font-light font-['S-Core_Dream'] leading-6 tracking-tight outline-none bg-transparent"
            />
            <img onClick={handleSearch} src={search} className="w-5 h-5 transition cursor-pointer"></img>
          </div>
        </div>
      </div>
      <div className="z-10 max-mypage:w-full max-mypage:px-[40px] max-phone:px-[20px]">
        <div className="inline-flex justify-start items-center gap-3 max-mypage:flex-col max-mypage:items-center max-phone:items-start max-mypage:w-full">
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
          <div className="flex justify-start items-start gap-3 max-mypage:flex-wrap max-mypage:justify-center max-phone:justify-start max-mypage:self-stretch">
            <div
              onClick={() => handleCategoryClick(6, '학습 / 과제', '학습 / 과제 요약')}
              className="px-3 py-1.5 bg-secondary rounded-full flex justify-center items-center gap-2 cursor-pointer hover:bg-primary-hover/10 transition">
              <div className="w-4 h-4 relative overflow-hidden">
                <img src={workbook} className="w-3 h-3.5 left-[3px] top-[2.25px] absolute"></img>
              </div>
              <div className="text-center justify-center text-primary text-xs font-medium font-['S-Core_Dream'] leading-4 max-mypage:text-[10px]">
                학습•과제 요약
              </div>
            </div>
            <div
              onClick={() => handleCategoryClick(5, '비즈니스 / 마케팅', '시장조사 / 분석')}
              className="px-3 py-1.5 bg-secondary rounded-full flex justify-center items-center gap-2 cursor-pointer hover:bg-primary-hover/10 transition">
              <div className="w-4 h-4 relative overflow-hidden">
                <img src={marketing} className="w-3.5 h-3.5 left-[2px] top-[2px] absolute"></img>
              </div>
              <div className="text-center justify-center text-primary text-xs font-medium font-['S-Core_Dream'] leading-4 max-mypage:text-[10px]">
                시장조사•분석
              </div>
            </div>
            <div
              onClick={() => handleCategoryClick(1, '글쓰기 / 문서 작성', '광고 / 카피라이팅')}
              className="px-3 py-1.5 bg-secondary rounded-full flex justify-center items-center gap-2 cursor-pointer hover:bg-primary-hover/10 transition">
              <div className="w-4 h-4 relative overflow-hidden">
                <img src={script} className="w-3 h-3.5 left-[3.19px] top-[1.69px] absolute"></img>
                <div className="w-[2.77px] h-1 left-[11.81px] top-[1.95px] absolute bg-blue-500"></div>
              </div>
              <div className="text-center justify-center text-blue-500 text-xs font-medium font-['S-Core_Dream'] leading-4 max-mypage:text-[10px]">
                광고•카피라이팅
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-[1185px] mx-auto mt-[84px] z-10 max-mypage:mt-[40px]">
        {/* 데스크톱: 가로 스크롤 */}
        <div
          className="flex overflow-x-scroll gap-[20px] justify-start snap-x snap-mandatory px-0 hide-scrollbar max-mypage:hidden"
          style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
          {categoryData.map((category) => (
            <div className="flex flex-col flex-shrink-0 snap-start" key={category.id}>
              <div
                onClick={() => handleCategoryClick(category.id, category.name)}
                className="w-28 px-2 py-3 rounded-xl inline-flex flex-col justify-center items-center gap-4 cursor-pointer hover:bg-gray-100 transition">
                <div className="w-[80px] h-[80px] bg-white rounded-3xl flex items-center justify-center overflow-hidden shadow-[0px_4px_8px_0px_rgba(0,0,0,0.12)]">
                  <img src={category.image} alt={category.name} className="object-cover w-12 h-12" />
                </div>
                <div className="w-50 text-center text-xs leading-4 font-light">{category.displayName}</div>
              </div>
            </div>
          ))}
        </div>

        {/* 태블릿: 3열 그리드 */}
        <div className="hidden max-mypage:grid max-phone:hidden grid-cols-3 gap-x-[12px] gap-y-[20px] px-[40px]">
          {categoryData.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.id, category.name)}
              className="flex flex-col items-center gap-4 cursor-pointer hover:bg-gray-100 transition rounded-xl px-2 py-3">
              <div className="w-[80px] h-[80px] bg-white rounded-3xl flex items-center justify-center overflow-hidden shadow-[0px_4px_8px_0px_rgba(0,0,0,0.12)]">
                <img src={category.image} alt={category.name} className="object-cover w-12 h-12" />
              </div>
              <div className="text-center text-xs leading-4 font-light">{category.displayName}</div>
            </div>
          ))}
        </div>

        {/* 모바일: 4열 그리드 (2줄) */}
        <div className="hidden max-phone:flex flex-col justify-center items-center w-96 mx-auto px-[20px]">
          <div className="flex justify-center items-start gap-0.5">
            {categoryData.slice(0, 4).map((category) => (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category.id, category.name)}
                className="w-16 px-2 py-3 rounded-xl inline-flex flex-col justify-center items-center gap-4 cursor-pointer hover:bg-gray-100 transition">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center overflow-hidden shadow-[0px_2.4px_4.8px_0px_rgba(0,0,0,0.12)]">
                  <img src={category.image} alt={category.name} className="object-cover w-8 h-8" />
                </div>
                <div className="text-center text-text-on-white text-[10px] font-light font-['S-Core_Dream'] leading-3">
                  {category.displayName}
                </div>
              </div>
            ))}
          </div>
          <div className="self-stretch flex justify-center items-start gap-0.5">
            {categoryData.slice(4, 9).map((category) => (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category.id, category.name)}
                className="w-16 px-2 py-3 rounded-xl inline-flex flex-col justify-center items-center gap-4 cursor-pointer hover:bg-gray-100 transition">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center overflow-hidden shadow-[0px_2.4px_4.8px_0px_rgba(0,0,0,0.12)]">
                  <img src={category.image} alt={category.name} className="object-cover w-8 h-8" />
                </div>
                <div className="text-center text-text-on-white text-[10px] font-light font-['S-Core_Dream'] leading-3">
                  {category.displayName}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
