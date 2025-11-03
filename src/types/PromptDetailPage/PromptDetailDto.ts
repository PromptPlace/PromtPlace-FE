export type TagDto = {
  tag_id: number;
  name: string;
};

export type ModelDto = {
  name: string;
};

export interface PromptDetailDto {
  prompt_id: number;
  user_id: number;
  title: string;
  description: string;
  prompt: string;
  prompt_result: string;
  usage_guide: string;
  has_image: boolean;
  price: number;
  is_free: boolean;
  downloads: number;
  views: number;
  likes: number;
  model_version?: string | null;
  created_at: string;
  updated_at: string;
  inactive_date: string | null;

  user: {
    user_id: number;
    nickname: string;
    profileImage: string | null;
    intro: string | null;
    sns_list: { url: string }[];
  };

  models: {
    name: string;
  }[];

  categories: {
    promptcategory_id: number;
    prompt_id: number;
    category_id: number;
    category: {
      category_id: number;
      name: string;
      mainCategory: {
        name: string;
      };
    };
  }[];

  images: {
    image_url: string;
    order_index: number;
  }[];

  review_count: number;
  review_rating_avg: number;
}
