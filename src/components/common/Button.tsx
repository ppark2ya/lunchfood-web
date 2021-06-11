import React, { ReactChild, CSSProperties } from 'react';
import styled from 'styled-components';
import { ICommonStyleProps } from 'style/types';

const StyledButton = styled.button<ICommonStyleProps>`
  display: block;
  text-align: center;
  width: ${(props) => (props ? props.width : '100%')};
  height: ${(props) => (props ? props.height : '50px')};
  background-color: ${(props) => props.theme.color.red};
  color: #ffffff;
  border-radius: 15px;
  padding: 1rem 2rem;
`;

interface IButtonProps {
  width?: string;
  height?: string;
  className?: string;
  beforeImage?: string;
  children?: ReactChild;
  style?: CSSProperties;
  onClick: () => void;
}

function Button(props: IButtonProps) {
  return <StyledButton {...props}>{props.children}</StyledButton>;
}

export default Button;
