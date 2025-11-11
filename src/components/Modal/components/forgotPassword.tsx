import { useState } from 'react';
import PrimaryButton from '@components/Button/PrimaryButton';
import type { ModalView } from '@/types/LoginPage/auth';
import useRequestResetPasswordAuthCode from '@/hooks/mutations/LoginPage/useRequestResetPasswordAuthCode';
import useVerifyResetPasswordAuthcode from '@/hooks/mutations/LoginPage/useVerifyResetPasswordAuthCode';
import type {resetPasswordVerifyCodeResponse,resetPasswordEmailVerifyResponse} from '@/types/LoginPage/auth';
import Timer from './Timer';

interface LoginViewProps {
  setView: (view: ModalView) => void;
  tempToken: string;
  setTempToken: (tempToken: string) => void;
  email: string;
  setEmail: (email: string) => void;
}
type EmailStatus = 'default' | 'sending' | 'sent' | 'resend' | 'verified';
type CodeStatus = 'idle' | 'request' | 'verified' | 'error';

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  // 여기에 회원가입 로직 추가
};

const ForgotPasswordView = ({ setView, setTempToken, email, setEmail }: LoginViewProps) => {
  const [authCode, setAuthCode] = useState('');
  const [emailError, setEmailError] = useState('');
  const [verificationCodeError, setVerificationCodeError] = useState('');
  const [emailStatus, setEmailStatus] = useState<EmailStatus>('default');
  const [codeStatus, setCodeStatus] = useState<CodeStatus>('request');
  const isDisabled = emailStatus !== 'verified' || codeStatus !== 'verified';

  const { mutate: requestResetPasswordAuthCode } = useRequestResetPasswordAuthCode();
  const { mutate: verifyResetPasswordAuthCode } = useVerifyResetPasswordAuthcode();
  const handleSendCode = () => {
    setEmailStatus('sending');
    // 인증번호 발송 로직
    requestResetPasswordAuthCode(email, {
      onSuccess: (data: resetPasswordEmailVerifyResponse) => {
        console.log('이메일 인증 요청 성공:', data);
        setEmailError('');
        setEmailStatus('sent');
      },
      onError: (error) => {
        setEmailError('이메일 인증 요청에 실패했습니다. 다시 시도해주세요.');
        console.error('이메일 인증 요청 실패:', error);
        setEmailStatus('default');
      },
    });
  };
  const handleVerifyCode = () => {
    // 인증번호 확인 로직
    verifyResetPasswordAuthCode(
      { email, code: authCode },
      {
        onSuccess: (data: resetPasswordVerifyCodeResponse) => {
          console.log('인증번호 확인 성공:', data);
          const token = data.data.tempToken;
          setTempToken(token);
          setCodeStatus('verified');
          setEmailStatus('verified');
          setVerificationCodeError('인증이 완료됐어요.');
        },
        onError: () => {
          setVerificationCodeError('인증번호가 틀려요! 다시 확인해주세요.');
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

      case 'sent': // '02:54' 타이머
        return <Timer initialTime={300} onEnd={() => setEmailStatus('resend')} />;

      case 'resend': // '재발송' 버튼
        return <PrimaryButton buttonType="square" text="재발송" py={6} px={12} textSize={12} onClick={() => {}} />;
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
        <p className=" custom-h2 mb-[24px] text-black">비밀번호 찾기</p>
      </div>
      <form className="flex flex-col w-full" onSubmit={handleSubmit}>
        <div className="relative">
          <label className="custom-h5 mb-[12px] mt-[12.5px] text-black">이메일</label>
          <div className="flex flex-col">
            <input
              type="email"
              id="email"
              placeholder="예) abc1234@gmail.com"
              className="bg-background px-[16px]  py-[12px] placeholder:text-gray-400 text-text-on-white custom-body2 rounded-[8px]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="absolute right-[16px] top-[32px]">{renderEmailAccessory({ emailStatus })}</div>
        </div>
        {emailError && <p className="text-alert custom-button2 mt-[4px]">{emailError}</p>}
        <div className="flex flex-col mb-[40px]">
          <label className="custom-h5 block mb-[12px] mt-[12.5px] text-black">인증번호 입력</label>
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
          onClick={() => {setView('changePassword')}}
        />
      </form>
      <nav aria-label="계정 보조 메뉴" className="flex mt-[28px] gap-[32px] custom-h5 mb-[40px]">
        <button className="text-black" onClick={() => setView('login')}>로그인하기</button>
        <button className="text-black" onClick={() => setView('signup')}>회원가입 하기</button>
      </nav>
    </div>
  );
};

export default ForgotPasswordView;
