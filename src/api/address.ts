import { KOROAD_URL } from 'Constants';
import jsonp from 'jsonp';
import useJSONP from 'use-jsonp'; // https://github.com/Ieuanoh/use-jsonp

const prefix = `${KOROAD_URL}/addrlink`;

interface Options {
  param?: string; // query string으로 넘겨줘야함
  prefix?: string;
  name?: string;
  timeout?: number;
}
/**
 * @desc 주소지 조회
 * @param keyword: 검색어(String)
 */
export function getAddressList(opts: Options) {
  return new Promise(function (resolve, reject) {
    jsonp(`${prefix}/addrLinkApiJsonp.do`, opts, function (err, data) {
      if (err) {
        reject(new Error(`addrLinkApiJsonp error! ${err.message}`));
      } else {
        resolve(data);
      }
    });
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
export function getAddressCoord(opts: Options) {
  return new Promise(function (resolve, reject) {
    jsonp(`${prefix}/addrCoordApiJsonp.do`, opts, function (err, data) {
      if (err) {
        reject(new Error(`addrCoordApiJsonp error! ${err.message}`));
      } else {
        resolve(data);
      }
    });
  });
}
