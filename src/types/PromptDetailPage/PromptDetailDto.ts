export type TagDto = {
  tag_id: number;
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
    profileImage: string | null;
  };
  models: {
    model: {
      name: string;
    };
  }[];
  tags: {
    tag: {
      tag_id: number;
      name: string;
    };
  }[];
  images: {
    image_url: string;
    order_index: number;
  }[];
};

export type ApiEnvelopeSnake<T> = {
  status_code?: number;
  statusCode?: number;
  message?: string;
  data: T;
};
