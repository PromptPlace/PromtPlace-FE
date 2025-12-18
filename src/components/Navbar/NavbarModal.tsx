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
  { id: 1, label: 'ChatGPT', url: 'https://chat.openai.com/' },
  { id: 2, label: 'Gemini', url: 'https://gemini.google.com/' },
  { id: 3, label: 'Claude', url: 'https://claude.ai/' },
  { id: 4, label: 'Perplexity', url: 'https://www.perplexity.ai/' },
  { id: 5, label: 'Grok', url: 'https://x.ai/' },
  { id: 6, label: 'DeepSeek', url: 'https://www.deepseek.com/' },
];

const ImageModels = [
  {
    id: 1,
    label: 'DALL-E',
    url: 'https://openai.com/dall-e',
  },
  { id: 2, label: 'Nano Banana', url: 'https://nanobanana.io/' },
  { id: 3, label: 'Midjourney', url: 'https://www.midjourney.com/' },
  { id: 4, label: 'Stable Diffusion', url: 'https://stability.ai/' },
  { id: 5, label: 'Firefly', url: 'https://firefly.adobe.com/' },
];

const VideoModels = [
  { id: 1, label: 'Kling AI', url: 'https://klingai.com/' },
  { id: 2, label: 'Veo', url: 'https://deepmind.google/technologies/veo' },
  { id: 3, label: 'Sora', url: 'https://openai.com/sora' },
  { id: 4, label: 'Runway', url: 'https://runwayml.com/' },
  { id: 5, label: 'Luma Dream Machine', url: '' },
];

const MusicModels = [
  { id: 1, label: 'Suno', url: 'https://suno.com/' },
  { id: 2, label: 'Udio', url: 'https://www.udio.com/' },
];

const Sections = [
  { title: '언어모델(LLM) 바로가기', models: LanguageModels },
  { title: '이미지 생성 모델 바로가기', models: ImageModels },
  { title: '동영상 생성 모델 바로가기', models: VideoModels },
  { title: '음악 생성 모델 바로가기', models: MusicModels },
];

const NavbarModal = ({ setIsNavModalShow }: NavbarModalProps) => {
  return (
    <div className="p-[32px] pr-[16px] rounded-[16px] border border-transparent-inverse bg-white flex flex-col gap-[16px] h-[400px] max-lg:h-[664px] max-phone:h-[608px] max-w-[679px] max-phone:w-[335px] w-full relative z-[20]">
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
