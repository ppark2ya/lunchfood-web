import React from 'react';
import styled, { css } from 'styled-components';
import Button from 'components/common/Button';

const StyledFilter = styled.main`
  .mainsection {
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

  .imagesection {
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

  .functionsection {
    width: 510px;
    height: 660px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .filtersection {
    height: auto;
    margin-top: 35px;
    padding-left: 40px;

    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: bold;
    font-size: 22px;
    line-height: 22px;
    /* identical to box height, or 100% */

    letter-spacing: -0.04em;

    color: #222222;

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

  .borderline {
    width: 430px;
    height: 0px;
    border: 1px solid #e0e0e0;
    margin-top: 30px;
  }

  select {
    height: 52px;
    padding: 5px 15px;

    background: #ffffff;
    border: 1px solid #e0e0e0;
    box-sizing: border-box;
    border-radius: 5px;

    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 22px;
    line-height: 22px;
    /* identical to box height, or 100% */

    letter-spacing: -0.04em;

    color: #da291c;
  }

  #distanceselect {
    width: 150px;
    margin: 0px 20px;
  }

  #periodselect {
    width: 100px;
    margin-right: 20px;
  }

  .arrowright {
    margin-left: 198px;
  }
`;

function Filter() {
  return (
    <StyledFilter>
      <div className="mainsection">
        <div className="imagesection">
          <img className="mainimage" src="src/assets/img_login_main.png" />
          <span className="imagedesigner">
            Designed by macrovector / Freepik
          </span>
        </div>
        <div className="functionsection">
          <div className="filtersection">
            내 주위
            <select id="distanceselect">
              <option value="">거리</option>
              <option value="100">100M</option>
              <option value="300">300M</option>
              <option value="500">500M</option>
              <option value="700">700M</option>
              <option value="1000">1000M</option>
            </select>
            까지 검색할래요!
            <Button componentType="enable">거리제한 사용</Button>
          </div>
          <span className="borderline" />
          <div className="filtersection">
            자주 이용하는 음식점 목록
            <img className="arrowright" src="src/assets/img_arrow_right.png" />
            <Button componentType="enable">제한추천 사용</Button>
          </div>
          <span className="borderline" />
          <div className="filtersection">
            <select id="periodselect">
              <option value="">기간</option>
              <option value="1">1일</option>
              <option value="2">2일</option>
              <option value="3">3일</option>
              <option value="4">4일</option>
              <option value="5">5일</option>
              <option value="6">6일</option>
              <option value="7">7일</option>
              <option value="14">14일</option>
              <option value="21">21일</option>
              <option value="28">28일</option>
            </select>
            동안 안먹은 것만 추천받을래요!
            <Button componentType="enable">중복추천 사용</Button>
          </div>
        </div>
      </div>
    </StyledFilter>
  );
}

export default Filter;
