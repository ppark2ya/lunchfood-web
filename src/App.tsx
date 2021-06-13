import React, { useState, useEffect, useMemo } from 'react';
import { isMobile } from 'react-device-detect';
import Browser from 'routes/Browser';
import Mobile from 'routes/Mobile';
import useComponentWillMount from 'hooks/useComponentWillMount';
import apiClient from 'api/apiClient';
import Loading from 'components/common/Loading';

function App() {
  const [isLoading, setIsLoading] = useState(false);

  useComponentWillMount(() => {
    apiClient.interceptors.request.use(
      function (config) {
        setIsLoading(true);
        return config;
      },
      function (error) {
        setIsLoading(false);
        return Promise.reject(error);
      },
    );

    apiClient.interceptors.response.use(
      function (response) {
        setIsLoading(false);
        console.log(response);
        return response;
      },
      function (error) {
        setIsLoading(false);
        return Promise.reject(error);
      },
    );
  });

  useEffect(() => {
    const script = document.createElement('script');
    script.id = 'kakao-map-sdk';
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
      import.meta.env.VITE_KAKAO_API_KEY
    }&autoload=false&libraries=services,drawing`;
    document.head.appendChild(script);
  }, []);

  const MountedComponent = useMemo(
    () => (isMobile ? <Mobile /> : <Browser />),
    [isMobile],
  );

  return (
    <>
      <Loading isLoading={isLoading} />
      {MountedComponent}
    </>
  );
}

export default App;
