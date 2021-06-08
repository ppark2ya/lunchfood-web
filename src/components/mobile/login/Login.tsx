import React from 'react';
import { KAKAO_API_KEY } from 'Constants';
import KakaoLogin from 'react-kakao-login';
import { getAccount } from 'api/account';

async function asyncGetAccount() {
  const { data } = await getAccount({ id: 1660286870 });
  console.log(`getAccount res: `, data);
}

function Login() {
  React.useEffect(() => {
    const kakaoMaps = window.kakao.maps;
    const options = {
      center: new kakaoMaps.LatLng(37.365264512305174, 127.10676860117488),
      level: 3,
    };

    // const map = new kakaoMaps.Map(document.getElementById('map'), options);
    asyncGetAccount();
  }, []);

  return (
    <div>
      <KakaoLogin
        token={KAKAO_API_KEY}
        onSuccess={(response) => console.log(response)}
        onFail={(error) => console.error(error)}
      />
      <div id="map" style={{ width: '400px', height: '400px' }}></div>
    </div>
  );
}

export default Login;
