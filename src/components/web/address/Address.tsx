import React from 'react';
import styled, { css } from 'styled-components';

const StyledAddress = styled.main`
  .functionsection {
    position: absolute;
    width: 1200px;
    height: 660px;
    left: 360px;
    top: 160px;

    background: #ffffff;
    border: 1px solid #e0e0e0;
    box-sizing: border-box;
    border-radius: 20px;
  }

  .title {
    position: absolute;
    width: 250px;
    height: 30px;
    left: 490px;
    top: 47px;

    font-family: Noto Sans CJK KR;
    font-style: normal;
    font-size: 18px;
    line-height: 30px;
    /* identical to box height, or 167% */

    text-align: center;
    letter-spacing: 0.2em;

    color: #666666;
  }

  .appname {
    position: absolute;
    width: 390px;
    height: 54px;
    left: 405px;
    top: 92px;
  }

  .borderline {
    position: absolute;
    width: 940px;
    height: 0px;
    left: 130px;
    top: 196px;

    border: 1px solid #e0e0e0;
  }

  #searchtarget {
    position: absolute;
    width: 520px;
    height: 52px;
    left: 310px;
    top: 248px;

    background: #eeeeee;
    border: 1px solid #e0e0e0;
    box-sizing: border-box;
    border-radius: 5px;

    ::placeholder {
      font-family: Noto Sans CJK KR;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 16px;
      /* identical to box height, or 100% */

      letter-spacing: -0.04em;

      color: #999999;
    }
  }

  #startsearchbtn {
    position: absolute;
    width: 52px;
    height: 52px;
    left: 838px;
    top: 248px;

    background: #ffffff;
    border: 1px solid #e0e0e0;
    box-sizing: border-box;
    border-radius: 5px;
  }

  .searchicon {
    position: absolute;
    left: 18.18%;
    right: 17.23%;
    top: 18.18%;
    bottom: 17.2%;
  }

  #startscanbtn {
    position: absolute;
    width: 340px;
    height: 52px;
    left: 430px;
    top: 330px;

    background: #da291c;
    border-radius: 5px;

    font-family: Noto Sans CJK KR;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 16px;
    /* identical to box height, or 100% */

    text-align: center;
    letter-spacing: -0.04em;

    color: #ffffff;
  }

  .scanicon {
    position: absolute;
    width: 14px;
    height: 16px;
    left: 890px;
    top: 516px;
  }
`;

function Address() {
  return (
    <StyledAddress>
      <div className="functionsection">
        <span className="title">
          <strong>점심 고민</strong>은 이제 그만!!
        </span>
        <img className="appname" src="src/assets/img_address_appname.png" />
        <span className="borderline" />
        <input
          id="searchtarget"
          type="text"
          placeholder="동명(읍, 면)으로 검색(EX. 신림동)"
        />
        <button id="startsearchbtn">
          <img
            className="searchbtnicon"
            src="src/assets/img_address_searchicon.png"
          />
        </button>
        <button id="startscanbtn">
          <img
            className="scanbtnicon"
            src="src/assets/img_address_scanicon.png"
          />
          내 위치로 검색하기
        </button>
      </div>
    </StyledAddress>
  );
}

export default Address;
