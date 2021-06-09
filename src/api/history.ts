import apiClient from './apiClient';
import { ApiResponse, BestMenu, PlaceInfo, HistoryDayMenu } from './types';

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
 */
export function insertHistory(requestBody: {
  id: number;
  place_id: number;
  place_name: string;
  category_name: string;
  good_bad: number;
  x: string;
  y: string;
}) {
  return apiClient.post<ApiResponse>(`${prefix}/insert_history`, requestBody);
}

/**
 * @desc 최근 선택한 음식점 히스토리 반환
 * @param id: 사용자 id(Number)
 * @param year(String)
 * @param month(String)
 * @param interval_date: 며칠 전 메뉴까지 고려해서 추천할 것인지(Number)
 */
export function getPlaceHistory(requestBody: {
  id: number;
  year: string;
  month: string;
  interval_date: number;
}) {
  return apiClient.post<ApiResponse<Array<HistoryDayMenu>>>(
    `${prefix}/get_place_history`,
    requestBody,
  );
}

/**
 * @desc 최근 선택한 음식점 히스토리 반환
 * @param id: 사용자 id(Number)
 * @param interval_date: 며칠 전 메뉴까지 고려해서 추천할 것인지(Number)
 */
export function checkToday(id: number) {
  return apiClient.get<ApiResponse<Array<BestMenu>>>(`${prefix}/check_today`, {
    params: id,
  });
}

/**
 * @desc 음식점 자동완성 api
 * @param q: 사용자 입력 문자열(String)
 */
export function getPlaceAuto(q: string) {
  return apiClient.post<ApiResponse<Array<PlaceInfo>>>(`${prefix}/place_auto`, {
    q,
  });
}

/**
 * @desc 음식명 자동완성 api
 * @param q: 사용자 입력 문자열(String)
 */
export function getFoodAuto(q: string) {
  return apiClient.post<ApiResponse<Array<string>>>(`${prefix}/food_auto`, {
    q,
  });
}

/**
 * @desc 데이메뉴 등록 api
 * @param
 */
export function insertDayMenu(requestBody: HistoryDayMenu) {
  return apiClient.post<ApiResponse>(`${prefix}/insert_day_menu`, {
    ...requestBody,
    menu_text: requestBody['menu_diary'],
    menu_img_1: '',
    menu_img_2: '',
    menu_img_3: '',
    menu_img_4: '',
    menu_img_5: '',
  });
}

/**
 * @desc 데이메뉴 삭제 api
 * @param id: 사용자 id(Number)
 * @param date: 데이 메뉴 날짜(Number)
 */
export function deleteDayMenu(requestBody: { id: number; date: string }) {
  return apiClient.post<ApiResponse>(`${prefix}/delete_day_menu`, requestBody);
}
