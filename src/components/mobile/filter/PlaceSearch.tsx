import React from 'react';
import styled from 'styled-components';
import Header from 'components/mobile/common/Header';
import useFilter from 'hooks/useFilter';
import { useHistory } from 'react-router-dom';
import useDebounceEffect from 'hooks/useDebounceEffect';
import { getPlaceAuto } from 'api/history';
import Input from 'components/common/Input';
import useInput from 'hooks/useInput';
import AddressItem from 'components/common/AddressItem';
import { PlaceInfo } from 'api/types';
import { Location } from 'history';
import { useSetRecoilState } from 'recoil';
import { historyDayMenuState } from 'store/recoil/history/state';

const Container = styled.div`
  padding: 4vw;
`;

function PlaceSearch() {
  const history = useHistory();
  const location = history.location as Location<{ from: string }>;
  const { asyncInsertSelectedPlace } = useFilter();
  const [value, onChange, onClear] = useInput('');
  const placeInfoList = useDebounceEffect(getPlaceAuto, value) as PlaceInfo[];
  const historyDayMenuRecoilState = useSetRecoilState(historyDayMenuState);

  const addressItems = placeInfoList?.map((placeInfo) => (
    <AddressItem
      key={placeInfo.id}
      jibunAddr={placeInfo.place_name}
      roadAddr={placeInfo.road_address_name}
      onAddressClick={() => {
        if (location.state?.from) {
          historyDayMenuRecoilState((historyDayMenu) => ({
            ...historyDayMenu,
            place_name: placeInfo.place_name,
          }));
          history.replace({
            pathname: location.state.from,
          });
        } else {
          asyncInsertSelectedPlace({
            id: localStorage.id,
            place_id: placeInfo.id,
            place_name: placeInfo.place_name,
          }).then(() => {
            history.goBack();
          });
        }
      }}
    />
  ));

  return (
    <div>
      <Header>음식점 검색</Header>
      <Container>
        <Input
          mode="edit"
          value={value}
          onChange={onChange}
          onClear={onClear}
          placeholder="식당명을 입력해주세요."
        />
        {value !== '' && addressItems}
      </Container>
    </div>
  );
}

export default PlaceSearch;
