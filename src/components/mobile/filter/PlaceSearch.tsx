import React, { useEffect } from 'react';
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

const Container = styled.div`
  padding: 4vw;
`;

function PlaceSearch() {
  const history = useHistory();
  const location = history.location as Location<{ from: string }>;
  const { asyncInsertSelectedPlace } = useFilter();
  const [value, onChange, onClear] = useInput('');
  const placeInfoList = useDebounceEffect(getPlaceAuto, value) as PlaceInfo[];

  const addressItems = placeInfoList?.map((placeInfo) => (
    <AddressItem
      key={placeInfo.id}
      jibunAddr={placeInfo.place_name}
      roadAddr={placeInfo.road_address_name}
      onAddressClick={() => {
        asyncInsertSelectedPlace({
          id: localStorage.id,
          place_id: placeInfo.id,
          place_name: placeInfo.place_name,
        }).then((placeName: string) => {
          if (location.state?.from) {
            history.push({
              pathname: location.state.from,
              state: {
                placeName,
              },
            });
          } else {
            history.goBack();
          }
        });
      }}
    />
  ));

  return (
    <div>
      <Header>자주 이용하는 음식점</Header>
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
