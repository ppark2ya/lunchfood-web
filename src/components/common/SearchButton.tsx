import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.div`
  display: inline-block;
  width: 14%;
  height: 50px;
  border-radius: ${(props) => props.theme.border.radius};
  background-image: url(/src/assets/ic_search.png);
  background-repeat: no-repeat;
  background-position: center;
  border: 1px solid ${(props) => props.theme.color.backGray};
  margin-left: 1%;
  float: left;
`;

function SearchButton(props: any) {
  return <StyledButton {...props} />;
}

export default SearchButton;
