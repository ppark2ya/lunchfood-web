import React from 'react';
import styled, { css } from 'styled-components';

const StyledLogin = styled.main`
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

  .title {
    width: 200px;
    height: 30px;
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
    width: 265px;
    height: 36.69px;
    margin-top: 14.61px;
  }

  .kakaologinbtn {
    width: 340px;
    height: 52px;
    margin-top: 53.7px;

    background: #f4dc01;
    border-radius: 5px;

    font-family: Noto Sans CJK KR;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 16px;
    /* identical to box height, or 100% */

    text-align: center;
    letter-spacing: -0.04em;

    color: #222222;
  }

  .signupbtn {
    width: 340px;
    height: 52px;
    margin-top: 12px;

    background: #ffffff;
    border: 1px solid #222222;
    box-sizing: border-box;
    border-radius: 5px;

    font-family: Noto Sans CJK KR;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 16px;
    /* identical to box height, or 100% */

    text-align: center;
    letter-spacing: -0.04em;

    color: #222222;
  }
`;

function Login() {
  return (
    <StyledLogin>
      <div className="mainsection">
        <div className="imagesection">
          <img className="mainimage" src="src/assets/img_login_main.png" />
          <span className="imagedesigner">
            Designed by macrovector / Freepik
          </span>
        </div>
        <div className="functionsection">
          <span className="title">
            <strong>점심 고민</strong>은 이제 그만!!
          </span>
          <img className="appname" src="src/assets/img_login_appname.png" />
          <button className="kakaologinbtn">카카오톡 로그인</button>
          <button className="signupbtn">회원가입</button>
        </div>
      </div>
    </StyledLogin>
  );
}

export default Login;
