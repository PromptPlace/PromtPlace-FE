import DefaultImg from '@assets/logo/app/app-logo-default.svg?react';
import CancleIcon from '@assets/icon-x-button.svg?react';
import { createPortal } from 'react-dom';

interface AdminModalProps {
  setShowAdminModal: (show: boolean) => void;
  content: string;
}

const AdminModal = ({ setShowAdminModal, content }: AdminModalProps) => {
  return createPortal(
    <div
      onClick={() => setShowAdminModal(false)}
      className="fixed inset-0 z-100 bg-overlay flex justify-center items-center px-[102px] max-lg:p-[40px] max-phone:p-[20px]">
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-[825px] w-full bg-white rounded-[16px] flex flex-col gap-[16px] p-[32px]">
        <div className="text-center custom-h4 pb-[16px] border-b border-b-gray200">운영자 메시지</div>
        <CancleIcon
          className="absolute right-[20px] top-[20px] cursor-pointer"
          onClick={() => setShowAdminModal(false)}
        />

        <div className="flex items-start gap-[24px]">
          <DefaultImg className="w-[48px] h-[48px] shrink-0" />

          <div className="flex flex-col gap-[20px] custom-body2 pt-[8px] pr-[20px] max-h-[412px] h-full overflow-y-auto">
            <p className="text-text-on-white">운영자에게 메시지가 도착했어요!</p>
            <div className="text-gray700">{content}</div>

            <p className="text-gray400">2025.10.18</p>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('portal-root')!,
  );
};

export default AdminModal;
