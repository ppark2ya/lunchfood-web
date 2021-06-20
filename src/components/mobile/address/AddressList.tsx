import React, { memo, useCallback } from 'react';
import styled from 'styled-components';
import { AddressRoadItem, CoordItemParams } from 'api/types';
import { getAddressCoord } from 'api/address';
import AddressItem from './AddressItem';

const Container = styled.div``;

interface IProps {
  items?: AddressRoadItem[];
}
function AddressList({ items }: IProps) {
  console.log(items);

  const onAddressClick = useCallback(async (params: CoordItemParams) => {
    const { data } = await getAddressCoord(params);
    console.log(data);
  }, []);

  const addressItems = items?.map((item, index) => (
    <AddressItem
      key={index}
      roadAddr={item.roadAddr}
      jibunAddr={item.jibunAddr}
      onAddressClick={() =>
        onAddressClick({
          admCd: item.admCd,
          rnMgtSn: item.rnMgtSn,
          udrtYn: item.udrtYn,
          buldMnnm: item.buldMnnm,
          buldSlno: item.buldSlno,
          roadAddr: item.roadAddr,
        })
      }
    />
  ));
  return <Container>{addressItems}</Container>;
}

export default memo(AddressList);
