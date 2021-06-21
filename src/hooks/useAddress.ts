import { getAddressCoord, getAddressList } from 'api/address';
import { updateLocation } from 'api/account';
import { AddressRoadItem, CoordItemParams, Account } from 'api/types';
import { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import isEmpty from 'utils/isEmpty';

function useAddress() {
  const [addressRoadItems, setAddressRoadItems] = useState<AddressRoadItem[]>();
  const history = useHistory();

  const asyncGetAddressList = useCallback(async (keyword: string) => {
    try {
      const { data } = await getAddressList(keyword);
      if (data.results.common.errorCode === '0') {
        setAddressRoadItems(data.results.juso);
      } else {
        console.error(`resultCode: ${data.results.common.errorCode}`);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const onAddressClick = useCallback(async (params: CoordItemParams) => {
    try {
      const { data } = await getAddressCoord(params);
      if (data.results.common.errorCode === '0') {
        if (!isEmpty(data.results.juso)) {
          const [juso] = data.results.juso;
          asyncUpdateLocation({
            id: localStorage.id,
            x: juso.entX,
            y: juso.entY,
            address: params.roadAddr,
            type: 'UTMK',
          });
        }
      } else {
        console.error(`resultCode: ${data.results.common.errorCode}`);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const asyncUpdateLocation = useCallback(async (requestBody: Account) => {
    try {
      const { data } = await updateLocation(requestBody);
      if (data.resultCode === 200) {
        history.push('/recommend');
      } else {
        console.error(`resultCode: ${data.resultCode}`);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  return {
    addressRoadItems,
    asyncGetAddressList,
    onAddressClick,
  };
}

export default useAddress;
