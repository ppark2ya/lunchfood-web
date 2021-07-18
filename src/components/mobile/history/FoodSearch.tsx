import React, { useCallback, MouseEvent } from 'react';
import styled from 'styled-components';
import Header from 'components/mobile/common/Header';
import { useHistory } from 'react-router-dom';
import useDebounceEffect from 'hooks/useDebounceEffect';
import { getFoodAuto } from 'api/history';
import Input from 'components/common/Input';
import useInput from 'hooks/useInput';
import FoodItem from './FoodItem';
import { useSetRecoilState } from 'recoil';
import { historyDayMenuState } from 'store/recoil/history/state';

const Container = styled.div`
  padding: 4vw;
`;

function FoodSearch() {
  const history = useHistory();
  const [value, onChange, onClear] = useInput('');
  const foodList = useDebounceEffect(getFoodAuto, value) as string[];
  const historyDayMenuRecoilState = useSetRecoilState(historyDayMenuState);

  const onItemClick = useCallback((event: MouseEvent<HTMLDivElement>) => {
    const foodName = (event.target as any).textContent;
    historyDayMenuRecoilState((historyDayMenu) => ({
      ...historyDayMenu,
      menu_name: foodName,
    }));
    history.replace({
      pathname: '/main/history/dayMenu',
    });
  }, []);

  // 음식명 중복 제거 후 진행
  const items = [...new Set(foodList ?? [])].map((food) => (
    <FoodItem key={food} onClick={onItemClick}>
      {food}
    </FoodItem>
  ));

  return (
    <div>
      <Header>음식명 검색</Header>
      <Container>
        <Input
          mode="edit"
          value={value}
          onChange={onChange}
          onClear={onClear}
          placeholder="음식명을 입력해주세요."
        />
        {value !== '' && items}
      </Container>
    </div>
  );
}

export default FoodSearch;
