import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

const StyledItem = css`
   {
    position: absolute;
    top: 37px;
    width: 70px;
    height: 15px;

    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 15px;
    /* identical to box height, or 100% */

    text-align: center;
    letter-spacing: -0.02em;

    color: #222222;
  }
`;

const StyledHeader = styled.header`
  height: 90px;
  border-width: 1px;
  border-color: #e0e0e0;
  border-top-style: none;
  border-left-style: none;
  border-right-style: none;
  border-bottom-style: solid;

  .logo {
    position: absolute;
    width: 200px;
    height: 28px;
    left: 360px;
    top: 31px;
  }

  .item-1st {
    ${StyledItem};
    left: 1149px;
  }

  .item-2nd {
    ${StyledItem};
    left: 1324px;
  }

  .item-3rd {
    ${StyledItem};
    left: 1499px;
  }
`;

function Header() {
  return (
    <StyledHeader>
      <img className="logo" src="src\assets\img_gnb_title.png" />
      <Link className="item-1st" to="/address">
        위치설정
      </Link>
      <Link className="item-2nd" to="/history">
        식사기록
      </Link>
      <Link className="item-3rd" to="/filter">
        내 점심줄
      </Link>
    </StyledHeader>
  );
}

export default Header;
