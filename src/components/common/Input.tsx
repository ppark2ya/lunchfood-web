import React, { CSSProperties } from 'react';
import styled from 'styled-components';
import { ICommonStyleProps } from 'style/types';

const StyledInput = styled.input.attrs<ICommonStyleProps>({
  type: 'text',
})`
  width: 100%;
  height: 50px;
  background-color: ${(props) => props.theme.color.backGray};
  border-radius: 15px;
`;

interface IInputProps {
  width?: string;
  height?: string;
  className?: string;
  beforeImage?: string;
  afterImage?: string;
  style?: CSSProperties;
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input(props: IInputProps) {
  return (
    <>
      <StyledInput {...props} />
    </>
  );
}

export default Input;
