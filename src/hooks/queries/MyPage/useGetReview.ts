import { useInfiniteQuery } from '@tanstack/react-query';
import { getWrittenReviews, getReceivedReviews } from '@/apis/MyPage/review';

interface UseGetWrittenReviewsOptions {
  enabled?: boolean;
}

interface UseGetReceivedReviewsOptions {
  enabled?: boolean;
}

export const useGetWrittenReviews = (options?: UseGetWrittenReviewsOptions) => {
  return useInfiniteQuery({
    queryKey: ['my', 'writtenReviews'],
    queryFn: ({ pageParam }) => getWrittenReviews({ pageParam }),
    initialPageParam: undefined as number | undefined, // 첫 페이지 요청 시 cursor는 undefined
    getNextPageParam: (lastPage) => {
      if (!lastPage.has_more) {
        return undefined;
      }
      const lastReview = lastPage.reviews[lastPage.reviews.length - 1];
      return lastReview?.review_id;
    },
    enabled: options?.enabled,
  });
};

export const useGetReceivedReviews = (options?: UseGetReceivedReviewsOptions) => {
  return useInfiniteQuery({
    queryKey: ['my', 'receivedReviews'],
    queryFn: ({ pageParam }) => getReceivedReviews({ pageParam }),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => {
      if (!lastPage.has_more) {
        return undefined;
      }
      const lastReview = lastPage.reviews[lastPage.reviews.length - 1];
      return lastReview?.review_id;
    },
    enabled: options?.enabled,
  });
};
