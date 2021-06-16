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
import React, {
  useState,
  useRef,
  useEffect,
  CSSProperties,
  useCallback,
} from 'react';

import getGeoLocation from 'utils/getGeoLocation';

type LatLng = [number, number];
interface IKakaoMapProps {
  width?: string;
  height?: string;
  /**
   * 사용자 위치정보(y, x) -> gps 혹은 계정에 저장된 좌표정보
   */
  userCoord?: LatLng;
  /**
   * place 위치정보(y, x)
   */
  placeCoord?: LatLng;
  style?: CSSProperties;
}
const DEFAULT_POSITION: LatLng = [37.5076415, 127.0556521];

// 참고: https://devtalk.kakao.com/t/topic/106470/10
// https://codesandbox.io/s/gifted-wescoff-77nwu?file=/src/App.js
function KakaoMap(props: IKakaoMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [kakaoMap, setKakaoMap] = useState<kakao.maps.Map>();
  const [geocoder, setGeocoder] = useState<kakao.maps.services.Geocoder>();
  const [userPosition, setUserPosition] = useState<LatLng>(DEFAULT_POSITION);
  const [placePosition, setPlacePosition] = useState<LatLng>();

  // kakao map set layout
  useEffect(() => {
    const script = document.getElementById('kakao-map-sdk');
    if (script != null) {
      script.onload = () => {
        kakao.maps.load(() => {
          const center = new kakao.maps.LatLng(...userPosition);
          const options = {
            center,
            level: 7,
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

  // HTML5 geolocation API 이용하여 사용자 위치 get
  useEffect(() => {
    // getGeoLocation(function (position: GeolocationPosition) {
    //   setUserPosition([position.coords.latitude, position.coords.longitude]);
    // });
  }, []);

  // 사용자 위치 마커 표시
  useEffect(() => {
    if (kakaoMap) {
      displayMarker(userPosition);
    }
  }, [kakaoMap, userPosition]);

  const displayMarker = useCallback(
    (locPosition: LatLng) => {
      if (kakaoMap) {
        const position = new kakao.maps.LatLng(...locPosition);
        const marker = new kakao.maps.Marker({
          map: kakaoMap,
          position,
        });

        kakaoMap.setCenter(position);

        searchAddrFromCoords(position, displayCenterInfo);
        // searchDetailAddrFromCoords(position, displayAddressName);
      }
    },
    [kakaoMap],
  );

  function searchAddrFromCoords(
    coords: kakao.maps.LatLng,
    callback: (
      result: Array<kakao.maps.services.Coord2RegionCodeResponse>,
      status: kakao.maps.services.Status,
    ) => void,
  ) {
    // 좌표로 행정동 주소 정보를 요청합니다
    geocoder?.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
  }

  // https://apis.map.kakao.com/web/sample/coord2addr/
  function searchDetailAddrFromCoords(
    coords: kakao.maps.LatLng,
    callback: (
      result: Array<kakao.maps.services.Coord2AddressResponse>,
      status: kakao.maps.services.Status,
    ) => void,
  ) {
    // 좌표로 법정동 상세 주소 정보를 요청합니다
    geocoder?.coord2Address(coords.getLng(), coords.getLat(), callback);
  }

  // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
  function displayCenterInfo(
    result: Array<kakao.maps.services.Coord2RegionCodeResponse>,
    status: kakao.maps.services.Status,
  ) {
    if (status === kakao.maps.services.Status.OK) {
      const infoDiv = document.getElementById('centerAddr');
      console.log('주소::: ', result);

      // for (var i = 0; i < result.length; i++) {
      //   // 행정동의 region_type 값은 'H' 이므로
      //   if (result[i].region_type === 'H') {
      //     console.log(`주소: `, result[i]);
      //     infoDiv.innerHTML = result[i].address_name;
      //     break;
      //   }
      // }
    }
  }

  function displayAddressName(
    result: Array<kakao.maps.services.Coord2AddressResponse>,
    status: kakao.maps.services.Status,
  ) {
    if (status === kakao.maps.services.Status.OK) {
      console.log('주소:: ', result);
    }
  }

  return <div ref={mapRef} style={{ width: '400px', height: '400px' }}></div>;
}

export default KakaoMap;
