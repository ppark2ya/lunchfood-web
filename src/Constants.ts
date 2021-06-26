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
};
