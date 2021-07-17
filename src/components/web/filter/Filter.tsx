import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Button from 'components/common/Button';
import { useHistory } from 'react-router-dom';
import { RADIUS_LIST, LIMIT_DATE_LIST } from 'Constants';
import useAccount from 'hooks/useAccount';
import useFilter from 'hooks/useFilter';
import { Account } from 'api/types';
import SelectBox from 'components/common/SelectBox';
import { ReactComponent as RightArrow } from 'assets/mb_ic_right_arrow.svg';

const StyledFilter = styled.main`
  .main-section {
    display: flex;
    width: 1200px;
    height: 660px;
    margin-left: calc(360 / 1920 * 100%);
    margin-top: 70px;
    background: #ffffff;
    border: 1px solid #e0e0e0;
    box-sizing: border-box;
    border-radius: 20px;
  }

  .image-section {
    width: 690px;
    height: 660px;
    display: flex;
    flex-direction: column;
    align-items: center;

    background: #eaeaea;
    border-radius: 20px 0px 0px 20px;
  }

  .mainimage {
    width: 466px;
    height: 463px;
    margin-top: 88px;
  }

  .imagedesigner {
    width: 211px;
    height: 14px;
    margin-top: 20px;

    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 14px;
    /* identical to box height, or 100% */

    text-align: center;
    letter-spacing: -0.04em;

    color: #b8b8b8;
  }

  .function-section {
    width: 510px;
    height: 660px;
    display: flex;
    flex-direction: column;
    padding-left: 40px;
    padding-right: 40px;
  }

  .filter-section {
    height: 150px;
    margin-top: 20px;

    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: bold;
    font-size: 22px;
    line-height: 22px;
    /* identical to box height, or 100% */

    letter-spacing: -0.04em;

    color: #222222;

    select {
      width: 120px;
      height: 60px;
      margin-right: 10px;
      margin-left: 10px;
      padding: 10px 10px 10px 10px;
      background-size: 1vw;
    }

    button {
      width: 340px;
      height: 52px;
      margin-top: 30px;
      margin-left: 45px;
      font-family: Noto Sans CJK KR;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 16px;
      /* identical to box height, or 100% */

      letter-spacing: -0.04em;
    }
  }

  .button-section {
    height: 50px;
    margin-left: 45px;
    margin-top: 20px;
  }

  .borderline {
    width: 430px;
    height: 0px;
    border: 1px solid #e0e0e0;
    margin-top: 20px;
  }

  .limit {
    display: flex;
  }
`;

const SaveButton = styled(Button)`
  width: 340px;
  height: 52px;
`;

const FavoritesButton = styled(RightArrow)`
  margin-left: 180px;
`;

function Filter() {
  const history = useHistory();
  const { account, setAccount, asyncGetAccount } = useAccount();
  const { asyncUpdateFilter } = useFilter();

  useEffect(() => {
    asyncGetAccount();
  }, []);

  const onToggleButtonState = useCallback(
    (type: 'radius_on' | 'place_on' | 'date_on') => {
      setAccount((prev) => {
        return {
          ...prev,
          [type]: prev!![type] ? 0 : 1,
        } as Account;
      });
    },
    [],
  );

  const onSelectChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>, type: string) => {
      const { value } = event.target;
      setAccount((prev) => {
        return {
          ...prev,
          [type]: value,
        } as Account;
      });
    },
    [],
  );

  return (
    <StyledFilter>
      <div className="main-section">
        <div className="image-section">
          <img className="mainimage" src="../src/assets/img_login_main.png" />
          <span className="imagedesigner">
            Designed by macrovector / Freepik
          </span>
        </div>
        <div className="function-section">
          <div className="filter-section">
            <div className="contents">
              내주위{' '}
              <SelectBox
                options={RADIUS_LIST}
                onChange={(e) => onSelectChange(e, 'radius')}
                selectedValue={account?.radius}
              />
              까지 검색할래요!
            </div>
            <Button
              componentType={account?.radius_on ? 'enable' : 'disable'}
              onClick={() => onToggleButtonState('radius_on')}
            >
              거리제한 사용
            </Button>
          </div>
          <span className="borderline" />
          <div className="filter-section">
            <div className="contents limit">
              <div>자주 이용하는 음식점 목록</div>
              <div>
                <FavoritesButton
                  width={11}
                  onClick={() => {
                    history.push({
                      pathname: '/main/filter/favorites',
                      state: {
                        id: localStorage.id,
                      },
                    });
                  }}
                />
              </div>
            </div>
            <Button
              componentType={account?.place_on ? 'enable' : 'disable'}
              onClick={() => onToggleButtonState('place_on')}
            >
              제한추천 사용
            </Button>
          </div>
          <span className="borderline" />
          <div className="filter-section">
            <div className="contents">
              <SelectBox
                options={LIMIT_DATE_LIST}
                onChange={(e) => onSelectChange(e, 'set_date')}
                selectedValue={account?.set_date}
              />
              동안 안먹은 것만 추천받을래요!
            </div>
            <Button
              componentType={account?.date_on ? 'enable' : 'disable'}
              onClick={() => onToggleButtonState('date_on')}
            >
              중복추천 사용
            </Button>
          </div>
          <span className="borderline" />
          <div className="button-section">
            <SaveButton
              componentType={account ? 'enable' : 'disable'}
              onClick={() => {
                if (account) {
                  asyncUpdateFilter({
                    id: localStorage.id,
                    radius: account.radius!!,
                    radius_on: account.radius_on!!,
                    place_on: account.place_on!!,
                    set_date: account.set_date!!,
                    date_on: account.date_on!!,
                  });
                }
              }}
            >
              저장
            </SaveButton>
          </div>
        </div>
      </div>
    </StyledFilter>
  );
}

export default Filter;
