import React from 'react';
import styled from 'styled-components';
import Header from '../common/Header';
import useDebounceEffect from 'hooks/useDebounceEffect';
import useInput from 'hooks/useInput';
import { getAddressList } from 'api/address';
import Input from 'components/common/Input';

const Container = styled.div`
  height: 90vh;
  padding: 2vh 4vw;
`;

function Address() {
  const [value, onChange, onClear] = useInput('');
  const res = useDebounceEffect(getAddressList, value);
  console.log(res);

  return (
    <>
      <Header />
      <Container>
        <Input
          mode="edit"
          value={value}
          onChange={onChange}
          onClear={onClear}
          placeholder="동명(읍/면)으로 검색(EX. 신림동)"
        />
      </Container>
    </>
  );
}

export default Address;
