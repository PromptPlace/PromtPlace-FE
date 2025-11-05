import { useState, useEffect,} from 'react';
import { Link } from 'react-router-dom';
import PrimaryButton from '@components/Button/PrimaryButton';
import type { ModalView } from '@/types/LoginPage/auth';
import useRequestSignupEmailCode from '@/hooks/mutations/LoginPage/useRequestSignupEmailCode';
import useVerifySignupAuthcode from '@/hooks/mutations/LoginPage/useVerifySignupAuthCode';
import Timer from './Timer';
import type { signupVerifyCodeResponse } from '@/types/LoginPage/auth';


interface LoginViewProps {
  setView: (view: ModalView) => void;
  email: string;
  setEmail: (email: string) => void;
  tempToken: string;
  setTempToken: (tempToken: string) => void;
}
type EmailStatus = 'default' | 'sending' | 'sent' | 'resend' | 'verified';
type CodeStatus = 'idle' | 'request' | 'verified' | 'error';

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  // 여기에 회원가입 로직 추가
};

const SignupView = ({ setView, email, setEmail, tempToken, setTempToken }: LoginViewProps) => {
  const [authCode, setAuthCode] = useState('');
  const [emailError, setEmailError] = useState('');
  const [verificationCodeError, setVerificationCodeError] = useState('');
  const [emailStatus, setEmailStatus] = useState<EmailStatus>('default');
  const [codeStatus, setCodeStatus] = useState<CodeStatus>('request');
  const isDisabled = emailStatus !== 'verified' || codeStatus !== 'verified';

  const { mutate: requestSignupEmailCode } = useRequestSignupEmailCode();
  const { mutate: verifySignupAuthCode } = useVerifySignupAuthcode();
  const handleSendCode = () => {
    // 인증번호 발송 로직
    setEmailStatus('sending');
    requestSignupEmailCode(email, {
      onSuccess: () => {
        setEmailStatus('sent');
        setEmailError('');
      },
      onError: (error) => {
        setEmailError('이미 가입한 이메일이에요! 다시 확인해주세요.');
        console.error('이메일 인증 요청 실패:', error);
      },
    });
  };

  const handleVerifyCode = () => {
    // 인증번호 확인 로직
    verifySignupAuthCode(
      { email, code: authCode },
      {
        onSuccess: (data: signupVerifyCodeResponse) => {
          console.log('인증번호 확인 성공:', data);
          const token = data.data.tempToken;
          setTempToken(token);
          setCodeStatus('verified');
          setEmailStatus('verified');
          setEmailError('');
          setVerificationCodeError('인증 완료됐어요.');
        },
        onError: () => {
          setVerificationCodeError('인증번호 확인에 실패했습니다. 다시 시도해주세요.');
          console.error('인증번호 확인 실패:');
        },
      },
    );
  };

  const renderEmailAccessory = ({ emailStatus }: { emailStatus: EmailStatus }) => {
    switch (emailStatus) {
      case 'default': // '인증번호 발송' 버튼
        return (
          <PrimaryButton
            buttonType="square"
            text="인증번호 발송"
            py={6}
            px={12}
            textSize={12}
            onClick={handleSendCode}
          />
        );
      case 'sending': // '전송 중' (로딩 스피너 등)
        return <PrimaryButton buttonType="square" text="전송 중" py={6} px={12} textSize={12} onClick={() => {}} />;

      case 'sent':
        return <Timer initialTime={300} onEnd={() => setEmailStatus('resend')} />;

      case 'resend': // '재발송' 버튼
        return (
          <PrimaryButton buttonType="square" text="재발송" py={6} px={12} textSize={12} onClick={handleSendCode} />
        );
      case 'verified': // '인증 완료' 텍스트
        return (
          <PrimaryButton
            buttonType="square"
            text="인증 완료"
            textColor="white"
            py={6}
            px={12}
            textSize={12}
            onClick={() => {}}
          />
        );

      default:
        return null;
    }
  };

  const renderCodeAccessory = ({ codeStatus }: { codeStatus: CodeStatus }) => {
    switch (codeStatus) {
      case 'verified': // '인증 완료' 텍스트
        return (
          <PrimaryButton
            buttonType="square"
            text="인증 완료"
            textColor="white"
            py={6}
            px={12}
            textSize={12}
            onClick={() => {}}
          />
        );

      case 'request': // '인증 확인'
        return (
          <PrimaryButton buttonType="square" text="인증 확인" py={6} px={12} textSize={12} onClick={handleVerifyCode} />
        );
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      {' '}
      <div className="w-full">
        <p className=" custom-h2 mb-[8px] text-black">회원가입하기</p>
        <p className=" custom-h3 mb-[24px] text-black">프롬프트 플레이스에서 나를 위한 프롬프트를 찾아보세요</p>
      </div>
      <form className="flex flex-col w-full" onSubmit={handleSubmit}>
        <div className="relative">
          <label className="custom-h5 mb-[12px] text-black">이메일</label>
          <div className="flex flex-col">
            <input
              type="email"
              id="email"
              placeholder="예) abc1234@gmail.com"
              className="bg-background px-[16px] py-[12px] placeholder:text-gray-400 text-text-on-white custom-body2  rounded-[8px]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="absolute right-[16px] top-[32px]">{renderEmailAccessory({ emailStatus })}</div>
        </div>
        <p className="text-alert custom-button2 mt-[4px] min-h-5">{emailError}</p>
        <div className="flex flex-col mb-[40px]">
          <label className="custom-h5 mb-[12px] mt-[12.5px] text-black">인증번호 입력</label>
          <div className="relative w-full">
            <input
              id="verificationCode"
              placeholder="숫자 여섯 자리를 입력해 주세요"
              className="w-full bg-background px-[16px] py-[12px] custom-body2 placeholder:text-gray-400 text-text-on-white  rounded-[8px]"
              value={authCode}
              onChange={(e) => setAuthCode(e.target.value)}
            />
            <div className="absolute right-[16px] top-[8px]">{renderCodeAccessory({ codeStatus })}</div>
          </div>

          <p className={`${codeStatus === 'verified' ? 'text-primary' : 'text-alert'} custom-button2 mt-[4px] min-h-5`}>
            {verificationCodeError}
          </p>
        </div>
        <PrimaryButton
          buttonType="full"
          type="submit"
          text="다음"
          textColor="white"
          disable={isDisabled}
          onClick={() => setView('initPassword')}
        />
      </form>
      <nav aria-label="계정 보조 메뉴" className="flex mt-[28px] gap-[32px] custom-h5 mb-[40px]">
        <button className="text-black" onClick={() => setView('login')}>로그인하기</button>
        <button className="text-black" onClick={() => setView('forgotPassword')}>비밀번호 찾기</button>
      </nav>
    </div>
  );
};

export default SignupView;
