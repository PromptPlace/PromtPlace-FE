import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext'; // 기존에 만들어둔 AuthContext

const GoogleCallbackPage = () => {
  // URL의 쿼리 파라미터(?code=...)를 쉽게 다루게 해주는 훅
  const [searchParams] = useSearchParams();
  // 페이지 이동을 위한 훅
  const navigate = useNavigate();
  // 기존에 만들어둔 login 함수를 가져오기 위한 훅
  const { login } = useAuth();

  // 이 컴포넌트가 화면에 렌더링되면 단 한 번만 실행됩니다.
  useEffect(() => {
    const processLogin = async () => {
      // 1. URL에서 'code' 라는 이름의 파라미터 값을 추출합니다.
      const authCode = searchParams.get('code');

      // 2. 만약 authCode가 존재한다면, 로그인 절차를 진행합니다.
      if (authCode) {
        try {
          // 3. 기존에 구현해둔 login 함수를 호출합니다!
          await login('google', authCode);

          // 4. 로그인 성공 시, 메인 페이지로 이동시킵니다.
          navigate('/');
        } catch (error) {
          // 백엔드에서 에러가 발생한 경우
          console.error('로그인 처리 중 에러 발생:', error);
          alert('로그인에 실패했습니다. 다시 시도해주세요.');
          navigate('/login'); // 에러 발생 시 로그인 페이지로 이동
        }
      } else {
        // 'code' 파라미터 없이 비정상적으로 접근한 경우
        alert('잘못된 접근입니다.');
        navigate('/login');
      }
    };

    processLogin();
  }, []); // 빈 배열을 전달하여 최초 렌더링 시에만 실행되도록 설정

  // 사용자에게는 이 메시지만 보입니다.
  return <div>구글 로그인 처리 중입니다. 잠시만 기다려주세요...</div>;
};

export default GoogleCallbackPage;
