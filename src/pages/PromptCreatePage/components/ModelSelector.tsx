import TagButton from '@/components/Button/TagButton';
import arrowdown from '@assets/promptCreate/icon_arrow.svg';

interface Props {
  models: string[];
  modelVersion: string;
  onRemove: (model: string) => void;
  onOpen: () => void;
  onVersionChange: (v: string) => void;
}

export default function ModelSelector({ models, modelVersion, onRemove, onOpen, onVersionChange }: Props) {
  return (
    <div className="flex flex-col gap-[12px]">
      <div className="flex justify-start gap-[12px]">
        <div
          className="w-[75px] h-[30px] px-[8px] flex justify-between items-center gap-[16px] cursor-pointer bg-gray50 rounded-[8px]"
          onClick={onOpen}>
          <p className="text-[14px] font-light max-phone:text-[12px]">모델</p>
          <img className="w-[16px] h-[16px] flex-shrink-0" src={arrowdown} alt="down-arrow" />
        </div>

        <div className="flex gap-[12px] items-center overflow-x-auto">
          {models.map((model) => (
            <TagButton key={model} hasDelete hasActive={false} text={model} onClick={() => onRemove(model)} />
          ))}
        </div>
      </div>

      <div className="w-full py-[8px] px-[16px] bg-gray50 rounded-[8px] items-center">
        <input
          value={modelVersion}
          onChange={(e) => onVersionChange(e.target.value)}
          maxLength={30}
          placeholder="예) ChatGPT 5, Gemini 2.5 pro"
          className="w-full h-[46px] bg-gray50 rounded-[8px] outline-none text-sm font-light"
        />
      </div>
    </div>
  );
}
