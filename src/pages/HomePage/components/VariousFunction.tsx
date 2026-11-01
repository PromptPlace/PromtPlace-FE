import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useAuth } from '@/context/AuthContext';
import SocialLoginModal from '@components/Modal/SocialLoginModal';

type GuideType = 'tip' | 'notice';

interface Post {
  id: number;
  title: string;
  createdAt: string;
  rawDate: string;
}

interface PostItemRaw {
  title: string;
  created_at: string;
}

interface TipItemRaw extends PostItemRaw {
  tip_id: number;
  writer_id: number;
  file_url: string | null;
}

interface AnnouncementItemRaw extends PostItemRaw {
  announcement_id: number;
  writer_id: number;
  file_url: string | null;
}

interface TipsResponse {
  tips: TipItemRaw[];
}

interface AnnouncementsResponse {
  announcements: AnnouncementItemRaw[];
}

interface DeepData<T> {
  data: { data: T };
}

const formatDate = (iso: string) => iso.slice(0, 10).replace(/-/g, '.') + '.'; // 2025.10.18.

const mapPosts = <T extends PostItemRaw>(items: T[], getId: (item: T) => number): Post[] =>
  items
    .slice()
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 4)
    .map((it) => ({
      id: getId(it),
      title: it.title,
      createdAt: formatDate(it.created_at),
      rawDate: it.created_at,
    }));

const isNewPost = (rawDate: string) => {
  const diff = Date.now() - new Date(rawDate).getTime();
  const fourteenDays = 1000 * 60 * 60 * 24 * 14;
  return diff < fourteenDays;
};

interface GuideSectionProps {
  title: string;
  description: string;
  type: GuideType;
  posts: Post[];
  onClickItem: (type: GuideType, id: number) => void;
  onClickMore: (type: GuideType) => void;
}

const GuideSection = ({ title, description, type, posts, onClickItem, onClickMore }: GuideSectionProps) => (
  <section className="p-10 max-lg:p-8 max-phone:p-5 text-left w-full h-full flex flex-col gap-6 max-phone:gap-4">
    <div className="flex flex-col gap-2">
      <h3 className="custom-h1 max-lg:custom-h2 max-phone:custom-h4">{title}</h3>
      <p className="custom-label1 max-phone:custom-label2">{description}</p>
    </div>

    <div className="bg-background-subtle rounded-xl px-5 py-1.5">
      {posts.length === 0 ? (
        <p className="text-[#9CA3AF] text-[12px] font-light">게시글이 없습니다.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li
              key={post.id}
              className="cursor-pointer flex flex-col gap-2 pl-2 py-3"
              onClick={() => onClickItem(type, post.id)}>
              <p className="custom-body3 text-text-muted">{post.createdAt}</p>
              <div className="flex items-center gap-3">
                {isNewPost(post.rawDate) && (
                  <span className="size-5 bg-alert text-text-on-primary custom-button3 rounded-full flex items-center justify-center shrink-0">
                    N
                  </span>
                )}
                <p className="custom-button1">{post.title}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>

    <button
      onClick={() => onClickMore(type)}
      className="py-3 rounded-md border border-white-stroke custom-button1 text-text-on-white">
      더보기
    </button>
  </section>
);

const VariousFunction = () => {
  const navigate = useNavigate();
  const [tips, setTips] = useState<Post[]>([]);
  const [notices, setNotices] = useState<Post[]>([]);

  const { accessToken } = useAuth();
  const [loginModalShow, setLoginModalShow] = useState(false);

  useEffect(() => {
    const base = import.meta.env.VITE_SERVER_API_URL as string;

    const fetchTips = axios.get<DeepData<TipsResponse>>(`${base}/api/tips`, {
      params: { page: 1, size: 50 },
    });

    const fetchNotices = axios.get<DeepData<AnnouncementsResponse>>(`${base}/api/announcements`, {
      params: { page: 1, size: 50 },
    });

    Promise.all([fetchTips, fetchNotices])
      .then(([tipRes, noticeRes]) => {
        const tipList = tipRes.data.data.data.tips;
        const noticeList = noticeRes.data.data.data.announcements;
        setTips(mapPosts(tipList, (item) => item.tip_id));
        setNotices(mapPosts(noticeList, (item) => item.announcement_id));
      })
      .catch((e) => {
        console.error('가이드 섹션 불러오기 실패:', e);
      });
  }, []);

  const onClickItem = (type: GuideType, id: number) => {
    if (!accessToken) {
      setLoginModalShow(true);
      return;
    }

    navigate(`/guide/${type}/${id}`, { state: { type } });
  };

  return (
    <>
      <div className="w-full bg-white px-[102px] pt-12 max-phone:pt-8 max-lg:px-10 max-phone:px-5 pb-24 max-phone:pb-16">
        <div className="w-full max-w-[1440px] mx-auto">
          <h2 className="custom-h2 mb-10 max-lg:mb-8 max-phone:mb-6">프롬프트 플레이스의 다양한 기능</h2>

          <div className="flex max-lg:flex-col gap-5 max-phone:gap-3 items-start">
            <GuideSection
              title="공지사항"
              description="프롬프트 플레이스의 공지사항을 확인해보세요!"
              type="notice"
              posts={notices}
              onClickItem={onClickItem}
              onClickMore={(type) => navigate(`/guide/${type}`)}
            />
            <GuideSection
              title="AI 꿀팁"
              description="각종 AI, 프롬프트 작성 꿀팁을 확인하세요!"
              type="tip"
              posts={tips}
              onClickItem={onClickItem}
              onClickMore={(type) => navigate(`/guide/${type}`)}
            />
          </div>
        </div>
      </div>

      {loginModalShow && (
        <SocialLoginModal isOpen={loginModalShow} onClose={() => setLoginModalShow(false)} onClick={() => {}} />
      )}
    </>
  );
};

export default VariousFunction;
