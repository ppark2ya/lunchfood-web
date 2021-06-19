import React, { ReactChild, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import backButton from 'assets/mb_ic_back_btn.png';
import headerLogo from 'assets/mb_ic_header_logo.png';

const Container = styled.div`
  height: 10vh;
  display: flex;
  align-items: center;
  padding: 0px 3vw;

  .header-text {
    text-align: center;
    width: 100%;
  }
`;

interface IHeaderProps {
  children?: ReactChild;
}

function Header({ children }: IHeaderProps) {
  const history = useHistory();

  const onBackBtnClick = useCallback(() => {
    history.goBack();
  }, [history]);

  return (
    <Container>
      <img
        className="back-btn"
        src={backButton}
        alt="back button"
        onClick={onBackBtnClick}
      />
      <div className="header-text">
        {children ? children : <img src={headerLogo} alt="header" />}
      </div>
    </Container>
  );
}

export default Header;
