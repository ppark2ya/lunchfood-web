import React, { useRef, useState, useEffect } from 'react';
import Header from 'components/mobile/common/Header';
import Navigation from 'components/mobile/common/Navigation';
import useKakaoMap from 'hooks/useKakaoMap';
import useRecommend from 'hooks/useRecommend';
import { DEFAULT_POSITION, LatLng } from 'Constants';

const mapSize = {
  height: '55vh',
};
function Recommend() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [userCoord, setUserCoord] = useState<LatLng>(DEFAULT_POSITION);
  const { kakaoMap } = useKakaoMap({ mapRef, userCoord });
  const {
    bestMenuList,
    todayMenu,
    insertHisResult,
    asyncGetBestMenuList,
    asyncCheckToday,
    asyncInsertHistory,
  } = useRecommend();

  useEffect(() => {
    asyncGetBestMenuList({
      id: localStorage.id,
      interval_date: 3,
    });
  }, []);

  return (
    <div>
      <Header isBackBtn={false} />
      <div ref={mapRef} style={mapSize}></div>
      <Navigation />
    </div>
  );
}

export default Recommend;
