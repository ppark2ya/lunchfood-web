import { getAddressCoord, getAddressList } from 'api/address';
import { updateLocation } from 'api/account';
import { AddressRoadItem, CoordItemParams, Account } from 'api/types';
import { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import isEmpty from 'utils/isEmpty';
import { COMMON_MESSAGE } from 'Constants';

function useAddress() {
  const [addressRoadItems, setAddressRoadItems] = useState<AddressRoadItem[]>();
  const history = useHistory();

  const asyncGetAddressList = useCallback(
    async (keyword: string, callback?: any) => {
      try {
        const { data } = await getAddressList(keyword);
        if (data.results.common.errorCode === '0') {
          setAddressRoadItems(data.results.juso);
          callback();
        } else {
          console.error(`resultCode: ${data.results.common.errorCode}`);
          window.alert(COMMON_MESSAGE.ADDRESS_MESSAGES.NO_RESULT);
        }
      } catch (e) {
        console.error(e);
      }
    },
    [],
  );

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
        window.alert(COMMON_MESSAGE.ADDRESS_MESSAGES.GET_ERROR);
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
        window.alert(COMMON_MESSAGE.ADDRESS_MESSAGES.UPDATE_ERROR);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  return {
    addressRoadItems,
    asyncGetAddressList,
    onAddressClick,
    asyncUpdateLocation,
  };
}

export default useAddress;
