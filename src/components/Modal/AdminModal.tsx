import DefaultImg from '@assets/logo/app/app-logo-default.svg?react';
import CancleIcon from '@assets/icon-x-button.svg?react';

interface AdminModalProps {
  setShowAdminModal: (show: boolean) => void;
}

const AdminModal = ({ setShowAdminModal }: AdminModalProps) => {
  return (
    <div
      onClick={() => setShowAdminModal(false)}
      className="fixed inset-0 bg-overlay flex justify-center items-center px-[102px] max-lg:p-[40px] max-phone:p-[20px]">
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-[825px] w-full bg-white rounded-[16px] flex flex-col gap-[16px] p-[32px]">
        <div className="text-center custom-h4 pb-[16px] border-b border-b-gray200">운영자 메시지</div>
        <CancleIcon
          className="absolute right-[20px] top-[20px] cursor-pointer"
          onClick={() => setShowAdminModal(false)}
        />

        <div className="flex items-start gap-[24px]">
          <DefaultImg className="w-[48px] h-[48px]" />

          <div className="flex flex-col gap-[20px] custom-body2 pt-[8px] pr-[20px] max-h-[412px] h-full overflow-y-auto">
            <p className="text-text-on-white">운영자에게 메시지가 도착했어요!</p>

            <div className="text-gray700">
              안녕하세요, 주연님. 프롬프트 플레이스 운영팀입니다.
              <br />
              <br />
              주연님께서 지난 11월 9일에 업로드하신 {`<`}발표의 신: 청중을 사로잡는 대본 & 날카로운 예상 질문 방어{`>`}{' '}
              프롬프트와 관련하여 안내 말씀드립니다.
              <br />
              <br />
              현재 해당 콘텐츠의 상세 설명이 다소 부족한 것으로 확인되어, 이용자들의 이해를 돕기 위해 내용 보완을
              요청드립니다.
              <br />
              <br />
              번거로우시겠지만 7일 이내에 내용을 수정해 주시기를 부탁드립니다. 기한 내에 수정이 이루어지지 않을 경우,
              부득이하게 게시 중단(삭제) 조치가 진행될 수 있는 점 너른 양해 부탁드립니다.
              <br />
              <br />
              감사합니다.
              <br />
              <br />
              프롬프트 플레이스 드림
            </div>

            <p className="text-gray400">2025.10.18</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminModal;
