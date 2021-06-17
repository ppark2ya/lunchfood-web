import React from 'react';
import styled, { css } from 'styled-components';

const StyledLogin = styled.main`
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

  .imagesection {
    position: absolute;
    width: 690px;
    height: 660px;
    left: 0px;
    top: 0px;

    background: #eaeaea;
    border-radius: 20px 0px 0px 20px;
  }

  .mainimage {
    position: absolute;
    width: 466px;
    height: 463px;
    left: 112px;
    top: 88px;
  }

  .imagedesigner {
    position: absolute;
    width: 211px;
    height: 14px;
    left: 239px;
    top: 571px;

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

  .title {
    position: absolute;
    width: 200px;
    height: 30px;
    left: 847px;
    top: 100px;

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
    position: absolute;
    width: 265px;
    height: 36.69px;
    left: 821px;
    top: 144.61px;
  }

  .kakaologinbtn {
    position: absolute;
    width: 340px;
    height: 52px;
    left: 775px;
    top: 235px;

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
    position: absolute;
    width: 340px;
    height: 52px;
    left: 775px;
    top: 299px;

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
      <div className="functionsection">
        <div className="imagesection">
          <img className="mainimage" src="src/assets/img_login_main.png" />
          <span className="imagedesigner">
            Designed by macrovector / Freepik
          </span>
        </div>
        <span className="title">
          <strong>점심 고민</strong>은 이제 그만!!
        </span>
        <img className="appname" src="src/assets/img_login_appname.png" />
        <button className="kakaologinbtn">카카오톡 로그인</button>
        <button className="signupbtn">회원가입</button>
      </div>
    </StyledLogin>
  );
}

export default Login;
