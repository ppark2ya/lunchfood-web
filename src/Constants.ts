export const INTERVAL_DATE = 3;
export const API_ERROR_MSG = '';
export type LatLng = [number, number];
export const DEFAULT_POSITION: LatLng = [37.5076415, 127.0556521];

export const COMMON_MESSAGE = {
  ADDRESS_MESSAGES: {
    NO_RESULT: '검색결과가 없습니다. 주소를 다시 입력해주세요',
    LOADING: '주소 정보를 불러오는 중 입니다...',
    LOAD_FAIL: '주소를 불러오는데 실패했습니다.',
    INFO: '직접입력을 이용해 주세요.',
    GET_ERROR:
      '선택하신 주소의 좌표를 얻는데 실패했습니다. 관리자에게 문의하세요',
    UPDATE_ERROR: '선택하신 주소 저장에 실패했습니다. 관리자에게 문의하세요',
  },
  ACCOUNT_MESSAGE: {
    NO_RESULT: '사용자 정보 조회 결과가 없습니다.',
    LOAD_FAIL: '사용자 정보 조회에 실패했습니다.',
  },
};

export interface ISelectOption {
  value: string;
  name: string;
}

export const RADIUS_LIST: ISelectOption[] = [
  { value: '100', name: '100M' },
  { value: '200', name: '200M' },
  { value: '300', name: '300M' },
  { value: '400', name: '400M' },
  { value: '500', name: '500M' },
  { value: '600', name: '600M' },
  { value: '700', name: '700M' },
  { value: '800', name: '800M' },
  { value: '900', name: '900M' },
  { value: '1000', name: '1000M' },
];

export const LIMIT_DATE_LIST: ISelectOption[] = [
  { value: '1', name: '1일' },
  { value: '2', name: '2일' },
  { value: '3', name: '3일' },
  { value: '4', name: '4일' },
  { value: '5', name: '5일' },
  { value: '6', name: '6일' },
  { value: '7', name: '7일' },
  { value: '14', name: '2주' },
  { value: '21', name: '3주' },
  { value: '28', name: '4주' },
];
