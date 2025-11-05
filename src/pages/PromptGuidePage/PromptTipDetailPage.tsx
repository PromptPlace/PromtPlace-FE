import { axiosInstance } from '@/apis/axios';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import rightArrow from '@assets/icon-arrow-right-black.svg';
import newBadgeImg from '@assets/icon-new-notification.svg';

import url from '@assets/icon-linkhub-logo.svg';
import instagram from '@assets/icon-instagram-logo.svg';
import facebook from '@assets/icon-facebook-logo.svg';
import kakaotalk from '@assets/icon-kakao-logo.svg';
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

  const handleNavigate = () => {
    navigate(`/guide/tip`);
  };

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
      <div className="hidden min-[1026px]:block">
        <div className="mt-[64px] mb-[20px] mx-[102px]">
          <span
            className="w-[65px] flex justify-center gap-[4px]"
            onClick={() => {
              navigate('/guide/tip');
            }}>
            <p className="text-[14px] font-light text-text-on-white">AI 꿀팁</p>
            <img src={rightArrow} alt="뒤로 가기" />
          </span>
        </div>
        <div className="flex flex-col items-center mx-[102px] rounded-[12px] bg-white pt-[56px] px-[80px] pb-[32px]">
          <div className="w-full ">
            {/**상단 */}
            <div className="w-full  h-[135px] border-b-[1px] border-white-stroke mb-[34px]">
              <div className="flex">
                {new Date().getTime() - new Date(post.create_at).getTime() <= 14 * 24 * 60 * 60 * 1000 && (
                  <img src={newBadgeImg} alt="NEW" className="w-[20px] h-[20px] mr-[8px]" />
                )}
                <p className="text-[18px] font-medium text-text-on-white mb-[12px]">{post.title}</p>
              </div>
              <div className="h-[22px]">
                <p className="font-light text-[19px] text-text-on-white  mb-[px]"></p>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div>
                    <div className="flex items-center gap-[12px] h-[17px]">
                      <div className="border-r border-gray-400">
                        <span className="text-[12px] font-light text-black">작성자 : </span>
                        <span className="text-[12px] font-light text-gray500 pr-[8px] ">프롬프트클리닉</span>
                      </div>
                      <div>
                        <span className="text-[12px] font-light text-black">등록일 : </span>
                        <span className="text-[12px] font-light text-gray500">{post.create_at}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-[8px]">
                  <p className="text-[12px] font-light text-text-on-white">공유 :</p>

                  <div className="flex justify-between items-center gap-[16px]">
                    <img
                      className="cursor-pointer w-[20px] h-[20px]"
                      src={instagram}
                      alt="instagram"
                      onClick={handleInstagram}
                    />
                    <img
                      className="cursor-pointer w-[20px] h-[20px]"
                      src={facebook}
                      alt="facebook"
                      onClick={handleFacebook}
                    />
                    <img
                      className="cursor-pointer w-[20px] h-[20px]"
                      src={twitter}
                      alt="twitter"
                      onClick={handleTwitter}
                    />
                    <img className="cursor-pointer w-[20px] h-[20px]" src={url} alt="url" onClick={handleCopyUrl} />
                  </div>
                </div>
              </div>
            </div>
            {/**본문 */}
            <img className="mb-[40px]" src={post.file_url || defaultImg} alt="미리보기 이미지" />
            <div className="text-[16px] font-medium text-text-on-white pb-[40px] border-b-[1px] border-white-stroke">
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

      {/* 481px ~ 1025px: 태블릿 */}
      <div className="hidden min-[481px]:block min-[1026px]:hidden">
        <div className="mt-[64px] mb-[20px] mx-[40px]">
          <span
            className="w-[65px] flex justify-center gap-[4px]"
            onClick={() => {
              navigate('/guide/tip');
            }}>
            <p className="text-[14px] font-light text-text-on-white">AI 꿀팁</p>
            <img src={rightArrow} alt="뒤로 가기" />
          </span>
        </div>
        <div className="flex flex-col items-center mx-[40px] rounded-[12px] bg-white pt-[56px] px-[80px] pb-[32px]">
          <div className="w-full ">
            {/**상단 */}
            <div className="w-full  h-[135px] border-b-[1px] border-white-stroke mb-[34px]">
              <div className="flex">
                {new Date().getTime() - new Date(post.create_at).getTime() <= 14 * 24 * 60 * 60 * 1000 && (
                  <img src={newBadgeImg} alt="NEW" className="w-[20px] h-[20px] mr-[8px]" />
                )}
                <p className="text-[18px] font-medium text-text-on-white mb-[12px]">{post.title}</p>
              </div>
              <div className="h-[22px]">
                <p className="font-light text-[19px] text-text-on-white  mb-[px]"></p>
              </div>
              <div className="flex flex-col items-start">
                <div>
                  <div>
                    <div className="flex items-center gap-[12px] h-[17px] mb-[16px]">
                      <div className="border-r border-gray-400">
                        <span className="text-[12px] font-light text-black">작성자 : </span>
                        <span className="text-[12px] font-light text-gray500 pr-[8px] ">프롬프트클리닉</span>
                      </div>
                      <div>
                        <span className="text-[12px] font-light text-black">등록일 : </span>
                        <span className="text-[12px] font-light text-gray500">{post.create_at}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-[8px]">
                  <p className="text-[12px] font-light text-text-on-white">공유 :</p>

                  <div className="flex justify-between items-center gap-[16px]">
                    <img
                      className="cursor-pointer w-[17px] h-[17px]"
                      src={instagram}
                      alt="instagram"
                      onClick={handleInstagram}
                    />
                    <img
                      className="cursor-pointer w-[17px] h-[17px]"
                      src={facebook}
                      alt="facebook"
                      onClick={handleFacebook}
                    />
                    <img
                      className="cursor-pointer w-[17px] h-[17px]"
                      src={twitter}
                      alt="twitter"
                      onClick={handleTwitter}
                    />
                    <img className="cursor-pointer w-[17px] h-[17px]" src={url} alt="url" onClick={handleCopyUrl} />
                  </div>
                </div>
              </div>
            </div>
            {/**본문 */}
            <img className="mb-[40px]" src={post.file_url || defaultImg} alt="미리보기 이미지" />
            <div className="text-[16px] font-medium text-text-on-white pb-[40px] border-b-[1px] border-white-stroke">
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
      {/* 480px 이하: 모바일 */}
      <div className="block min-[480px]:hidden">
        <div className="mt-[64px] mb-[20px] mx-[20px]">
          <span
            className="w-[65px] flex justify-center gap-[4px]"
            onClick={() => {
              navigate('/guide/tip');
            }}>
            <p className="text-[14px] font-light text-text-on-white">AI 꿀팁</p>
            <img src={rightArrow} alt="뒤로 가기" />
          </span>
        </div>
        <div className="flex flex-col items-center mx-[20px] rounded-[12px] bg-white pt-[32px] px-[20px] pb-[20px]">
          <div className="w-full ">
            {/**상단 */}
            <div className="w-full  h-[135px] border-b-[1px] border-white-stroke mb-[34px]">
              <div className="flex">
                {new Date().getTime() - new Date(post.create_at).getTime() <= 14 * 24 * 60 * 60 * 1000 && (
                  <img src={newBadgeImg} alt="NEW" className="w-[20px] h-[20px] mr-[8px]" />
                )}
                <p className="text-[18px] font-medium text-text-on-white mb-[12px]">{post.title}</p>
              </div>
              <div className="h-[22px]">
                <p className="font-light text-[19px] text-text-on-white  mb-[px]"></p>
              </div>
              <div className="flex flex-col items-start">
                <div>
                  <div>
                    <div className="flex items-center gap-[12px] h-[17px] mb-[16px]">
                      <div className="border-r border-gray-400">
                        <span className="text-[12px] font-light text-black">작성자 : </span>
                        <span className="text-[12px] font-light text-gray500 pr-[8px] ">프롬프트클리닉</span>
                      </div>
                      <div>
                        <span className="text-[12px] font-light text-black">등록일 : </span>
                        <span className="text-[12px] font-light text-gray500">{post.create_at}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-[8px]">
                  <p className="text-[12px] font-light text-text-on-white">공유 :</p>

                  <div className="flex justify-between items-center gap-[16px]">
                    <img
                      className="cursor-pointer w-[17px] h-[17px]"
                      src={instagram}
                      alt="instagram"
                      onClick={handleInstagram}
                    />
                    <img
                      className="cursor-pointer w-[17px] h-[17px]"
                      src={facebook}
                      alt="facebook"
                      onClick={handleFacebook}
                    />
                    <img
                      className="cursor-pointer w-[17px] h-[17px]"
                      src={twitter}
                      alt="twitter"
                      onClick={handleTwitter}
                    />
                    <img className="cursor-pointer w-[17px] h-[17px]" src={url} alt="url" onClick={handleCopyUrl} />
                  </div>
                </div>
              </div>
            </div>
            {/**본문 */}
            <img className="mb-[16px]" src={post.file_url || defaultImg} alt="미리보기 이미지" />
            <div className="text-[14px] font-light text-text-on-white pb-[20px] border-b-[1px] border-white-stroke">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
            <div className="flex justify-end items-end">
              {post.file_url ? (
                <div className="w-[83px] h-[32px] gap-[8px] flex mt-[32px] border border-gray400 rounded-[8px] items-center justify-center">
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
