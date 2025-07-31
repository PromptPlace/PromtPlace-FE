import EyeIcon from '@assets/icon-eye.svg';
import DownIcon from '@assets/icon-download-gray.svg';

/**
 * 조회수 및 다운로드 수를 나타내는 컴포넌트입니다.
 *
 * @param {number} count -- 조회수 및 다운로드 수
 * @param {string} imgType -- 이미지 종류. 눈 이미지 혹은, 다운로드 이미지를 나타냅니다.
 *
 * @example
 * <Count imgType="eye" count={2109} />
 *
 * @author 김진효
 * **/

interface CountProps {
  count: number;
  imgType: 'eye' | 'download';
}

const Count = ({ count, imgType }: CountProps) => {
  const imgSrc = imgType === 'eye' ? EyeIcon : DownIcon;
  return (
    <div className="flex justify-center items-center gap-[10px] max-lg:gap-[4px] text-base font-normal leading-[20px] text-text-on-background max-lg:text-[8px] max-lg:leading-[10px]">
      <img src={imgSrc} alt={`${imgType} 이미지`} className="h-[16px] max-lg:h-[12px] max-lg:py-[1px]" />
      <span>{count}</span>
    </div>
  );
};

export default Count;
