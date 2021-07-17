import React, { useRef, useState, useEffect, useCallback } from 'react';
import styled, { css } from 'styled-components';
import Button from 'components/common/Button';
import { useLocation } from 'react-router-dom';
import useKakaoMap from 'hooks/useKakaoMap';
import useRecommend from 'hooks/useRecommend';
import { DEFAULT_POSITION, LatLng } from 'Constants';
import { ReactComponent as TodayMenuIcon } from 'assets/mb_ic_today_menu.svg';
import isEmpty from 'utils/isEmpty';
import { BestMenu } from 'api/types';
import { Location } from 'history';

const StyledRecommend = styled.main`
  .mainsection {
    display: flex;
    width: 1200px;
    height: 660px;
    margin-left: calc(360 / 1920 * 100%);
    margin-top: 70px;
    background: #ffffff;
    border: 1px solid #e0e0e0;
    box-sizing: border-box;
    border-radius: 20px;
  }

  .mapsection {
    width: 690px;
    background: #eeeeee;
  }

  .functionsection {
    width: 510px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .title {
    margin-top: 100px;

    font-family: Noto Sans CJK KR;
    font-style: normal;
    font-size: 16px;
    line-height: 30px;
    /* identical to box height, or 187% */

    text-align: center;
    letter-spacing: 0.2em;

    color: #666666;
  }

  .appname {
    margin-top: 14px;
  }

  #recommendmenu {
    width: auto;
    margin-top: 26px;
    background: #da291c;
    border-radius: 5px;

    font-family: Noto Sans CJK KR;
    font-style: normal;
    font-weight: bold;
    font-size: 40px;
    line-height: 40px;
    /* or 100% */

    text-align: center;
    letter-spacing: -0.04em;

    color: #ffffff;

    padding: 6px; 4px;
  }

  .borderline {
    width: 430px;
    height: 0px;
    margin-top: 14px;

    border: 1px solid #e0e0e0;
  }

  .storesection,
  .distancesection {
    margin-left: 40px;
    margin-top: 30px;
    align-self: flex-start;
  }

  .recommendlabel {
    margin-right: 37px;
    font-family: Noto Sans CJK KR;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 18px;
    /* or 100% */

    text-align: center;
    letter-spacing: -0.04em;

    color: #333333;
  }

  #recommendstore,
  #recommenddistance {
    font-family: Noto Sans CJK KR;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 18px;
    /* or 100% */

    letter-spacing: -0.04em;

    color: #333333;
  }

  #viewmapbtn {
    margin-left: 30px;
    font-family: Noto Sans CJK KR;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 18px;
    /* or 100% */

    letter-spacing: -0.04em;
    text-decoration-line: underline;

    color: #b50d01;
  }

  .btnsection {
    display: flex;
    width: auto;
    margin-top: 132px;
    flex-direction: row;
    & > button {
      width: 180px;
      height: 52px;
      font-family: Noto Sans CJK KR;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 16px;
      letter-spacing: -0.04em;
    }

    #otherrecommendbtn {
      background: #ffffff;
      border: 1px solid #da291c;
      box-sizing: border-box;
      border-radius: 5px;
      margin-right: 20px;

      color: #da291c;
    }
  }
`;

const CancelButton = styled(Button)<{ only: boolean }>`
  width: ${(props) => (props.only ? '48%' : '100%')};
  margin-right: ${(props) => (props.only ? '3vw' : 0)};
`;

const mapSize = {
  height: '70vh',
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
    <StyledRecommend>
      <div className="mainsection">
        <div className="mapsection" ref={mapRef} style={mapSize}></div>
        <div className="functionsection">
          <span className="title">
            <strong>점심 고민</strong>은 이제 그만!!
          </span>
          <img
            className="appname"
            src="../src/assets/img_address_appname.png"
          />
          <div id="recommendmenu">{currentMenu?.place_name}</div>
          <span className="borderline" />
          <div className="storesection">
            <span className="recommendlabel">식당</span>
            <span id="recommendstore">{currentMenu?.address_name}</span>
          </div>
          <div className="distancesection">
            <span className="recommendlabel">거리</span>
            <span id="recommenddistance">{`${
              currentMenu?.distance || 0
            }m`}</span>
            <a
              id="viewmapbtn"
              onClick={() => {
                window.open(currentMenu?.place_url, '_blank');
              }}
            >
              지도보기
            </a>
          </div>
          <div className="btnsection">
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
                  bestMenuList?.length === currentMenuIndex
                    ? 'disable'
                    : 'enable'
                }
                width="48%"
                onClick={onChoice}
              >
                선택
              </Button>
            )}
          </div>
        </div>
      </div>
    </StyledRecommend>
  );
}

export default Recommend;
