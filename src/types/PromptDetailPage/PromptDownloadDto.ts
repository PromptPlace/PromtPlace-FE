export type PromptDownloadRaw = {
  message: string;
  title: string;
  prompt?: string;
  content?: string;
  is_free: boolean;
  is_paid: boolean;
  statusCode: number;
};

export type PromptDownload = {
  title: string;
  content: string;
  is_free: boolean;
  is_paid: boolean;
};
