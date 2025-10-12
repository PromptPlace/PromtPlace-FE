import ArrowIcon from '@assets/header/icon-arrow_btn_start_18px.svg';

/**
 * 네비게이션바의 AI 바로가기를 눌렀을 때 나오는 모달 중 모델의 각 버튼입니다.

 * @param {string} text -- 버튼 내용
 * @param {string} url -- 클릭했을 때 이동할 경로
 * @param {Function} setIsNavModalShow -- 모달 상태 변경 함수
 *
 * @example
 * <NavbarButton text={model.label} url={model.url} key={model.id} />
 *
 * @author 김진효
 * **/

interface NavbarButtonProps {
  text: string;
  url: string;
  setIsNavModalShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavbarButton = ({ text, url, setIsNavModalShow }: NavbarButtonProps) => {
  return (
    <button
      onClick={() => {
        setIsNavModalShow(false);
        window.open(url, '_blank');
      }}
      className="py-[12px] pl-[24px] pr-[12px] flex justify-between items-center rounded-[24px] border border-gray200 bg-white w-full">
      <p className="truncate">{text}</p>
      <img src={ArrowIcon} alt="바로가기 버튼" className="self-center" />
    </button>
  );
};

export default NavbarButton;
