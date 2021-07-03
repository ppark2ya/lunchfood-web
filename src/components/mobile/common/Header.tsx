import React, { ReactChild, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as BackButton } from 'assets/mb_ic_back_btn.svg';
import { ReactComponent as HeaderLogo } from 'assets/mb_ic_header_logo.svg';

const Container = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0px 3vw;
  box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.05);

  .header-text {
    text-align: center;
    width: 100%;
  }
`;

interface IHeaderProps {
  children?: ReactChild;
  isBackBtn?: boolean;
}

function Header({ children, isBackBtn = true }: IHeaderProps) {
  const history = useHistory();

  const onBackBtnClick = useCallback(() => {
    history.goBack();
  }, [history]);

  return (
    <Container>
      {isBackBtn && <BackButton width="2vw" onClick={onBackBtnClick} />}
      <div className="header-text">
        {children ? children : <HeaderLogo width="30vw" />}
      </div>
    </Container>
  );
}

export default Header;
