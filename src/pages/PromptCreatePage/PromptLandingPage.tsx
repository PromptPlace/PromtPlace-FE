import twostars from '@assets/promptCreate/icon-two-stars.svg';
import onestar from '@assets/promptCreate/icon-one-star.svg';
import iconText from '@assets/promptCreate/icon-text.svg';
import iconImg from '@assets/promptCreate/icon-img.svg';
import exampleImg from '@assets/promptCreate/icon-example-image.svg';

import { useNavigate } from 'react-router-dom';

const PromptLandingPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="max-lg:bg-white pt-[170px] max-lg:pt-[64px] px-[120px] max-lg:px-[40px] max-phone:px-[20px] max-lg:min-h-[calc(100dvh-140px)]">
        <div className="flex justify-between gap-[72px] max-lg:flex-col max-lg:gap-[64px] max-phone:gap-[123px]">
          <div className="lg:max-w-[527px] lg:min-h-[575px] w-full max-lg:relative">
            <div className="flex justify-end">
              {/* 데스크탑 */}
              <img className="w-[150px] h-[130px] max-lg:hidden" src={twostars} alt="별 2개" />
              {/* 태블릿 */}
              <img
                className="w-[150px] h-[130px] lg:hidden max-lg:absolute top-[-40px] right-0 max-phone:w-[80px] max-phone:h-[69px]"
                src={twostars}
                alt="별 2개"
              />
            </div>
            <div className="mt-[24px] lg:mb-[87px]">
              <p className="text-[18px] font-light text-gray950 max-phone:text-[16px]">프롬프트 올리기</p>
              <p className="mt-[8px] mb-[24px] text-[32px] font-medium text-black max-lg:hidden">
                프롬프트를 작성하고 판매해보세요!
              </p>
              <p className="mt-[8px] mb-[24px] text-[32px] font-medium text-black lg:hidden relative z-1 max-phone:text-[24px]">
                프롬프트를 작성하고
                <br />
                판매해보세요!
              </p>
              <p className="text-[16px] font-light text-black max-phone:text-[14px]">
                나만의 AI 프롬프트를 업로드하고 판매하세요.
              </p>
            </div>
            <div className="max-lg:hidden">
              <img className="w-[210px] h-[210px]" src={onestar} alt="별 1개" />
            </div>
          </div>

          <div className="lg:max-w-[637px] h-[605px] w-full rounded-[16px] bg-white flex flex-col gap-[20px] justify-center items-center pt-[64px] px-[48px] pb-[40px] max-lg:pt-0 max-lg:px-[40px] max-lg:w-full max-phone:px-0">
            <div className="w-full flex flex-col gap-[12px]">
              <p className="text-[24px] font-medium text-black max-phone:hidden">어떤 프롬프트를 업로드 하시겠어요?</p>
              <p className="text-[20px] font-medium text-black phone:hidden">
                어떤 프롬프트를
                <br /> 업로드 하시겠어요?
              </p>
              <p className="text-[16px] font-light text-gray500">AI의 답변 형태를 선택해주세요.</p>
            </div>

            {/* 텍스트 결과 옵션 */}
            <div className="lg:max-w-[541px] phone:min-h-[154px] w-full flex justify-between items-center gap-[20px] p-[16px] bg-gray50 rounded-[12px] max-phone:flex-col">
              <div className="lg:max-w-[234px] w-full phone:h-[122px] lg:min-w-[172px] flex flex-col items-start ">
                <div className="flex justify-start mb-[10px]">
                  <img
                    className="w-[28px] h-[28px] mr-[8px] max-phone:w-[24px] max-phone:h-[24px]"
                    src={iconText}
                    alt="텍스트 아이콘"
                  />
                  <p className="text-[18px] font-medium text-black max-phone:text-[16px]">텍스트 결과</p>
                </div>
                <p className="text-[16px] font-light text-black max-phone:text-[14px]">AI의 답변이 텍스트 형태예요.</p>
              </div>

              <div className="lg:max-w-[234px] phone:h-[122px] lg:min-w-[172px] w-full relative">
                <p className="text-[14px] font-light text-gray-500 line-clamp-6 max-phone:text-[12px]">
                  ##시선을 끄는 광고 카피 제작##
                  <br />
                  "매일 아침 카페 대신, 지구를 사세요"
                  <br />
                  "텀블러 하나로 커피값도, 환경도 절약하기"
                  <br />
                  "출근길, 내 텀블러 없인 이제 못 가요!"
                </p>
              </div>
            </div>

            {/* 이미지 결과 옵션 */}
            <div className="lg:max-w-[541px] phone:h-[154px] w-full flex justify-between lg:items-center max-lg:items-start gap-[20px] p-[16px] bg-gray50 rounded-[12px] max-phone:flex-col">
              <div className="flex flex-col items-start max-lg:w-1/2 max-phone:w-full">
                <div className="flex justify-start mb-[10px]">
                  <img
                    className="w-[28px] h-[28px] mr-[8px] max-phone:w-[24px] max-phone:h-[24px]"
                    src={iconImg}
                    alt="이미지 아이콘"
                  />
                  <p className="text-[18px] font-medium text-black max-phone:text-[16px]">이미지 결과</p>
                </div>
                <p className="text-[16px] font-light text-black max-phone:text-[14px]">AI의 답변이 이미지 형태예요.</p>
              </div>

              <div className="max-lg:w-1/2 max-phone:w-full">
                <img
                  className="lg:w-[240px] h-[122px] rounded-[12px] max-lg:w-full object-cover"
                  src={exampleImg}
                  alt="예시 이미지"
                />
              </div>
            </div>

            <div className="lg:max-w-[541px] h-[154px] w-full flex justify-between gap-[20px]">
              <button
                className="lg:max-w-[260px] h-[65px] w-full rounded-[12px] bg-sub2"
                onClick={() => navigate('/create/text')}>
                <p className="text-[18px] font-medium text-white max-phone:text-[16px]">텍스트 결과</p>
              </button>
              <button
                className="lg:max-w-[260px] h-[65px] w-full rounded-[12px] bg-sub2"
                onClick={() => navigate('/create/img')}>
                <p className="text-[18px] font-medium text-white max-phone:text-[16px]">이미지 결과</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PromptLandingPage;
