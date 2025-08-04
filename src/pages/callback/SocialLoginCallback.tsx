import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

/**
 * 네이버, 카카오 등 리디렉션 방식의 소셜 로그인을 통합 처리하는 콜백 페이지입니다.
 * 각 소셜 플랫폼이 인가 코드/토큰을 전달하는 방식의 차이를 이용해 로직을 분기합니다.
 */
const SocialLoginCallback = () => {
  const location = useLocation();
  const { login } = useAuth();

  useEffect(() => {
    const handleSocialLogin = async () => {
      // 네이버 처리 로직
      // 네이버는 JS SDK 사용 시, 콜백 URL의 해시(#) 부분에 토큰을 담아 반환합니다.
      // 예: http://.../callback#access_token=NAVER_TOKEN...
      if (location.hash) {
        // location.hash는 '#'을 포함하므로, substring(1)으로 제거합니다.
        const hash = location.hash.substring(1);
        const params = new URLSearchParams(hash);
        const naverToken = params.get('access_token');

        if (naverToken) {
          console.log('✅ 네이버 토큰(인가 코드 역할) 받기 성공:', naverToken);
          await login('naver', naverToken);
          return 'success'; // 처리 성공을 나타내는 문자열 반환
        }
      }

      // 카카오 처리 로직
      // 카카오는 표준 OAuth 2.0 방식에 따라, 콜백 URL의 쿼리 스트링(?)에 인가 코드를 담아 반환합니다.
      // 예: http://.../callback?code=KAKAO_CODE...
      if (location.search) {
        const params = new URLSearchParams(location.search);
        const kakaoCode = params.get('code');

        if (kakaoCode) {
          console.log('✅ 카카오 인가 코드 받기 성공:', kakaoCode);
          await login('kakao', kakaoCode);
          return 'success'; // 처리 성공을 나타내는 문자열 반환
        }
      }

      // 위 두 경우에 모두 해당하지 않으면 실패로 간주합니다.
      return 'fail';
    };

    handleSocialLogin()
      .then((result) => {
        if (result === 'success') {
          // 로그인 성공 시, 팝업을 띄운 부모 창이 있다면 해당 창을 메인으로 이동시키고
          // 현재 팝업창은 닫습니다.
          if (window.opener) {
            window.opener.location.href = '/';
          }
          window.close();
        } else {
          // 성공적으로 처리되지 않았을 경우 에러를 발생시킵니다.
          throw new Error('유효한 소셜 로그인 정보를 찾을 수 없습니다.');
        }
      })
      .catch((error) => {
        console.error('❗️ 소셜 로그인 처리 과정에서 에러 발생', error);
        alert('로그인에 실패했습니다. 다시 시도해주세요.');
        window.close();
      });
  }, [location, login]); // location과 login 함수가 변경될 때만 이 효과를 다시 실행합니다.

  return <div>소셜 로그인 처리 중입니다...</div>;
};

export default SocialLoginCallback;
