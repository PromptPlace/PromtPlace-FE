import CloseIcon from '@assets/icon-close.svg';
import type { SellerRegistrationModalFrameProps } from '@/types/MyPage/settlement';

const SellerRegistrationModalFrame = ({
  isOpen,
  title,
  description,
  onClose,
  actionLabel,
  onAction,
  customContent,
}: SellerRegistrationModalFrameProps) => {
  if (!isOpen) {
    return null;
  }

  const handleAction = () => {
    onAction?.();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center px-[24px] max-phone:px-[20px]">
      <div className="absolute inset-0 bg-overlay" onClick={onClose} />

      <div className="relative w-full max-w-[944px] rounded-[16px] bg-white pb-[24px] pt-[40px] px-[24px] shadow-gradient">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-[20px] top-[20px] flex size-[13px] max-phone:size-[8.7px] items-center justify-center"
          aria-label="모달 닫기">
          <img src={CloseIcon} alt="닫기" className="h-full w-full object-contain" />
        </button>

        {customContent ? (
          <div className="flex justify-center">{customContent}</div>
        ) : (
          <>
            <div
              className={`flex flex-col items-center text-center text-text-on-white ${
                description ? 'gap-[12px]' : ''
              }`}>
              <p className="custom-h2 max-phone:!text-[20px]">{title}</p>
              {description && <p className="custom-body1 max-phone:!text-[14px]">{description}</p>}
            </div>

            {actionLabel && (
              <div className="mt-[20px] flex justify-center">
                <button
                  type="button"
                  onClick={handleAction}
                  className="h-[54px] rounded-[12px] bg-primary px-[20px] py-[16px] custom-h5 text-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.08)]">
                  {actionLabel}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SellerRegistrationModalFrame;
