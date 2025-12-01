import { useState, useEffect } from 'react';
import PrimaryButton from '@components/Button/PrimaryButton';
import type { ModalView } from '@/types/LoginPage/auth';
import UnCheckIcon from '@assets/icon-terms-check-white-stroke.svg';
import CheckIcon from '@assets/icon-terms-check.svg';
import AllChcekIcon from '@assets/icon-check-white-stroke.svg';
import AllUnCheckIcon from '@assets/icon-check-blue-circle.svg';
import useSignUpRequest from '@/hooks/mutations/LoginPage/useSignUpRequest';
import type { signupRequest } from '@/types/LoginPage/auth';

interface LoginViewProps {
  setView: (view: ModalView) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  tempToken: string;
}

interface CustomCheckboxProps {
  isChecked: boolean;
  label: string;
  onClick: () => void;
}

const CustomCheckbox = ({ isChecked, label, onClick }: CustomCheckboxProps) => (
  <button type="button" onClick={onClick} className="flex items-center py-[4px]">
    <div className="flex items-center justify-center w-[44px] h-[44px] ml-[20px]">
      <img src={isChecked ? CheckIcon : UnCheckIcon} alt={isChecked ? 'checked' : 'unchecked'} />
    </div>
    <span className="custom-body2 max-phone:text-[12px]">{label}</span>
  </button>
);

const AgreeTermsView = ({ setView, email, password, tempToken }: LoginViewProps) => {
  const [allChecked, setAllChecked] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [ageChecked, setAgeChecked] = useState(false);
  //마케팅은 필수x
  const [marketingChecked, setMarketingChecked] = useState(false);
  const isDisabled = !(termsChecked && privacyChecked && ageChecked);
  const handleAllChecked = () => {
    const nextChecked = !allChecked; // 현재 상태의 반대로 설정
    setAllChecked(nextChecked);
    setTermsChecked(nextChecked);
    setPrivacyChecked(nextChecked);
    setAgeChecked(nextChecked);
    setMarketingChecked(nextChecked);
  };

  useEffect(() => {
    if (termsChecked && privacyChecked && ageChecked && marketingChecked) {
      setAllChecked(true);
    } else {
      setAllChecked(false);
    }
  }, [termsChecked, privacyChecked, ageChecked, marketingChecked]);

  const { mutate: signUpRequest } = useSignUpRequest();

  const formData: signupRequest = {
    email,
    password,
    tempToken,
    consents: [
      { type: 'SERVICE_TERMS_REQUIRED', isAgreed: termsChecked },
      { type: 'PRIVACY_POLICY_REQUIRED', isAgreed: privacyChecked },
      { type: 'OVER_14_REQUIRED', isAgreed: ageChecked },
      { type: 'MARKETING_OPTIONAL', isAgreed: marketingChecked },
    ],
  };

  const handleSubmit = () => {
    signUpRequest(formData, {
      onSuccess: (data) => {
        console.log('회원가입 성공:', data);
        // 추가적인 성공 처리 로직 작성
      },
      onError: (error) => {
        console.error('회원가입 실패:', error);
        // 추가적인 오류 처리 로직 작성
      },
    });
  };

  return (
    <form className="flex flex-col items-center w-full" onSubmit={handleSubmit}>
      <div className="w-full">
        <p className=" custom-h2 max-phone:text-[20px] mb-[8px] text-black">
          서비스를 이용하기 위해서
          <br />
          아래의 이용약관에 동의해 주세요.
        </p>
        <p className=" custom-h3 max-phone:text-[14px] mb-[24px] text-black">
          필수 약관에 동의해야 서비스를 사용할 수 있어요.
        </p>
        <section className="mb-[40px] max-phone:mb-[32px]">
          <div className="flex items-center" onClick={handleAllChecked}>
            <img src={allChecked ? AllUnCheckIcon : AllChcekIcon} alt="all-check" className="m-[10px]" />
            <span className="custom-h5 max-phone:text-[14px] text-black">모두 동의합니다.</span>
          </div>
          <CustomCheckbox
            isChecked={termsChecked}
            label="(필수) 서비스 이용약관에 동의"
            onClick={() => setTermsChecked(!termsChecked)}
          />
          <CustomCheckbox
            isChecked={privacyChecked}
            label="(필수) 개인정보 수집 및 이용 동의"
            onClick={() => setPrivacyChecked(!privacyChecked)}
          />
          <CustomCheckbox
            isChecked={ageChecked}
            label="(필수) 만 14세 이상입니다."
            onClick={() => setAgeChecked(!ageChecked)}
          />
          <CustomCheckbox
            isChecked={marketingChecked}
            label="(선택) 마케팅 정보 수신 동의"
            onClick={() => setMarketingChecked(!marketingChecked)}
          />
        </section>
      </div>

      <button
        type="submit"
        onClick={handleSubmit}
        disabled={isDisabled}
        className={`flex items-center justify-center shadow-button hover:shadow-button-hover
       transition-all ease-in-out duration-300 w-full custom-h4 max-phone:text-[16px] border-none px-[20px]! py-[20px]! rounded-[12px]
       bg-primary text-white
        ${isDisabled && 'border-gray400! text-gray400! bg-gray300! hover:bg-gray300! active:bg-gray300! cursor-not-allowed'}`}>
        회원가입하기
      </button>

      <nav
        aria-label="계정 보조 메뉴"
        className="flex mt-[28px] gap-[32px] custom-h5 max-phone:text-[14px] mb-[40px] max-phone:mb-[32px]">
        <button className="text-black" onClick={() => setView('login')}>
          로그인하기
        </button>
        <button className="text-black" onClick={() => setView('forgotPassword')}>
          비밀번호 찾기
        </button>
      </nav>
    </form>
  );
};

export default AgreeTermsView;
