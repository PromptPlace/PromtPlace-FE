import { axiosInstance } from '@/apis/axios';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import rightArrow from '@assets/icon-arrow-right-black.svg';
import newBadgeImg from '@assets/icon-new-notification.svg';

import url from '@assets/icon-linkhub-logo.svg';
import instagram from '@assets/icon-instagram-logo.svg';
import facebook from '@assets/icon-facebook-logo.svg';
import twitter from '@assets/icon-x-logo.svg';

import defaultImg from '@assets/icon-example-image.png';
import attachFile from '@assets/icon-attach-file-gray.svg';
import ReactMarkdown from 'react-markdown';

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

const PromptTipDetailPage = () => {
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

  /**api 연동 */
  useEffect(() => {
    const fetchPosts = async () => {
      try {
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
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, [id]);

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
  }, [currentUrl]);

  const handleFacebook = useCallback(() => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
    openShareWindow(shareUrl);
  }, [currentUrl]);

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
  }, [currentUrl]);

  return (
    <>
      <div className="px-[102px] max-lg:px-[40px] max-phone:px-[20px]">
        <div className="mt-[64px] mb-[20px]">
          <div
            className="flex justify-start items-center gap-[10px]"
            onClick={() => {
              navigate('/guide/tip');
            }}>
            <p className="text-[14px] font-light text-text-on-white">AI 꿀팁</p>
            <img src={rightArrow} alt="뒤로 가기" className="h-[8px]" />
          </div>
        </div>

        <div className="flex flex-col items-center rounded-[12px] bg-white pt-[56px] px-[80px] pb-[32px] max-lg:px-[32px]">
          <div className="w-full ">
            {/**상단 */}
            <div className="w-full border-b-[1px] border-white-stroke pb-[34px] flex flex-col gap-[24px]">
              <div className="flex">
                {new Date().getTime() - new Date(post.create_at).getTime() <= 14 * 24 * 60 * 60 * 1000 && (
                  <img src={newBadgeImg} alt="NEW" className="w-[20px] h-[20px] mr-[8px]" />
                )}
                <p className="custom-h4 max-phone:text-[16px]">{post.title}</p>
              </div>

              <div className="flex justify-between items-center max-lg:flex-col max-lg:items-start max-lg:gap-[16px]">
                <div className="flex items-center gap-[12px]">
                  <div className="custom-body3 max-phone:text-[10px] border-r border-gray-400">
                    <span>작성자 : </span>
                    <span className="text-gray500 pr-[8px]">프롬프트플레이스</span>
                  </div>

                  <div className="custom-body3 max-phone:text-[10px]">
                    <span>등록일 : </span>
                    <span className="text-gray500">{post.create_at}</span>
                  </div>
                </div>

                <div className="flex gap-[8px]">
                  <p className="custom-body3 text-text-on-white max-phone:text-[10px]">공유 :</p>

                  <div className="flex justify-between items-center gap-[16px]">
                    <img
                      className="cursor-pointer w-[20px] h-[20px] max-phone:w-[16px] max-phone:h-[16px]"
                      src={instagram}
                      alt="instagram"
                      onClick={handleInstagram}
                    />
                    <img
                      className="cursor-pointer w-[20px] h-[20px] max-phone:w-[16px] max-phone:h-[16px]"
                      src={facebook}
                      alt="facebook"
                      onClick={handleFacebook}
                    />
                    <img
                      className="cursor-pointer w-[20px] h-[20px] max-phone:w-[16px] max-phone:h-[16px]"
                      src={twitter}
                      alt="twitter"
                      onClick={handleTwitter}
                    />
                    <img
                      className="cursor-pointer w-[20px] h-[20px] max-phone:w-[16px] max-phone:h-[16px]"
                      src={url}
                      alt="url"
                      onClick={handleCopyUrl}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/**본문 */}
            <img className="py-[40px]" src={post.file_url || defaultImg} alt="미리보기 이미지" />

            <div className="custom-body2 pb-[40px] border-b-[1px] border-white-stroke [&_p]:mb-4 max-phone:text-[12px]">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>

            <div className="flex items-end">
              {post.file_url ? (
                <div className="w-[98px] h-[36px] gap-[8px] flex mt-[32px] border border-gray400 rounded-[8px] items-center justify-center">
                  <p className="text-[12px] font-light text-gray700">첨부파일</p>
                  <img src={attachFile} alt="첨부 파일" className=" w-[20px] h-[20px]" />
                </div>
              ) : (
                <div className="h-[36px] mt-[32px]"></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PromptTipDetailPage;
