/**
 * TODO:
 * - type에 따라 TIP/공지사항 렌더링 분기 처리 필요
 *
 * @author 김진효
 * **/

import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagination, PromptTableList } from './components/Pagination';
import { LuChevronDown } from 'react-icons/lu';
import MobileList from './components/MobileList';
import axios from 'axios';

import { useShowLoginModal } from '@/hooks/useShowLoginModal';
import SocialLoginModal from '@/components/Modal/SocialLoginModal';

/**
 * Memo
 * 1. url : guide/tip, guide/notice
 * 2. 현재 데이터를 더미데이터로 사용하는 중임
 * 3. 1023 이하일때는 스크롤에 Throttle 처리 필요
 */

interface PromptGuidePageProps {
  type: 'tip' | 'notice';
}
interface Post {
  post_id: number;
  writer_id: number;
  title: string;
  created_at: string;
  file_url: null | string;
}

const PromptGuidePage = ({ type }: PromptGuidePageProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const navigate = useNavigate();

  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [allNotice, setAllNotice] = useState<Post[]>([]);

  const { loginModalShow, setLoginModalShow, handleShowLoginModal } = useShowLoginModal();

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        if (type === 'tip') {
          const base = import.meta.env.VITE_SERVER_API_URL;
          const res = await axios.get(`${base}/api/tips`, {
            params: {
              page: 1,
              size: 50,
            },
          });

          console.log('tip 받은 데이터', res.data.data.data.tips);

          const mapped: Post[] = res.data.data.data.tips.map((item: any) => ({
            post_id: item.tip_id,
            writer_id: item.writer_id,
            title: item.title,
            created_at: item.created_at.slice(0, 10).replace(/-/g, '.'),
            file_url: item.file_url,
          }));

          setAllPosts(mapped);
        } else if (type === 'notice') {
          const base = import.meta.env.VITE_SERVER_API_URL;
          const res = await axios.get(`${base}/api/announcements`, {
            params: {
              page: 1,
              size: 50,
            },
          });

          console.log('notice 받은 데이터', res.data.data.data.announcements);

          const mapped: Post[] = res.data.data.data.announcements.map((item: any) => ({
            post_id: item.announcement_id,
            writer_id: item.writer_id,
            title: item.title,
            created_at: item.created_at.slice(0, 10).replace(/-/g, '.'),
            file_url: item.file_url,
          }));

          setAllNotice(mapped);
        }
      } catch (error) {
        console.error(`${type === 'tip' ? 'TIP' : '공지'} 불러오기 실패:`, error);
      }
    };

    fetchAllPosts();
  }, [type]);

  console.log(allPosts);
  // 페이지 값 계산
  const PAGE_SIZE = 5;
  const TOTAL_Tip_PAGES = Math.ceil(allPosts.length / PAGE_SIZE);
  const TOTAL_Notice_PAGES = Math.ceil(allNotice.length / PAGE_SIZE);

  //팁 <> 공지사항 전환
  const handleTypeChange = (nextType: 'tip' | 'notice') => {
    if (nextType !== type) {
      setCurrentPage(1);
      navigate(`/guide/${nextType}`);
    }
  };

  // 페이지별 데이터 슬라이싱
  const pageTipData = allPosts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const pageNoticeData = allNotice.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  // 페이지네이션에서 페이지 변경시
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 게시글 클릭시 상세로 이동
  const handleRowClick = (id: number) => {
    handleShowLoginModal(() => {
      navigate(`/guide/${type}/${id}`, { state: { type } });
    });
  };

  // 모바일 화면 관련
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // 바깥 클릭시 닫히게
  // useEffect(() => {
  //   function handleClickOutside(event: MouseEvent) {
  //     if (ref.current && !ref.current.contains(event.target as Node)) {
  //       setOpen(false);
  //     }
  //   }
  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => document.removeEventListener('mousedown', handleClickOutside);
  // }, []);

  return (
    <>
      {/** 소셜 로그인 트리거  */}
      {loginModalShow && (
        <SocialLoginModal isOpen={loginModalShow} onClose={() => setLoginModalShow(false)} onClick={() => {}} />
      )}
      <div className="hidden lg:block">
        <div className="flex justify-center pt-[92px] mx-[102px]">
          <div className="w-full max-w-[1236px] justify-start ml-[20px]">
            <div className="flex justify-between items-center w-full max-w-[360px] h-[60px]">
              <button
                onClick={() => handleTypeChange('tip')}
                className={`${
                  type === 'tip'
                    ? 'text-primary-hover font-bold text-[32px] border-r-[2px] border-r-primary-hover'
                    : 'text-text-on-background font-bold text-[24px]'
                } pt-[10px] pb-[10px] pr-[40px]`}>
                프롬프트 TIP
              </button>

              <button
                onClick={() => handleTypeChange('notice')}
                className={`${
                  type === 'notice'
                    ? 'text-primary-hover font-bold text-[32px] border-l-[2px] border-l-primary-hover'
                    : 'text-text-on-background font-bold text-[24px]'
                } pt-[10px] pb-[10px] pl-[40px]`}>
                공지사항
              </button>
            </div>
          </div>
        </div>
        <div>
          <PromptTableList data={type === 'tip' ? pageTipData : pageNoticeData} onRowClick={handleRowClick} />
          <Pagination
            currentPage={currentPage}
            totalPages={type === 'tip' ? TOTAL_Tip_PAGES : TOTAL_Notice_PAGES}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      {/*모바일 화면 */}
      <div className="lg:hidden block">
        <div className="ml-[20px] pt-[12px]">
          <p className="text-primary-hover text-[20px] font-bold">프롬프트 TIP</p>
        </div>
        <div className="relative inline-block w-full max-w-[108px] h-[31px] mt-[20px] ml-[20px]" ref={ref}>
          <button
            type="button"
            className="flex items-center justify-center gap-[8px] w-full px-[12px] py-[8px] rounded-[8px] bg-white"
            style={{ boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.08)' }}
            onClick={() => setOpen((prev) => !prev)}>
            <span className="text-[12px] text-text-on-white font-medium">
              {type === 'tip' ? '프롬프트 TIP' : '공지사항'}
            </span>
            <LuChevronDown size={10} />
          </button>

          {/*드롭다운 */}
          {open && (
            <ul
              className="absolute left-0 z-10 w-[111px] h-[66px] mt-[6px] flex flex-col justify-center items-center
               bg-white border-[0.5px] border-white-stroke rounded-[8px]"
              style={{ boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.08)' }}>
              <li
                className="w-[87px] h-[27px] flex justify-center items-center border-b-[0.5px] border-white-stroke"
                onClick={() => {
                  navigate(`/guide/tip`);
                  setOpen(false);
                }}>
                <p
                  className={`text-[12px] font-normal ${type === 'tip' ? 'text-text-on-white' : 'text-text-on-background'}`}>
                  프롬프트 TIP
                </p>
              </li>
              <li
                className="w-[87px] h-[27px] flex justify-center items-center "
                onClick={() => {
                  navigate(`/guide/notice`);
                  setOpen(false);
                }}>
                <p
                  className={`text-[12px] font-normal ${type === 'notice' ? 'text-text-on-white' : 'text-text-on-background'}`}>
                  공지사항
                </p>
              </li>
            </ul>
          )}
        </div>
        <div className="flex justify-center">
          <MobileList data={type === 'tip' ? pageTipData : pageNoticeData} onRowClick={handleRowClick} />
        </div>
      </div>
    </>
  );
};

export default PromptGuidePage;
