import React, { useState, useRef, useEffect } from 'react';

interface IKakaoMapProps {
  lat: number; // y
  lng: number; // x
}

// 참고: https://devtalk.kakao.com/t/topic/106470/10
function KakaoMap() {
  const mapRef = useRef(null);
  const [kakaoMap, setKakaoMap] = useState(null);

  useEffect(() => {
    const script = document.getElementById('kakao-map-sdk');
    if (script != null) {
      window.kakao.maps.load(() => {
        let a = [37.50802, 127.062835];
        const center = new window.kakao.maps.LatLng(a[0], a[1]);
        const options = {
          center,
          level: 3,
        };
        const map = new window.kakao.maps.Map(mapRef.current, options);
        setKakaoMap(map);
      });
    }
  }, [mapRef]);

  return <div ref={mapRef} style={{ width: '400px', height: '400px' }}></div>;
}

export default KakaoMap;
