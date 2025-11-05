import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Slide1 from '@assets/home/img-slide1.png';
import Slide2 from '@assets/home/img-slide2.png';
import Slide3 from '@assets/home/img-slide3.png';

import PrevIcon from '@assets/home/icon-slide-prev.svg';
import NextIcon from '@assets/home/icon-slide-next.svg';
import ImageBox from './ImageBox';
import { useEffect, useState } from 'react';

interface CustomArrowProps {
  onClick?: () => void;
}

const PrevArrow = ({ onClick }: CustomArrowProps) => {
  return (
    <button
      onClick={onClick}
      className="absolute top-[-16px] right-[84px] z-[10] max-phone:w-[24px] max-phone:right-[64px]">
      <img src={PrevIcon} alt="prev" className="w-full h-full object-contain" />
    </button>
  );
};

const NextArrow = ({ onClick }: CustomArrowProps) => {
  return (
    <button
      onClick={onClick}
      className="absolute top-[-16px] right-[40px] z-[10] max-phone:w-[24px] max-phone:right-[20px]">
      <img src={NextIcon} alt="next" className="w-full h-full object-contain" />
    </button>
  );
};

const ImageSlide = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [centerWidth, setCenterWidth] = useState(665);
  const [centerPadding, setCenterPadding] = useState(0);

  const settings = {
    centerMode: true,
    centerPadding: `${centerPadding}px`,
    infinite: true,
    slidesToShow: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3500,
  };

  const SLIDES = [
    {
      id: 1,
      url: Slide1,
      to: '/prompt/2131',
    },
    {
      id: 2,
      url: Slide2,
      to: '/prompt/2130',
    },
    {
      id: 3,
      url: Slide3,
      to: '/prompt/2129',
    },
  ];

  useEffect(() => {
    const updateSettings = () => {
      let width = 665;
      if (window.innerWidth <= 480) width = 240;
      else if (window.innerWidth <= 1023) width = 380;

      setCenterWidth(width);
      setCenterPadding((window.innerWidth - width) / 2);
    };

    updateSettings();
    window.addEventListener('resize', updateSettings);
    return () => window.removeEventListener('resize', updateSettings);
  }, []);

  return (
    <Slider {...settings} prevArrow={<PrevArrow />} nextArrow={<NextArrow />} className="mt-[104px]">
      {SLIDES.map((slide) => (
        <ImageBox key={slide.id} url={slide.url} to={slide.to} />
      ))}
    </Slider>
  );
};

export default ImageSlide;
