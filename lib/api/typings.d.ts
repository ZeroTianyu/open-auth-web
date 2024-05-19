export interface Result<T> {
  code: number;
  message: string;
  success: boolean;
  data: T;
}
