import { useRef } from 'react';
import imgUpload from '@assets/promptCreate/image-upload-img.svg';
import imgDelete from '@assets/promptCreate/icon-delete-Xbutton-red.svg';

interface Props {
  files: File[];
  existingImages: string[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setExistingImages: React.Dispatch<React.SetStateAction<string[]>>;
}

const ImageUploadSection = ({ files, existingImages, setFiles, setExistingImages }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const newFiles = Array.from(e.target.files);

    setFiles((prev) =>
      [...prev, ...newFiles].filter(
        (file, idx, arr) => arr.findIndex((f) => f.name === file.name && f.size === file.size) === idx,
      ),
    );

    if (inputRef.current) inputRef.current.value = '';
  };

  const removeNew = (idx: number) => setFiles((prev) => prev.filter((_, i) => i !== idx));

  const removeExisting = (idx: number) => setExistingImages((prev) => prev.filter((_, i) => i !== idx));

  return (
    <div className="flex flex-col gap-6 my-4">
      <div className="flex flex-col gap-1">
        <p className="text-[16px] font-medium mb-1">결과 미리보기</p>
        <p className="text-xs font-light text-gray700">프롬프트 결과 이미지를 업로드해주세요 (최대 3개)</p>
      </div>

      <div className="flex items-start max-lg:flex-col gap-[20px]">
        <div className="w-[195px] h-[195px] max-lg:w-full flex flex-col items-center justify-center gap-4 p-4 border border-dashed border-primary bg-secondary rounded-[16px]">
          <img src={imgUpload} alt="upload" className="w-12 h-12" />

          <div className="flex flex-col gap-3">
            <p className="text-center custom-button2">
              이미지를 업로드해주세요.
              <br />
              (최대 3개)
            </p>

            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={files.length >= 3}
              className="px-4 py-2 text-xs border border-primary rounded-[8px] bg-white disabled:opacity-50 text-primary">
              이미지 업로드
            </button>
          </div>

          <input ref={inputRef} type="file" accept="image/*" multiple onChange={handleChange} className="hidden" />
        </div>

        <div className="flex-1 flex flex-col gap-3">
          {[...existingImages, ...files.map((f) => f.name)].map((name, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 border border-gray-200 rounded-[16px]">
              <p className="text-sm text-gray-700 break-all">{name}</p>

              <img
                src={imgDelete}
                alt="delete"
                className="cursor-pointer"
                onClick={() =>
                  idx < existingImages.length ? removeExisting(idx) : removeNew(idx - existingImages.length)
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageUploadSection;
