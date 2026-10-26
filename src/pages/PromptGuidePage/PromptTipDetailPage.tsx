import { axiosInstance } from '@/apis/axios';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import rightArrow from '@assets/icon-arrow-right-black.svg';
import newBadgeImg from '@assets/icon-new-notification.svg';

import url from '@assets/icon-linkhub-logo.svg';
import facebook from '@assets/icon-facebook-logo.svg';
import kakao from '@assets/icon-kakao-logo.svg';
import twitter from '@assets/icon-x-logo.svg';
import defaultImg from '@assets/icon-example-image.png';
import attachFile from '@assets/icon-attach-file-gray.svg';
import DeleteIcon from '@assets/icon-delete-Xbutton.svg?react';

import ReactMarkdown from 'react-markdown';
import { useAuth } from '@/context/AuthContext';
import PrimaryButton from '@/components/Button/PrimaryButton';
import type { Post } from '@/types/PromptGuidePage/post';
import TipDetailSkeleton from './components/TipDetailSkeleton';
import usePatchDeleteTipAdmin from '@/hooks/mutations/AdminPage/usePatchDeleteTipAdmin';
import DualModal from '@/components/Modal/DualModal';

const isNewPost = (createdAt: string) => {
  const [year, month, day] = createdAt.split('.').map(Number);
  if (!year || !month || !day) return false;

  const createdDate = new Date(year, month - 1, day);
  const ageInMs = Date.now() - createdDate.getTime();
  const twoWeeksInMs = 14 * 24 * 60 * 60 * 1000;

  return ageInMs >= 0 && ageInMs <= twoWeeksInMs;
};

const PromptTipDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post>({
    id: 0,
    title: 'title',
    content: 'conntent',
    created_at: 'created_date',
    updated_at: 'updated_date',
    is_visible: true,
    file_url: null,
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { mutate } = usePatchDeleteTipAdmin();

  const { user } = useAuth();
  const isAdmin = user.role === 'ADMIN';

  /**api 연동 */
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);

        const base = import.meta.env.VITE_SERVER_API_URL;
        const res = await axiosInstance.get(`${base}/api/tips/${id}/details`);
        const fetched_data = res.data.data.data;

        const tipdetail: Post = {
          id: fetched_data.tip_id,
          title: fetched_data.title,
          content: fetched_data.content,

          created_at: fetched_data.created_at.slice(0, 10).replace(/-/g, '.'),
          updated_at: fetched_data.updated_at.slice(0, 10).replace(/-/g, '.'),
          is_visible: fetched_data.is_visible,
          file_url: fetched_data.file_url,
        };
        setPost(tipdetail);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
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

  const handleKakaoShare = useCallback(() => {
    if (!window.Kakao) {
      alert('카카오 SDK를 불러오지 못했습니다.');
      return;
    }

    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY);
    }

    try {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: post.title,
          description: 'PromptPlace에서 확인해보세요!',
          imageUrl: post.file_url || `${window.location.origin}/favicon-96x96.png`,
          link: { mobileWebUrl: currentUrl, webUrl: currentUrl },
        },
        buttons: [
          {
            title: '꿀팁 보러가기',
            link: { mobileWebUrl: currentUrl, webUrl: currentUrl },
          },
        ],
      });
    } catch {
      alert('카카오톡 공유에 실패했습니다.');
    }
  }, [currentUrl, post.file_url, post.title]);

  const shareActions = [
    { label: '페이스북 공유', icon: facebook, onClick: handleFacebook },
    { label: '카카오톡 공유', icon: kakao, onClick: handleKakaoShare },
    { label: 'X 공유', icon: twitter, onClick: handleTwitter },
    { label: 'URL 복사', icon: url, onClick: handleCopyUrl },
  ];

  const handleDeleteTip = () => {
    mutate(Number(id), {
      onSuccess: () => {
        alert('꿀팁이 삭제되었습니다.');
        navigate('/guide/tip');
      },
    });
  };

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

        {loading && <TipDetailSkeleton />}

        {!loading && (
          <div className="flex flex-col items-center rounded-[12px] bg-white pt-[56px] px-[80px] pb-[32px] max-lg:px-[32px]">
            <div className="w-full">
              {isAdmin && (
                <div className="w-full flex flex-row justify-end">
                  <DeleteIcon className="size-5 text-alert cursor-pointer" onClick={() => setShowDeleteModal(true)} />
                </div>
              )}
              {/**상단 */}
              <div className="w-full border-b-[1px] border-white-stroke pb-[34px] flex flex-col gap-[24px]">
                <div className="flex">
                  {isNewPost(post.created_at) && (
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
                      <span className="text-gray500">{post.created_at}</span>
                    </div>
                  </div>

                  <div className="flex gap-[8px] items-center">
                    <p className="custom-body3 text-text-on-white max-phone:text-[10px]">공유 :</p>

                    <div className="flex justify-between items-center gap-[16px]">
                      {shareActions.map(({ label, icon, onClick }) => (
                        <button
                          key={label}
                          type="button"
                          aria-label={label}
                          onClick={onClick}
                          className="cursor-pointer border-0 bg-transparent p-0">
                          <img className="w-[20px] h-[20px] max-phone:w-[16px] max-phone:h-[16px]" src={icon} alt="" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/**본문 */}
              <img className="py-[40px]" src={post.file_url || defaultImg} alt="미리보기 이미지" />

              <div className="custom-body2 pb-[40px] border-b-[1px] border-white-stroke [&_p]:mb-4 max-phone:text-[12px]">
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </div>

              <div className="flex items-end justify-between">
                {post.file_url ? (
                  <div className="w-[98px] h-[36px] gap-[8px] flex mt-[32px] border border-gray400 rounded-[8px] items-center justify-center">
                    <p className="text-[12px] font-light text-gray700">첨부파일</p>
                    <img src={attachFile} alt="첨부 파일" className=" w-[20px] h-[20px]" />
                  </div>
                ) : (
                  <div className="h-[36px] mt-[32px]"></div>
                )}

                {/* 관리자 */}
                {isAdmin && (
                  <PrimaryButton
                    buttonType="adminBG"
                    text="수정하기"
                    borderRadius={8}
                    py={8}
                    onClick={() => {
                      navigate('/admin/guide/tip/create', {
                        state: {
                          post,
                          mode: 'edit',
                        },
                      });
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {showDeleteModal && (
        <DualModal
          text="해당 꿀팁을 삭제 조치 하시겠습니까?"
          onClickYes={handleDeleteTip}
          onClickNo={() => setShowDeleteModal(false)}
        />
      )}
    </>
  );
};

export default PromptTipDetailPage;
