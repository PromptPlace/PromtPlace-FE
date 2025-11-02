import { useState } from 'react';
import { Link } from 'react-router-dom';
import PrimaryButton from '@components/Button/PrimaryButton';
import type { ModalView } from '@/types/LoginPage/auth';

interface LoginViewProps {
  setView: (view: ModalView) => void;
}
type EmailStatus = 'default' | 'sending' | 'sent' | 'resend' | 'verified';
type CodeStatus = 'idle' | 'request' | 'verified' | 'error';

const handleSendCode = () => {
  // 인증번호 발송 로직 구현
};

const renderEmailAccessory = ({ emailStatus }: { emailStatus: EmailStatus }) => {
  switch (emailStatus) {
    case 'default': // '인증번호 발송' 버튼
      return <PrimaryButton buttonType="square" text="인증번호 발송" py={6} px={12} textSize={12} onClick={() => {}} />;
    case 'sending': // '전송 중' (로딩 스피너 등)
      return <PrimaryButton buttonType="square" text="전송 중" py={6} px={12} textSize={12} onClick={() => {}} />;

    case 'sent': // '02:54' 타이머
      // (여기서 Timer 컴포넌트를 렌더링하고,
      //  시간이 0이 되면 setEmailStatus('error')로 변경)
      return <span>02:54</span>; // <Timer onEnd={() => setEmailStatus('error')} />

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
      return <PrimaryButton buttonType="square" text="인증 확인" py={6} px={12} textSize={12} onClick={() => {}} />;
  }
};

const handleVerifyCode = () => {
  // 인증번호 확인 로직
};

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  // 여기에 회원가입 로직 추가
};

const ForgotPasswordView = ({ setView }: LoginViewProps) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationCodeError, setVerificationCodeError] = useState('');
  const [emailStatus, setEmailStatus] = useState<EmailStatus>('default');
  const [codeStatus, setCodeStatus] = useState<CodeStatus>('request');
  const isDisabled = emailStatus !== 'verified' || codeStatus !== 'verified';

  return (
    <div className="flex flex-col items-center w-full">
      {' '}
      <div className="w-full">
        <p className=" custom-h2 mb-[8px]">비밀번호 찾기</p>
      </div>
      <form className="flex flex-col w-full" onSubmit={handleSubmit}>
        <div className="relative">
          <label className="custom-h5 mb-[12px]">이메일</label>
          <div className="flex flex-col">
            <input
              type="email"
              id="email"
              placeholder="예) abc1234@gmail.com"
              className="bg-background px-[16px] py-[12px] placeholder:text-gray-400 text-text-on-white custom-body2 mb-[20px] rounded-[8px]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="absolute right-[16px] top-[32px]">{renderEmailAccessory({ emailStatus })}</div>
        </div>
        {emailError && <p className="text-alert custom-h5 mt-[4px]">{emailError}</p>}
        <div className="flex flex-col mb-[40px]">
          <label className="custom-h5 mb-[12px]">인증번호 입력</label>
          <div className="relative w-full">
            <input
              id="verificationCode"
              placeholder="숫자 네 자리를 입력해 주세요"
              className="w-full bg-background px-[16px] py-[12px] custom-body2 placeholder:text-gray-400 text-text-on-white mb-[12px] rounded-[8px]"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
            <div className="absolute right-[16px] top-[8px]">{renderCodeAccessory({ codeStatus })}</div>
          </div>

          {verificationCodeError && <p className="text-alert custom-h5 mt-[4px]">{verificationCodeError}</p>}
        </div>
        <PrimaryButton
          buttonType="full"
          type="submit"
          text="다음"
          textColor="white"
          disable={isDisabled}
          onClick={() => {}}
        />
      </form>
      <nav aria-label="계정 보조 메뉴" className="flex mt-[28px] gap-[32px] custom-h5 mb-[40px]">
        <button onClick={() => setView('login')}>로그인하기</button>
        <button onClick={() => setView('signup')}>회원가입 하기</button>
      </nav>
    </div>
  );
};

export default ForgotPasswordView;