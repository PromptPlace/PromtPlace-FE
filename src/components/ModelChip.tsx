import clsx from 'clsx';

interface ModelChipProps {
  label: string;
  hasImage: boolean;
}

const ModelChip = ({ label, hasImage }: ModelChipProps) => (
  <div
    className={clsx(
      'px-2 py-0.5 rounded-sm inline-flex justify-center items-center',
      hasImage ? 'bg-secondary-pressed' : 'bg-white',
    )}>
    <span className="text-text-on-white line-clamp-1 custom-button3">{label}</span>
  </div>
);

export default ModelChip;
