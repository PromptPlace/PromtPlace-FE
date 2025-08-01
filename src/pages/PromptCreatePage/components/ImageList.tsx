// ImageList.tsx
import React from 'react';
import { LuX } from 'react-icons/lu';

interface ImageListProps {
  files: File[];
  onRemove: (index: number) => void;
}

export const ImageList: React.FC<ImageListProps> = ({ files, onRemove }) => (
  <div className="flex flex-col">
    {files.map((file, idx) => (
      <div key={idx} className="flex items-center gap-[24px]">
        <span className="text-[16px] text-text-on-white truncate">{file.name}</span>
        <button type="button" onClick={() => onRemove(idx)} aria-label="Remove image">
          <LuX size={20} />
        </button>
      </div>
    ))}
  </div>
);

export const MobileImageList: React.FC<ImageListProps> = ({ files, onRemove }) => (
  <div className="flex flex-col">
    {files.map((file, idx) => (
      <div key={idx} className="flex items-center justify-between gap-[24px]">
        <span className="text-[10px] text-text-on-white truncate">{file.name}</span>
        <button type="button" onClick={() => onRemove(idx)} aria-label="Remove image">
          <LuX size={8} />
        </button>
      </div>
    ))}
  </div>
);
