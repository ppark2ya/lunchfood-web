import apiClient from './apiClient';
import { ApiResponse, Account } from './types';

const prefix = '/account';

/**
 * @desc 회원가입
 * @param id: 사용자 id(Number)
 * @param age: 나이(String)
 * @param birthday: 생일(String)
 * @param birthyear(String)
 * @param gender: 성별(String)
 */
export function insertAccount(requestBody: Account) {
  return apiClient.post<ApiResponse>(`${prefix}/insert_acc`, requestBody);
}

/**
 * @desc 카카오 계정 정보 반환
 * @param id: 사용자 id(Number)
 */
export function getAccount(requestBody: { id: number }) {
  return apiClient.post<ApiResponse<Account>>(`${prefix}/get_acc`, requestBody);
}

/**
 * @desc 계정 정보에 위치 정보 업데이트
 * @param id: 사용자 id(Number)
 * @param x: 경도(lon)(String)
 * @param y: 위도(lat)(String)
 * @param address: 도로명주소(String)
 * @param type: UTMK or WGS84(String)
 */
export function updateLocation(requestBody: Account) {
  return apiClient.post<ApiResponse>(`${prefix}/update_location`, requestBody);
}
