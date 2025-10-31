import CreatePrompt from './components/CreatePrompt';
import ImageSlide from './components/ImageSlide';
import RecommnedPrompts from './components/RecommnedPrompts';
import Search from './components/Search';
import VariousFunction from './components/VariousFunction';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const HomePage = () => {
  return (
    <>
      <Search />
      <ImageSlide />
      <RecommnedPrompts />
      <VariousFunction />
      <CreatePrompt />
    </>
  );
};

export default HomePage;
