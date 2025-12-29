export type Post = {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  is_visible: boolean;
  file_url: string | null;
};
