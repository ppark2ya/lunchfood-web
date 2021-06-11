import React, { useState } from 'react';
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
        return response;
      },
      function (error) {
        setIsLoading(false);
        return Promise.reject(error);
      },
    );
  });

  const MountedComponent = isMobile ? <Mobile /> : <Browser />;

  return (
    <>
      <Loading isLoading={isLoading} />
      {MountedComponent}
    </>
  );
}

export default App;
