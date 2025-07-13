import { useEffect, useState } from 'react';
import { Editor } from './components/Editer';

import TextModal from '@/components/Modal/TextModal';

import CloseIcon from '@assets/icon-close.svg';
import { LuChevronRight } from 'react-icons/lu';
import IconButton from '@/components/Button/IconButton';
import { useNavigate } from 'react-router-dom';

const PromptCreatePage = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [allcheck, setAllcheck] = useState<boolean>(false);

  const [tip, setTip] = useState(true);

  useEffect(() => {
    console.log('title 변경됨:', title);
  }, [title]);
  useEffect(() => {
    console.log('렌더링');
  }, []);

  const navigate = useNavigate();

  const handleTip = () => {
    navigate('/guide/tip');
  };

  return (
    <div className="h-[calc(100vh-24px)] flex items-center justify-center bg-[var(--color-background)]">
      <div className="w-full max-w-[1236px] h-[745px] p-6 flex flex-col">
        {/**프롬프트 제목 */}
        <div className="max-w-[1236px] min-h-[120px] rounded-t-[16px] bg-[var(--color-white)] flex justify-center ">
          <div className="w-[1100px] max-h-[60px] mt-[35px] ">
            <Editor placeholder={'프롬프트 제목을 입력하세요'} onChange={setTitle} />
            <div className="border-b-[1px] border-[var(--color-text-on-background)] mt-[17px]"></div>
          </div>
        </div>
        {/**프롬프트 내용 */}
        <div className="max-w-[1236px] min-h-[465px] bg-[var(--color-white)] flex justify-center">
          <div className="w-[1100px] mt-[15px] ">
            <Editor placeholder={'프롬프트를 입력하세요'} onChange={setContent} />
          </div>
        </div>
        {/**하단 */}
        <div className="max-w-[1236px] h-[160px] rounded-b-[16px] bg-[var(--color-white)] flex justify-center">
          <div className="w-[970px] flex justify-between items-center">
            <div className="w-[350px] h-[80px]">
              {tip ? (
                <div
                  className={
                    'relative w-[350px] h-[80px] bg-background z-2 rounded-[8px] flex items-center justify-center'
                  }>
                  <div className="flex justify-center gap-[10px] items-center" onClick={handleTip}>
                    <p className="text-[22px] font-medium text-text-on-background">프롬프트 작성 tip 보러가기</p>
                    <div className=" text-text-on-background">
                      <LuChevronRight size={24} />
                    </div>
                  </div>
                  <button onClick={() => setTip(false)} className="absolute top-[15px] right-[15px] cursor-pointer">
                    <img src={CloseIcon} alt="닫기" className="w-[16px] h-[16px]" />
                  </button>
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="w-[455px] h-[70px]">
              <div className="flex justify-between">
                <div className="w-[250px] text-[20px]">
                  <IconButton
                    buttonType="round"
                    style="outline"
                    imgType="settings"
                    text="업로드 세부 설정"
                    onClick={() => {
                      alert('업로그 세부 설정 클릭');
                    }}
                  />
                </div>
                <div className="w-[194px] text-[20px]">
                  <IconButton
                    buttonType="round"
                    style="fill"
                    imgType="upload"
                    text="업로드하기"
                    onClick={() => {
                      alert('업로그 세부 설정 클릭');
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptCreatePage;
