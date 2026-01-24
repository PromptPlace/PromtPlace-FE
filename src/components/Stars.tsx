import StarFill from '@assets/icon-star-fill.svg';
import StarHalf from '@assets/icon-star-half.svg';
import StarEmpty from '@assets/icon-star-outline_new.svg';

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
  star?: number; // optional로 변경
}

const Stars = ({ star = 0 }: RatingProps) => {
  const stars = [];
  const fullStars = Math.floor(star);
  const halfStar = star - fullStars >= 0.5;
  const emptyStar = 5 - fullStars - (halfStar ? 1 : 0);

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <img
        src={StarFill}
        key={'full' + i}
        alt="star full"
        className="w-[16px] h-[16px] max-lg:w-[12px] max-lg:h-[12px]"
      />,
    );
  }

  if (halfStar) {
    stars.push(
      <img src={StarHalf} key={'half'} alt="star half" className="w-[16px] h-[16px] max-lg:w-[12px] max-lg:h-[12px]" />,
    );
  }

  for (let i = 0; i < emptyStar; i++) {
    stars.push(
      <img
        src={StarEmpty}
        key={'empty' + i}
        alt="star empty"
        className="w-[16px] h-[16px] max-lg:w-[14px] max-lg:h-[14px]"
      />,
    );
  }

  return (
    <div className="flex justify-center items-end gap-[5px]">
      <div className="flex gap-[2px] justify-center items-center">{stars}</div>
    </div>
  );
};

export default Stars;