import IconButton from '@components/Button/IconButton';
import GradientButton from '@components/Button/GradientButton';
import CloseIcon from '@assets/icon-close.svg';
import { useMemo, useState } from 'react';
import KakaoPayIcon from '../assets/kakaopay.svg';
import TossPayIcon from '../assets/tosspay.svg';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/hooks/queries/MyPage/useGetPrompts';
import { getPromptDownload } from '@/apis/PromptDetailPage/promptDownload';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;

  title: string;
  content: string;
  price: number;

  isFree: boolean;
  isPaid: boolean;

  onPaid: () => void;
}

const DownloadModal = ({ isOpen, onClose, title, content, price, isFree, isPaid, onPaid }: DownloadModalProps) => {
  const isDesktop = useMemo(() => typeof window !== 'undefined' && window.innerWidth >= 1024, []);
  const qc = useQueryClient();

  const [step, setStep] = useState<'init' | 'copied' | 'paid'>('init');

  if (!isOpen) return null;

  const handleCopy = async () => {
    const textToCopy = content; // 서버에서 받아온 최신 content가 부모에서 내려옴

    // 1) 복사
    try {
      await navigator.clipboard.writeText(textToCopy);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = textToCopy;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }

    // 2) 목록 갱신 (무효화 + 강제 재조회)
    try {
      await qc.invalidateQueries({ queryKey: QUERY_KEY.downloadedPrompts });
      await qc.refetchQueries({ queryKey: QUERY_KEY.downloadedPrompts });
    } catch (e) {
      console.error('다운로드 목록 갱신 실패:', e);
    }

    // 3) UX
    if (isDesktop || isFree || isPaid) {
      alert('복사되었습니다!');
      onClose();
      return;
    }
    setStep('copied');
  };
  const handlePay = () => {
    setStep('paid');
    onPaid();
  };

  const hideTitle = step === 'paid' && !isDesktop;

  return (
    <div className="bg-overlay fixed inset-0 z-50 flex items-center justify-center bg-opacity-40">
      <div
        className={`
     relative bg-white rounded-[16px] shadow-lg overflow-y-auto text-[#121212]
    w-full max-w-[1056px] h-auto max-h-[90vh]
    px-[64px] py-[48px]
    max-lg:w-[90vw] max-lg:max-w-[480px] max-lg:px-[24px] max-lg:py-[28px]

          ${step === 'paid' ? 'max-lg:h-[100px]' : 'max-lg:h-[334px]'}
        `}>
        {/* 닫기 */}
        <button
          onClick={onClose}
          className="lg:block hidden absolute top-[20px] right-[20px] w-[24px] h-[24px] hover:opacity-60">
          <img src={CloseIcon} alt="닫기" className="w-full h-full object-contain" />
        </button>
        <button
          onClick={onClose}
          className="lg:hidden absolute top-[20px] right-[20px] max-lg:w-[10px] max-lg:h-[10px] hover:opacity-60 max-lg:top-[12px] max-lg:right-[12px]">
          <img src={CloseIcon} alt="닫기" className="w-full h-full object-contain" />
        </button>

        {!hideTitle || window.innerWidth >= 1024 ? (
          <>
            <h2 className="text-[32px] font-bold mb-[32px] max-lg:text-[16px] max-lg:mb-[12px]">{title}</h2>
            <div className="h-[1px] bg-[#CCCCCC] w-full mb-[30px] max-lg:mb-[16px]" />
          </>
        ) : null}

        {/* 데스크탑 본문 */}
        <div className="block max-lg:hidden">
          <div className="flex justify-end ml-[790px]">
            <IconButton buttonType="squareMini" style="fill" imgType="copy" text="복사하기" onClick={handleCopy} />
          </div>
          <div className="text-[20px] pt-[40px] font-medium whitespace-pre-wrap leading-relaxed">{content}</div>
        </div>

        {/* 모바일 */}
        <div className="hidden max-lg:block text-[14px] text-[#121212]">
          {step === 'init' && (
            <>
              <div className="flex justify-end">
                <IconButton buttonType="squareMini" style="fill" imgType="copy" text="복사하기" onClick={handleCopy} />
              </div>
              <div className="text-[10px] whitespace-pre-wrap leading-relaxed mb-[16px]">{content}</div>
            </>
          )}

          {step === 'copied' && (
            <>
              <p className="w-full text-left text-[16px] font-medium mb-[20px]">{price.toLocaleString()}원</p>
              <div className="flex flex-col items-center w-[240px] gap-[20px] mb-[20px]">
                <button className="w-[206px] h-[36px] rounded-full border border-[#ccc] text-[12px] font-medium flex items-center justify-center gap-[24px] focus:border-primary">
                  <img src={KakaoPayIcon} alt="카카오페이" className="w-[32px] h-[13px]" />
                  카카오페이로 결제하기
                </button>
                <button className="w-[206px] h-[36px] rounded-full border border-[#ccc] text-[12px] font-medium flex items-center justify-center gap-[24px] focus:border-primary">
                  <img src={TossPayIcon} alt="토스페이" className="w-[32px] h-[10px]" />
                  토스페이로 결제하기
                </button>
              </div>
              <div className="flex justify-end pt-[4px]">
                <GradientButton buttonType="textButton" text="결제하기" onClick={handlePay} />
              </div>
            </>
          )}

          {step === 'paid' && (
            <div className="lg:hidden flex flex-col items-center justify-center h-full text-center">
              <p className="text-[12px] font-bold mb-[12px]">결제가 완료되었습니다.</p>
              <IconButton buttonType="round" style="fill" imgType="none" text="프롬프트 보기" onClick={onClose} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DownloadModal;
