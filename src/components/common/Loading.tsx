import React from 'react';
import styled from 'styled-components';
import loadingGif from 'assets/loading.gif';

const Background = styled.div`
  background: white;
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
  z-index: 1000;
`;

const LoadingImage = styled.img.attrs({
  alt: 'close icon',
})`
  width: 20vw;
`;

interface ILoadingProps {
  isLoading?: boolean;
}

function Loading({ isLoading }: ILoadingProps) {
  return isLoading ? (
    <Background>
      <LoadingImage src={loadingGif} />
    </Background>
  ) : (
    <></>
  );
}

export default Loading;
