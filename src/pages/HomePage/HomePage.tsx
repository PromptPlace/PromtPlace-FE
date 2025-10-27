import CreatePrompt from './components/CreatePrompt';
import ImageSlide from './components/ImageSlide';
import RecommnedPrompts from './components/RecommnedPrompts';
import Search from './components/Search';
import VariousFunction from './components/VariousFunction';

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
