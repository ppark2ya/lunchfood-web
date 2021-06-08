export interface ApiResponse<T = any> {
  resultCode: string;
  resultMsg: string;
  data?: T;
}
