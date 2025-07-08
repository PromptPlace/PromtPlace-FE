/**
 * TODO:
 * - type에 따라 TIP/공지사항 렌더링 분기 처리 필요
 * @author 김진효
 * - 게시글 본문에 markdown 적용 필요
 * - 게시글 본문에 스크롤바 ui 적용 필요
 * (tailwind.config.js 설정해야 함)
 * @author luii
 * **/

import { useState } from 'react';
import { BsPaperclip } from 'react-icons/bs';
import { LuChevronLeft } from 'react-icons/lu';
import { useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import url from './img/linkhub logo.svg';
import instagram from './img/instagram.svg';
import facebook from './img/Facebook.svg';
import kakaotalk from './img/kakao_talk.svg';
import twitter from './img/Frame 298.svg';

interface PromptGuideDetailPageProps {
  type: 'tip' | 'notice';
}
// 게시글 타입
interface Post {
  id: number;
  title: string;
  content: string;
  is_pinned: boolean;
  create_at: string;
  update_at: string;
  is_visible: boolean;
  file_url: string | null;
  view_count: number;
}
const PromptGuideDetailPage = ({ type }: PromptGuideDetailPageProps) => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post>({
    id: Number(id),
    title: '프롬프트 업로드 정책',
    content: `PromptPlace 프롬프트 업로드 정책은 사용자 간의 신뢰를 기반으로 한
건강한 거래 환경 조성을 목표로 합니다.
모든 창작자는 업로드하는 프롬프트가 본인의 창작물임을 보장해야 하며,
타인의 지적재산권을 침해하거나 무단 복제된 콘텐츠는 업로드할 수 없습니다.
또한 프롬프트의 설명은 실제 기능 및 결과와 일치해야 하며,
과장되거나 오해를 유발하는 표현은 금지됩니다.
불쾌하거나 부적절한 내용(혐오, 차별, 음란성, 정치적 선동 등)이 포함된 프롬프트는
삭제될 수 있으며, 반복적으로 위반 시 계정 제재가 이루어질 수 있습니다.
판매를 목적으로 등록하는 프롬프트는 실사용 가능성을 갖추고 있어야 하며,
충분한 예시와 맥락 제공을 권장합니다.
프롬프트 등록 시에는 구매자가 내용을 충분히 이해하고 판단할 수 있도록
명확하고 구체적인 설명을 제공해야 하며,
AI가 해당 프롬프트를 정상적으로 처리할 수 있도록 구성되어야 합니다.
관리자는 업로드된 프롬프트의 품질과 정책 위반 여부를 상시 모니터링하며,
 신고 접수된 콘텐츠에 대해서는 내부 검토를 거쳐 조치를 취할 수 있습니다.

`,
    is_pinned: true,
    create_at: '2025-07-01',
    update_at: '2025-07-01,',
    is_visible: true,
    file_url: 'a',
    view_count: 1,
  });

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/guide/${type}`);
  };

  return (
    <div className=" min-h-screen bg-[#F5F5F5] flex justify-center items-center">
      <div className="w-[994px] h-[750px] bg-[var(--color-white)] rounded-t-[16px] rounded-b-[16px]">
        <div className="w-[994px] mh-[105px]  pt-[55px] pl-[20px] pr-[10px]">
          <div className="w-[187px] h-[50px] flex items-center gap-[10px] p-[10px]" onClick={handleNavigate}>
            <LuChevronLeft size={24} />
            <span className="text-[var(--color-text-on-white)] font-bold text-[24px] ">{`${type === 'tip' ? '프롬프트 TIP' : '공지사항'}`}</span>
          </div>
        </div>

        <div className="w-[994px] h-[135px] border-b-[1px] border-[var(--color-white-stroke)] px-[65px]">
          <h1 className="font-bold text-[32px] text-[var(--color-text-on-white)] pt-[30px]">{post.title}</h1>
          <p className="font-medium text-[20px] text-[var(--color-text-on-background)] pt-[10px] pb-[30px]">
            {post.create_at}
          </p>
        </div>

        <div className="w-[994px] h-[385px] flex justify-center overflow-y-auto prose prose-neutral max-w-none text-base">
          <div className="w-[864px] border-b-[1px] border-[var(--color-white-stroke)] font-medium text-[20px] text-[var(--color-text-on-white)] py-[30px]">
            {post.content}
          </div>
          {/**추후 다시 markdown 적용해보기... */}
        </div>

        {/**하단 */}
        <div className="w-[994px] h-[125px]  flex justify-center">
          <div className="w-[864px] h-[45px] flex justify-between mt-[33px] mb-[47px]">
            {typeof post.file_url === 'string' && post.file_url.trim() !== '' ? (
              <button className="w-[116px] h-[45px] flex justify-center gap-[2px] items-center rounded-lg border-[1px] border-[var(--color-primary)] bg-[var(--color-white)] text-[var(--color-primary)]">
                <BsPaperclip className="mr-2" size={20} />
                <p className="font-medium text-[var(--color-primary)] text-[20px]">첨부</p>
              </button>
            ) : (
              <div className="w-[116px] h-[45px]">{/* file_url이 null, undefined, ""일 때만 보여줌 */}</div>
            )}

            <div className="w-[240px] flex justify-between items-center">
              <img src={url} alt="url" />
              <img src={instagram} alt="instagram" />
              <img src={facebook} alt="facebook" />
              <img src={kakaotalk} alt="kakaotalk" />
              <img src={twitter} alt="twitter" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptGuideDetailPage;
