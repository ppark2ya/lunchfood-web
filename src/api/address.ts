import { KOROAD_URL } from 'Constants';
import jsonp from 'jsonp';

const prefix = `${KOROAD_URL}/addrlink`;

/**
 * @desc 주소지 조회
 * @param keyword: 검색어(String)
 */
export function getAddressList(
  param: any,
  successCallback: (data: any) => void,
  errorCallback: () => void,
) {
  jsonp(`${prefix}/addrLinkApiJsonp.do`, param, function (err, data) {
    if (err) {
      console.error(err);
      errorCallback();
    } else {
      console.log(data);
      successCallback(data);
    }
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
export function getAddressCoord(
  param: any,
  successCallback: (data: any) => void,
  errorCallback: () => void,
) {
  jsonp(`${prefix}/addrCoordApiJsonp.do`, param, function (err, data) {
    if (err) {
      console.error(err);
      errorCallback();
    } else {
      console.log(data);
      successCallback(data);
    }
  });
}
