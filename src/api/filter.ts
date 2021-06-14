import apiClient from './apiClient';
import { ApiResponse, AccountPlaceInfo } from './types';

const prefix = '/filter';
/**
 * @desc 선호 음식점 입력
 * @param id: 사용자 id(Number)
 * @param place_id: 카카오 api에서 넘어온 식당 식별자(Number)
 * @param place_name: 식당이름(String)
 */
export function insertSelectedPlace(requestBody: {
  id: number;
  place_id: number;
  place_name: string;
}) {
  return apiClient.post<ApiResponse>(
    `${prefix}/insert_selected_place`,
    requestBody,
  );
}

/**
 * @desc 계정 정보에 필터링 정보 업데이트
 * @param id: 사용자 id(Number)
 * @param radius: 거리 필터링 값 (on=0 일때, 0값 입력하면 됨)(Number)
 * @param radius_on: 거리 제한 필터 (0:비활성, 1:활성)(Number)
 * @param place_on: 식당 필터 (0:비활성, 1:활성)(Number)
 * @param set_date: 제한 일자(Number)
 * @param date_on: 제한 일자 필터 (0:비활성, 1:활성)(Number)
 */
export function updateFilter(requestBody: {
  id: number;
  radius: number;
  radius_on: number;
  place_on: number;
  set_date: number;
  date_on: number;
}) {
  return apiClient.post<ApiResponse>(`${prefix}/update_filter`, requestBody);
}

/**
 * @desc 음식점 필터링 정보 반환
 * @param id: 사용자 id(Number)
 */
export function getSelectedPlace(id: number) {
  return apiClient.post<ApiResponse<Array<AccountPlaceInfo>>>(
    `${prefix}/get_selected_place`,
    { id },
  );
}

/**
 * @desc 음식점 필터링 정보 삭제
 * @param id: 사용자 id(Number)
 * @param place_id: 음식점 식별자(Number)
 */
export function deleteSelectedPlace(requestBody: {
  id: number;
  place_id: number;
}) {
  return apiClient.post<ApiResponse>(
    `${prefix}/delete_selected_place`,
    requestBody,
  );
}
