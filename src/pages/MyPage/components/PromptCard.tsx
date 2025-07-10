import BigBlueHeart from '@/assets/icon-heart-blue-big.svg'
import PrimaryButton from '@components/Button/PrimaryButton';

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
}



export const PromptCard = ({ type, promptData} : PromptCardProps ) => {
  return (
    <div className="flex items-center justify-between  border-b">
      {/* 왼쪽 영역: 제목과 모델 이름 */}
      
        <div className=" text-text-on-white text-[22px] py-[22px] font-bold w-[635px]">{promptData.title}</div>
        <div className="text-text-on-background text-[20px] font-medium py-[23.5px] w-[223px]">{promptData.model}</div>
    

      {/* 오른쪽 영역: type에 따라 내용이 바뀜 */}
      <div className="flex items-center gap-6">
        {/* 태그 (다운로드 탭에서는 보이지 않음) */}
        {(type === 'authored' || type === 'liked') && (
          <div className="text-text-on-background text-[20px] font-medium py-[23.5px] w-[263px]">
            {promptData.tags?.map(tag => `#${tag} `)}
          </div>
        )}

        {/* 상태 텍스트 (다운로드 탭에서만 보임) */}
       

        {/* 버튼 영역 (type별로 다른 버튼) */}
        {type === 'authored' && (
          <button>...</button> // 케밥 메뉴(점 3개) 아이콘
        )}
        {type === 'downloaded' && (
          
          <PrimaryButton buttonType="review" text="리뷰 작성하기" onClick={() => {}} />    //버튼 공통 컴포넌트 수정 추후 상의 필요
        )}
        {type === 'downloaded' && (
          <div className="text-text-on-white text-[20px] font-medium py-[23.5px] w-[180px] px-[44px]">{promptData.author}</div>
        )}

        {type === 'liked' && (
          <button><img src={BigBlueHeart} alt="좋아요 큰하트" className=" h-[22px] py-[22px] w-[115px]" /></button> // 하트 아이콘
        )}
      </div>
    </div>
  );
};
