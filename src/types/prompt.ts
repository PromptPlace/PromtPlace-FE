export interface Prompt {
    id: number;
    authorImg: string|null;
    authorName: string;
    model: string;
    title: string;
    price: number;
    rating: number;
    views: number;
    downloadCount: number;
    content: string;
    likes: number;
    tags: string[];
}

export interface Creator {
    id: number;
    name: string;
    avatar: string|null;
    followers: number;
    followed: boolean;
}