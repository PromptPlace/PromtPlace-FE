import Count from '@components/Count';
import ModelButton from '@components/Button/ModelButton';
import updateIcon from '../assets/updatebutton.png';
import deleteIcon from '../assets/deletebutton.png';

interface Props {
  title: string;
  views: number;
  downloads: number;
  onClose: () => void;
}

const PromptHeader = ({ title, views, downloads, onClose }: Props) => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  return (
    <div className="w-[711px] bg-[#FFFEFB] px-8">
      <div className="h-[132px] box-border flex flex-col justify-between">
        <div className="flex items-center justify-between w-full pt-[35px]">
          <ModelButton text="ChatGPT" />

          {isAdmin && (
            <div className="flex gap-[24px]">
              <button className="w-[32px] h-[32px]" aria-label="수정" onClick={() => alert('수정 버튼 클릭')}>
                <img src={updateIcon} alt="수정" className="w-full h-full object-contain" />
              </button>
              <button className="w-[28px] h-[28px] p-[4px]" aria-label="삭제" onClick={() => alert('삭제 버튼 클릭')}>
                <img src={deleteIcon} alt="삭제" className="w-full h-full object-contain" />
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-[15px]">
            <button
              onClick={onClose}
              className="text-2xl pb-[10px] font-bold leading-none hover:opacity-70"
              aria-label="뒤로가기">
              &lt;
            </button>
            <h2 className="font-bold text-[32px] pb-[10px]">{title}</h2>
          </div>

          <div className="flex gap-8">
            <Count imgType="eye" count={views} />
            <Count imgType="download" count={downloads} />
          </div>
        </div>
      </div>

      {/* 하단 구분선 */}
      <div className="h-[1px] bg-[#CCCCCC] w-full" />
    </div>
  );
};

export default PromptHeader;
