import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Slide1 from '@assets/home/img-slide1.png';
import Slide2 from '@assets/home/img-slide2.png';
import Slide3 from '@assets/home/img-slide3.png';

import PrevIcon from '@assets/home/icon-slide-prev.svg';
import NextIcon from '@assets/home/icon-slide-next.svg';
import ImageBox from './ImageBox';

interface CustomArrowProps {
  onClick?: () => void;
}

const PrevArrow = ({ onClick }: CustomArrowProps) => {
  return (
    <button onClick={onClick} className="absolute top-0 right-[84px] z-[10]">
      <img src={PrevIcon} alt="prev" className="w-full h-full object-contain" />
    </button>
  );
};

const NextArrow = ({ onClick }: CustomArrowProps) => {
  return (
    <button onClick={onClick} className="absolute top-0 right-[40px] z-[10]">
      <img src={NextIcon} alt="next" className="w-full h-full object-contain" />
    </button>
  );
};

const ImageSlide = () => {
  const settings = {
    centerMode: true,
    centerPadding: '30%',
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
      to: '#',
    },
    {
      id: 2,
      url: Slide2,
      to: '#',
    },
    {
      id: 3,
      url: Slide3,
      to: '#',
    },
  ];

  return (
    <Slider {...settings} prevArrow={<PrevArrow />} nextArrow={<NextArrow />} className="mt-[104px]">
      {SLIDES.concat(SLIDES).map((slide) => (
        <ImageBox key={slide.id} url={slide.url} to={slide.to} />
      ))}
    </Slider>
  );
};

export default ImageSlide;
