import apiClient from './apiClient';

const prefix = '/history';
/**
 * @desc 추천 메뉴 선택 혹은 거절 했을 때 log 입력
 * @param id: 사용자 id(Number)
 * @param place_id: 식당 식별자
 * @param place_name: 식당명
 * @param category_name: 식당종류
 * @param good_bad: 선택: 1, 거절: 0
 * @param x: lon
 * @param y: lat
 * @param interval_date: 며칠 전 메뉴까지 고려해서 추천할 것인지(Number)
 */
export function insertHistory(requestBody: any) {
  return apiClient.post(`${prefix}/insert_history`, requestBody);
}

/**
 * @desc 최근 선택한 음식점 히스토리 반환
 * @param id: 사용자 id(Number)
 * @param interval_date: 며칠 전 메뉴까지 고려해서 추천할 것인지(Number)
 */
export function getPlaceHistory(requestBody: any) {
  return apiClient.post(`${prefix}/get_place_history`, requestBody);
}

/**
 * @desc 최근 선택한 음식점 히스토리 반환
 * @param id: 사용자 id(Number)
 * @param interval_date: 며칠 전 메뉴까지 고려해서 추천할 것인지(Number)
 */
export function checkToday(requestBody: any) {
  return apiClient.post(`${prefix}/check_today`, requestBody);
}

/**
 * @desc 음식점 자동완성 api
 * @param q: 사용자 입력 문자열(String)
 */
export function getPlaceAuto(requestBody: any) {
  return apiClient.post(`${prefix}/place_auto`, requestBody);
}

/**
 * @desc 음식명 자동완성 api
 * @param q: 사용자 입력 문자열(String)
 */
export function getFoodAuto(requestBody: any) {
  return apiClient.post(`${prefix}/food_auto`, requestBody);
}

/**
 * @desc 데이메뉴 등록 api
 * @param
 */
export function insertDayMenu(requestBody: any) {
  return apiClient.post(`${prefix}/insert_day_menu`, requestBody);
}

/**
 * @desc 데이메뉴 삭제 api
 * @param id: 사용자 id(Number)
 * @param date: 데이 메뉴 날짜(Number)
 */
export function deleteDayMenu(requestBody: any) {
  return apiClient.post(`${prefix}/delete_day_menu`, requestBody);
}
