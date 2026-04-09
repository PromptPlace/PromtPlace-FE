interface formatFileSizeProps {
  size: number;
}

const formatFileSize = ({ size }: formatFileSizeProps) => {
  if (size < 1024) return size + 'B';
  if (size < 1024 * 1024) return (size / 1024).toFixed(1) + 'KB';
  return (size / (1024 * 1024)).toFixed(1) + 'MB';
};

export default formatFileSize;
