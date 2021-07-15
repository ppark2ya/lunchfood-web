import React from 'react';
import styled from 'styled-components';

const ItemBorder = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.color.backGray};
  padding: 2vh 1vw;
`;

interface IProps {
  children: React.ReactChild;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

function FoodItem(props: IProps) {
  return <ItemBorder {...props} />;
}

export default FoodItem;
