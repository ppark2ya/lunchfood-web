import React from 'react';
import styled from 'styled-components';
import Header from '../common/Header';
import useDebounceEffect from 'hooks/useDebounceEffect';
import useInput from 'hooks/useInput';
import { getAddressList } from 'api/address';
import Input from 'components/common/Input';
import Button from 'components/common/Button';
import { AddressRoadItem } from 'api/types';
import AddressList from './AddressList';

const Container = styled.div`
  height: 90vh;
  padding: 2vh 4vw;
`;

const StyledInput = styled(Input)`
  margin-bottom: 1vh;
`;

function Address() {
  const [value, onChange, onClear] = useInput('');
  const items = useDebounceEffect(getAddressList, value) as AddressRoadItem[];

  return (
    <>
      <Header />
      <Container>
        <StyledInput
          mode="edit"
          value={value}
          onChange={onChange}
          onClear={onClear}
          placeholder="동명(읍/면)으로 검색(EX. 신림동)"
        />
        <Button componentType="enable">내 위치로 검색하기</Button>
        <AddressList items={value !== '' ? items : undefined} />
      </Container>
    </>
  );
}

export default Address;
