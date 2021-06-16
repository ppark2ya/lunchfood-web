import React from 'react';
import KakaoLogin from 'react-kakao-login';
import styled from 'styled-components';
import useLogin from 'hooks/useLogin';
import Input from 'components/common/Input';
import SearchButton from 'components/common/SearchButton';
import useInput from 'hooks/useInput';
import KakaoMap from 'components/common/KakaoMap';

function Login() {
  const { kakaoLoginOnSuccess, kakaoLoginOnFail } = useLogin();
  const [value, onChange, onClear] = useInput('');

  return (
    <div>
      <KakaoMap />
      {/* <Button componentType="enable">123</Button> */}
      {/* <Input
        value={value}
        mode={'edit'}
        onChange={onChange}
        onClear={onClear}
        placeholder={'asd'}
      /> */}
      {/* <SearchButton /> */}
      {/* <KakaoLogin
        token={import.meta.env.VITE_KAKAO_API_KEY}
        onSuccess={kakaoLoginOnSuccess}
        onFail={kakaoLoginOnFail}
      >
        카카오톡 로그인
      </KakaoLogin> */}
    </div>
  );
}

export default Login;
