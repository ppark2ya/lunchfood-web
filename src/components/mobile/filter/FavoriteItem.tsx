import React, { memo } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 2vh 1vw;
  border: 1px solid ${(props) => props.theme.color.backGray};
  border-radius: ${(props) => props.theme.border.radius};
  margin-top: 15px; 

  & span + span:after {
    content: '';
    float: right;
    width: 5.8vw;
    height: 1.5rem;
    background-image: url(/src/assets/mb_ic_delete.svg);
    background-size: cover;
    margin-right: 1.5vw;
  }
`;

interface IProps {
  place_id: number;
  place_name: string;
  onDelete: () => void;
}

function FavoriteItem({ place_id, place_name, onDelete }: IProps) {
  return (
    <Wrapper>
      <span>{place_name}</span>
      <span onClick={onDelete}/>
    </Wrapper>
  );
}

export default memo(FavoriteItem);
