import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

const StyledHeader = styled.header`
  display: flex;
  height: 90px;
  align-items: center;
  border-width: 1px;
  border-color: #e0e0e0;
  border-top-style: none;
  border-left-style: none;
  border-right-style: none;
  border-bottom-style: solid;

  .logo {
    width: 200px;
    height: 28px;
    margin-left: calc(360 / 1920 * 100%);
    background: url(/src/assets/img_gnb_title.png) no-repeat 85% 50%;
  }

  .item {
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

  a:nth-child(2) {
    margin-left: calc(589 / 1920 * 100%);
  }

  a:nth-child(3) {
    margin-left: calc(120 / 1920 * 100%);
  }

  a:nth-child(4) {
    margin-left: calc(120 / 1920 * 100%);
  }
`;

function Header() {
  return (
    <StyledHeader>
      <Link className="logo" to="/main/recommend" />
      <Link className="item" to="/address">
        위치설정
      </Link>
      <Link className="item" to="/main/history">
        식사기록
      </Link>
      <Link className="item" to="/main/filter">
        내 점심줄
      </Link>
    </StyledHeader>
  );
}

export default Header;
