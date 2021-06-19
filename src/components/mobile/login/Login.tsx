import React from 'react';
import KakaoLogin from 'react-kakao-login';
import styled from 'styled-components';
import useLogin from 'hooks/useLogin';
import logoImage from 'assets/mb_ic_main_logo.png';
import foodImage from 'assets/mb_ic_login_main.png';

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 7vh 2vw;

  .logo-img {
    margin: 10vh auto;
    width: 70%;
  }

  .food-img {
    width: 80%;
  }

  .license {
    color: ${(props) => props.theme.color.fontGray};
    font-size: 0.7rem;
    margin-top: 2vh;
    margin-bottom: 12vh;
  }
`;

const StyledKakaoLogin = styled(KakaoLogin)`
  width: 85% !important;
  border-radius: ${(props) => props.theme.border.radius} !important;
`;

function Login() {
  const { kakaoLoginOnSuccess, kakaoLoginOnFail } = useLogin();

  return (
    <Container>
      <img className="logo-img" src={logoImage} alt="logo" />
      <img className="food-img" src={foodImage} alt="foods" />
      <div className="license">Designed by macrovector / Freepik</div>
      <StyledKakaoLogin
        token={import.meta.env.VITE_KAKAO_API_KEY}
        onSuccess={kakaoLoginOnSuccess}
        onFail={kakaoLoginOnFail}
      >
        카카오톡 로그인
      </StyledKakaoLogin>
    </Container>
  );
}

export default Login;
