import React from 'react';
import KakaoLogin from 'react-kakao-login';
import styled from 'styled-components';
import useLogin from 'hooks/useLogin';
import Input from 'components/common/Input';
import useInput from 'hooks/useInput';
import Button from 'components/common/Button';
import useDebounceEffect from 'hooks/useDebounceEffect';
import { getFoodAuto } from 'api/history';

function Login() {
  const { kakaoLoginOnSuccess, kakaoLoginOnFail } = useLogin();
  const [value, onChange, onClear] = useInput('');

  useDebounceEffect(getFoodAuto, value);
  return (
    <div>
      {/* <Button componentType="enable">123</Button> */}
      <Input
        value={value}
        onChange={onChange}
        onClear={onClear}
        placeholder={'asd'}
      />
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
