import SellerRegistrationModalFrame from './SellerRegistrationModalFrame';
import { SELLER_REGISTRATION_MODAL_CONTENT } from './SellerRegistrationModalContent';
import type { SellerRegistrationStatusModalProps } from '@/types/MyPage/settlement';

const SellerRegistrationStatusModal = ({ modalType, onClose, onAction }: SellerRegistrationStatusModalProps) => {
  if (!modalType) {
    return null;
  }

  const content = SELLER_REGISTRATION_MODAL_CONTENT[modalType];

  return (
    <SellerRegistrationModalFrame
      isOpen={Boolean(modalType)}
      title={content.title}
      description={content.description}
      actionLabel={content.actionLabel}
      onClose={onClose}
      onAction={onAction}
    />
  );
};

export default SellerRegistrationStatusModal;
