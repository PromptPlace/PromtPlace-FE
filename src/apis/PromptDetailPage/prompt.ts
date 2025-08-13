import { axiosInstance } from '@/apis/axios';
import type { PromptDetailDto, ApiEnvelopeSnake } from '@/types/PromptDetailPage/PromptDetailDto';

export async function getPromptDetail(promptId: number): Promise<PromptDetailDto> {
  const res = await axiosInstance.get<ApiEnvelopeSnake<PromptDetailDto>>(`api/prompts/${promptId}/details`);
  const d = res.data.data;

  if (!d || typeof d.prompt_id !== 'number') {
    throw new Error(`프롬프트 상세 데이터를 불러올 수 없습니다.`);
  }

  return {
    prompt_id: d.prompt_id,
    user_id: d.user_id,
    title: d.title,
    prompt: d.prompt,
    prompt_result: d.prompt_result,
    has_image: d.has_image,
    description: d.description,
    usage_guide: d.usage_guide,
    price: d.price,
    is_free: d.is_free,
    downloads: d.downloads,
    views: d.views,
    likes: d.likes,
    review_counts: d.review_counts,
    rating_avg: d.rating_avg,
    created_at: d.created_at,
    updated_at: d.updated_at,
    inactive_date: d.inactive_date,
    download_url: d.download_url ?? null,

    user: {
      user_id: d.user.user_id,
      nickname: d.user.nickname,
      profileImage: d.user.profileImage,
    },
    models: d.models ?? [],
    tags: d.tags ?? [],
    images: d.images ?? [],
  };
}
