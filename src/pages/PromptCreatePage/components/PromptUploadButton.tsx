import UploadIcon from '@assets/icon-upload.svg';

interface Props {
  disabled: boolean;
  mode: 'create' | 'edit';
  onClick: () => void;
}

export default function PromptUploadButton({ disabled, mode, onClick }: Props) {
  return (
    <button
      className="w-full h-[65px] flex justify-center items-center gap-[16px] bg-primary rounded-[12px] py-[20px]"
      onClick={onClick}
      disabled={disabled}>
      <img src={UploadIcon} alt="업로드 버튼" className="w-[16px] h-[16px]" />
      <p className="custom-h4 text-white max-phone:text-[16px]">{mode === 'create' ? '업로드 하기' : '수정하기'}</p>
    </button>
  );
}
