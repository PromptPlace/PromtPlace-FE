import NavbarSection from './NavbarSection';

/**
 * 네비게이션바의 AI 바로가기를 눌렀을 때 나오는 모달입니다.
 *
 * @param {Function} setIsNavModalShow -- 모달 상태 변경 함수
 *
 * @example
 * <NavbarModal setIsNavModalShow={setIsNavModalShow} />
 *
 * @author 김진효
 * **/

interface NavbarModalProps {
  setIsNavModalShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const LanguageModels = [
  { id: 1, label: 'ChatGPT', url: '/' },
  { id: 2, label: 'Gemini', url: '/' },
  { id: 3, label: 'Claude', url: '/' },
  { id: 4, label: 'Perplexity', url: '/' },
  { id: 5, label: 'Grok', url: '/' },
  { id: 6, label: 'DeepSeek', url: '/' },
];

const ImageModels = [
  {
    id: 1,
    label: 'DALL-E',
    url: '/',
  },
  { id: 2, label: 'Nano Banana', url: '/' },
  { id: 3, label: 'Midjourney', url: '/' },
  { id: 4, label: 'Stable Diffusion', url: '/' },
];

const VideoModels = [
  { id: 1, label: 'Kling AI', url: '/' },
  { id: 2, label: 'Veo', url: '/' },
  { id: 3, label: 'Sora', url: '/' },
  { id: 4, label: 'Runway', url: '/' },
  { id: 5, label: 'Luma Dream Machine', url: '/' },
];

const Sections = [
  { title: '언어모델(LLM) 바로가기', models: LanguageModels },
  { title: '이미지 생성 모델 바로가기', models: ImageModels },
  { title: '동영상 생성 모델 바로가기', models: VideoModels },
];

const NavbarModal = ({ setIsNavModalShow }: NavbarModalProps) => {
  return (
    <div className="p-[32px] pr-[16px] rounded-[16px] border border-transparent-inverse bg-white flex flex-col gap-[16px] h-[400px] max-w-[679px] w-full">
      <div className="overflow-y-scroll">
        {Sections.map((section) => (
          <NavbarSection
            key={section.title}
            title={section.title}
            models={section.models}
            setIsNavModalShow={setIsNavModalShow}
          />
        ))}
      </div>
    </div>
  );
};

export default NavbarModal;
