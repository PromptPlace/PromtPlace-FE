import ProfileCard from './components/ProfileCard';
import PromptList from './components/PromptList';

const NewProfilePage = () => {
  return (
    <div className="px-[102px] max-lg:px-[40px] max-phone:px-[20px]">
      <ProfileCard />
      <PromptList />
    </div>
  );
};

export default NewProfilePage;
