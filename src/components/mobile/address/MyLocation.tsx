import React, { useRef, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Location } from 'history';
import { COMMON_MESSAGE, LatLng } from 'Constants';
import styled from 'styled-components';
import Button from 'components/common/Button';
import useKakaoMap from 'hooks/useKakaoMap';
import useAddress from 'hooks/useAddress';
import isEmpty from 'utils/isEmpty';
import Header from 'components/mobile/common/Header';

const mapSize = {
  height: '65vh',
};

const Container = styled.div`
  height: 28vh;
  padding: 2vh 5.5vw;
`;
const Contents = styled.div`
  height: 17vh;

  .jibun {
    color: ${(props) => props.theme.color.black};
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1vh;
  }
  .road {
    color: ${(props) => props.theme.color.fontGray};
    font-size: 0.9rem;
  }
`;

function MyLocation() {
  const location = useLocation() as Location<{ userCoord: LatLng }>;
  const mapRef = useRef<HTMLDivElement>(null);
  const userCoord = [...location.state?.userCoord] as LatLng;
  const {
    kakaoMap,
    jibunAddressName,
    roadAddressName,
    onSearchDetailAddrFromCoords,
    onDisplayAddressName,
  } = useKakaoMap({
    mapRef,
  });
  const { asyncUpdateLocation } = useAddress();

  useEffect(() => {
    if (kakaoMap) {
      onSearchDetailAddrFromCoords(
        new kakao.maps.LatLng(...userCoord),
        onDisplayAddressName,
      );
    }
  }, [kakaoMap]);

  const onUpdate = useCallback(() => {
    if (!isEmpty(userCoord)) {
      asyncUpdateLocation({
        id: localStorage.id,
        x: userCoord[1],
        y: userCoord[0],
        address: jibunAddressName || roadAddressName,
        type: 'UTMK',
      });
    }
  }, [userCoord, jibunAddressName, roadAddressName]);

  return (
    <>
      <Header />
      <div ref={mapRef} style={mapSize}></div>
      <Container>
        <Contents>
          <div className="jibun">
            {jibunAddressName || COMMON_MESSAGE.ADDRESS_MESSAGES.LOADING}
          </div>
          <div className="road">{roadAddressName}</div>
        </Contents>
        <Button componentType="enable" onClick={onUpdate}>
          이 위치로 지정하기
        </Button>
      </Container>
    </>
  );
}

export default MyLocation;
