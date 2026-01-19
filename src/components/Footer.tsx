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
      content: '서울특별시 관악구 인헌12가길 7, 402호(봉천동, 청운빌라)',
    },
    {
      title: '전화번호',
      content: ' 070-8983-9738',
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

      <div className="flex flex-wrap gap-x-[20px] gap-y-[8px] max-lg:flex-col">
        {CONTENTS.map((content, idx, arr) => (
          <>
            <div
              className={clsx(
                'custom-body2 max-phone:text-[12px]',
                content.title === '대표자' && 'max-lg:hidden',
                idx === 0 && 'max-lg:flex gap-[20px]',
              )}
              key={content.title}>
              <div>
                <span className="text-gray700">{content.title}</span> :{' '}
                <span className="text-gray500">{content.content}</span>
              </div>

              {idx === 0 && (
                <div className="lg:hidden">
                  <span className="text-gray700">대표자</span> : <span className="text-gray500">안송연</span>
                </div>
              )}
            </div>

            {idx % 2 === 1 && idx !== arr.length - 1 && <div className="w-full max-lg:hidden"></div>}
          </>
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
