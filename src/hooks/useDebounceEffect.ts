import { useState, useEffect } from 'react';
import { AxiosResponse } from 'axios';
import {
  ApiResponse,
  AddressApiResponse,
  AddressResponseType,
  PlaceInfo
} from 'api/types';

function useDebounceEffect<V>(
  effect: (
    args: V,
  ) => Promise<
    AxiosResponse<ApiResponse | AddressApiResponse<AddressResponseType>>
  >,
  value: V,
  delay = 300,
) {
  const [responseData, setResponseData] =
    useState<Array<PlaceInfo|string> | AddressResponseType['juso']>();

  useEffect(() => {
    const handler = setTimeout(async () => {
      try {
        if (typeof value === 'string' && value === '') return;

        const { data } = await effect(value);

        if ('resultCode' in data) {
          if (data.resultCode === 200) {
            setResponseData(data.data as Array<PlaceInfo|string>);
          } else {
            console.error(`resultCode: ${data.resultCode}`);
          }
        } else {
          if (data.results.common.errorCode === '0') {
            setResponseData(data.results.juso);
          } else {
            console.error(`resultCode: ${data.results.common.errorCode}`);
          }
        }
      } catch (e) {
        console.error(e);
      }
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return responseData;
}

export default useDebounceEffect;
