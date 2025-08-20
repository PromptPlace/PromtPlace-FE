/**
 * TODO:
 * - type에 따라 TIP/공지사항 렌더링 분기 처리 필요
 * @author 김진효
 * - 게시글 본문에 markdown 적용 필요
 * - 게시글 본문에 스크롤바 ui 적용 필요
 * (tailwind.config.js 설정해야 함)
 * 추후 모바일 화면의 img-url은 이미지 변경 필요
 * 게시글 하단의 url 링크 연결 필요
 * @author luii
 * **/

import { useCallback, useEffect, useState } from 'react';
import { BsPaperclip } from 'react-icons/bs';
import { LuChevronLeft } from 'react-icons/lu';
import { useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import attachfile from '@assets/icon-attach-file-hover.svg';

import url from '@assets/icon-linkhub-logo.svg';
import instagram from '@assets/icon-instagram-logo.svg';
import facebook from '@assets/icon-facebook-logo.svg';
import kakaotalk from '@assets/icon-kakao-logo.svg';
import twitter from '@assets/icon-x-logo.svg';
import { axiosInstance } from '@/apis/axios';

interface PromptGuideDetailPageProps {
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
const PromptGuideDetailPage = ({ type }: PromptGuideDetailPageProps) => {
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

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/guide/${type}`);
  };

  /**api 연동 */
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (type === 'tip') {
          const base = import.meta.env.VITE_SERVER_API_URL;
          const res = await axiosInstance.get(`${base}/api/tips/${id}/details`);
          console.log(res.data.data.data);

          const fetched_data = res.data.data.data;

          const tipdetail: Post = {
            id: fetched_data.tip_id,
            title: fetched_data.title,
            content: fetched_data.content,

            create_at: fetched_data.created_at.slice(0, 10).replace(/-/g, '.'),
            update_at: fetched_data.updated_at.slice(0, 10).replace(/-/g, '.'),
            is_visible: fetched_data.is_visible,
            file_url: fetched_data.file_url,
          };
          setPost(tipdetail);
        } else if (type === 'notice') {
          const base = import.meta.env.VITE_SERVER_API_URL;
          const res = await axiosInstance.get(`${base}/api/announcements/${id}/details`);

          const fetched_data = res.data.data.data;

          const noticedetail: Post = {
            id: fetched_data.announcement_id,
            title: fetched_data.title,
            content: fetched_data.content,

            create_at: fetched_data.created_at.slice(0, 10),
            update_at: fetched_data.updated_at.slice(0, 10),
            is_visible: fetched_data.is_visible,
            file_url: fetched_data.file_url,
          };
          setPost(noticedetail);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, [id, type]);

  /**파일 다운로드 기능 */
  // 파일 다운로드 함수 - 다운로드 가능한 url을 백엔드에서 전달
  const handleFileDownload = useCallback(() => {
    if (!post.file_url) return;

    // URL에서 파일명 추출
    const fileName = post.file_url.split('/').pop() || 'download';

    // 임시 링크 생성해서 다운로드
    const link = document.createElement('a');
    link.href = post.file_url;
    link.download = fileName;
    link.target = '_blank'; // 새 탭에서 열기
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [post.file_url]);

  /*페이지 공유 기능 관련 */

  //페이지 URL
  const currentUrl = window.location.href;

  // 클립보드에 복사 (useCallback 사용)
  const handleCopyUrl = useCallback(() => {
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => alert('URL이 복사되었습니다!'))
      .catch(() => alert('복사에 실패했습니다.'));
  }, [currentUrl]);

  // 새 창으로 공유 URL 열기
  const openShareWindow = (shareUrl: string) => {
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  const handleTwitter = useCallback(() => {
    const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}`;
    openShareWindow(shareUrl);
  }, []);

  const handleFacebook = useCallback(() => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
    openShareWindow(shareUrl);
  }, []);

  // 클립보드에 복사
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };
  const handleInstagram = useCallback(() => {
    copyToClipboard(currentUrl);
    const ok = window.confirm('인스타그램으로 이동합니다.');
    if (!ok) return; // 취소했으면 아무 동작도 하지 않음

    // 확인했으면 새 탭으로 인스타그램 웹 열기
    window.open('https://www.instagram.com', '_blank', 'noopener,noreferrer');
  }, []);

  return (
    <>
      {/*PC 화면 */}
      <div className="hidden lg:block">
        <div className="min-h-screen flex justify-center items-center">
          <div className="w-full max-w-[994px] h-[750px] bg-white rounded-t-[16px] rounded-b-[16px]">
            {/* 상단 */}
            <div className="w-full max-w-[994px] mh-[105px]  pt-[55px] pl-[20px] pr-[10px]">
              <div
                className="w-[187px] h-[50px] flex items-center gap-[10px] p-[10px] cursor-pointer"
                onClick={handleNavigate}>
                <LuChevronLeft size={24} />
                <span className="text-text-on-white font-bold text-[24px] ">{`${type === 'tip' ? '프롬프트 TIP' : '공지사항'}`}</span>
              </div>
            </div>

            <div className="w-full max-w-[994px] h-[135px] border-b-[1px] border-white-stroke px-[65px]">
              <h1 className="font-bold text-[32px] text-text-on-white pt-[30px]">{post.title}</h1>
              <p className="font-medium text-[20px] text-text-on-background pt-[10px] pb-[30px]">{post.create_at}</p>
            </div>

            {/* 본문 */}
            <div className="w-full max-w-[994px] h-[385px] flex justify-center overflow-y-auto prose prose-neutral text-base">
              <div className="w-[864px] border-b-[1px] border-white-stroke font-medium text-[20px] text-text-on-white py-[30px]">
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </div>
            </div>

            {/**하단 */}
            <div className="w-full max-w-[994px] h-[125px]  flex justify-center">
              <div className="w-[864px] h-[45px] flex justify-between mt-[33px] mb-[47px]">
                {typeof post.file_url === 'string' && post.file_url.trim() !== '' ? (
                  <button className="w-[116px] h-[45px] flex justify-center gap-[2px] items-center rounded-lg border-[1px] border-primary bg-white text-primary">
                    <BsPaperclip className="mr-2" size={20} />
                    <p className="font-medium text-primary text-[20px]">첨부</p>
                  </button>
                ) : (
                  <div className="w-[116px] h-[45px]">{/* file_url이 null, undefined, ""일 때만 보여줌 */}</div>
                )}

                <div className="w-[220px] flex justify-between items-center">
                  <img className="cursor-pointer" src={url} alt="url" onClick={handleCopyUrl} />
                  <img className="cursor-pointer" src={instagram} alt="instagram" onClick={handleInstagram} />
                  <img className="cursor-pointer" src={facebook} alt="facebook" onClick={handleFacebook} />
                  <img className="cursor-pointer" src={twitter} alt="twitter" onClick={handleTwitter} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*모바일 화면 */}
      <div className="lg:hidden block">
        <div className="relative w-full h-[58px]  flex items-center">
          <button className="ml-[12px] flex items-center cursor-pointer" onClick={handleNavigate}>
            <LuChevronLeft size={24} />
          </button>
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-xl tracking-wide">
            <p className="text-[16px] text-black font-medium"> {`${type === 'tip' ? '프롬프트 TIP' : '공지사항'}`}</p>
          </span>
        </div>
        <div className=" flex justify-center items-center mt-[20px]">
          <div className="w-full max-w-[280px] h-full min-h-[420px] bg-white">
            {/*상단 */}
            <div className="w-full max-w-[280px] h-full max-h-[80px] border-b-[0.5px] border-white-stroke px-[20px]">
              <h1 className="font-medium text-[12px] text-text-on-white mt-[20px]">{post.title}</h1>
              <p className="font-normal text-[8px] text-text-on-background mt-[12px] mb-[23px]">{post.create_at}</p>
            </div>
            {/*본문 */}
            <div className="w-full max-w-[280px] h-full min-h-[275px] border-b-[0.5px] border-white-stroke p-[20px] ">
              <div className="text-[10px] text-text-on-white font-medium">
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </div>
            </div>
            {/*하단  */}
            <div className="w-full max-w-[280px] h-[64px] flex justify-center">
              <div className="w-full h-[45px] flex justify-center gap-[45px] items-center">
                {typeof post.file_url === 'string' && post.file_url.trim() !== '' ? (
                  <button
                    className="w-[60px] h-[24px] flex justify-center gap-[4px] items-center rounded-lg border-[1px]
                   border-primary bg-white text-primary">
                    <img className="w-[12px] h-[12px]" src={attachfile} alt="attach-file" />
                    <p className="font-medium text-primary text-[12px]">첨부</p>
                  </button>
                ) : (
                  <div className="w-[60px] h-[24px]">{/* file_url이 null, undefined, ""일 때만 보여줌 */}</div>
                )}

                <div className="w-[115px] flex justify-between items-center">
                  <img className="w-[16px] h-[16px]" src={url} alt="url" onClick={handleCopyUrl} />
                  <img className="w-[16px] h-[16px]" src={instagram} alt="instagram" onClick={handleInstagram} />
                  <img className="w-[16px] h-[16px]" src={facebook} alt="facebook" onClick={handleFacebook} />
                  <img className="w-[16px] h-[16px]" src={twitter} alt="twitter" onClick={handleTwitter} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PromptGuideDetailPage;
