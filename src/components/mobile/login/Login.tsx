import React from 'react';
import KakaoLogin from 'react-kakao-login';
import styled from 'styled-components';
import useLogin from 'hooks/useLogin';
import Input from 'components/common/Input';
import SearchButton from 'components/common/SearchButton';
import useInput from 'hooks/useInput';

function Login() {
  const { kakaoLoginOnSuccess, kakaoLoginOnFail } = useLogin();
  const [value, onChange, onClear] = useInput('');

  React.useEffect(() => {
    console.log(navigator.geolocation);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (
        position: GeolocationPosition,
      ) {
        alert(position.coords.latitude + ' ' + position.coords.longitude);
      });
    }
  }, []);
  return (
    <div>
      {/* <Button componentType="enable">123</Button> */}
      <Input
        value={value}
        mode={'edit'}
        onChange={onChange}
        onClear={onClear}
        placeholder={'asd'}
      />
      {/* <SearchButton /> */}
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
