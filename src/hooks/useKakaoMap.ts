/**
 * case1: 내 위치로 주소 설정
 *  - KakaoMap 컴포넌트 렌더링 전에 geolocation 권한을 획득해야 들어갈 수 있도록 유도
 *  - userCoord props 에 gps 좌표값 넣어서 map 생성 후 Geocoder 객체 이용해서 주소 노출, 설정 가능
 *
 * case2: 내 위치 + 추천 맛집 보여주기
 *  - case1 와 마찬가지로 geolocation 권한을 획득해야 화면을 보여주도록 할 것인지, 없으면 그냥 맛집 위치만 표시할지 정해야 함
 *  - getAccount(id) 를 통해서 유저 위치 정보 얻어오기
 *  - getBestMenuList() 를 통해서 추천 맛집 리스트 얻어오기
 *  - checkToday() 를 통해서 오늘 선택한 추천 맛집 리스트 얻어오기
 *  - getAccount().join([...checkToday(), getBestMenuList()]) 지도에 뿌려주기
 */
import { DEFAULT_POSITION, LatLng, COMMON_MESSAGE } from 'Constants';
import { useState, useCallback, useEffect } from 'react';

interface IKakaoMapProps {
  /**
   * KakaoMap DIV ref
   */
  mapRef: React.RefObject<HTMLDivElement>;
  /**
   * 사용자 위치정보(y, x) -> gps 혹은 계정에 저장된 좌표정보
   */
  markerPositions?: LatLng[];
}
/**
 * 참고 URLS
 * https://codesandbox.io/s/gifted-wescoff-77nwu?file=/src/KakaoMap.js:868-877
 * https://apis.map.kakao.com/web/sample/setBounds/
 * https://apis.map.kakao.com/web/documentation/#services_Geocoder_coord2RegionCode
 * https://apis.map.kakao.com/web/sample/multipleMarkerImage/
 */
function useKakaoMap({ mapRef, markerPositions = [DEFAULT_POSITION, DEFAULT_POSITION] }: IKakaoMapProps) {
  const [kakaoMap, setKakaoMap] = useState<kakao.maps.Map>();
  const [geocoder, setGeocoder] = useState<kakao.maps.services.Geocoder>();
  const [jibunAddressName, setjibunAddressName] = useState('');
  const [roadAddressName, setroadAddressName] = useState('');
  const [markers, setMarkers] = useState<kakao.maps.Marker[]>([]);
  /**
   * 사용자 위치 기반으로 카카오맵 로드
   */
  useEffect(() => {
    const script = document.getElementById('kakao-map-sdk');
    if (script != null) {
      script.onload = () => {
        kakao.maps.load(() => {
          const position = new kakao.maps.LatLng(...DEFAULT_POSITION);
          const options = {
            center: position,
            level: 3,
          };
          if (mapRef.current) {
            const map = new kakao.maps.Map(mapRef.current, options);
            setKakaoMap(map);
            // 주소-좌표 변환 객체를 생성합니다
            setGeocoder(new kakao.maps.services.Geocoder());
          }
        });
      };
    }
  }, [mapRef]);

  const removeMarkers = useCallback(() => {
    markers.forEach((marker) => marker.setMap(null));
  }, [markers]);

  /**
   * 사용자 위치와 추천 가게의 위치의 중간 좌표를 중심점으로 잡고 marker 표시
   */
  useEffect(() => {
    if (kakaoMap) {
      const positions = markerPositions.map(
        (pos) => new kakao.maps.LatLng(...pos),
      );

      /**
       * markerPosition을 props로 관리하면서 useEffect에서
       * 마커 삭제하는 함수를 따로 분리 안하면 삭제가 안되는데 정확한 이유는 모르겠음..
       */
      removeMarkers();
      setMarkers(
        positions.map((position, idx) => {
          const imageSrc = `/src/assets/mb_ic_${idx === 0 ? 'user_gps' : 'place'
            }_position.svg`;
          const imageSize = new kakao.maps.Size(30, 33);
          const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

          return new kakao.maps.Marker({
            map: kakaoMap,
            position,
            image: markerImage, // 마커이미지 설정
          });
        }),
      );

      if (positions.length > 0) {
        const bounds = new kakao.maps.LatLngBounds();
        positions.forEach((latlng) => bounds.extend(latlng));
        kakaoMap.setBounds(bounds);
      }
    }
  }, [kakaoMap, markerPositions]);

  const onSearchAddrFromCoords = useCallback(
    (
      coords: kakao.maps.LatLng,
      callback: (
        result: Array<kakao.maps.services.Coord2RegionCodeResponse>,
        status: kakao.maps.services.Status,
      ) => void,
    ) => {
      // 좌표로 행정동 주소 정보를 요청합니다
      geocoder?.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
    },
    [geocoder],
  );

  // https://apis.map.kakao.com/web/sample/coord2addr/
  const onSearchDetailAddrFromCoords = useCallback(
    (
      coords: kakao.maps.LatLng,
      callback: (
        result: Array<kakao.maps.services.Coord2AddressResponse>,
        status: kakao.maps.services.Status,
      ) => void,
    ) => {
      // 좌표로 법정동 상세 주소 정보를 요청합니다
      geocoder?.coord2Address(coords.getLng(), coords.getLat(), callback);
    },
    [geocoder],
  );

  // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
  const onDisplayCenterInfo = useCallback(
    (
      result: Array<kakao.maps.services.Coord2RegionCodeResponse>,
      status: kakao.maps.services.Status,
    ) => {
      if (status === kakao.maps.services.Status.OK) {
        console.log('주소::: ', result);
      }
    },
    [],
  );

  const onDisplayAddressName = useCallback(
    (
      result: Array<kakao.maps.services.Coord2AddressResponse>,
      status: kakao.maps.services.Status,
    ) => {
      if (status === kakao.maps.services.Status.OK) {
        try {
          const { address, road_address } = result[0];
          setjibunAddressName(address.address_name);
          setroadAddressName(road_address?.address_name || '');
        } catch (e) {
          setjibunAddressName(COMMON_MESSAGE.ADDRESS_MESSAGES.LOAD_FAIL);
          setroadAddressName(COMMON_MESSAGE.ADDRESS_MESSAGES.INFO);
        }
      } else {
        setjibunAddressName(COMMON_MESSAGE.ADDRESS_MESSAGES.LOAD_FAIL);
        setroadAddressName(COMMON_MESSAGE.ADDRESS_MESSAGES.INFO);
      }
    },
    [],
  );

  return {
    kakaoMap,
    geocoder,
    jibunAddressName,
    roadAddressName,
    onSearchAddrFromCoords,
    onSearchDetailAddrFromCoords,
    onDisplayCenterInfo,
    onDisplayAddressName,
  };
}

export default useKakaoMap;
