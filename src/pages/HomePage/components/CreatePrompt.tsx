import arrow from '@/assets/icon-prompt-upload.svg';
import textIcon from '@/assets/icon-result-text.svg';
import imageIcon from '@/assets/icon-result-image.svg';
import imageResult from '@/assets/icon-prompt-result-instance.svg';
import { Link } from 'react-router-dom';

const CreatePrompt = () => {
  return <div className="flex w-full px-[40px] pt-[64px] gap-[40px] bg-white">
      <section className="flex flex-col gap-[20px]">
        <div>
          <p className="custom-h1">프롬프트 올리기</p>
          <p className="custom-body1 text-text-on-white mt-[12px]">나만의 AI 프롬프트를 업로드하고 판매하세요!</p>
        </div>
        <Link
          to="/create"
          className="flex gap-[20px] border-[1px] border-gray-200 rounded-[24px] bg-white custom-button1 text-text-on-white py-[12px] pl-[24px] pr-[13.5px] w-[128px]">
          <p>바로가기</p>
          <img src={arrow} alt="Arrow Icon" className="w-[12px] h-[18px]" />
        </Link>
      </section>
      <section className="flex flex-col gap-[20px] w-full">
        <div className="flex justify-between gap-[20px] px-[20px] py-[16px] bg-gray-50 rounded-[12px] h-[154px]">
          <div className="flex flex-col gap-[10px]">
            <div className="flex items-center gap-[10px]">
              <img src={textIcon} alt="Image Result Icon" className="w-[28px] h-[28px]" />
              <p className="custom-h5">텍스트 결과</p>
            </div>
            <p className="custom-h3 mt-[12px]">AI의 답변이 텍스트 형태예요.</p>
          </div>
          <p className="custom-body2 text-gray-500 mt-[8px]">
            ##시선을 끄는 광고 카피 제작##
            <br />
            "매일 아침 카페 대신 지구를 사세요"
            <br />
            "텀블러 하나로 커피값도, 환경도 절약하기"
          </p>
        </div>
        <div className="flex justify-between gap-[20px] px-[20px] py-[16px] bg-gray-50 rounded-[12px] h-[154px]">
          <div className="flex flex-col gap-[10px]">
            <div className="flex items-center gap-[10px]">
              <img src={imageIcon} alt="Image Result Icon" className="w-[28px] h-[28px]" />
              <p className="custom-h5">이미지 결과</p>
            </div>
            <p className="custom-h3 mt-[12px]">AI의 답변이 이미지 형태예요.</p>
          </div>
          <img src={imageResult} alt="Image Result Example" className="  mt-[12px] rounded-[8px]" />
        </div>
      </section>
    </div>;
};

export default CreatePrompt;
