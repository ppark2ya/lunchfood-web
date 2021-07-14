import React, { useRef, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import useKakaoMap from 'hooks/useKakaoMap';
import useRecommend from 'hooks/useRecommend';
import { DEFAULT_POSITION, LatLng } from 'Constants';
import Button from 'components/common/Button';
import { ReactComponent as TodayMenuIcon } from 'assets/mb_ic_today_menu.svg';
import isEmpty from 'utils/isEmpty';
import { BestMenu } from 'api/types';
import { useLocation } from 'react-router-dom';
import { Location } from 'history';

const Container = styled.div`
  padding: 3vh 4vw;

  .title {
    height: 12vh;
    background-color: #f4f4f4;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    .place-name {
      color: ${(props) => props.theme.color.black};
      background: linear-gradient(180deg, transparent 50%, #e8b6b6 50%);
      transform: skew(345deg, 360deg);
      font-size: 5vw;
      font-weight: bold;
    }
  }
  .contents {
    margin-top: 2vh;

    & div {
      padding: 0.5vh 0;
      color: ${(props) => props.theme.color.black};

      .bold {
        font-weight: bold;
      }
      .url {
        color: blue;
        text-decoration: underline;
      }
    }
    .btn-area {
      padding-top: 5vh;
    }
  }
`;

const CancelButton = styled(Button)<{ only: boolean }>`
  width: ${(props) => (props.only ? '48%' : '100%')};
  margin-right: ${(props) => (props.only ? '3vw' : 0)};
`;

const mapSize = {
  height: '45vh',
};
function Recommend() {
  const location: Location<{ latlng: LatLng }> = useLocation();
  const mapRef = useRef<HTMLDivElement>(null);
  const [currentMenu, setCurrentMenu] = useState<BestMenu>();
  const [currentMenuIndex, setCurrentMenuIndex] = useState(0);
  const [isChoice, setIsChoice] = useState(false);
  const [userCoord, setUserCoord] = useState<LatLng>(DEFAULT_POSITION);
  const [markerPositions, setMarkerPositions] = useState<LatLng[]>([]);
  useKakaoMap({ mapRef, markerPositions });
  const { bestMenuList, asyncGetBestMenuList, asyncInsertHistory } =
    useRecommend();
  const { id } = localStorage;

  useEffect(() => {
    asyncGetBestMenuList({
      id,
      interval_date: 3,
    });
  }, [id]);

  useEffect(() => {
    if (location.state?.latlng) {
      setUserCoord(location.state.latlng);
      setMarkerPositions([location.state.latlng]);
    }
  }, [location.state?.latlng]);

  useEffect(() => {
    if (!isEmpty(bestMenuList)) {
      setCurrentMenu(bestMenuList!![currentMenuIndex]);
    }
  }, [bestMenuList, currentMenuIndex]);

  useEffect(() => {
    if (currentMenu) {
      setMarkerPositions([[...userCoord], [currentMenu.y, currentMenu.x]]);
    }
  }, [currentMenu, userCoord]);

  const onReject = useCallback(() => {
    if (currentMenu) {
      setIsChoice(true);
      setCurrentMenuIndex((prev) => prev + 1);
      asyncInsertHistory({
        id,
        place_id: currentMenu.id,
        place_name: currentMenu.place_name,
        category_name: currentMenu.category_name,
        good_bad: 0,
        x: currentMenu.x,
        y: currentMenu.y,
      });
    }
  }, [id, currentMenu]);

  const onChoice = useCallback(() => {
    if (currentMenu) {
      setIsChoice(false);
      asyncInsertHistory({
        id,
        place_id: currentMenu.id,
        place_name: currentMenu.place_name,
        category_name: currentMenu.category_name,
        good_bad: 1,
        x: currentMenu.x,
        y: currentMenu.y,
      });
    }
  }, [id, currentMenu]);

  return (
    <Container>
      <div ref={mapRef} style={mapSize}></div>
      <div className="title">
        <div>
          <TodayMenuIcon width="30vw" />
        </div>
        <div className="place-name">{currentMenu?.place_name}</div>
      </div>
      <div className="contents">
        <div>
          <span className="bold">식당: </span>
          <span>{currentMenu?.address_name}</span>
        </div>
        <div>
          <span className="bold">거리: </span>
          <span>{`${currentMenu?.distance || 0}m`}</span>
        </div>
        <div>
          <span className="bold">URL: </span>
          <span
            className="url"
            onClick={() => {
              window.open(currentMenu?.place_url, '_blank');
            }}
          >
            {currentMenu?.place_url}
          </span>
        </div>
        <div className="btn-area">
          <CancelButton
            componentType="cancel"
            onClick={onReject}
            only={isChoice}
          >
            다른추천
          </CancelButton>
          {isChoice && (
            <Button
              componentType={
                bestMenuList?.length === currentMenuIndex ? 'disable' : 'enable'
              }
              width="48%"
              onClick={onChoice}
            >
              선택
            </Button>
          )}
        </div>
      </div>
    </Container>
  );
}

export default Recommend;
