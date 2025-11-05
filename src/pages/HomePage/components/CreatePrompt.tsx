import arrow from '@/assets/icon-prompt-upload.svg';
import textIcon from '@/assets/icon-result-text.svg';
import imageIcon from '@/assets/icon-result-image.svg';
import imageResult from '@/assets/icon-prompt-result-instance.svg';
import { Link } from 'react-router-dom';

const CreatePrompt = () => {
  return (
    <div className="w-full px-[102px] max-lg:px-[40px] max-phone:px-[20px] pt-[56px] max-phone:pt-[40px] pb-[96px] max-phone:pb-[64px] bg-white">
      <div className="flex gap-[40px] px-[40px] max-phone:px-[16px] py-[64px] max-phone:py-[32px] max-lg:flex-col">
        <section className="flex flex-col gap-[20px] shrink-0">
          <div className="flex flex-col gap-[8px]">
            <p className="custom-h1 max-phone:text-[24px]">프롬프트 올리기</p>
            <p className="custom-h3 text-text-on-white max-phone:text-[14px]">
              나만의 AI 프롬프트를 업로드하고 판매하세요!
            </p>
          </div>
          <Link
            to="/create"
            className="flex gap-[20px] border-[1px] border-gray-200 rounded-[24px] bg-white custom-button1 text-text-on-white py-[12px] pl-[24px] pr-[13.5px] w-[128px]">
            <p>바로가기</p>
            <img src={arrow} alt="Arrow Icon" className="w-[12px] h-[18px]" />
          </Link>
        </section>

        <section className="flex flex-col gap-[20px] w-full">
          <div className="flex justify-between gap-[20px] px-[20px] py-[16px] bg-gray-50 rounded-[12px] h-[154px] max-lg:h-full! max-phone:flex-col">
            <div className="flex flex-col gap-[10px] w-1/2 max-phone:w-full">
              <div className="flex items-center gap-[10px]">
                <img src={textIcon} alt="Image Result Icon" className="w-[28px] h-[28px]" />
                <p className="custom-h4 max-phone:text-[16px]">텍스트 결과</p>
              </div>
              <p className="custom-h3 leading-[160%] tracking-[0.32px] max-phone:text-[14px]">
                AI의 답변이 텍스트 형태예요.
              </p>
            </div>

            <p className="custom-body2 text-gray-500 max-phone:text-[12px] w-1/2 max-phone:w-full">
              ##시선을 끄는 광고 카피 제작##
              <br />
              "매일 아침 카페 대신 지구를 사세요"
              <br />
              "텀블러 하나로 커피값도, 환경도 절약하기"
              <br />
              “출근길, 내 텀블러 없인 이제 못 가요!”
            </p>
          </div>

          <div className="flex justify-between gap-[20px] px-[20px] py-[16px] bg-gray-50 rounded-[12px] h-[154px] max-phone:flex-col">
            <div className="flex flex-col gap-[10px] w-1/2 max-phone:w-full">
              <div className="flex items-center gap-[10px]">
                <img src={imageIcon} alt="Image Result Icon" className="w-[28px] h-[28px]" />
                <p className="custom-h4 max-phone:text-[16px]">이미지 결과</p>
              </div>
              <p className="custom-h3 leading-[160%] tracking-[0.32px] max-phone:text-[14px]">
                AI의 답변이 이미지 형태예요.
              </p>
            </div>
            <img
              src={imageResult}
              alt="Image Result Example"
              className="rounded-[8px] w-1/2 object-cover max-lg:h-[122px] max-phone:w-full"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default CreatePrompt;
