import { isAxiosError } from 'axios';

interface ErrorResponseBody {
  message?: string;
}

// 백엔드가 내려준 message를 그대로 반환합니다. (프론트에서 임의의 에러 메시지를 만들지 않음)
// 응답 body에 message가 없는 경우(네트워크 오류 등)에는 에러 객체가 가진 message를 사용합니다.
export const getErrorMessage = (error: unknown): string => {
  if (isAxiosError<ErrorResponseBody>(error)) {
    return error.response?.data?.message ?? error.message;
  }
  return error instanceof Error ? error.message : String(error);
};
