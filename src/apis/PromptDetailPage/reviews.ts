import { axiosInstance } from '@/apis/axios';
import type { ApiEnvelopeCamel, PromptReviewListDto, PromptReviewDto } from '@/types/PromptDetailPage/PromptReviewDto';
import type { RequestCreateReviewDto, ResponseCreateReviewDto } from '@/types/PromptDetailPage/PromptReviewDto';
import type {
  ResponseDeleteReviewDto,
  ResponseUpdateReviewDto,
  RequestUpdateReviewDto,
} from '@/types/PromptDetailPage/PromptReviewDto';
import type { CommonResponse } from '@/types/common';

export const getPromptReviews = async (promptId: number, params?: { cursor?: number; limit?: number }) => {
  const { data } = await axiosInstance.get<ApiEnvelopeCamel<PromptReviewListDto>>(`/api/reviews/${promptId}`, {
    params,
  });
  return data.data;
};

export const getAllPromptReviews = async (
  promptId: number,
  perPage = 50,
  maxLoops = 200,
): Promise<PromptReviewDto[]> => {
  let cursor: number | undefined = undefined;
  const acc: PromptReviewDto[] = [];
  let totalCount: number | undefined;

  for (let i = 0; i < maxLoops; i++) {
    const page = await getPromptReviews(promptId, { cursor, limit: perPage });
    const reviews = page.reviews ?? [];
    acc.push(...reviews);

    if (typeof totalCount === 'number' && acc.length >= totalCount) break;

    if (!page.has_more || reviews.length === 0) break;
    cursor = reviews[reviews.length - 1].review_id;
  }

  return acc;
};

export const deleteReview = async (reviewId: number) => {
  const { data } = await axiosInstance.delete<CommonResponse<ResponseDeleteReviewDto['data']>>(
    `/api/reviews/${reviewId}`,
  );
  return data;
};

export const updateReview = async (reviewId: number, body: RequestUpdateReviewDto) => {
  const { data } = await axiosInstance.patch<CommonResponse<ResponseUpdateReviewDto['data']>>(
    `/api/reviews/${reviewId}`,
    body,
  );
  return data;
};

export async function createReview(promptId: number, body: RequestCreateReviewDto) {
  const { data } = await axiosInstance.post<CommonResponse<ResponseCreateReviewDto['data']>>(
    `/api/reviews/${promptId}`,
    body,
  );
  return data;
}
