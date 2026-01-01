import { useState, useEffect } from 'react';
import axios from 'axios';
import newBadgeImg from '@assets/icon-new-notification.svg';
import attachFile from '@assets/icon-attach-file-gray.svg';

import leftArrow from '@assets/icon-arrow-left-black.svg';
import rightArrow from '@assets/icon-arrow-right-black.svg';
import { useNavigate } from 'react-router-dom';
import { useShowLoginModal } from '@/hooks/useShowLoginModal';
import SocialLoginModal from '@/components/Modal/SocialLoginModal';
import { useAuth } from '@/context/AuthContext';
import clsx from 'clsx';
import PrimaryButton from '@/components/Button/PrimaryButton';

interface Notice {
  announcement_id: number;
  writer_id: number;
  title: string;
  created_at: string;
  file_url: string | null;
}

interface PaginationInfo {
  page: number;
  size: number;
  total_elements: number;
  total_pages: number;
}

const PromptNoticePage = () => {
  const { user } = useAuth();
  const isAdmin = user.role === 'ADMIN';

  const [notices, setNotices] = useState<Notice[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    size: 10,
    total_elements: 0,
    total_pages: 1,
  });
  const [loading, setLoading] = useState(false);

  // API 호출 함수
  const fetchNotices = async (page: number, size: number = 10) => {
    setLoading(true);
    try {
      const base = import.meta.env.VITE_SERVER_API_URL;
      const res = await axios.get(`${base}/api/announcements`, {
        params: {
          page,
          size,
        },
      });

      console.log('notice 받은 데이터', res.data.data.data.announcements);
      console.log('페이지네이션 정보:', res.data.data.data.pagination);

      if (res.data.statusCode === 200) {
        setNotices(res.data.data.data.announcements);
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
    fetchNotices(1);
  }, []);

  // 페이지 변경 핸들러
  const handlePageChange = (newPage: number) => {
    fetchNotices(newPage, pagination.size);
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
      navigate(`/guide/notice/${id}`);
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
            <div className="mb-[56px] flex flex-col gap-[12px]">
              <h1 className="custom-h1 max-phone:text-[24px]">공지사항</h1>
              <p className="custom-h3 max-phone:text-[14px]">프롬프트 플레이스의 공지사항을 확인해보세요!</p>
            </div>

            {/* 관리자 */}
            {isAdmin && (
              <PrimaryButton
                buttonType="adminBG"
                text="작성하기"
                onClick={() => {
                  navigate('/admin/guide/notice/create');
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

          {/* 공지 리스트 */}
          <div className="flex flex-col items-center bg-white rounded-[12px] px-[12px] py-[16px] mb-[72px]">
            {!loading && notices.length > 0 && (
              <div className="w-full">
                {notices.map((notice) => (
                  <div
                    key={notice.announcement_id}
                    className="w-full bg-white py-[20px] px-[24px] flex gap-[20px] cursor-pointer max-phone:p-[16px]"
                    onClick={() => {
                      handleRowClick(notice.announcement_id);
                    }}>
                    {/* 내용 */}
                    <div className="w-full flex flex-col justify-between gap-[8px]">
                      <p className="custom-body3 text-gray400 max-phone:text-[10px]">{formatDate(notice.created_at)}</p>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          {new Date().getTime() - new Date(notice.created_at).getTime() <= 14 * 24 * 60 * 60 * 1000 && (
                            <img src={newBadgeImg} alt="NEW" className="w-[20px] h-[20px] mr-[12px]" />
                          )}
                          <p className="custom-button1 max-phone:text-[12px]">{notice.title}</p>
                        </div>

                        {notice.file_url && (
                          <div className="flex-shrink-0 flex items-center gap-[4px]">
                            <p className="text-[12px] font-medium text-gray400">첨부</p>
                            <img src={attachFile} alt="첨부 파일" className="w-[16px] h-[16px]" />
                          </div>
                        )}
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
                  className={`w-[13px] h-[13px] flex items-center justify-center ${
                    pagination.page === 1 ? 'cursor-not-allowed' : ''
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
                    page === pagination.page ? 'bg-primary-hover text-white font-medium' : 'bg-white text-background'
                  }`}>
                  {page}
                </button>
              ))}

              {/* 다음 버튼 - 페이지가 5개 이하이면 숨김 */}
              {pagination.total_pages > 5 && (
                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.total_pages}
                  className={`w-[13px] h-[13px] flex items-center justify-center ${
                    pagination.page === pagination.total_pages ? 'cursor-not-allowed' : ''
                  }`}>
                  <img src={rightArrow} alt="다음" className="w-[13px] h-[13px]" />
                </button>
              )}
            </div>
          )}

          {/* 데이터 없을 때 */}
          {!loading && notices.length === 0 && (
            <div className="flex justify-center items-center py-[100px]">
              <p className="text-[16px] text-gray-500">등록된 공지사항이 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PromptNoticePage;
