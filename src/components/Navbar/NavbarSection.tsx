import NavbarButton from './NavbarButton';

/**
 * 네비게이션바 모달의 ~바로가기 부분과 버튼 섹션을 나타내는 컴포넌트입니다.

 * @param {string} title -- ~바로가기에 해당하는 제목 부분
 * @param {Array<{id: number, label: string, url: string}>} models -- 각 모델에 대항하는 배열
 * @param {Function} setIsNavModalShow -- 모달 상태 변경 함수
 *
 * @example
 * <NavbarSection
 *    key={section.title}
 *    title={section.title}
 *    models={section.models}
 *    setIsNavModalShow={setIsNavModalShow}
 * />
 *
 * @author 김진효
 * **/

type Model = { id: number; label: string; url: string };

interface NavbarSectionProps {
  title: string;
  models: Model[];
  setIsNavModalShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavbarSection = ({ title, models, setIsNavModalShow }: NavbarSectionProps) => {
  return (
    <>
      <div>{title}</div>
      <div className="px-[16px] py-[12px] grid grid-flow-col grid-rows-3 grid-cols-2 gap-x-[20px] gap-y-[8px]">
        {models.map((model) => (
          <NavbarButton key={model.id} text={model.label} url={model.url} setIsNavModalShow={setIsNavModalShow} />
        ))}
      </div>
    </>
  );
};

export default NavbarSection;
