import React, { CSSProperties, useCallback } from 'react';
import styled from 'styled-components';
import { ICommonStyleProps } from 'style/types';

const Container = styled.div<ICommonStyleProps>`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: ${(props) => props.theme.color.backGray};
  border-radius: 15px;

  input {
    color: ${(props) => props.theme.color.black};
    font-size: 1rem;
    padding-left: 2rem;
    width: 90%;
  }

  & input + span:after {
    content: '';
    width: 1rem;
    height: 1rem;
    display: inline-block;
    background-image: url(src/assets/mb_ic_input_clear.png);
    background-size: cover;
    margin-right: 1.5vw;
    vertical-align: middle;
  }
`;

interface IInputProps {
  width?: string;
  height?: string;
  className?: string;
  style?: CSSProperties;
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
}

function Input(props: IInputProps) {
  return (
    <Container>
      <input type="text" {...props} />
      <span onClick={props.onClear} />
    </Container>
  );
}

export default Input;
