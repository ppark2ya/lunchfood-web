import React, { memo } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 2vh 1vw;
  border: 1px solid ${(props) => props.theme.color.backGray};
  border-radius: ${(props) => props.theme.border.radius};
`;

interface IProps {
  place_id: number;
  place_name: string;
  onDelete: () => void;
}

function FavoriteItem({ place_id, place_name, onDelete }: IProps) {
  return (
    <Wrapper>
      
    </Wrapper>
  );
}

export default memo(FavoriteItem);
