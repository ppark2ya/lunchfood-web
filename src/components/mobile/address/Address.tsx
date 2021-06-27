import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import useDebounceEffect from 'hooks/useDebounceEffect';
import useInput from 'hooks/useInput';
import useAddress from 'hooks/useAddress';
import Input from 'components/common/Input';
import Button from 'components/common/Button';
import { getAddressList } from 'api/address';
import { AddressRoadItem } from 'api/types';
import AddressList from '../../common/AddressList';
import getGeoLocation from 'utils/getGeoLocation';
import { useHistory } from 'react-router-dom';
import { DEFAULT_POSITION, LatLng } from 'Constants';

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
  const { onAddressClick } = useAddress();
  const [shouldKakaoMap, setShouldKakaoMap] = useState(false);
  const [userCoord, setUserCoord] = useState<LatLng>(DEFAULT_POSITION);
  const history = useHistory();

  useEffect(() => {
    getGeoLocation(function (position: GeolocationPosition) {
      const {
        coords: { latitude, longitude },
      } = position;
      setUserCoord([latitude, longitude]);
      setShouldKakaoMap(true);
    });
  }, []);

  const onAddressSearchClick = useCallback(() => {
    if (shouldKakaoMap) {
      history.push({
        pathname: '/mylocation',
        state: { userCoord },
      });
    } else {
      window.alert('위치 권한이 없습니다.');
    }
  }, [shouldKakaoMap, userCoord]);

  return (
    <>
      <Container>
        <StyledInput
          mode="edit"
          value={value}
          onChange={onChange}
          onClear={onClear}
          placeholder="동명(읍/면)으로 검색(EX. 신림동)"
        />
        <Button componentType="enable" onClick={onAddressSearchClick}>
          내 위치로 검색하기
        </Button>
        <AddressList
          items={value !== '' ? items : undefined}
          onAddressClick={onAddressClick}
        />
      </Container>
    </>
  );
}

export default Address;
