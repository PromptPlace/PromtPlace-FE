import { useEffect, useState } from 'react';
import PrimaryButton from '@components/Button/PrimaryButton';
import eye_visible from '@assets/icon-eye-visible.svg';
import eye_invisible from '@assets/icon-eye-invisible.svg';
import type { ModalView } from '@/types/LoginPage/auth';
import useResetPasswordRequest from '@/hooks/mutations/LoginPage/useResetPasswordRequest';

interface LoginViewProps {
  setView: (view: ModalView) => void;
  tempToken: string;
  email: string;
}

type PasswordStatus = 'default' | 'valid' | 'invalid';
type RepeatPasswordStatus = 'default' | 'match' | 'mismatch';

const ChangePasswordView = ({ setView, tempToken, email }: LoginViewProps) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showrepeatPassword, setShowRepeatPassword] = useState(false);
  const [error, setError] = useState<PasswordStatus>('default'); // 로그인 실패 시 여기에 메시지 설정
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errorRepeat, setErrorRepeat] = useState<RepeatPasswordStatus>('default');

  const isDisabled = errorRepeat !== 'match';

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleRepeatPasswordVisibility = () => {
    setShowRepeatPassword(!showrepeatPassword);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 비밀번호 변경 요청 api 호출 로직 추가
  };

  useEffect(() => {
    if (password === '') {
      setError('default');
      return;
    }

    //영문, 숫자, 특수문자 조합으로 8자 이상의 비밀번호인지 확인
    const isValid = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).{8,}$/.test(password);

    if (isValid) {
      setError('valid');
    } else {
      setError('invalid');
    }
  }, [password]); // password 상태가 변경될 때마다 이 함수가 실행됩니다.

  // 👈 3. '비밀번호 확인' 유효성 검사 (password 또는 repeatPassword가 바뀔 때마다 실행)
  useEffect(() => {
    // 확인란이 비어있으면 메시지를 보여주지 않습니다.
    if (repeatPassword === '') {
      setErrorRepeat('default');
      return;
    }

    // 두 비밀번호가 일치하는지 확인합니다.
    if (password === repeatPassword) {
      setErrorRepeat('match');
    } else {
      setErrorRepeat('mismatch');
    }
  }, [password, repeatPassword]); // 두 상태 중 하나라도 바뀌면 실행됩니다.

  const { mutate: resetPassword } = useResetPasswordRequest();
  const handlePasswordChange = () => {
    console.log('비밀번호 변경 요청:', { email, password, repeatPassword, tempToken });
    resetPassword(
      { email, newPassword: password, confirmPassword: repeatPassword, tempToken },
      {
        onSuccess: () => {
          // 비밀번호 변경 성공 시 처리
          console.log('비밀번호 변경 성공');
          setView('login');
        },
        onError: (error) => {
          // 비밀번호 변경 실패 시 처리
          console.error('비밀번호 변경 실패:', error);
        },
      },
    );
  };

  return (
    <div className="flex flex-col items-center w-full">
      {' '}
      <div className="w-full">
        <p className=" custom-h2 mb-[24px] text-black">비밀번호 찾기</p>
      </div>
      <form className="flex flex-col w-full" onSubmit={handleSubmit}>
        <div className="flex flex-col mb-[20px]">
          <label className="custom-h5 mb-[12px] text-black" htmlFor="password">
            새로운 비밀번호
          </label>
          <div className="relative w-full">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="비밀번호를 입력해주세요."
              className="w-full bg-background px-[16px] py-[12px] custom-body2 placeholder:text-gray-400 text-text-on-white mb-[12px]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* (비밀번호 보기 아이콘 버튼) */}
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-[15px] pr-3 flex items-center">
              <img
                src={showPassword ? eye_visible : eye_invisible}
                alt={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
                className="w-[24px] h-[24px] flex items-center justify-center"
              />
            </button>
          </div>

          {error === 'valid' && (
            <p className="text-primary custom-button2 min-h-5 mt-[4px]">사용 가능한 비밀번호예요.</p>
          )}
          {error === 'invalid' && (
            <p className="text-alert custom-h5 mt-[4px]">
              영문, 숫자, 특수문자 조합으로 8자 이상의 비밀번호를 입력해주세요.
            </p>
          )}
        </div>
        <div className="flex flex-col mb-[40px]">
          <label className="custom-h5 mb-[12px] text-black" htmlFor="repeat-password">
            비밀번호 확인
          </label>
          <div className="relative w-full">
            <input
              type={showrepeatPassword ? 'text' : 'password'}
              id="repeat-password"
              placeholder="비밀번호를 한번 더 입력해주세요."
              className="w-full bg-background px-[16px] py-[12px] custom-body2 placeholder:text-gray-400 text-text-on-white mb-[12px]"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
            {/* (비밀번호 보기 아이콘 버튼) */}
            <button
              type="button"
              onClick={toggleRepeatPasswordVisibility}
              className="absolute inset-y-0 right-[15px] pr-3 flex items-center">
              <img
                src={showrepeatPassword ? eye_visible : eye_invisible}
                alt={showrepeatPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
                className="w-[24px] h-[24px] flex items-center justify-center"
              />
            </button>
          </div>

          {errorRepeat === 'mismatch' && (
            <p className="text-alert custom-button2 mt-[4px] min-h-5">비밀번호가 달라요! 확인해 보시겠어요?</p>
          )}
          {errorRepeat === 'match' && (
            <p className="text-primary custom-button2 mt-[4px] min-h-5">동일한 비밀번호예요</p>
          )}
        </div>
        <PrimaryButton
          buttonType="full"
          type="submit"
          text="변경하기"
          textColor="white"
          disable={isDisabled}
          onClick={handlePasswordChange}
        />
      </form>
      <nav aria-label="계정 보조 메뉴" className="flex mt-[28px] gap-[32px] custom-h5 mb-[40px]">
        {/* 수정필요  Link가 아닌 signup, find-password가 렌더링 되도록*/}
        <button className="text-black" onClick={() => setView('login')}>로그인하기</button>
        <button className="text-black" onClick={() => setView('signup')}>회원가입하기</button>
      </nav>
    </div>
  );
};

export default ChangePasswordView;
