import { useState, useEffect } from 'react';
import { AxiosResponse } from 'axios';
import { ApiResponse } from 'api/types';

function useDebounceEffect<V>(
  effect: (args: V) => Promise<AxiosResponse<ApiResponse>>,
  value: V,
  delay = 300,
) {
  const [responseData, setResponseData] = useState<ApiResponse>();

  useEffect(() => {
    const handler = setTimeout(async () => {
      try {
        if (typeof value === 'string' && value === '') return;

        const { data } = await effect(value);
        if (data.resultCode === 200) {
          setResponseData(data.data);
        } else {
          console.error(`resultCode: ${data.resultCode}`);
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
