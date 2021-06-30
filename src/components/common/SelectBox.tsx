import React, { CSSProperties } from 'react';
import styled from 'styled-components';
import { ISelectOption } from 'Constants';

type SelectType = 'enable' | 'disable';
const StyledSelect = styled.select<{ type: SelectType }>`
  background-color: white;
  border: 1px solid ${(props) => props.theme.color.backGray};
  border-radius: ${(props) => props.theme.border.radius};
  background: url(/src/assets/mb_ic_select_arrow.svg) no-repeat 85% 50%; /* 화살표 모양의 이미지 */
  background-size: 3.5vw;
  padding: 3vw 10vw 3vw 3vw;
  color: ${(props) =>
    props.type === 'enable'
      ? props.theme.color.red
      : props.theme.color.fontGray};
  font-weight: 500;
  font-size: 1.2rem;
  margin-right: 2vw;
`;

interface IProps {
  options: ISelectOption[];
  type?: SelectType;
  style?: CSSProperties;
}

function SelectBox({ options, type = 'enable', style }: IProps) {
  const optionList = options.map((o) => (
    <option key={o.value} value={o.value}>
      {o.name}
    </option>
  ));

  return (
    <>
      <StyledSelect style={style} type={type}>
        {optionList}
      </StyledSelect>
    </>
  );
}

export default SelectBox;
