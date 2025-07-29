import Create from '@assets/tabbar/tabbar-create.png';
import Main from '@assets/tabbar/tabbar-main.png';
import MyPage from '@assets/tabbar/tabbar-mypage.png';

import TabCreate from '@assets/mobile/icon-mobile-edit.svg?react';
import TabHome from '@assets/mobile/icon-mobile-home.svg?react';
import TabMyPage from '@assets/mobile/icon-mobile-person.svg?react';
import { matchPath, NavLink, useLocation } from 'react-router-dom';

const getActiveTab = (pathName: string) => {
  if (matchPath('/create/*', pathName)) return '/create';
  if (matchPath('/mypage/*', pathName)) return '/mypage/prompt';
  if (pathName === '/') return '/';
  return '/';
};

const TabBar = () => {
  const LINKS = [
    {
      to: '/create',
      label: '프롬프트 작성',
      icon: (isActive: boolean) => <TabCreate className={isActive ? 'text-white' : 'text-[#999898]'} />,
      tab: <img src={Create} className="w-full h-full object-cover" />,
    },
    {
      to: '/',
      label: '메인',
      icon: (isActive: boolean) => <TabHome className={isActive ? 'text-white' : 'text-[#999898]'} />,
      tab: <img src={Main} className="w-full h-full object-cover" />,
    },
    {
      to: '/mypage/prompt',
      label: '마이페이지',
      icon: (isActive: boolean) => <TabMyPage className={isActive ? 'text-white' : 'text-[#999898]'} />,
      tab: <img src={MyPage} className="w-full h-full object-cover" />,
    },
  ];

  const location = useLocation();
  const activePath = getActiveTab(location.pathname);
  const activeLink = LINKS.find((link) => link.to === activePath);

  return (
    <div className="fixed bottom-0 max-w-[425px] w-full">
      <div className="max-w-[425px] w-full max-h-[95px] flex items-end">{activeLink?.tab}</div>

      <div className="flex justify-evenly items-center absolute inset-0 z-100  w-full">
        {LINKS.map((link, idx) => (
          <>
            <NavLink key={idx} to={link.to} className="min-w-[64px] py-[11px] flex flex-col gap-[6px] items-center">
              {({ isActive }) => (
                <>
                  {isActive && (
                    <div className="relative bottom-[18px] w-[48px] h-[48px] bg-primary-gradient rounded-full flex items-center justify-center shadow-button-hover">
                      {link.icon(true)}
                    </div>
                  )}

                  {!isActive && (
                    <>
                      {link.icon(false)}
                      <p className="text-text-on-background text-[10px] font-normal leading-[13px]">{link.label}</p>
                    </>
                  )}
                </>
              )}
            </NavLink>
          </>
        ))}
      </div>
    </div>
  );
};

export default TabBar;
