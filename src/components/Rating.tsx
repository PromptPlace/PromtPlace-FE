import StarFill from '@assets/icon-star-fill.svg';
import StarHalf from '@assets/icon-star-half.svg';
import StarEmpty from '@assets/icon-star-outline.svg';

/**
 * 별점을 표시하는 컴포넌트입니다.
 * 별점을 넘겨서 사용하면 됩니다.
 *
 * @param {number} star -- 별점 (ex. 5, 2.5 등..)
 *
 * @example
 * <Rating star={5} />
 *
 * @author 김진효
 * **/

interface RatingProps {
  star: number;
}

const Rating = ({ star }: RatingProps) => {
  const stars = [];
  const fullStars = Math.floor(star); // 별점 정수 부분
  const halfStar = star - fullStars >= 0.5; // 0.5 이상인 경우 반쪽 별 표시
  const emptyStar = 5 - fullStars - (halfStar ? 1 : 0); // 빈 별 표시

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <img
        src={StarFill}
        key={'full' + i}
        alt="star full"
        className="w-[24px] h-[24px] max-lg:w-[12px] max-lg:h-[12px]"
      />,
    );
  }

  if (halfStar) {
    stars.push(
      <img src={StarHalf} key={'half'} alt="star half" className="w-[24px] h-[24px] max-lg:w-[12px] max-lg:h-[12px]" />,
    );
  }

  for (let i = 0; i < emptyStar; i++) {
    stars.push(
      <img
        src={StarEmpty}
        key={'empty' + i}
        alt="star empty"
        className="w-[24px] h-[24px] max-lg:w-[12px] max-lg:h-[12px]"
      />,
    );
  }

  return (
    <div className="flex justify-center items-end gap-[5px]">
      <div className="flex gap-[2px] justify-center items-center">{stars}</div>
      <div className="text-text-on-background text-sm font-normal leading-[18px] max-lg:text-[8px] max-lg:leading-[10px]">
        ({star.toFixed(1)})
      </div>
    </div>
  );
};

export default Rating;
