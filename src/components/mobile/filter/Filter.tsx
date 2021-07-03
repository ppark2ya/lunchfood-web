import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Button from 'components/common/Button';
import { ReactComponent as RightArrow } from 'assets/mb_ic_right_arrow.svg';
import { useHistory } from 'react-router-dom';
import { RADIUS_LIST, LIMIT_DATE_LIST } from 'Constants';
import SelectBox from 'components/common/SelectBox';
import useAccount from 'hooks/useAccount';
import useFilter from 'hooks/useFilter';
import { Account } from 'api/types';

const Container = styled.div`
  position: relative;
  padding: 4vw;
  height: calc(100vh - 130px);
`;
const ContentBox = styled.div`
  height: 155px;
  border-bottom: 1px solid ${(props) => props.theme.color.backGray};

  .contents {
    display: flex;
    align-items: center;
    padding: 30px 0px;
    color: ${(props) => props.theme.color.black};
    font-weight: bold;
    font-size: 1.2rem;

    &.limit {
      justify-content: space-between;
    }
  }
`;
const SaveButton = styled(Button)`
  position: absolute;
  width: calc(100% - 8vw);
  bottom: 20px;
`;

function Filter() {
  const history = useHistory();
  const { account, setAccount, asyncGetAccount } = useAccount();
  const { asyncUpdateFilter } = useFilter();

  useEffect(() => {
    asyncGetAccount();
  }, []);

  const onToggleButtonState = useCallback((type: 'radius_on' | 'place_on' | 'date_on') => {
    setAccount((prev) => {
      return {
        ...prev,
        [type]: prev!![type] ? 0 : 1
      } as Account
    })
  }, []);

  const onSelectChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>, type: string) => {
    const { value } = event.target;
    setAccount((prev) => {
      return {
        ...prev,
        [type]: value
      } as Account
    })
  }, []);

  return (
    <Container>
      <ContentBox>
        <div className="contents">
          내주위{' '}
          <SelectBox
            options={RADIUS_LIST}
            onChange={(e) => onSelectChange(e, 'radius')}
            selectedValue={account?.radius}
            style={{ marginLeft: '2vw' }}
          />
          까지 검색할래요!
        </div>
        <Button
          componentType={account?.radius_on ? "enable" : "disable"}
          onClick={() => onToggleButtonState('radius_on')}>
          거리제한 사용
        </Button>
      </ContentBox>
      <ContentBox>
        <div className="contents limit">
          자주 이용하는 음식점 목록
          <RightArrow
            width={11}
            onClick={() => {
              history.push({
                pathname: '/main/filter/favorites', 
                state: { 
                  id: localStorage.id 
                }
              })
            }}
          />
        </div>
        <Button
          componentType={account?.place_on ? "enable" : "disable"}
          onClick={() => onToggleButtonState('place_on')}>
          제한추천 사용
        </Button>
      </ContentBox>
      <ContentBox>
        <div className="contents">
          <SelectBox
            options={LIMIT_DATE_LIST}
            onChange={(e) => onSelectChange(e, 'set_date')}
            selectedValue={account?.set_date} />
          동안 안먹은 것만 추천받을래요!
        </div>
        <Button
          componentType={account?.date_on ? "enable" : "disable"}
          onClick={() => onToggleButtonState('date_on')}>
          중복추천 사용
        </Button>
      </ContentBox>
      <SaveButton componentType={account ? "enable" : "disable"} onClick={() => {
        if (account) {
          asyncUpdateFilter({
            id: localStorage.id,
            radius: account.radius!!,
            radius_on: account.radius_on!!,
            place_on: account.place_on!!,
            set_date: account.set_date!!,
            date_on: account.date_on!!,
          })
        }
      }}>저장</SaveButton>
    </Container>
  );
}

export default Filter;
