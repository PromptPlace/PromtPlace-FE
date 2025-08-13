// src/api/social.ts

/**
 * provider에 따라 소셜 로그인을 실행하고,
 * 백엔드에 전달할 임시 '인가 코드'를 반환하는 함수
 * @param provider - 'google', 'kakao', 'naver' 중 하나
 * @returns {Promise<string>} 인가 코드 (Authorization Code)
 */
export const requestSocialLogin = (provider: 'google' | 'kakao' | 'naver'): Promise<string> => {
  return new Promise((resolve, reject) => {
    switch (provider) {
      case 'google':
        // @react-oauth/google 라이브러리를 사용하는 로직
        // 이 라이브러리는 보통 팝업을 띄우고 성공 시 '인가 코드'를 반환합니다.
        // googleLogin().then(code => resolve(code)).catch(reject);
        console.log('구글 dkd로그인 시도');
        resolve('google_auth_code_example'); // 예시 코드
        break;

      case 'kakao':
        // window.Kakao.Auth.login를 사용하는 로직
        // window.Kakao.Auth.login({
        //   success: (authObj) => resolve(authObj.access_token),
        //   fail: (err) => reject(err),
        // });
        console.log('카카오 로그인 시도');
        resolve('kakao_auth_code_example'); // 예시 코드
        break;

      case 'naver':
        // 네이버 SDK 로그인 로직
        console.log('네이버 로그인 시도');
        resolve('naver_auth_code_example'); // 예시 코드
        break;

      default:
        reject(new Error('지원하지 않는 소셜 로그인입니다.'));
    }
  });
};
