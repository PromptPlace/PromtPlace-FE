export interface PromptImage {
    image_url: string;
}

export interface Prompt {
    authorname: string;
    authorimage: string|null;
    prompt_id: number;
    title: string;
    description: string;
    has_image: boolean;
    is_free: boolean;
    model: string;
    price: number;
    downloadCount: number;
    views: number;
    likes: number;
    rating_avg: number;
    created_at: string;
    updated_at: string;
    images?: PromptImage[];
    tags: string[];
    keyword?: string; // 검색 기능을 위한 키워드
}

export interface Creator {
    id: number;
    name: string;
    avatar: string|null;
    followers: number;
    followed: boolean;
}