import apiClient from './apiClient';

const prefix = '/recommend';
/**
 * @desc 추천 식당 정보 반환
 * @param id: 사용자 id(Number)
 * @param interval_date: 며칠 전 메뉴까지 고려해서 추천할 것인지(Number)
 */
export function insertAccount(requestBody: any) {
  return apiClient.post(`${prefix}/best_menu`, requestBody);
}
