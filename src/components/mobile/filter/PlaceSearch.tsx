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
import { useEffect } from 'react';

const Container = styled.div`
  padding: 4vw;

  .blank {
    display: inline-block;
    width: 100%;
  }
`;

function PlaceSearch() {
  const history = useHistory();
  const { insertPlaceSuccess, asyncInsertSelectedPlace } = useFilter();
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
          place_name: placeInfo.place_name
        })
      }}
    />
  ));

  useEffect(() => {
    if(insertPlaceSuccess) {
      history.goBack();
    }
  }, [insertPlaceSuccess]);

  return (
    <>
      <Header />
      <Container>
        <Input 
          mode="edit" 
          value={value} 
          onChange={onChange} 
          onClear={onClear} 
          placeholder="식당명을 입력해주세요."/>
        <div className="blank"></div>
        {value !== '' && addressItems}
      </Container>
    </>
  );
}

export default PlaceSearch;
