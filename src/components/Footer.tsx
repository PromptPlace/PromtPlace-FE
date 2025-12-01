import clsx from 'clsx';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const LINKS = [
    {
      to: '/guide/notice/22',
      label: '이용약관',
    },
    {
      to: '/guide/notice/23',
      label: '개인정보처리방침',
    },
    {
      to: '/guide/notice/21',
      label: '운영정책',
    },
  ];

  const CONTENTS = [
    {
      title: '회사명',
      content: '프롬프트 플레이스',
    },
    {
      title: '대표자',
      content: '안송연',
    },
    {
      title: '사업자 등록번호',
      content: '760-20-02108',
    },
    {
      title: '주소',
      content: '서울특별시 관악구 인헌동 12가길 7',
    },
    {
      title: '이메일',
      content: 'promptplace.official@gmail.com',
    },
  ];

  useEffect(() => {
    if (!window.Kakao) return;
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY);
    }
  }, []);

  // 카카오톡 채널 채팅
  const handleFollowChannel = () => {
    window.Kakao.Channel.chat({
      channelPublicId: `${import.meta.env.VITE_CHANNEL_PUBLIC_ID}`,
    });
  };

  return (
    <footer className="bg-background mt-[168px] px-[102px] max-lg:px-[40px] max-phone:px-[20px]">
      <nav className="pt-[32px] pb-[16px] flex gap-[20px]">
        {LINKS.map((link) => (
          <Link
            key={link.label}
            to={link.to}
            className={clsx(
              link.label === '이용약관' ? 'pl-[0px]' : 'px-[20px]',
              'py-[12px] custom-h4 text-gray700 max-lg:text-[16px] max-phone:text-[14px] max-lg:px-[0px]',
            )}>
            {link.label}
          </Link>
        ))}
        <div
          onClick={handleFollowChannel}
          className="relative cursor-pointer py-[12px] custom-h4 text-gray700 max-lg:text-[16px] max-phone:text-[14px] max-lg:px-[0px]">
          고객센터
        </div>
      </nav>

      <div className="grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 grid-flow-end gap-x-[20px] gap-y-[8px] w-max">
        {CONTENTS.map((content) => (
          <div
            className={clsx(
              'custom-body2 max-phone:text-[12px]',
              content.title === '대표자' && 'col-span-2 max-lg:col-span-1',
            )}
            key={content.title}>
            <span className="text-gray700">{content.title}</span> :{' '}
            <span className="text-gray500">{content.content}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-[20px] mt-[64px] pb-[56px] text-gray700 custom-body3">
        <p>©PromptPlace. All rights reserved</p>
        <p>
          프롬프트 플레이스는 통신판매중개자로서 프롬프트 거래의 당사자가 아닙니다. 제작자가 등록한 프롬프트의 내용,
          품질 및 거래에 대한 모든 책임은 각 제작자에게 있습니다.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
