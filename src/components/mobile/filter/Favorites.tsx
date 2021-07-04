import React, { useEffect } from 'react';
import styled from 'styled-components';
import Header from 'components/mobile/common/Header';
import Button from 'components/common/Button';
import { Location } from 'history';
import useFilter from 'hooks/useFilter';
import { useHistory } from 'react-router-dom';
import FavoriteList from './FavoriteList';

const Container = styled.div`
  padding: 4vw;
`;
const RegistButton = styled(Button)`
  :before {
    width: 13px;
    height: 13px;
    background-image: url(/src/assets/mb_ic_regist.svg);
  }
`;

function Favorites() {
  const history = useHistory();
  const location = history.location as Location<{ id: number }>;
  const { 
    selectedPlaceList, 
    asyncGetSelectedPlace, 
    asyncDeleteSelectedPlace,
  } = useFilter();

  useEffect(() => {
    if(location.state?.id) {
      asyncGetSelectedPlace(location.state?.id);
    }
  }, [location.state?.id]);

  return (
    <>
      <Header />
      <Container>
        <RegistButton 
          componentType="enable" 
          onClick={() => history.push('/main/filter/search')}>
          음식점 등록하기
        </RegistButton>
        {
          location.state?.id &&
          <FavoriteList 
            items={selectedPlaceList} 
            id={location.state.id}
            onDelete={asyncDeleteSelectedPlace} />
        }
      </Container>
    </>
  );
}

export default Favorites;
