import React, { memo } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 2vh 1vw;
  border-bottom: 1px solid ${(props) => props.theme.color.backGray};

  .jibun {
    color: ${(props) => props.theme.color.black};
  }

  .road {
    margin-top: 1vh;
    font-size: 0.8rem;
    line-height: 1.5rem;

    .mark {
      border: 1px solid ${(props) => props.theme.color.backGray};
      color: ${(props) => props.theme.color.red};
      padding: 0.5vw;
      margin-right: 1vw;
    }

    .road-text {
      color: ${(props) => props.theme.color.fontGray};
    }
  }
`;

interface IProps {
  roadAddr: string;
  jibunAddr: string;
  onAddressClick: () => void;
}

function AddressItem({ roadAddr, jibunAddr, onAddressClick }: IProps) {
  return (
    <Wrapper onClick={onAddressClick}>
      <div className="jibun">{jibunAddr}</div>
      <div className="road">
        <span className="mark">도로명</span>
        <span className="road-text">{roadAddr}</span>
      </div>
    </Wrapper>
  );
}

export default memo(AddressItem);
