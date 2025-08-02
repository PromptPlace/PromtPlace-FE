export type CommonResponse<T> = {
  statusCode: number;
  message: string;
  data: T;
};
