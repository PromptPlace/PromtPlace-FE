import BigBlueHeart from '@/assets/icon-heart-blue-big.svg'
import PrimaryButton from '@components/Button/PrimaryButton';
import kebabMenu from '@/assets/icon-kebabMenu.svg'
import { useState } from 'react';
import {Link} from 'react-router-dom';

export interface Prompt {
  id: number;
  title: string;
  model: string;
  tags?: string[];   
  author?: string;  

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
    <div className="flex items-center   border-b-[1px] border-b-white-stroke w-full  py-[10px] h-[92px] bg-white">
      <Link to={`/prompt/${promptData.id}`} className='flex flex-row'>

        <div className="flex items-center  text-text-on-white text-[22px] pl-[80px] font-bold w-[635px]">{promptData.title}</div>
        <div className="flex items-center justify-center text-text-on-background text-[20px] font-medium  w-[223px]">{promptData.model}</div>
    

     
        {(type === 'authored' || type === 'liked') && (
          <div className="flex items-center justify-center text-text-on-background text-[20px] font-medium py-[23.5px] w-[263px]">
            {promptData.tags?.map(tag => `#${tag} `)}
          </div>
        )}
    </Link>
        

        {type === 'authored' && (
          <div className="flex items-center justify-center h-[72px]  w-[115px] py-[10px]  ">
            <div className="relative">
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className={`flex items-center justify-center h-[28px] w-[28px] rounded-[50px]  ${isDropdownOpen ? 'bg-secondary-pressed' : 'bg-transparent'}`}><img src={kebabMenu} alt="케밥 메뉴"  /></button> 
          {isDropdownOpen && (
            <div className="absolute  right-0 top-full mt-[11px] w-[91px] bg-white rounded-md shadow-lg z-10">
              <button 
                onClick={() => {DeletePrompt(promptData.id); setIsDropdownOpen(false)}} 
                className="block w-full h-[36px] text-[16px] border-b-[1px] border-b-white-stroke text-text-on-background bg-secondary active:bg-secondary-pressed rounded-t-[4px]"
              >
                삭제하기
              </button>
              <button 
                onClick={() => {EditPrompt(promptData.id); setIsDropdownOpen(false)}} 
                className="block w-full h-[36px] text-[16px] text-text-on-background bg-secondary active:bg-secondary-pressed rounded-b-[4px]"
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
