import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { KAKAO_API_KEY } from 'Constants';
import KakaoLogin from 'react-kakao-login';
import { insertAccount } from 'api/account';
import styled from 'styled-components';

interface KakaoError {
  error: string;
  error_description: string;
}
interface LoginResponse {
  token_type: string;
  access_token: string;
  expires_in: string;
  refresh_token: string;
  refresh_token_expires_in: number;
  scope: string;
}
interface Profile {
  nickname: string;
  profile_image: string;
  thumbnail_image_url: string;
  profile_needs_agreement?: boolean;
}
interface KakaoAccount {
  profile: Profile;
  email: string;
  age_range: string;
  birthday: string;
  birthyear: string;
  gender: 'female' | 'male';
  phone_number: string;
  ci: string;
}
interface UserProfile {
  id: number;
  kakao_account: KakaoAccount;
  synched_at: string;
  connected_at: string;
  properties: Profile;
}

function Login() {
  const history = useHistory();
  const kakaoLoginOnSuccess = useCallback(
    async (response: { response: LoginResponse; profile?: UserProfile }) => {
      console.log(response);

      if (response.profile) {
        const { profile } = response;
        const {
          data: { resultCode },
        } = await insertAccount({
          id: profile.id,
          age: '0',
          birthday: profile.kakao_account.birthday,
          birthyear: '0',
          gender: profile.kakao_account.gender,
        });

        if (resultCode === 200) {
          history.push('/address');
        } else {
          window.alert('로그인 실패!');
        }
      }
    },
    [],
  );

  const kakaoLoginOnFail = useCallback((error: KakaoError) => {
    console.error(error);
  }, []);

  return (
    <div>
      <KakaoLogin
        token={KAKAO_API_KEY}
        onSuccess={kakaoLoginOnSuccess}
        onFail={kakaoLoginOnFail}
      />
    </div>
  );
}

export default Login;
