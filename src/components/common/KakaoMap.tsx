import React, { useState, useRef, useEffect, CSSProperties } from 'react';

interface IKakaoMapProps {
  width?: string;
  height?: string;
  lat: number; // y
  lng: number; // x
  style?: CSSProperties;
}

// 참고: https://devtalk.kakao.com/t/topic/106470/10
// https://codesandbox.io/s/gifted-wescoff-77nwu?file=/src/App.js
function KakaoMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [kakaoMap, setKakaoMap] = useState<kakao.maps.Map>();

  useEffect(() => {
    const script = document.getElementById('kakao-map-sdk');
    if (script != null) {
      script.onload = () => {
        kakao.maps.load(() => {
          let a = [37.50802, 127.062835];
          const center = new kakao.maps.LatLng(a[0], a[1]);
          const options = {
            center,
            level: 3,
          };
          if (mapRef.current) {
            const map = new kakao.maps.Map(mapRef.current, options);
            setKakaoMap(map);
          }
        });
      };
    }
  }, [mapRef]);

  return <div ref={mapRef} style={{ width: '400px', height: '400px' }}></div>;
}

export default KakaoMap;
