import BigBlueHeart from '@/assets/icon-heart-blue-big.svg'
import PrimaryButton from '@components/Button/PrimaryButton';
import kebabMenu from '@/assets/icon-kebabMenu.svg'
import { useState } from 'react';

export interface Prompt {
  id: number;
  title: string;
  model: string;
  tags?: string[];   // '찜,작성한' 탭에만 있으므로 optional
  author?: string;  // '다운로드' 탭에만 있으므로 optional

}

type TabType = 'authored' | 'downloaded' | 'liked';

interface PromptCardProps {
  type: TabType;
  promptData: Prompt;
  DeletePrompt:(id:number)=>void;
  EditPrompt:(id:number)=>void;
  DeleteLike:(id:number)=>void;
}


export const PromptCard = ({ type, promptData, DeletePrompt, EditPrompt, DeleteLike} : PromptCardProps ) => {
        const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="flex items-center   border-b-[1px] border-b-white-stroke w-full  py-[10px] h-[92px]">
      {/* 왼쪽 영역: 제목과 모델 이름 */}
      
        <div className="flex items-center justify-center text-text-on-white text-[22px]  font-bold w-[635px]">{promptData.title}</div>
        <div className="flex items-center justify-center text-text-on-background text-[20px] font-medium  w-[223px]">{promptData.model}</div>
    

      {/* 오른쪽 영역: type에 따라 내용이 바뀜 */}
     
        {/* 태그 (다운로드 탭에서는 보이지 않음) */}
        {(type === 'authored' || type === 'liked') && (
          <div className="flex items-center justify-center text-text-on-background text-[20px] font-medium py-[23.5px] w-[263px]">
            {promptData.tags?.map(tag => `#${tag} `)}
          </div>
        )}

        {/* 상태 텍스트 (다운로드 탭에서만 보임) */}
       

        {/* 버튼 영역 (type별로 다른 버튼) */}
        {type === 'authored' && (
          <div className="flex items-center justify-center h-[72px]  w-[115px] py-[10px]  ">
            <div className="relative">
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className={`flex items-center justify-center h-[28px] w-[28px] rounded-[50px]  ${isDropdownOpen ? 'bg-secondary-pressed' : 'bg-transparent'}`}><img src={kebabMenu} alt="케밥 메뉴"  /></button> 
          {isDropdownOpen && (
            <div className="absolute  top-full mt-[11px] w-[91px] bg-white rounded-md shadow-lg z-10">
              <button 
                onClick={() => {DeletePrompt(promptData.id); setIsDropdownOpen(false)}} 
                className="block w-full h-[36px] text-[16px] border-b-[1px] border-b-white-stroke text-text-on-background bg-secondary hover:bg-secondary-pressed"
              >
                삭제하기
              </button>
              <button 
                onClick={() => {EditPrompt(promptData.id); setIsDropdownOpen(false)}} 
                className="block w-full h-[36px] text-[16px] text-text-on-background bg-secondary hover:bg-secondary-pressed"
              >
                수정하기
              </button>
            </div>
            
          )}
          </div>
          </div>
        )}
        {type === 'downloaded' && (
          <div className="flex items-center justify-center h-[72px]  w-[198px]">
          <PrimaryButton buttonType="review" text="리뷰 작성하기" onClick={() => {}} />   
          </div>
        )}
        {type === 'downloaded' && (
          <div className="flex items-center justify-center text-text-on-white text-[20px] font-medium py-[23.5px] w-[180px] px-[44px]">{promptData.author}</div>
        )}

        {type === 'liked' && (
          <button onClick={() => DeleteLike(promptData.id)}><img src={BigBlueHeart} alt="좋아요 큰하트" className=" h-[22px]  w-[115px]" /></button> // 하트 아이콘
        )}
        
    </div>
  );
};
