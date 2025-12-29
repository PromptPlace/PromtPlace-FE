import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { LuChevronRight } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';

import PrimaryButton from '@/components/Button/PrimaryButton';

import CancleIcon from '@assets/icon-cancle-admin.svg?react';
import usePostTipAdmin from '@/hooks/mutations/AdminPage/usePostTipAdmin';
import { useAuth } from '@/context/AuthContext';

interface PromptGuideCreatePageProps {
  type: 'tip' | 'notice';
}

const PromptGuideCreatePage = ({ type }: PromptGuideCreatePageProps) => {
  console.log(type);

  const { user } = useAuth();
  const writer_id = user.user_id;

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // 이미지 미리보기

  const navigate = useNavigate();

  const { mutate: mutatePostTip } = usePostTipAdmin();

  /** 파일 선택 핸들러 */
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const newFiles = Array.from(e.target.files);
    const firstFile = newFiles[0];

    setFiles((prev) => [...prev, ...newFiles]); // 여러 개 추가 가능

    if (firstFile && firstFile.type.startsWith('image/')) {
      const url = URL.createObjectURL(firstFile); // 이미지 preview
      setPreviewUrl(url);
    }
  };

  /** 파일 삭제 */
  const handleRemove = () => {
    // setFiles((prev) => prev.filter((f) => f.name !== fileName));
    setFiles([]);
    setPreviewUrl(null);
  };

  /** 파일첨부 버튼 클릭 → 숨겨진 input 실행 */
  const handleClickFileAttach = () => {
    fileInputRef.current?.click();
  };

  // AI 꿀팁 업로드
  const handlePostTip = () => {
    const formData = new FormData();

    formData.append('writer_id', String(writer_id));
    formData.append('title', title);
    formData.append('content', content);

    if (files[0]) {
      formData.append('file', files[0]);
    }

    mutatePostTip(formData, {
      onSuccess: () => {
        alert('게시글이 업로드되었습니다.');
        navigate('/guide/tip');
      },
      onError: () => {
        alert('게시글 업로드에 실패했습니다');
      },
    });
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <>
      <div className="flex flex-col gap-[20px] px-[102px] max-lg:px-[40px] max-phone:px-[20px]">
        <div className="flex items-center gap-[4px] mt-[64px]">
          <p className="custom-body2 text-text-on-white">AI 꿀팁</p>
          <LuChevronRight size={16} onClick={() => navigate('/guide/tip')} className="cursor-pointer" />
        </div>

        {/* 작성 부분 */}
        <div className="flex flex-col gap-[40px] w-full bg-white rounded-t-[16px] rounded-b-[16px] pt-[56px] px-[80px] pb-[32px]">
          <div className="w-full border-b-[1px] border-gray200 pb-[32px]">
            {/* 제목, 소개말 */}
            <div className="flex flex-col gap-[12px]">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="custom-h4 text-text-on-white outline-none placeholder:font-[SCoreDream] placeholder:custom-h4 placeholder:text-text-on-background w-full"
                placeholder="게시글 제목 작성"
              />

              <input
                className="custom-h3 text-text-on-white outline-none placeholder:font-[SCoreDream] placeholder:custom-h3 placeholder:text-text-on-background w-full"
                placeholder="게시글 소개말 작성"
              />
            </div>
          </div>

          {/* 사진 */}
          <div className="h-[292px]">
            {previewUrl && <img src={previewUrl} alt="첨부 이미지 미리보기" className="w-full h-full object-contain" />}
          </div>

          {/* 본문 */}
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-[140px] custom-body2 placeholder:custom-body2 placeholder:font-[SCoreDream] text-text-on-white outline-none resize-none overflow-y-auto placeholder:text-text-on-background"
            placeholder="게시글 본문 작성"
          />

          {/**하단 */}
          <div className="flex flex-wrap gap-[20px] justify-between items-center bg-white rounded-b-[16px] border-t border-gray200 pt-[32px]">
            {/* 파일 선택 */}
            <div className="max-w-[502px] w-full">
              {files.length > 0 && (
                <div className="py-[10px] px-[16px] rounded-[12px] border border-gray300">
                  <div className="flex justify-between items-center">
                    <span className="custom-button2 truncate max-w-[440px] w-full text-text-on-white">
                      {files[0].name}
                    </span>

                    <CancleIcon onClick={handleRemove} className="cursor-pointer" />
                  </div>
                </div>
              )}
            </div>

            {/* 버튼 */}
            <div className="flex gap-[37px] max-w-[300px] w-full">
              <PrimaryButton
                buttonType="admin"
                text="파일첨부"
                onClick={handleClickFileAttach}
                py={8}
                borderRadius={8}
              />
              {/*파일 input (단일 파일만 첨부 가능) */}
              <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} />

              <PrimaryButton
                buttonType="adminBG"
                text="업로드"
                onClick={() => {
                  handlePostTip();
                }}
                borderRadius={8}
                py={8}
                px={21}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PromptGuideCreatePage;
