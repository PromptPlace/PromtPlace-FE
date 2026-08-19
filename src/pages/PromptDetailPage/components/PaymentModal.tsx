import { useState } from 'react';
import { Link } from 'react-router-dom';
import PromptPlaceLogo from '@assets/logo/text/text-logo-black.svg';
import xButton from '@/assets/icon-x-button.svg';
import alertIcon from '@/assets/icon-alert.svg';
import CheckIcon from '@assets/icon-terms-check.svg';
import UnCheckIcon from '@assets/icon-terms-check-white-stroke.svg';
import { usePayment } from '@/hooks/mutations/MainPage/usePostRequestPayment';

interface PaymentModalProps {
  promptId: number;
  title: string;
  price: number;
  authorNickname: string;
  onClose: () => void;
  onPaid: () => void; // 결제 성공 시 호출 (다운로드 재시도 등은 호출부에서 처리)
}

interface AgreementRowProps {
  checked: boolean;
  onToggle: () => void;
  label: string;
  action?: React.ReactNode;
}

const AgreementRow = ({ checked, onToggle, label, action }: AgreementRowProps) => (
  <div className="flex items-center gap-3">
    <button type="button" onClick={onToggle} className="flex flex-1 items-center gap-3 text-left">
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-[2px] border ${
          checked ? 'border-primary' : 'border-stone-300'
        }`}>
        <img src={checked ? CheckIcon : UnCheckIcon} alt={checked ? '동의함' : '동의 안 함'} className="w-2.5" />
      </span>
      <span className="text-sm font-light text-black">
        <span className="text-primary">(필수)</span> {label}
      </span>
    </button>
    {action}
  </div>
);

const Disclaimer = () => (
  <div className="flex w-full items-center gap-3 rounded-lg bg-stone-50 px-6 py-4">
    <img src={alertIcon} alt="" className="h-5 w-5 shrink-0" />
    <p className="text-xs font-light leading-5 text-neutral-600">
      프롬프트 플레이스는 통신판매중개자로서 거래 당사자가 아니며, 프롬프트의 내용 및 품질에 대한 책임은 제작자에게
      있습니다.
    </p>
  </div>
);

const PaymentModal = ({ promptId, title, price, authorNickname, onClose, onPaid }: PaymentModalProps) => {
  const [agreeWithdrawal, setAgreeWithdrawal] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const canPay = agreeWithdrawal && agreeTerms;

  const { handlePayment } = usePayment();

  const onClickPayment = async () => {
    if (!canPay || loading) return;
    setLoading(true);
    try {
      await handlePayment(promptId, canPay);
      onPaid();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : undefined;
      if (message !== '결제가 취소되었습니다.') {
        alert(message || '결제 처리 중 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={handleBackdropClick}>
      {/* PC 뷰 (lg 이상) */}
      <div className="relative hidden w-[898px] rounded-lg bg-white p-10 lg:block" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="absolute top-6 right-6 flex h-6 w-6 items-center justify-center">
          <img src={xButton} alt="닫기" />
        </button>

        <div className="flex flex-col items-start gap-6">
          <img src={PromptPlaceLogo} alt="프롬프트 플레이스" className="h-[49px]" />

          <div className="flex w-full items-center justify-between rounded-lg bg-stone-50 px-8 py-5">
            <div className="flex flex-col gap-2">
              <div className="text-xl font-medium text-black">{title}</div>
              <div className="flex flex-col">
                <span className="text-xs font-extralight text-zinc-600">제작자</span>
                <span className="text-sm font-medium text-black">{authorNickname}</span>
              </div>
            </div>
            <div className="text-lg font-medium text-black">{price.toLocaleString()}원</div>
          </div>

          <div className="flex w-full flex-col gap-5 rounded-lg border-[0.84px] border-stone-300 px-8 py-6">
            <AgreementRow
              checked={agreeWithdrawal}
              onToggle={() => setAgreeWithdrawal((v) => !v)}
              label="디지털 콘텐츠 특성상 열람 후 청약철회가 제한될 수 있음에 동의합니다."
            />
            <AgreementRow
              checked={agreeTerms}
              onToggle={() => setAgreeTerms((v) => !v)}
              label="이용약관 및 환불정책에 동의합니다."
              action={
                <Link
                  to="/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 text-sm text-neutral-500">
                  [보기]
                </Link>
              }
            />
          </div>

          <Disclaimer />

          <div className="flex w-full justify-end">
            <button
              type="button"
              disabled={!canPay || loading}
              onClick={onClickPayment}
              className={`h-14 w-52 rounded-lg text-xl font-semibold text-white shadow-lg ${
                canPay ? 'bg-primary' : 'bg-text-on-background'
              }`}>
              {loading ? '처리중...' : '결제하기'}
            </button>
          </div>
        </div>
      </div>

      {/* 모바일 뷰 (lg 미만) */}
      <div className="relative w-96 rounded-lg bg-white p-5 lg:hidden" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="absolute top-4 right-4 flex h-5 w-5 items-center justify-center">
          <img src={xButton} alt="닫기" />
        </button>

        <div className="flex flex-col items-start gap-4">
          <img src={PromptPlaceLogo} alt="프롬프트 플레이스" className="h-9" />

          <div className="flex w-full items-center justify-between rounded-lg bg-stone-50 px-5 py-4">
            <div className="flex flex-col gap-1.5">
              <div className="text-base font-medium text-black leading-6">{title}</div>
              <div className="flex flex-col">
                <span className="text-xs font-extralight text-zinc-600">제작자</span>
                <span className="text-sm font-medium text-black">{authorNickname}</span>
              </div>
            </div>
            <div className="text-base font-medium text-black">{price.toLocaleString()}원</div>
          </div>

          <div className="flex w-full flex-col gap-4 rounded-lg border-[0.84px] border-stone-300 px-5 py-5">
            <AgreementRow
              checked={agreeWithdrawal}
              onToggle={() => setAgreeWithdrawal((v) => !v)}
              label="디지털 콘텐츠 특성상 열람 후 청약철회가 제한될 수 있음에 동의합니다."
            />
            <AgreementRow
              checked={agreeTerms}
              onToggle={() => setAgreeTerms((v) => !v)}
              label="이용약관 및 환불정책에 동의합니다."
              action={
                <Link
                  to="/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 text-sm text-neutral-500">
                  [보기]
                </Link>
              }
            />
          </div>

          <Disclaimer />

          <div className="flex w-full justify-center">
            <button
              type="button"
              disabled={!canPay || loading}
              onClick={onClickPayment}
              className={`h-14 w-52 rounded-lg text-xl font-semibold text-white shadow-lg ${
                canPay ? 'bg-primary' : 'bg-text-on-background'
              }`}>
              {loading ? '처리중...' : '결제하기'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
