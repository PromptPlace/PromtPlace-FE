import { useCallback, useEffect, useRef, useState, type ChangeEvent } from 'react';
import { BsPaperclip } from 'react-icons/bs';
import { LuChevronLeft, LuX } from 'react-icons/lu';
import { useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import attachfile from '@assets/icon-attach-file-hover.svg';

interface PromptGuideCreatePageProps {
  type: 'tip' | 'notice';
}
// 게시글 타입
interface Post {
  id: number;
  title: string;
  content: string;
  create_at: string;
  update_at: string;
  is_visible: boolean;
  file_url: string | null;
}
const PromptGuideCreatePage = ({ type }: PromptGuideCreatePageProps) => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post>({
    id: 0,
    title: 'title',
    content: 'conntent',
    create_at: 'create_date',
    update_at: 'update_date',
    is_visible: true,
    file_url: null,
  });

  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/guide/${type}`);
  };

  /** 파일 선택 핸들러 */
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...newFiles]); // 여러 개 추가 가능
  };

  /** 파일 삭제 */
  const handleRemove = (fileName: string) => {
    setFiles((prev) => prev.filter((f) => f.name !== fileName));
  };

  /** 파일첨부 버튼 클릭 → 숨겨진 input 실행 */
  const handleClickFileAttach = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <div className="min-h-screen flex justify-center items-center">
        <div className="w-full max-w-[994px] h-[880px] bg-white rounded-t-[16px] rounded-b-[16px]">
          {/* 상단 */}
          <div className="w-full max-w-[994px] h-[105px] pt-[55px] pl-[20px] pr-[10px]">
            <div
              className="w-[187px] h-[50px] flex items-center gap-[10px] p-[10px] cursor-pointer"
              onClick={handleNavigate}>
              <LuChevronLeft size={24} />
              <span className="text-text-on-white font-bold text-[24px] ">{`${type === 'tip' ? '프롬프트 TIP' : '공지사항'}`}</span>
            </div>
          </div>

          <div className="w-full max-w-[994px] h-[190px] border-b-[1px] border-white-stroke px-[65px]">
            <div className="max-w-[864px] h-[40px] mt-[30px]">
              <input
                className="font-bold text-[32px] text-text-on-white 
                bg-transparent border-none outline-none w-full placeholder:text-text-on-background"
                placeholder="제목"
              />
            </div>
            <div className="max-w-[864px] h-[25px] mt-[10px] mb-[30px]">
              <input
                className="font-medium text-[24px] text-text-on-background] bg-transparent
                border-none outline-none w-full placeholder:text-text-on-background"
                placeholder="날짜 (ex : 2025-09-30)"
              />
            </div>
            <div className="w-[290px] h-[45px] flex justify-between">
              <div>
                <button
                  type="button"
                  onClick={handleClickFileAttach}
                  className="w-[115px] h-[45px] flex justify-center items-center bg-white text-alert 
                  rounded-[16px] border border-alert py-[16px] px-[8px] text-[20px] font-medium">
                  파일첨부
                </button>

                {/*파일 input (단일 파일만 첨부 가능) */}
                <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} />
              </div>
              <button
                onClick={() => {}}
                className="w-[137px] h-[45px] flex justify-center items-center bg-white text-alert 
               rounded-[16px] border border-alert py-[16px] px-[8px] text-[20px] font-medium">
                메인에 걸기
              </button>
            </div>
          </div>

          {/* 본문 */}
          <div className="w-full max-w-[994px] h-[460px] flex justify-center ">
            <textarea
              className="w-[865px] h-full py-[15px] font-medium text-[20px] text-text-on-white bg-transparent
     border-b-[1px] border-white-stroke outline-none resize-none overflow-y-auto placeholder:text-text-on-background"
              placeholder=""
            />
          </div>

          {/**하단 */}
          <div className="w-full max-w-[994px] h-[125px] flex justify-center items-center bg-white rounded-b-[16px]">
            <div className="w-[864px] h-[60px] flex justify-between ">
              <button
                onClick={() => {}}
                className="w-[198px] h-[60px] flex justify-center items-center bg-alert text-white 
               rounded-[16px] py-[10px] px-[28px] text-[24px] font-bold">
                업로드
              </button>

              <div className="w-[300px] flex justify-between items-center">
                {files.length > 0 && (
                  <div className="flex items-center justify-between w-full px-3 py-2 bg-white">
                    <span className="truncate max-w-[300px] text-[24px] font-medium text-text-on-background">
                      {files[0].name}
                    </span>
                    <button
                      type="button"
                      aria-label="첨부 파일 삭제"
                      onClick={() => handleRemove(files[0].name)}
                      className="ml-[24px] text-text-on-background text-center">
                      <LuX size={20} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PromptGuideCreatePage;
