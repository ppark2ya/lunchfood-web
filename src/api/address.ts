import apiClient from './apiClient';
import {
  AddressApiResponse,
  AddressCommonResult,
  AddressRoadItem,
  AddressCoordItem,
} from './types';

const prefix = `${import.meta.env.VITE_KOROAD_URL}/addrlink`;

export const defaultAddrParams = {
  confmKey: import.meta.env.VITE_OPEN_API_ROAD_ADDRESS_KEY,
  currentPage: 1,
  countPerPage: 10,
  resultType: 'json',
  keyword: '',
};

/**
 * @desc 주소지 조회
 * @param keyword: 검색어(String)
 */
export function getAddressList(keyword: string) {
  return apiClient.get<
    AddressApiResponse<{
      common: AddressCommonResult;
      juso: Array<AddressRoadItem>;
    }>
  >(`${prefix}/addrLinkApi.do`, {
    params: {
      ...defaultAddrParams,
      keyword,
    },
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
export function getAddressCoord(params: {
  confmKey: string;
  admCd: string;
  rnMgtSn: string;
  udrtYn: string;
  buldMnnm: number;
  buldSlno: number;
  roadAddr: string;
}) {
  return apiClient.get<
    AddressApiResponse<{
      common: AddressCommonResult;
      juso: Array<AddressCoordItem>;
    }>
  >(`${prefix}/addrCoordApi.do`, {
    params,
  });
}
