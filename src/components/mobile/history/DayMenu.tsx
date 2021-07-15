import React, { useCallback } from 'react';
import styled from 'styled-components';
import Header from 'components/mobile/common/Header';
import { ReactComponent as FireCheckedIcon } from 'assets/mb_ic_fire_checked.svg';
import { ReactComponent as FireUnCheckedIcon } from 'assets/mb_ic_fire_unchecked.svg';
import Input from 'components/common/Input';
import useDayHistory from 'hooks/useDayHistory';
import { useHistory } from 'react-router-dom';
import Button from 'components/common/Button';
import useLocalStorage from 'hooks/useLocalStorage';
import { useRecoilValue } from 'recoil';
import { placeNameState, menuNameState } from 'store/recoil/history/state';

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

interface IDayMenuProps {
  placeId: number;
  placeName?: string;
  menuName?: string;
  menuDiary?: string;
  score?: number;
  insertedDate?: string;
}

function DayMenu() {
  const history = useHistory();
  const placeNameRecoilState = useRecoilValue(placeNameState);
  const menuNameRecoilState = useRecoilValue(menuNameState);
  const [diary, setDiary] = useLocalStorage('diary', '');
  const { asyncInsertDayMenu } = useDayHistory();

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setDiary(event.target.value);
    },
    [],
  );

  const onBackClick = useCallback(() => {
    history.push('/main/history');
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

  return (
    <div>
      <Header onBackClick={onBackClick}>데이메뉴 등록</Header>
      <Container>
        <div className="history-date">2021년 7월 13일의 메뉴</div>
        <hr />
        <div className="score">
          불꽃점수
          {new Array(5)
            .fill(0)
            .map((_, idx) =>
              idx < 3 ? (
                <FireCheckedIcon key={idx} />
              ) : (
                <FireUnCheckedIcon key={idx} />
              ),
            )}
        </div>
        <hr />
        <Input
          mode="view"
          value={placeNameRecoilState}
          label="음식점"
          onClick={onPlaceSearchPage}
        />
        <hr />
        <Input
          mode="view"
          value={menuNameRecoilState}
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
          value={diary}
          onChange={onChange}
        />
        <Button
          componentType="enable"
          onClick={() => {
            asyncInsertDayMenu({
              id: localStorage.id, // 사용자 id
              place_id: 0, // 카카오 api에서 넘어온 식당 식별자(BestMenu.id)
              place_name: placeNameRecoilState, // 식당이름
              menu_name: menuNameRecoilState, // 음식명
              category: placeNameRecoilState, // 식당종류
              score: '', // 평점
              menu_diary: diary, // 짧은 글
              inserted_date: '',
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
