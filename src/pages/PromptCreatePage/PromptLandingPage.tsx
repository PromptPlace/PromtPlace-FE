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
      {/** Web 화면 */}
      <div className="hidden min-[1026px]:block">
        <div className="h-screen flex justify-center items-center gap-[72px] mt-[152px] mb-[170px] mx-[120px]">
          {/* 왼쪽 영역 */}
          <div className="max-w-[527px] min-h-[575px] w-full  ">
            <div className="flex justify-end">
              <img className="w-[150px] h-[130px]" src={twostars} alt="별 2개" />
            </div>
            <div className="mt-[24px] mb-[87px]">
              <p className="text-[18px] font-light text-gray950">프롬프트 올리기</p>
              <p className="mt-[8px] mb-[24px] text-[32px] font-medium text-black">프롬프트를 작성하고 판매해보세요!</p>
              <p className="text-[16px] font-light text-black">나만의 AI 프롬프트를 업로드하고 판매하세요.</p>
            </div>
            <div>
              <img className="w-[210px] h-[210px]" src={onestar} alt="별 1개" />
            </div>
          </div>

          {/* 오른쪽 카드 */}
          <div
            className="max-w-[637px] max-h-[605px] w-full h-full rounded-[16px] bg-white flex flex-col justify-center 
          items-center pt-[64px] px-[48px]">
            <div className="max-w-[541px] h-[68px] w-full ">
              <p className="text-[24px] font-medium text-black">어떤 프롬프트를 업로드 하시겠어요?</p>
              <p className="text-[16px] font-light text-gray500">AI의 답변 목적을 선택해주세요.</p>
            </div>

            {/* 텍스트 결과 옵션 */}
            <div className="max-w-[541px] min-h-[154px] w-full flex justify-between items-center gap-[20px] p-[16px] mt-[20px]">
              <div className="max-w-[234px] h-[122px] min-w-[172px] flex flex-col items-start ">
                <div className="flex justify-start mb-[10px]">
                  <img className="w-[28px] h-[28px] mr-[8px]" src={iconText} alt="텍스트 아이콘" />
                  <p className="text-[18px] font-medium text-black">텍스트 결과</p>
                </div>
                <p className="text-[16px] font-light text-black">AI의 답변이 텍스트 형태에요.</p>
              </div>

              <div className="max-w-[234px] h-[122px] min-w-[172px] w-full overflow-hidden relative">
                <p className="text-[14px] font-light text-gray-500 line-clamp-6">
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
            <div className="max-w-[541px] h-[154px] w-full flex justify-between items-center gap-[20px] p-[16px] mt-[20px]">
              <div className="flex flex-col items-start">
                <div className="flex justify-start mb-[10px]">
                  <img className="w-[28px] h-[28px] mr-[8px]" src={iconImg} alt="이미지 아이콘" />
                  <p className="text-[18px] font-medium text-black">이미지 결과</p>
                </div>
                <p className="text-[16px] font-light text-black">AI의 답변이 이미지 형태예요.</p>
              </div>

              <div>
                <img className="w-[240px] h-[122px] rounded-[12px] " src={exampleImg} alt="예시 이미지" />
              </div>
            </div>

            {/* 버튼들 */}
            <div className="max-w-[541px] h-[154px] w-full flex justify-between gap-[20px] mt-[20px]">
              <button
                className="max-w-[260px] h-[65px] w-full rounded-[12px] bg-sub2"
                onClick={() => navigate('/create/text')}>
                <p className="text-[18px] font-medium text-white">텍스트 결과</p>
              </button>
              <button
                className="max-w-[260px] h-[65px] w-full rounded-[12px] bg-sub2"
                onClick={() => navigate('/create/img')}>
                <p className="text-[18px] font-medium text-white">이미지 결과</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 481px ~ 1025px: 태블릿 */}
      <div className="hidden min-[481px]:block min-[1026px]:hidden">
        <div className="relative">
          {/* 상단 텍스트 영역 */}
          <div className=" mt-[64px] mb-[64px] ml-[40px]">
            <p className="text-[18px] font-light text-gray950">프롬프트 올리기</p>
            <p className="mt-[8px] mb-[24px] text-[32px] font-medium text-black">
              프롬프트를 작성하고
              <br />
              판매해보세요!
            </p>
            <p className="text-[16px] font-light text-black">나만의 AI 프롬프트를 업로드하고 판매하세요.</p>
          </div>

          {/* 오른쪽 위 고정 이미지 */}
          <img src={twostars} alt="stars" className="absolute top-[24px] right-[40px] w-[150px] h-[130px]" />
        </div>

        {/* 하단 카드 */}
        <div className="flex justify-center ">
          <div
            className="max-w-[637px] max-h-[605px] w-full h-full  flex flex-col justify-center 
          items-center pt-[64px] px-[48px]">
            <div className="max-w-[541px] h-[68px] w-full ">
              <p className="text-[24px] font-medium text-black">어떤 프롬프트를 업로드 하시겠어요?</p>
              <p className="text-[16px] font-light text-gray500">AI의 답변 목적을 선택해주세요.</p>
            </div>

            {/* 텍스트 결과 옵션 */}
            <div className="max-w-[541px] min-h-[154px] w-full flex justify-between items-center gap-[20px] p-[16px] mt-[20px]">
              <div className="max-w-[234px] h-[122px] min-w-[172px] flex flex-col items-start ">
                <div className="flex justify-start mb-[10px]">
                  <img className="w-[28px] h-[28px] mr-[8px]" src={iconText} alt="텍스트 아이콘" />
                  <p className="text-[18px] font-medium text-black">텍스트 결과</p>
                </div>
                <p className="text-[16px] font-light text-black">AI의 답변이 텍스트 형태에요.</p>
              </div>

              <div className="max-w-[234px] h-[122px] min-w-[172px] w-full overflow-hidden relative">
                <p className="text-[14px] font-light text-gray-500 line-clamp-6">
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
            <div className="max-w-[541px] h-[154px] w-full flex justify-between items-center gap-[20px] p-[16px] mt-[20px]">
              <div className="flex flex-col items-start">
                <div className="flex justify-start mb-[10px]">
                  <img className="w-[28px] h-[28px] mr-[8px]" src={iconImg} alt="이미지 아이콘" />
                  <p className="text-[18px] font-medium text-black">이미지 결과</p>
                </div>
                <p className="text-[16px] font-light text-black">AI의 답변이 이미지 형태예요.</p>
              </div>

              <div>
                <img className="w-[240px] h-[122px] rounded-[12px] " src={exampleImg} alt="예시 이미지" />
              </div>
            </div>

            {/* 버튼들 */}
            <div className="max-w-[541px] h-[154px] w-full flex justify-between gap-[20px] mt-[20px]">
              <button
                className="max-w-[260px] h-[65px] w-full rounded-[12px] bg-sub2"
                onClick={() => navigate('/create/text')}>
                <p className="text-[18px] font-medium text-white">텍스트 결과</p>
              </button>
              <button
                className="max-w-[260px] h-[65px] w-full rounded-[12px] bg-sub2"
                onClick={() => navigate('/create/img')}>
                <p className="text-[18px] font-medium text-white">이미지 결과</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 480px 이하: 모바일 */}
      <div className="block min-[480px]:hidden">
        {/* 오른쪽 위 고정 이미지 */}
        <img src={twostars} alt="stars" className="absolute top-[162px] right-[40px] w-[80px] h-[70px]" />
        <div className="relative">
          {/* 상단 텍스트 영역 */}
          <div className=" mt-[64px] mb-[64px] ml-[40px]">
            <p className="text-[16px] font-light text-gray950">프롬프트 올리기</p>
            <p className="mt-[8px] mb-[24px] text-[24px] font-medium text-black">
              프롬프트를 작성하고
              <br />
              판매해보세요!
            </p>
            <p className="text-[14px] font-light text-black">나만의 AI 프롬프트를 업로드하고 판매하세요.</p>
          </div>
        </div>
      </div>
      <div className="block min-[480px]:hidden">
        <div className="mt-[123px] px-[20px]">
          <div className="">
            <div className=" w-full  h-[105px]">
              <p className="text-[20px] font-medium text-black">
                어떤 프롬프트를
                <br />
                업로드 하시겠어요?
              </p>
              <p className="text-[16px] font-light text-gray500">AI의 답변 목적을 선택해주세요.</p>
            </div>
          </div>
        </div>
        <div className="mt-[20px] px-[20px]">
          {/**텍스트 올리기 */}
          <div className="py-[16px] px-[20px]">
            <div className="flex justify-start mb-[20px]">
              <img className="w-[28px] h-[28px] mr-[8px]" src={iconText} alt="텍스트 아이콘" />
              <p className="text-[18px] font-medium text-black">텍스트 결과</p>
            </div>
            <p className="text-[14px] font-light text-black">AI의 답변이 텍스트 형태에요.</p>
            <div className="mt-[20px]">
              <p className="text-[12px] font-light text-gray-500">
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
          {/**이미지 올리기 */}
          <div className="w-full py-[16px] px-[20px] mt-[32px]">
            <div className="flex justify-start mb-[20px]">
              <img className="w-[28px] h-[28px] mr-[8px]" src={iconImg} alt="이미지 아이콘" />
              <p className="text-[18px] font-medium text-black">이미지 결과</p>
            </div>
            <p className="text-[14px] font-light text-black">AI의 답변이 이미지 형태에요.</p>
            <div className="w-full mt-[20px]">
              <img className="w-full h-[110px] rounded-[12px] object-cover" src={exampleImg} alt="예시 이미지" />
            </div>
          </div>
        </div>
        {/* 버튼들 */}
        <div className="w-full flex justify-center gap-[20px] mt-[20px] px-[20px]">
          <button className=" h-[62px] w-full rounded-[12px] bg-sub2" onClick={() => navigate('/create/text')}>
            <p className="text-[16px] font-medium text-white">텍스트 결과</p>
          </button>
          <button className=" h-[62px] w-full rounded-[12px] bg-sub2" onClick={() => navigate('/create/img')}>
            <p className="text-[16px] font-medium text-white">이미지 결과</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default PromptLandingPage;
