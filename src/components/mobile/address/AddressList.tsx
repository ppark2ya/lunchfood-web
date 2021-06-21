import React, { memo } from 'react';
import { AddressRoadItem, CoordItemParams } from 'api/types';
import AddressItem from './AddressItem';

interface IProps {
  items?: AddressRoadItem[];
  onAddressClick: (params: CoordItemParams) => Promise<void>;
}
function AddressList({ items, onAddressClick }: IProps) {
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
  return <div>{addressItems}</div>;
}

export default memo(AddressList);
