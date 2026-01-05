import { useState, useEffect } from 'react';
import axios from 'axios';
import defaultImg from '@assets/icon-example-image.png';
import newBadgeImg from '@assets/icon-new-notification.svg';
import attachFile from '@assets/icon-attach-file-gray.svg';

import leftArrow from '@assets/icon-arrow-left-black.svg';
import rightArrow from '@assets/icon-arrow-right-black.svg';
import { useNavigate } from 'react-router-dom';
import { useShowLoginModal } from '@/hooks/useShowLoginModal';
import SocialLoginModal from '@/components/Modal/SocialLoginModal';
import { useAuth } from '@/context/AuthContext';
import PrimaryButton from '@/components/Button/PrimaryButton';
import clsx from 'clsx';

interface Tip {
  tip_id: number;
  writer_id: number;
  title: string;
  content: string;
  is_visible: boolean;
  file_url: string | null;
  created_at: string;
  updated_at: string;
}

interface PaginationInfo {
  page: number;
  size: number;
  total_elements: number;
  total_pages: number;
}

const PromptTipPage = () => {
  const { user } = useAuth();
  const isAdmin = user.role === 'ADMIN';

  const [tips, setTips] = useState<Tip[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    size: 10,
    total_elements: 0,
    total_pages: 1,
  });
  const [loading, setLoading] = useState(false);

  // API 호출 함수
  const fetchTips = async (page: number, size: number = 10) => {
    setLoading(true);
    try {
      const base = import.meta.env.VITE_SERVER_API_URL;
      const res = await axios.get(`${base}/api/tips`, {
        params: {
          page,
          size,
        },
      });

      console.log('tip 받은 데이터', res.data.data.data.tips);
      console.log('페이지네이션 정보:', res.data.data.data.pagination);

      if (res.data.statusCode === 200) {
        setTips(res.data.data.data.tips);
        setPagination(res.data.data.data.pagination);
      }
    } catch (error) {
      console.error('API 호출 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  // 초기 로드
  useEffect(() => {
    fetchTips(1);
  }, []);

  // 페이지 변경 핸들러
  const handlePageChange = (newPage: number) => {
    fetchTips(newPage, pagination.size);
  };

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
  };

  // 게시글 클릭시 상세로 이동
  const navigate = useNavigate();
  const { loginModalShow, setLoginModalShow, handleShowLoginModal } = useShowLoginModal();
  const handleRowClick = (id: number) => {
    handleShowLoginModal(() => {
      navigate(`/guide/tip/${id}`);
    });
  };

  return (
    <>
      {/** 소셜 로그인 트리거  */}
      {loginModalShow && (
        <SocialLoginModal isOpen={loginModalShow} onClose={() => setLoginModalShow(false)} onClick={() => {}} />
      )}

      <div className="px-[102px] mt-[64px] max-lg:px-[40px] max-phone:px-[20px]">
        <div>
          {/* 헤더 */}
          <div
            className={clsx(
              isAdmin ? 'flex justify-between items-center flex-wrap mb-[20px]' : 'flex flex-col items-start',
            )}>
            <div className="mb-[56px] flex flex-col gap-[12px] max-lg:mb-[20px]">
              <h1 className="custom-h1 max-phone:text-[24px]">AI 꿀팁</h1>

              <p className="custom-h3 hidden lg:block">
                AI 꿀팁에서는 전문가처럼 쓰는 프롬프트 팁부터 일상 속 AI 활용법, 꼭 알아야 할 AI 트렌드까지 확인할 수
                있어요!
              </p>

              <p className="custom-h3 hidden max-lg:block max-phone:hidden">
                AI 꿀팁에서는 전문가처럼 쓰는 프롬프트 팁부터
                <br />
                일상 속 AI 활용법, 꼭 알아야 할 AI 트렌드까지 확인할 수 있어요!
              </p>

              <p className="custom-h3 hidden max-phone:block text-[14px]">
                AI 꿀팁에서는 전문가처럼 쓰는
                <br />
                프롬프트 팁부터 일상 속 AI 활용법,
                <br />꼭 알아야 할 AI 트렌드까지 확인할 수 있어요!
              </p>
            </div>

            {/* 관리자 */}
            {isAdmin && (
              <PrimaryButton
                buttonType="adminBG"
                text="작성하기"
                onClick={() => {
                  navigate('/admin/guide/tip/create');
                }}
                borderRadius={8}
                py={8}
              />
            )}
          </div>

          {/* 전체 개수 표시 */}
          <div className="mb-[20px]">
            <p className="text-[12px] font-medium text-gray-700">
              총 <span className="text-primary">{pagination.total_elements}</span>건
            </p>
          </div>

          {/* 로딩 상태 */}
          {loading && (
            <div className="flex justify-center items-center py-[100px]">
              <p className="text-[16px] text-gray-500">로딩 중...</p>
            </div>
          )}

          {/* 팁 리스트 */}
          <div className="flex flex-col items-center bg-white rounded-[12px] px-[12px] py-[16px] mb-[72px]">
            {!loading && tips.length > 0 && (
              <div className="w-full">
                {tips.map((tip) => (
                  <div
                    key={tip.tip_id}
                    className="w-full bg-white p-[24px] flex gap-[20px] max-lg:flex-col cursor-pointer"
                    onClick={() => {
                      handleRowClick(tip.tip_id);
                    }}>
                    <div className="w-full flex justify-between items-start mb-[8px] lg:hidden">
                      <p className="text-[12px] font-light text-text-on-white">프롬프트플레이스{/**임시 */}</p>
                      <p className="custom-body3 max-phone:text-[10px] text-gray-400 ml-[12px] flex-shrink-0">
                        {formatDate(tip.created_at)}.
                      </p>
                    </div>

                    {/* 이미지 */}
                    <div className="w-[200px] rounded-[8px] flex-shrink-0">
                      <img
                        src={tip.file_url || defaultImg}
                        alt={tip.title}
                        className="w-[200px] h-[75px]  object-cover"
                      />
                    </div>

                    {/* 내용 */}
                    <div className="w-full flex flex-col justify-between">
                      <div>
                        <div className="w-full flex justify-between items-start mb-[8px] max-lg:hidden">
                          <p className="text-[12px] font-light text-text-on-white">프롬프트플레이스{/**임시 */}</p>
                          <p className="custom-body3 max-phone:text-[10px] text-gray-400 ml-[12px] flex-shrink-0">
                            {formatDate(tip.created_at)}.
                          </p>
                        </div>

                        <div className="flex gap-[15px] items-end">
                          <div>
                            <div className="flex">
                              {new Date().getTime() - new Date(tip.created_at).getTime() <=
                                14 * 24 * 60 * 60 * 1000 && (
                                <img src={newBadgeImg} alt="NEW" className="w-[20px] h-[20px] mr-[12px]" />
                              )}
                              <p className="text-[14px] font-medium text-text-on-white mb-[12px]">{tip.title}</p>
                            </div>

                            <p className="text-[14px] font-light text-text-on-white line-clamp-1 max-lg:line-clamp-2">
                              {tip.content}
                            </p>
                          </div>
                          {tip.file_url && (
                            <div className="w-[36px] h-[15px] flex-shrink-0">
                              <div className=" gap-[4px] flex">
                                <p className="text-[12px] font-medium text-gray400">첨부</p>
                                <img src={attachFile} alt="첨부 파일" className=" w-[16px] h-[16px]" />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 페이지네이션 */}
          {!loading && (
            <div className="flex justify-center items-center gap-[8px]">
              {/* 이전 버튼 - 페이지가 5개 이하이면 숨김 */}
              {pagination.total_pages > 5 && (
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className={`w-[13px] h-[13px]  flex items-center justify-center ${
                    pagination.page === 1 ? 'cursor-not-allowed ' : ''
                  }`}>
                  <img src={leftArrow} alt="이전" className="w-[13px] h-[13px]" />
                </button>
              )}

              {/* 페이지 번호들 */}
              {Array.from({ length: pagination.total_pages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-[38px] h-[38px] rounded-[50px] flex items-center justify-center text-[12px] font-medium ${
                    page === pagination.page ? 'bg-primary-hover text-white font-medium' : 'bg-white text-background '
                  }`}>
                  {page}
                </button>
              ))}

              {/* 다음 버튼 - 페이지가 5개 이하이면 숨김 */}
              {pagination.total_pages > 5 && (
                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.total_pages}
                  className={`w-[13px] h-[13px]  flex items-center justify-center ${
                    pagination.page === pagination.total_pages ? 'cursor-not-allowed ' : ''
                  }`}>
                  <img src={rightArrow} alt="다음" className="w-[13px] h-[13px]" />
                </button>
              )}
            </div>
          )}

          {/* 데이터 없을 때 */}
          {!loading && tips.length === 0 && (
            <div className="flex justify-center items-center py-[100px]">
              <p className="text-[16px] text-gray-500">등록된 꿀팁이 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PromptTipPage;
