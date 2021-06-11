import React from 'react';
import KakaoLogin from 'react-kakao-login';
import styled from 'styled-components';
import logo from 'assets/login_logo.png';
import useLogin from 'hooks/useLogin';
import Button from 'components/common/Button';
import Input from 'components/common/Input';
import useDebounceEffect from 'hooks/useDebounceEffect';
import useInput from 'hooks/useInput';
import { getFoodAuto } from 'api/history';

function Login() {
  const { kakaoLoginOnSuccess, kakaoLoginOnFail } = useLogin();
  const [value, onChange] = useInput('');

  const res = useDebounceEffect(getFoodAuto, value);
  console.log(res);

  return (
    <div>
      {/* <img src={logo} alt="" /> */}
      <Button
        onClick={() => {
          console.log('asdasda');
        }}
      >
        공통1231
      </Button>
      <Input value={value} onChange={onChange} placeholder={'asd'} />
      <KakaoLogin
        token={import.meta.env.VITE_KAKAO_API_KEY}
        onSuccess={kakaoLoginOnSuccess}
        onFail={kakaoLoginOnFail}
      >
        카카오톡 로그인
      </KakaoLogin>
    </div>
  );
}

export default Login;
