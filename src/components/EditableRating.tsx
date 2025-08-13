import { useState } from 'react';
import StarFill from '@assets/icon-star-fill.svg';
import StarHalf from '@assets/icon-star-half.svg';
import StarEmpty from '@assets/icon-star-outline.svg';

/**
 * 사용자가 클릭으로 평점을 선택할 수 있는 별점 컴포넌트입니다.
 *
 * @param {number} star 현재 별점 (0~5)
 * @param {(value: number) => void} onChange 별점이 바뀔 때 호출되는 콜백
 *
 * @example
 * <EditableRating star={4} onChange={(v) => setRating(v)} />
 */

interface EditableRatingProps {
  star: number;
  onChange: (value: number) => void;
}

const EditableRating = ({ star, onChange }: EditableRatingProps) => {
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  const handleClick = (index: number) => {
    onChange(index + 1);
  };

  const handleMouseEnter = (index: number) => {
    setHoveredStar(index + 1);
  };

  const handleMouseLeave = () => {
    setHoveredStar(null);
  };

  const displayedStar = hoveredStar ?? star;

  return (
    <div className="flex justify-center items-end gap-[5px]">
      <div className="flex gap-[2px] justify-center items-center">
        {Array.from({ length: 5 }).map((_, i) => {
          const icon = i < displayedStar ? StarFill : StarEmpty;
          return (
            <img
              key={i}
              src={icon}
              alt={`star-${i}`}
              onClick={() => handleClick(i)}
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={handleMouseLeave}
              className="w-[24px] h-[24px] max-lg:w-[12px] max-lg:h-[12px] cursor-pointer"
            />
          );
        })}
      </div>
      <div className="text-text-on-background text-sm font-normal leading-[18px] max-lg:text-[8px] max-lg:leading-[10px]">
        ({displayedStar.toFixed(1)})
      </div>
    </div>
  );
};

export default EditableRating;
