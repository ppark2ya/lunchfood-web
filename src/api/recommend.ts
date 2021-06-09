import apiClient from './apiClient';
import { ApiResponse, BestMenu } from './types';

const prefix = '/recommend';
/**
 * @desc 추천 식당 정보 반환
 * @param id: 사용자 id(Number)
 * @param interval_date: 며칠 전 메뉴까지 고려해서 추천할 것인지(Number)
 */
export function getBestMenuList(requestBody: {
  id: number;
  interval_date: number;
}) {
  return apiClient.post<ApiResponse<Array<BestMenu>>>(
    `${prefix}/best_menu`,
    requestBody,
  );
}
