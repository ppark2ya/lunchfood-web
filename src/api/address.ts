import apiClient from './apiClient';
import { KOROAD_URL } from 'Constants';

const prefix = `${KOROAD_URL}/addrlink`;

/**
 * @desc 주소지 조회
 * @param keyword: 검색어(String)
 */
export function getAddressList(params: any) {
  return apiClient.get(`${prefix}/addrLinkApi.do`, {
    params,
  });
}

/**
 * @desc 도로명주소 좌표계 조회(UTM-K 좌표계 사용)
 * @param admCd: 행정구역코드(String)
 * @param rnMgtSn: 도로명코드(String)
 * @param udrtYn: 지하여부(0 : 지상, 1 : 지하)(String)
 * @param buldMnnm: 건물본번(Number)
 * @param buldSlno: 건물부번(Number)
 */
export function getAddressCoord(params: any) {
  return apiClient.get(`${prefix}/addrCoordApi.do`, {
    params,
  });
}
