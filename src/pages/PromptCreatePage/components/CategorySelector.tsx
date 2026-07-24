import TagButton from '@/components/Button/TagButton';
import { CATEGORY_LABELS } from '@/constants/PromptCreatePage/categoryLabels';
import arrowdown from '@assets/promptCreate/icon_arrow.svg';

interface Props {
  categories: string[];
  onRemove: (category: string) => void;
  onOpen: () => void;
}

export default function CategorySelector({ categories, onRemove, onOpen }: Props) {
  return (
    <div className="flex justify-start gap-[12px]">
      <div
        className="w-[105px] h-[30px] px-[8px] flex justify-between items-center gap-[16px] cursor-pointer flex-shrink-0 bg-gray50 rounded-[8px]"
        onClick={onOpen}>
        <p className="text-[14px] font-light max-phone:text-[12px]">카테고리</p>
        <img className="w-[16px] h-[16px] flex-shrink-0" src={arrowdown} alt="down-arrow" />
      </div>

      <div className="flex gap-[12px] items-center overflow-x-auto">
        {categories.map((category) => (
          <TagButton
            key={category}
            hasDelete
            hasActive={false}
            text={CATEGORY_LABELS[category] || category}
            onClick={() => onRemove(category)}
          />
        ))}
      </div>
    </div>
  );
}
