import React, { useCallback } from 'react';
import styled from 'styled-components';
import Header from 'components/mobile/common/Header';
import { ReactComponent as FireCheckedIcon } from 'assets/mb_ic_fire_checked.svg';
import { ReactComponent as FireUnCheckedIcon } from 'assets/mb_ic_fire_unchecked.svg';
import Input from 'components/common/Input';
import useDayHistory from 'hooks/useDayHistory';
import { useHistory } from 'react-router-dom';
import Button from 'components/common/Button';
import { useRecoilState } from 'recoil';
import { historyDayMenuState } from 'store/recoil/history/state';

const Container = styled.form`
  padding: 4vw;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: calc(100vh - 60px);

  hr {
    width: 100%;
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
  #diary {
    display: block;
    width: 100%;
    border-radius: ${(props) => props.theme.border.radius};
    border: 1px solid ${(props) => props.theme.color.backGray};
    margin: 1vh 0px;
    padding: 4vw;
  }
`;

function DayMenu() {
  const history = useHistory();
  const [historyDayMenuRecoilState, setHistoryDayMenuRecoilState] =
    useRecoilState(historyDayMenuState);
  const { asyncInsertDayMenu } = useDayHistory();

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setHistoryDayMenuRecoilState((daymenu) => ({
        ...daymenu,
        menu_diary: event.target.value,
      }));
    },
    [],
  );

  const onBackClick = useCallback(() => {
    history.push('/main/history');
  }, []);

  const onScoreIconClick = useCallback((index: number) => {
    setHistoryDayMenuRecoilState((daymenu) => ({
      ...daymenu,
      score: index.toString(),
    }));
  }, []);

  const onPlaceSearchPage = useCallback(() => {
    history.push({
      pathname: '/main/filter/search',
      state: {
        from: '/main/history/dayMenu',
      },
    });
  }, []);

  const onFoodSearchPage = useCallback(() => {
    history.push('/main/history/food_search');
  }, []);

  let convertDateString = '';
  if (historyDayMenuRecoilState.inserted_date !== '') {
    const [yyyy, MM, dd] = historyDayMenuRecoilState.inserted_date.split('-');
    convertDateString = `${yyyy}년 ${MM}월 ${dd}일의 메뉴`;
  }

  return (
    <div>
      <Header onBackClick={onBackClick}>데이메뉴 등록</Header>
      <Container>
        <div className="history-date">{convertDateString}</div>
        <hr />
        <div className="score">
          불꽃점수
          {new Array(5).fill(0).map((_, idx) =>
            idx < Number(historyDayMenuRecoilState.score) ? (
              <FireCheckedIcon
                key={idx}
                onClick={() => {
                  onScoreIconClick(idx + 1);
                }}
              />
            ) : (
              <FireUnCheckedIcon
                key={idx}
                onClick={() => {
                  onScoreIconClick(idx + 1);
                }}
              />
            ),
          )}
        </div>
        <hr />
        <Input
          mode="view"
          value={historyDayMenuRecoilState.place_name ?? ''}
          label="음식점"
          onClick={onPlaceSearchPage}
        />
        <hr />
        <Input
          mode="view"
          value={historyDayMenuRecoilState.menu_name ?? ''}
          label="음식종류"
          onClick={onFoodSearchPage}
        />
        <hr />
        <label htmlFor="diary">먹방일지</label>
        <textarea
          id="diary"
          rows={7}
          cols={33}
          style={{ display: 'block', width: '100%' }}
          value={historyDayMenuRecoilState.menu_diary ?? ''}
          onChange={onChange}
        />
        <Button
          componentType="enable"
          onClick={() => {
            asyncInsertDayMenu({
              ...historyDayMenuRecoilState,
            });
          }}
        >
          등록
        </Button>
      </Container>
    </div>
  );
}

export default DayMenu;
