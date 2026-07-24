interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function PromptEditor({ value, onChange }: Props) {
  return (
    <div className="lg:max-w-[450px] w-full bg-white rounded-[16px] p-[24px] max-lg:mt-[20px]">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="프롬프트를 작성해주세요."
        className="w-full h-[1000px] max-lg:h-[285px] flex-1 bg-transparent outline-none resize-none text-[14px] font-light
                    placeholder:text-text-on-background placeholder:text-[14px] placeholder:font-light overflow-y-auto"
      />
    </div>
  );
}
