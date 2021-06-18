import React from 'react';
import styled, { css } from 'styled-components';
import Button from 'components/common/Button';

const StyledRecommend = styled.main`
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

  .mapsection {
    width: 690px;
    background: #eeeeee;
  }

  .functionsection {
    width: 510px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .title {
    margin-top: 100px;

    font-family: Noto Sans CJK KR;
    font-style: normal;
    font-size: 16px;
    line-height: 30px;
    /* identical to box height, or 187% */

    text-align: center;
    letter-spacing: 0.2em;

    color: #666666;
  }

  .appname {
    margin-top: 14px;
  }

  #recommendmenu {
    width: auto;
    margin-top: 26px;
    background: #da291c;
    border-radius: 5px;

    font-family: Noto Sans CJK KR;
    font-style: normal;
    font-weight: bold;
    font-size: 40px;
    line-height: 40px;
    /* or 100% */

    text-align: center;
    letter-spacing: -0.04em;

    color: #ffffff;

    padding: 6px; 4px;
  }

  .borderline {
    width: 430px;
    height: 0px;
    margin-top: 14px;

    border: 1px solid #e0e0e0;
  }

  .storesection,
  .distancesection {
    margin-left: 40px;
    margin-top: 30px;
    align-self: flex-start;
  }

  .recommendlabel {
    margin-right: 37px;
    font-family: Noto Sans CJK KR;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 18px;
    /* or 100% */

    text-align: center;
    letter-spacing: -0.04em;

    color: #333333;
  }

  #recommendstore,
  #recommenddistance {
    font-family: Noto Sans CJK KR;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 18px;
    /* or 100% */

    letter-spacing: -0.04em;

    color: #333333;
  }

  #viewmapbtn {
    margin-left: 30px;
    font-family: Noto Sans CJK KR;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 18px;
    /* or 100% */

    letter-spacing: -0.04em;
    text-decoration-line: underline;

    color: #b50d01;
  }

  .btnsection {
    display: flex;
    width: auto;
    margin-top: 132px;
    flex-direction: row;
    & > button {
      width: 180px;
      height: 52px;
      font-family: Noto Sans CJK KR;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 16px;
      letter-spacing: -0.04em;
    }

    #otherrecommendbtn {
      background: #ffffff;
      border: 1px solid #da291c;
      box-sizing: border-box;
      border-radius: 5px;
      margin-right: 20px;

      color: #da291c;
    }
  }
`;

function Recommend() {
  return (
    <StyledRecommend>
      {/* TO-DO : TEST VAULE REPLACE */}
      <div className="mainsection">
        <div className="mapsection">
          <h1>TO-DO : KAKAO MAP SECTION</h1>
        </div>
        <div className="functionsection">
          <span className="title">
            <strong>점심 고민</strong>은 이제 그만!!
          </span>
          <img className="appname" src="src/assets/img_address_appname.png" />
          <div id="recommendmenu">톤쇼우</div>
          <span className="borderline" />
          <div className="storesection">
            <span className="recommendlabel">식당</span>
            <span id="recommendstore">톤쇼우 광안리점</span>
          </div>
          <div className="distancesection">
            <span className="recommendlabel">거리</span>
            <span id="recommenddistance">162m</span>
            <a id="viewmapbtn">지도보기</a>
          </div>
          <div className="btnsection">
            <button id="otherrecommendbtn">다른추천</button>
            <Button componentType="enable">선택</Button>
          </div>
        </div>
      </div>
    </StyledRecommend>
  );
}

export default Recommend;
