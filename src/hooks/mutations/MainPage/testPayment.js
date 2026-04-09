import usePayment from "./usePostRequestPayment.js"; // mjs 환경에서는 확장자 필요

// 1. window.PortOne 모킹
globalThis.window = {}; // Node 환경에서는 window가 없음
window.PortOne = {
  requestPayment: (options) => {
    console.log('PortOne SDK 호출됨, 옵션:', options);

    // 2초 뒤 결제 완료 시뮬레이션
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockResult = {
          paymentId: 'MOCK_PAYMENT_12345',
          status: 'paid', // paid / cancelled
        };
        resolve(mockResult);
      }, 2000);
    });
  },
};

// 2. 테스트 실행
const { handlePayment } = usePayment();

handlePayment(101) // 예시 promptId
  .then((result) => console.log('테스트 성공:', result))
  .catch((err) => console.error('테스트 실패:', err));
