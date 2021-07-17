import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Button from 'components/common/Button';
import { Location } from 'history';
import useFilter from 'hooks/useFilter';
import { useHistory } from 'react-router-dom';
import FavoriteList from './FavoriteList';
import ModalPortal from '../modal/portal/ModalPortal';
import PlaceSearch from './PlaceSearch';

const StyledFavorites = styled.main`
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

  .imagesection {
    width: 690px;
    height: 660px;
    display: flex;
    flex-direction: column;
    align-items: center;

    background: #eaeaea;
    border-radius: 20px 0px 0px 20px;
  }

  .mainimage {
    width: 466px;
    height: 463px;
    margin-top: 88px;
  }

  .imagedesigner {
    width: 211px;
    height: 14px;
    margin-top: 20px;

    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 14px;
    /* identical to box height, or 100% */

    text-align: center;
    letter-spacing: -0.04em;

    color: #b8b8b8;
  }

  .functionsection {
    width: 510px;
    height: 660px;
    display: flex;
    flex-direction: column;
  }

  .title {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: bold;
    font-size: 22px;
    line-height: 22px;

    letter-spacing: -0.04em;

    margin-top: 50px;
    margin-left: 40px;
  }

  .borderline {
    width: 430px;
    height: 0px;
    border: 1px solid #e0e0e0;
    margin-top: 30px;
  }

  #distanceselect {
    width: 150px;
    margin: 0px 20px;
  }

  #periodselect {
    width: 100px;
    margin-right: 20px;
  }

  .arrowright {
    margin-left: 198px;
  }

  .list-section {
    height: 500px;
    overflow-y: auto;
    margin-top: 30px;
    margin-bottom: 30px;
  }

  .button-section {
    width: 100%;
    height: 52px;
    margin-bottom: 40px;
    display: flex;
    justify-content: space-around;

    button {
      width: 200px;
    }
  }
`;

const RegistButton = styled(Button)`
  :before {
    margin-right: -10px;
    background-image: none;
  }
`;

const CompleteButton = styled(Button)`
  :before {
    margin-right: -10px;
    background-image: none;
  }
`;

const StyledModal = styled.div`
  background: rgba(0, 0, 0, 0.25);
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .modal-contents {
    background: white;
    width: 450px;
    height: 621px;
    overflow-y: auto;
    border-radius: ${(props) => props.theme.border.radius};
  }
`;

function Favorites() {
  const history = useHistory();
  const location = history.location as Location<{ id: number }>;
  const [isShow, setIsShow] = useState(false);
  const { selectedPlaceList, asyncGetSelectedPlace, asyncDeleteSelectedPlace } =
    useFilter();

  useEffect(() => {
    if (location.state?.id) {
      asyncGetSelectedPlace(location.state?.id);
    }
  }, [location.state?.id]);

  const toggleModal = useCallback(() => {
    setIsShow((prev) => !prev);
  }, []);

  const modal = useMemo(
    () => (
      <ModalPortal>
        <StyledModal>
          <div className="modal-contents">
            <PlaceSearch closeCallback={toggleModal} />
          </div>
        </StyledModal>
      </ModalPortal>
    ),
    [],
  );

  return (
    <StyledFavorites>
      {isShow && modal}
      <div className="mainsection">
        <div className="imagesection">
          <img className="mainimage" src="/src/assets/img_login_main.png" />
          <span className="imagedesigner">
            Designed by macrovector / Freepik
          </span>
        </div>
        <div className="functionsection">
          <div className="title">자주 이용하는 음식점</div>
          <div className="list-section">
            {location.state?.id && (
              <FavoriteList
                items={selectedPlaceList}
                id={location.state.id}
                onDelete={asyncDeleteSelectedPlace}
              />
            )}
          </div>
          <div className="button-section">
            <RegistButton componentType="enable" onClick={() => toggleModal()}>
              음식점 등록하기
            </RegistButton>
            <CompleteButton
              componentType="enable"
              onClick={() => history.goBack()}
            >
              설정 완료
            </CompleteButton>
          </div>
        </div>
      </div>
    </StyledFavorites>
  );
}

export default Favorites;
