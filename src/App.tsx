import React, { useState, useEffect, useMemo } from 'react';
import { isMobile } from 'react-device-detect';
import Browser from 'routes/Browser';
import Mobile from 'routes/Mobile';
import useComponentWillMount from 'hooks/useComponentWillMount';
import apiClient from 'api/apiClient';
import Loading from 'components/common/Loading';
import { RecoilRoot } from 'recoil';

function App() {
  const [isLoading, setIsLoading] = useState(false);

  useComponentWillMount(() => {
    apiClient.interceptors.request.use(
      function (config) {
        const { url } = config;
        if (url?.match(/addrLinkApi|place_auto|food_auto/gi)) {
          return config;
        }
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
    }&autoload=false&libraries=services,drawing,clusterer`;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const MountedComponent = useMemo(
    () =>
      isMobile ? (
        <RecoilRoot>
          <Mobile />
        </RecoilRoot>
      ) : (
        <Browser />
      ),
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
