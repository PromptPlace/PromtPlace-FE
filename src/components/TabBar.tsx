import Create from '@assets/tabbar/tabbar-create.svg?react';
import Main from '@assets/tabbar/tabbar-main.svg?react';
import MyPage from '@assets/tabbar/tabbar-mypage.svg?react';

const TabBar = () => {
  return (
    <div className="fixed bottom-0 max-w-[425px] w-full">
      <Create className="w-full h-full object-cover" />
    </div>
  );
};

export default TabBar;
