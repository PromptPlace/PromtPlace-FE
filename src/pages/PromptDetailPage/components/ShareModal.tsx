import useMediaQuery from '@/hooks/queries/PromptDetailPage/useMediaQuery';
import FacebookIcon from '../assets/facebook-logo.svg';
import KakaoIcon from '../assets/kakaotalk-logo.svg';
import LinkIcon from '../assets/link-logo.svg';
import XIcon from '@assets/icon-x-logo.svg';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const ShareModal = ({ isOpen, onClose, title }: ShareModalProps) => {
  const isMobile = useMediaQuery('(max-width: 1024px)');

  if (!isOpen) return null;

  const currentUrl = window.location.href;

  const handleFacebookShare = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
      '_blank',
      'width=600,height=400',
    );
    onClose();
  };

  const handleXShare = () => {
    const text = encodeURIComponent(`${title} - PromptPlace`);
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(currentUrl)}`,
      '_blank',
      'width=600,height=400',
    );
    onClose();
  };

  const handleKakaoShare = () => {
    if (!window.Kakao) {
      alert('카카오 SDK를 불러오지 못했습니다.');
      return;
    }
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title,
        description: 'PromptPlace에서 확인해보세요!',
        imageUrl: 'https://promptplace.co.kr/favicon-96x96.png',
        link: { mobileWebUrl: currentUrl, webUrl: currentUrl },
      },
      buttons: [
        {
          title: '프롬프트 보러가기',
          link: { mobileWebUrl: currentUrl, webUrl: currentUrl },
        },
      ],
    });
    onClose();
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      alert('링크가 복사되었습니다!');
    } catch {
      alert('복사에 실패했습니다.');
    }
    onClose();
  };

  // 데스크탑: 버튼 64×64 / 모바일: 56×56
  const btnSize = isMobile ? 'w-[56px] h-[56px]' : 'w-[64px] h-[64px]';
  // 아이콘은 버튼보다 살짝 작게 (여백감 유지)
  const iconSize = isMobile ? 'w-[36px] h-[36px]' : 'w-[44px] h-[44px]';
  const labelSize = isMobile ? 'text-[10px]' : 'text-[12px]';

  const items = [
    { label: 'Facebook', icon: FacebookIcon, onClick: handleFacebookShare },
    { label: '카카오톡', icon: KakaoIcon, onClick: handleKakaoShare },
    { label: 'X', icon: XIcon, onClick: handleXShare },
    { label: '링크복사', icon: LinkIcon, onClick: handleCopyLink },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div
        className="bg-white rounded-[20px] shadow-2xl"
        style={{ width: isMobile ? '320px' : '420px', padding: isMobile ? '24px' : '28px 32px' }}
        onClick={(e) => e.stopPropagation()}>
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-[18px] text-[#111827]">공유</h2>
          <button
            onClick={onClose}
            aria-label="닫기"
            className="w-[28px] h-[28px] flex items-center justify-center text-[#6B7280] hover:text-[#111827] transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="5" y1="5" x2="19" y2="19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              <line x1="19" y1="5" x2="5" y2="19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* 아이콘 4열 가로 배열 */}
        <div className="flex justify-between items-start">
          {items.map(({ label, icon, onClick }) => (
            <button key={label} className="flex flex-col items-center gap-[10px]" onClick={onClick}>
              {/* 둥근 사각형 버튼, 흰 배경 + 테두리 */}
              <div
                className={`${btnSize} rounded-[16px] bg-white border border-[#E5E7EB] flex items-center justify-center shadow-sm hover:border-[#6198FF] transition-colors`}>
                <img src={icon} alt={label} className={`${iconSize} object-contain`} />
              </div>
              <span className={`${labelSize} text-[#374151] whitespace-nowrap font-medium`}>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
