import { useNavigate } from 'react-router-dom';

import PromptIcon from '@assets/icon-notfound-prompt.svg';
import DotsIcon from '@assets/icon-notfound-dots.svg';
import IconButton from '@components/Button/IconButton';
import NotFoundBg from '@assets/img-notfound.png';

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-background flex relative">
      <div className="w-[75px] h-[100dvh] bg-primary z-50"></div>

      <div className="flex flex-col ml-[188px] justify-center z-50">
        <div className="flex flex-col justify-center">
          <div className="relative flex items-center justify-center bg-notfound-gradient rounded-full h-[508px] max-w-[508px] text-primary text-[180px] font-bold leading-[225px] tracking-[27px] text-shadow-notfound">
            <p className="absolute top-[118px]">404</p>
            <div className="absolute top-[292px] left-[50px]">
              <img src={PromptIcon} alt="prompt" />
            </div>
            <div className="absolute top-[361px] left-[250px]">
              <img src={DotsIcon} alt="dots" />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[16px] w-full">
          <p className="text-primary text-[32px] font-bold leading-[40px] tracking-[3.3px]">
            죄송합니다. 페이지를 찾을 수 없습니다.
          </p>
          <div className="text-text-on-background font-bold text-[22px] leading-[28px] tracking-[3.3px] max-w-[798px]">
            존재하지 않는 주소를 입력하셨거나, 요청하신 페이지의 주소가 변경, 삭제 되어 찾을 수 없습니다.
          </div>
        </div>

        <div className="flex gap-[31px] mt-[23px]">
          <IconButton
            buttonType="round"
            style="fill"
            imgType="none"
            textButton="blue"
            text="메인으로"
            onClick={() => {
              navigate('/');
            }}
          />
          <IconButton
            buttonType="round"
            style="outline"
            imgType="none"
            textButton="white"
            text="이전으로"
            onClick={() => {
              navigate(-1);
            }}
          />
        </div>
      </div>

      <div className="absolute inset-0 w-full h-full z-30">
        <img src={NotFoundBg} alt="404페이지" className="object-cover w-full h-full" />
      </div>
    </div>
  );
};

export default NotFoundPage;
