import GoogleIcon from '@/assets/icon-google-logo.svg';
import KakaoIcon from '@/assets/icon-kakao-logo.svg';
import NaverIcon from '@/assets/icon-naver-logo.svg';


interface InfoRowProps {
    label: string;
    value?: string;
    email?: string;
    provider?: 'google' | 'kakao' | 'naver';
    hasArrow?: boolean;
    actionText?: string;
    onAction?: () => void;
    isDestructive?: boolean;
  }
  
  const InfoRow: React.FC<InfoRowProps> = ({ label, value, email, provider, hasArrow, actionText, onAction, isDestructive }) => {
    
    // provider에 따라 아이콘 경로를 결정하는 로직 (예시)
    const providerIcon = provider ? `/icons/${provider}-icon.svg` : '';
  
    return (
      <div className="flex justify-between items-center py-5 border-b border-gray-200">
        <span className="text-lg font-medium">{label}</span>
        
        {/* 값, 이메일, 버튼 중 하나를 조건부로 렌더링 */}
        {value && <span className="text-gray-700">{value}</span>}
        
        {email && (
          <div className="flex items-center gap-2 text-gray-700">
            <img src={providerIcon} alt={provider} className="w-5 h-5" />
            <span>{email}</span>
            {hasArrow && <span>{'>'}</span>}
          </div>
        )}
  
        {actionText && (
          <button
            onClick={onAction}
            className={`border rounded-md px-4 py-1 ${
              isDestructive ? 'border-red-500 text-red-500' : 'border-gray-300 text-gray-700'
            }`}
          >
            {actionText}
          </button>
        )}
      </div>
    );
  };
  
  export default InfoRow;