import React, { ReactChild, CSSProperties } from 'react';
import styled from 'styled-components';
import { ICommonStyleProps } from 'style/types';

type ButtonType = 'enable' | 'disable' | 'cancel';
const StyledButton = styled.button<ICommonStyleProps<ButtonType>>`
  display: inline-block;
  text-align: center;
  width: ${(props) => (props.width ? props.width : '100%')};
  height: ${(props) => (props.height ? props.height : '50px')};
  border-radius: ${(props) => props.theme.border.radius};
  font-size: 0.9rem;
  line-height: 0.9rem;
  ${(props) => styleReducer(props)};
  :before {
    content: '';
    width: 10px;
    height: 12px;
    display: inline-block;
    ${(props) => imageReducer(props.componentType)};
    background-size: cover;
    margin-right: 1.5vw;
  }
`;

function styleReducer(props: any) {
  switch (props.componentType) {
    case 'enable':
      return `
          background-color: ${props.theme.color.red};
          color: #ffffff;
        `;
    case 'disable':
      return `
          background-color: ${props.theme.color.backGray};
          color: ${props.theme.color.fontGray};
        `;
    case 'cancel':
      return `
          background-color: #ffffff;
          color: ${props.theme.color.red};
          border: 1px solid ${props.theme.color.red};
        `;
  }
}

function imageReducer(type?: ButtonType) {
  switch (type) {
    case 'enable':
      return `background-image: url(/src/assets/mb_ic_fire_enable.svg);`;
    case 'disable':
      return `background-image: url(/src/assets/mb_ic_fire_disable.svg);`;
    case 'cancel':
      return `display: none;`;
  }
}

interface IButtonProps {
  width?: string;
  height?: string;
  className?: string;
  componentType: ButtonType;
  children?: ReactChild;
  style?: CSSProperties;
  onClick?: (args?: any) => void;
}

function Button(props: IButtonProps) {
  return <StyledButton {...props}>{props.children}</StyledButton>;
}

export default Button;
