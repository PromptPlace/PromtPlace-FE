import useMediaQuery from '@/hooks/queries/PromptDetailPage/useMediaQuery';
import FacebookIcon from '../assets/facebook-logo.svg';
import KakaoIcon from '../assets/kakaotalk-logo.svg';
import LinkIcon from '../assets/link-logo.svg';
import XIcon from '@assets/icon-x-logo.svg';
import CloseIcon from '@assets/icon-close.svg';

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
  const iconSize = isMobile ? 'w-[40px] h-[40px]' : 'w-[48px] h-[48px]';
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
          <h2 className="font-medium text-[18px] text-[#111827]">공유</h2>
          <button
            onClick={onClose}
            aria-label="닫기"
            className="w-[13.5px] h-[13.5px] flex items-center justify-center transition-opacity">
            <img src={CloseIcon} alt="닫기" className="w-[14px] h-[14px]" />
          </button>
        </div>

        {/* 아이콘 4열 가로 배열 */}
        <div className="flex justify-between items-start">
          {items.map(({ label, icon, onClick }) => (
            <button key={label} className="flex flex-col items-center gap-[10px]" onClick={onClick}>
              {/* 둥근 사각형 버튼, 흰 배경 + 테두리 */}
              <div
                className={`${btnSize} rounded-[16px] bg-white border border-[#D1D5DB] flex items-center justify-center hover:border-[#6198FF] transition-colors`}>
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
