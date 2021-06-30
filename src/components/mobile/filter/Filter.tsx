import React from 'react';
import styled from 'styled-components';
import Button from 'components/common/Button';
import { ReactComponent as RightArrow } from 'assets/mb_ic_right_arrow.svg';
import { useHistory } from 'react-router-dom';
import { RADIUS_LIST, LIMIT_DATE_LIST } from 'Constants';
import SelectBox from 'components/common/SelectBox';

const Container = styled.div`
  padding: 4vw;
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

function Filter() {
  const history = useHistory();
  return (
    <Container>
      <ContentBox>
        <div className="contents">
          내주위{' '}
          <SelectBox options={RADIUS_LIST} style={{ marginLeft: '2vw' }} />
          까지 검색할래요!
        </div>
        <Button componentType="enable">거리제한 사용</Button>
      </ContentBox>
      <ContentBox>
        <div className="contents limit">
          자주 이용하는 음식점 목록
          <RightArrow
            width={11}
            onClick={() => history.push('/main/filter/favorites')}
          />
        </div>
        <Button componentType="enable">제한추천 사용</Button>
      </ContentBox>
      <ContentBox>
        <div className="contents">
          <SelectBox options={LIMIT_DATE_LIST} />
          동안 안먹은 것만 추천받을래요!
        </div>
        <Button componentType="enable">중복추천 사용</Button>
      </ContentBox>
    </Container>
  );
}

export default Filter;
