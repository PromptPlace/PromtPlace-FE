import clsx from 'clsx';

import MailIcon from '@assets/profile/icon-mail-gray.svg';
import CheckIcon from '@assets/profile/icon-complete.svg';
import PlusIcon from '@assets/icon-add.svg';

interface ProfileButtonProps {
  text: string;
  type: 'chat' | 'check' | 'plus';
  onClick: () => void;
}

const ProfileButton = ({ text, type, onClick }: ProfileButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        type === 'chat' && 'border-gray400 bg-white',
        type === 'check' && 'border-primary bg-primary text-white',
        type === 'plus' && 'border-primary text-primary bg-white',
        'w-full py-[12px] px-[20px] flex gap-[8px] justify-center items-center rounded-[12px] border border-[0.8px] transition-all duration-300',
      )}>
      <img
        src={type === 'chat' ? MailIcon : type === 'check' ? CheckIcon : PlusIcon}
        className="w-[24px] h-[24px]
      "
      />
      <p className="custom-button1">{text}</p>
    </button>
  );
};

export default ProfileButton;
