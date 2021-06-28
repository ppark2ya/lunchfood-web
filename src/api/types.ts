export interface ApiResponse<T = any> {
  resultCode: number;
  resultMsg: string;
  data?: T;
}

export interface Account {
  id: number;
  age?: string;
  birthday?: string;
  birthyear?: string;
  gender?: string;
  x?: number; // lon
  y?: number; // lat
  address?: string;
  type?: string;
  radius?: number;
  radius_on?: number;
  place_on?: number;
  date_on?: number;
  set_date?: number;
}

export type AddressResponseType = {
  common: AddressCommonResult;
  juso: Array<AddressRoadItem> | Array<AddressCoordItem>;
};

export interface AddressApiResponse<R extends AddressResponseType> {
  results: R;
}

export interface AddressCommonResult {
  totalCount: number;
  errorCode: string;
  errorMessage: string;
  currentPage?: number;
  countPerPage?: number;
}

export interface AddressRoadItem {
  roadAddr: string; // 전체 도로명주소
  roadAddrPart1: string; // 도로명주소(참고항목 제외)
  roadAddrPart2?: string; // 도로명주소 참고항목
  jibunAddr: string; // 지번주소
  engAddr: string; // 도로명주소(영문)
  zipNo: string; // 우편번호
  admCd: string; // 행정구역코드
  rnMgtSn: string; // 도로명코드
  bdMgtSn: string; // 건물관리번호
  detBdNmList?: string; // 상세건물명
  bdNm?: string; // 건물명
  bdKdcd: string; // 공동주택여부(1 : 공동주택, 0 : 비공동주택)
  siNm: string; // 시도명
  sggNm: string; // 시군구명
  emdNm: string; // 읍면동명
  liNm?: string; // 법정리명
  rn: string; // 도로명
  udrtYn: string; // 지하여부(0 : 지상, 1 : 지하)
  buldMnnm: number; // 건물본번
  buldSlno: number; // 건물부번
  mtYn: string; // 산여부(0 : 대지, 1 : 산)
  lnbrMnnm: number; // 지번본번(번지)
  lnbrSlno: number; // 지번부번(호)
  emdNo: string; // 읍면동일련번호
  hstryYn?: string; // 변동이력여부(0: 현행 주소정보, 1: 요청변수의 keyword(검색어)가 변동된 주소정보에서 검색된 정보)
  relJibun?: string; // 관련지번
  hemdNm?: string; // 관할주민센터 ※ 참고정보이며, 실제와 다를 수 있습니다.
}

export interface CoordItemParams {
  admCd: string;
  rnMgtSn: string;
  udrtYn: string;
  buldMnnm: number;
  buldSlno: number;
  roadAddr: string;
}
export interface AddressCoordItem {
  admCd: string; // 행정구역코드
  rnMgtSn: string; // 도로명코드
  bdMgtSn: string; // 건물관리번호
  udrtYn: string; // 지하여부(0 : 지상, 1 : 지하)
  buldMnnm: number; // 건물본번
  buldSlno: number; // 건물부번
  entX: number; // X좌표
  entY: number; // Y좌표
  bdNm?: string; // 건물명
}

export interface BestMenu {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: number;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: number; // lon
  y: number; // lat
}

export interface PlaceInfo {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: number; // place_id
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: number;
  y: number;
}

export interface AccountPlaceInfo {
  place_id: number;
  place_name: string;
}

export interface HistoryDayMenu {
  id: number; // 사용자 id
  place_id: number; // 카카오 api에서 넘어온 식당 식별자(BestMenu.id)
  place_name: string; // 식당이름
  menu_name: string; // 음식명
  category: string; // 식당종류
  score: string; // 평점
  menu_diary: string; // 짧은 글
  menu_image_1?: string;
  menu_image_2?: string;
  menu_image_3?: string;
  menu_image_4?: string;
  menu_image_5?: string;
  inserted_date: string;
}
