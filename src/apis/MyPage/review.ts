import { axiosInstance } from '@/apis/axios';
import type {
  WrittenReviewsApiResponse,
  ReceivedReviewsApiResponse,
  ReceivedReviewsFetchResponse,
  WrittenReviewsFetchResponse,
} from '@/types/MyPage/review';

export const getWrittenReviews = async ({
  pageParam, // useInfiniteQuery가 넘겨주는 cursor
  limit = 5, // 한 번에 가져올 리뷰 수
}: {
  pageParam: number | undefined; // 페이지 파라미터는 다음 페이지의 커서 역할을 합니다.
  limit?: number;
}): Promise<WrittenReviewsFetchResponse> => {
  const params = new URLSearchParams();
  if (pageParam) {
    params.append('cursor', String(pageParam));
  }
  params.append('limit', String(limit));

  const { data } = await axiosInstance.get<WrittenReviewsApiResponse>(`/api/reviews/me`, {
    params,
  });

  // useInfiniteQuery가 사용하기 쉽도록 실제 데이터가 담긴 객체를 반환
  return data.data;
};

export const getReceivedReviews = async ({
  pageParam,
  limit = 10,
}: {
  pageParam: number | undefined;
  limit?: number;
}): Promise<ReceivedReviewsFetchResponse> => {
  const params = new URLSearchParams();
  if (pageParam) {
    params.append('cursor', String(pageParam));
  }
  params.append('limit', String(limit));

  // 👇 API 엔드포인트만 변경됩니다. (예시: /api/reviews/received)
  const { data } = await axiosInstance.get<ReceivedReviewsApiResponse>(`/api/reviews/received-reviews/me`, {
    params,
  });

  return data.data;
};

export const deleteReview = async (reviewId: number) => {
  await axiosInstance.delete(`/api/reviews/${reviewId}`);
};
