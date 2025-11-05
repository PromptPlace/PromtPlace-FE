import { useState } from 'react';
import PrimaryButton from '@components/Button/PrimaryButton';
import type { ModalView } from '@/types/LoginPage/auth';
import {postInitialSetup} from '@/apis/Login/auth';
interface LoginViewProps {
  setView: (view: ModalView) => void;
}

//로그인 뷰 렌더링하는 컴포넌트

const OnBoardingView = ({ setView }: LoginViewProps) => {
  const [nickName, setNickName] = useState('');
  const [introduce, setIntroduce] = useState('');
  const [error, setError] = useState('');

  const isDisabled = nickName === '' || nickName.length > 10 || introduce === '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await postInitialSetup({ nickname: nickName, intro:introduce });
      console.log(data);
      setView('close');
    } catch (error) {
      setError('초기 설정에 실패했습니다. 다시 시도해주세요.');
      console.error('초기 설정 오류:', error);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      {' '}
      <div className="w-full">
        <p className=" custom-h2 mb-[8px] text-black">시작하기 전에, 닉네임과 소개말을 작성해주세요!</p>
        <p className=" custom-h3 mb-[24px] text-black">마이페이지에 작성될 정보에요.</p>
      </div>
      <form className="flex flex-col w-full" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="custom-h5 mb-[12px] text-black">닉네임</label>
          <input
            type="text"
            id="nickname"
            placeholder="서비스 내에서 사용할 닉네임을 적어주세요(최대 10자)"
            className="bg-background px-[16px] py-[12px] placeholder:text-gray-400 text-text-on-white custom-body2 mb-[20px] rounded-[8px]"
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-[40px]">
          <label className="custom-h5 mb-[12px] text-black" htmlFor="introduce">
            소개말
          </label>
          <div className="relative w-full">
            <input
              id="introduce"
              placeholder="자유롭게 소개를 적어보세요."
              className="w-full bg-background px-[16px] py-[12px] custom-body2 placeholder:text-gray-400 text-text-on-white rounded-[8px]"
              value={introduce}
              onChange={(e) => setIntroduce(e.target.value)}
            />
          </div>

          {error && <p className="text-alert custom-h5 mt-[4px]">{error}</p>}
        </div>
        <PrimaryButton
          buttonType="full"
          type="submit"
          text="시작하기"
          textColor="white"
          disable={isDisabled}
        onClick={() => {}}
        />
        <div className="mt-[90px]"></div>
      </form>
    </div>
  );
};

export default OnBoardingView;
