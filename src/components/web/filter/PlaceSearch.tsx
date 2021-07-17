import React, { useRef, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Location } from 'history';
import { COMMON_MESSAGE, LatLng } from 'Constants';
import styled from 'styled-components';
import Button from 'components/common/Button';
import useKakaoMap from 'hooks/useKakaoMap';
import useAddress from 'hooks/useAddress';
import isEmpty from 'utils/isEmpty';
import useFilter from 'hooks/useFilter';
import useInput from 'hooks/useInput';
import useDebounceEffect from 'hooks/useDebounceEffect';
import { useSetRecoilState } from 'recoil';
import Header from 'components/mobile/common/Header';
import { useHistory } from 'react-router-dom';
import { getPlaceAuto } from 'api/history';
import Input from 'components/common/Input';
import AddressItem from 'components/common/AddressItem';
import { PlaceInfo } from 'api/types';
import { placeNameState } from 'store/recoil/history/state';

interface IProps {
  closeCallback(): void;
}

const Container = styled.div`
  .input-section {
    margin-top: 20px;
    margin-left: 20px;
    margin-right: 20px;
  }

  .result-section {
    height: 450px;
    overflow-y: auto;
  }

  .button-section {
    display: flex;
    justify-content: space-around;
    margin-top: 30px;

    button {
      width: 200px;
    }
  }
`;

function PlaceSearch({ closeCallback }: IProps) {
  const history = useHistory();
  const location = history.location as Location<{ from: string }>;
  const { asyncInsertSelectedPlace } = useFilter();
  const [value, onChange, onClear] = useInput('');
  const placeInfoList = useDebounceEffect(getPlaceAuto, value) as PlaceInfo[];
  const setPlaceNameRecoilState = useSetRecoilState(placeNameState);

  const addressItems = placeInfoList?.map((placeInfo) => (
    <AddressItem
      key={placeInfo.id}
      jibunAddr={placeInfo.place_name}
      roadAddr={placeInfo.road_address_name}
      onAddressClick={() => {
        if (location.state?.from) {
          setPlaceNameRecoilState(placeInfo.place_name);
          history.replace({
            pathname: location.state.from,
          });
        } else {
          asyncInsertSelectedPlace({
            id: localStorage.id,
            place_id: placeInfo.id,
            place_name: placeInfo.place_name,
          }).then(() => {
            closeCallback();
          });
        }
      }}
    />
  ));

  return (
    <Container>
      <div className="input-section">
        <Input
          mode="edit"
          value={value}
          onChange={onChange}
          onClear={onClear}
          placeholder="식당명을 입력해주세요."
        />
      </div>
      <div className="result-section">{value !== '' && addressItems}</div>
      <div className="button-section">
        <Button componentType="cancel" onClick={() => closeCallback()}>
          닫기
        </Button>
      </div>
    </Container>
  );
}

export default PlaceSearch;
