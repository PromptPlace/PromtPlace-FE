import { useState } from 'react';
import StarFill from '@assets/icon-star-fill.svg';
import StarEmpty from '@assets/icon-star-outline.svg';
import StarHalf from '@assets/icon-star-half.svg'; // 반쪽 별 아이콘 추가

/**
 * 사용자가 클릭으로 평점을 선택할 수 있는 별점 컴포넌트입니다.
 *
 * @param {number} star 현재 별점 (0~5, 0.5 단위)
 * @param {(value: number) => void} onChange 별점이 바뀔 때 호출되는 콜백
 *
 * @example
 * <EditableRating star={4.5} onChange={(v) => setRating(v)} />
 */

interface EditableRatingProps {
  star: number; // 0 ~ 5 (0.5 단위 포함)
  onChange: (value: number) => void;
}

const EditableRating = ({ star, onChange }: EditableRatingProps) => {
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  // index: 0~4 번째 별, value: 0.5 또는 1.0 단위로 계산
  const getStarValueFromEvent = (index: number, e: React.MouseEvent<HTMLImageElement, MouseEvent>): number => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isHalf = x < rect.width / 2;
    return index + (isHalf ? 0.5 : 1);
  };

  const handleClick = (index: number, e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const value = getStarValueFromEvent(index, e);
    onChange(value);
  };

  const handleMouseMove = (index: number, e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const value = getStarValueFromEvent(index, e);
    setHoveredStar(value);
  };

  const handleMouseLeave = () => {
    setHoveredStar(null);
  };

  const displayedStar = hoveredStar ?? star;

  return (
    <div className="flex justify-center items-end gap-[5px]">
      <div className="flex gap-[2px] justify-center items-center">
        {Array.from({ length: 5 }).map((_, i) => {
          let icon = StarEmpty;

          if (displayedStar >= i + 1) {
            // 꽉 찬 별
            icon = StarFill;
          } else if (displayedStar >= i + 0.5) {
            // 반쪽 별
            icon = StarHalf;
          } else {
            // 빈 별
            icon = StarEmpty;
          }

          return (
            <img
              key={i}
              src={icon}
              alt={`star-${i}`}
              onClick={(e) => handleClick(i, e)}
              onMouseMove={(e) => handleMouseMove(i, e)}
              onMouseLeave={handleMouseLeave}
              className="w-[40px] h-[40px] max-lg:w-[12px] max-lg:h-[12px] cursor-pointer select-none"
            />
          );
        })}
      </div>
    </div>
  );
};

export default EditableRating;
