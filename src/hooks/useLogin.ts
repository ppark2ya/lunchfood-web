import { useCallback } from 'react';
import { insertAccount } from 'api/account';
import { useHistory } from 'react-router-dom';

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

function useLogin() {
  const history = useHistory();
  const kakaoLoginOnSuccess = useCallback(
    async (response: { response: LoginResponse; profile?: UserProfile }) => {
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
          // 1660286870
          localStorage.id = profile.id;
          history.push('/address');
        } else {
          alert('로그인 실패!');
        }
      } else {
        alert('회원정보를 찾을 수 없습니다.');
      }
    },
    [],
  );

  const kakaoLoginOnFail = useCallback((error: KakaoError) => {
    alert('로그인 실패!');
    console.error(error);
  }, []);

  return {
    kakaoLoginOnSuccess,
    kakaoLoginOnFail,
  };
}

export default useLogin;
