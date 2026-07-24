interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function TextPreviewSection({ value, onChange }: Props) {
  return (
    <div className="my-4 flex flex-col gap-3">
      <div className="gap-1">
        <p className="text-[16px] font-medium pb-[4px]">결과 미리보기</p>
        <p className="text-[12px] font-light text-gray700">프롬프트를 입력한 AI의 답변 일부를 작성해주세요.</p>
      </div>

      <div className="h-[185px] w-full py-[12px] px-[16px] bg-gray50 rounded-[8px]">
        <textarea
          className="w-full h-[160px] text-[14px] font-light  placeholder:text-gray-400 resize-none outline-none"
          placeholder={`예) "세상에 없던 초코, 먹어도 부담 없는 마법"\n"다이어터들이 초코 아이스크림 먹는 비법"`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}
