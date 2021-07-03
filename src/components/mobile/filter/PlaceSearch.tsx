import React from 'react';
import styled from 'styled-components';
import Header from 'components/mobile/common/Header';
import useFilter from 'hooks/useFilter';
import { useHistory } from 'react-router-dom';
import useDebounceEffect from 'hooks/useDebounceEffect';
import { getPlaceAuto } from 'api/history';
import Input from 'components/common/Input';
import useInput from 'hooks/useInput';

const Container = styled.div`
  padding: 4vw;
`;

function PlaceSearch() {
  const history = useHistory();
  const { asyncInsertSelectedPlace } = useFilter();
  const [value, onChange, onClear] = useInput('');
  const placeInfoList = useDebounceEffect(getPlaceAuto, value);

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
      </Container>
    </>
  );
}

export default PlaceSearch;
