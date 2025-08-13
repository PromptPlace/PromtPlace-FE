export type TagDto = {
  tag_id: number;
  name: string;
};

export type ModelDto = {
  name: string;
};

export type PromptDetailDto = {
  prompt_id: number;
  user_id: number;
  title: string;
  prompt: string;
  prompt_result: string;
  has_image: boolean;
  description: string;
  usage_guide: string;
  price: number;
  is_free: boolean;
  downloads: number;
  views: number;
  likes: number;
  review_counts: number;
  rating_avg: number;
  created_at: string;
  updated_at: string;
  inactive_date: string | null;
  download_url: string | null;

  user: {
    user_id: number;
    nickname: string;
    profileImage: { url: string } | null;
  };
  models: {
    promptmodel_id: number;
    prompt_id: number;
    model_id: number;
    model: { name: string };
  }[];
  tags: {
    prompttag_id: number;
    prompt_id: number;
    tag_id: number;
    tag: { tag_id: number; name: string };
  }[];
  images: {
    image_url: string;
    order_index: number;
  }[];
};
