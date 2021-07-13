import React, { useCallback } from 'react';
import styled from 'styled-components';
import Header from 'components/mobile/common/Header';
import { ReactComponent as FireCheckedIcon } from 'assets/mb_ic_fire_checked.svg';
import { ReactComponent as FireUnCheckedIcon } from 'assets/mb_ic_fire_unchecked.svg';
import Input from 'components/common/Input';
import useDayHistory from 'hooks/useDayHistory';
import { useHistory } from 'react-router-dom';
import Button from 'components/common/Button';

const Container = styled.form`
  padding: 4vw;
  font-weight: 500;

  hr {
    border-top: 1px solid ${(props) => props.theme.color.backGray};
    margin-block-start: 1em;
    margin-block-end: 1em;
  }
  .history-date {
    color: ${(props) => props.theme.color.red};
    font-weight: bold;
  }
  .score {
    display: flex;
    align-items: center;

    svg {
      width: 25px;
      height: 20px;
    }
  }
`;

function DayMenu() {
  const history = useHistory();
  const { asyncInsertDayMenu } = useDayHistory();

  const onPlaceSearchPage = useCallback(() => {
    // 로직이 달라서 컴포넌트 따로 딸지 고민
    history.push('/main/filter/search');
  }, []);

  const onFoodSearchPage = useCallback(() => {
    history.push('/');
  }, []);

  return (
    <>
      <Header>데이메뉴 등록</Header>
      <Container>
        <div className="history-date">2021년 7월 13일의 메뉴</div>
        <hr />
        <div className="score">
          불꽃점수
          <FireCheckedIcon />
          <FireCheckedIcon />
          <FireCheckedIcon />
          <FireCheckedIcon />
          <FireUnCheckedIcon />
        </div>
        <hr />
        <Input
          mode="view"
          value=""
          label="음식점"
          onClick={onPlaceSearchPage}
        />
        <hr />
        <Input
          mode="view"
          value=""
          label="음식종류"
          onClick={onFoodSearchPage}
        />
        <hr />
        <label htmlFor="story">먹방일지</label>
        <textarea
          id="story"
          name="story"
          rows={7}
          cols={33}
          style={{ display: 'block', width: '100%' }}
          value={'It was a dark and stormy night...'}
          onChange={() => {}}
        />
        <Button componentType="enable">등록</Button>
      </Container>
    </>
  );
}

export default DayMenu;
