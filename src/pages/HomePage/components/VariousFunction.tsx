import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

type GuideType = 'tip' | 'notice';

interface Post {
  id: number;
  title: string;
  createdAt: string;
  rawDate: string;
}

interface TipItemRaw {
  tip_id: number;
  writer_id: number;
  title: string;
  created_at: string;
  file_url: string | null;
}

interface AnnouncementItemRaw {
  announcement_id: number;
  writer_id: number;
  title: string;
  created_at: string;
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

const mapTips = (items: TipItemRaw[]): Post[] =>
  items
    .slice()
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 4)
    .map((it) => ({
      id: it.tip_id,
      title: it.title,
      createdAt: formatDate(it.created_at),
      rawDate: it.created_at,
    }));

const mapNotices = (items: AnnouncementItemRaw[]): Post[] =>
  items
    .slice()
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 4)
    .map((it) => ({
      id: it.announcement_id,
      title: it.title,
      createdAt: formatDate(it.created_at),
      rawDate: it.created_at,
    }));

const VariousFunction = () => {
  const navigate = useNavigate();
  const [tips, setTips] = useState<Post[]>([]);
  const [notices, setNotices] = useState<Post[]>([]);

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
        setTips(mapTips(tipList));
        setNotices(mapNotices(noticeList));
      })
      .catch((e) => {
        console.error('가이드 섹션 불러오기 실패:', e);
      });
  }, []);

  const onClickItem = (type: GuideType, id: number) => {
    navigate(`/guide/${type}/${id}`, { state: { type } });
  };

  const isNewPost = (rawDate: string) => {
    const diff = Date.now() - new Date(rawDate).getTime();
    return diff < 1000 * 60 * 60 * 24;
  };

  return (
    <div className="w-full bg-white px-[102px] pt-[64px]">
      <div className="w-full max-w-[1440px] mx-auto">
        <h2 className="text-[24px] font-medium text-[#1F2937] mb-[28px]">프롬프트 플레이스의 다양한 기능</h2>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_478px] gap-[32px] items-start">
          {/* 왼쪽: AI 꿀팁 */}
          <section className="bg-[#F3F4F6] rounded-[12px] p-[40px] text-left w-full">
            <h3 className="text-[32px] max-lg:text-[24px] max-phone:text-[20px] font-medium mb-1">AI 꿀팁</h3>
            <p className="text-[16px] font-light max-lg:text-[14px] max-phone:text-[12px] text-[#030712] mb-4">
              각종 AI, 프롬프트 작성 꿀팁을 확인하세요!
            </p>

            <button
              type="button"
              onClick={() => navigate('/guide/tip')}
              className="flex items-center bg-[#FFFEFB] gap-2 text-sm text-[#030712] border border-[#E5E7EB] rounded-full px-4 py-2 hover:bg-gray-100 transition">
              바로가기 <span>→</span>
            </button>

            <div className="mt-4 bg-white rounded-[12px] py-4 px-6 text-sm">
              {tips.length === 0 ? (
                <p className="text-[#9CA3AF] text-[12px] font-light">게시글이 없습니다.</p>
              ) : (
                <ul className="space-y-3">
                  {tips.map((p) => (
                    <li key={p.id} className="cursor-pointer" onClick={() => onClickItem('tip', p.id)}>
                      <p className="text-[#9CA3AF] text-[12px] font-light">{p.createdAt}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {isNewPost(p.rawDate) && (
                          <span className="w-5 h-5 bg-[#F87171] text-[#FFFEFB] text-[12px] font-medium rounded-full flex items-center justify-center">
                            N
                          </span>
                        )}
                        <p className="font-medium text-[14px] hover:underline mt-1">{p.title}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>

          {/* 오른쪽: 공지사항 */}
          <section className="bg-[#F3F4F6] rounded-[12px] p-[40px] text-left w-full">
            <h3 className="text-[32px] max-lg:text-[24px] max-phone:text-[20px] font-medium mb-1">공지사항</h3>
            <p className="text-[16px] font-light max-lg:text-[14px] max-phone:text-[12px] text-[#030712] mb-4">
              프롬프트 플레이스의 공지사항을 확인해보세요!
            </p>

            <button
              type="button"
              onClick={() => navigate('/guide/notice')}
              className="flex items-center gap-2 text-sm text-[#030712] bg-[#FFFEFB] border border-[#E5E7EB] rounded-full px-4 py-2 hover:bg-gray-100 transition">
              바로가기 <span>→</span>
            </button>

            <div className="mt-4 bg-white p-4 rounded-[12px] text-sm">
              {notices.length === 0 ? (
                <p className="text-[#9CA3AF] text-[12px] font-light">게시글이 없습니다.</p>
              ) : (
                <ul className="space-y-3">
                  {notices.map((p) => (
                    <li key={p.id} className="cursor-pointer" onClick={() => onClickItem('notice', p.id)}>
                      <p className="text-[#9CA3AF] text-[12px] font-light">{p.createdAt}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {isNewPost(p.rawDate) && (
                          <span className="w-5 h-5 bg-[#F87171] text-[#FFFEFB] text-[12px] font-medium rounded-full flex items-center justify-center">
                            N
                          </span>
                        )}
                        <p className="font-medium text-[14px] hover:underline mt-1">{p.title}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default VariousFunction;
