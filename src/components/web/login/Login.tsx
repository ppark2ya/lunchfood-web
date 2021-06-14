import React from 'react';

function Login() {
  return (
    <main>
      <div className="loginsection">
        <div className="imagesection">
          <img id="mainimage" src="src/assets/img_login_main.png" />
        </div>
        <img id="loginlogo" src="src/assets/img_login_appname.png" />
        <button id="kakaologinbtn">카카오톡 로그인</button>
        <button id="signupbtn">회원가입</button>
      </div>
    </main>
  );
}

export default Login;
