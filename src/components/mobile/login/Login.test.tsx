import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Login from './Login';
import KakaoLogin from 'react-kakao-login';

// test('render Login', () => {
//   const { getByText } = render(<Login />);
//   const titleElement = getByText(/Login/i);
//   expect(titleElement).toBeInTheDocument();
// });

describe('insertAccount api test', () => {
  const mock = new MockAdapter(axios, { delayResponse: 200 });
  const baseUrl = 'https://lunch.nolmungshimung.com';
  it('', () => {
    const onSuccess = jest.fn();
    const { getByText } = render(
      <KakaoLogin
        token={'d70d97f9f2010b8441048ffccc59c48b'}
        onSuccess={(response) => console.log(response)}
        onFail={(error) => console.error(error)}
      />,
    );
    const button = getByText('카카오로 로그인하기');
    fireEvent.click(button);

    expect(onSuccess).toHaveBeenCalledTimes(1);
  });

  mock.onPost(`${baseUrl}/insert_acc`).reply(200, {
    id: '',
    age: '',
    birthday: '',
    birthyear: '',
    gender: '',
  });

  it('response 200', async () => {});

  it('response 404', async () => {});

  it('response 422', async () => {});

  it('response 500', async () => {});
});

// import React from 'react';
// import { KAKAO_API_KEY } from 'Constants';
// import KakaoLogin from 'react-kakao-login';
// import { getAccount } from 'api/account';

// async function asyncGetAccount() {
//   const { data } = await getAccount({ id: 1660286870 });
//   console.log(`getAccount res: `, data);
// }

// function Login() {
//   React.useEffect(() => {
//     const kakaoMaps = window.kakao.maps;
//     const options = {
//       center: new kakaoMaps.LatLng(37.365264512305174, 127.10676860117488),
//       level: 3,
//     };

//     // const map = new kakaoMaps.Map(document.getElementById('map'), options);
//     // asyncGetAccount();
//   }, []);

//   return (
//     <div>
//       <KakaoLogin
//         token={KAKAO_API_KEY}
//         onSuccess={(response) => console.log(response)}
//         onFail={(error) => console.error(error)}
//       />
//       <div id="map" style={{ width: '400px', height: '400px' }}></div>
//     </div>
//   );
// }

// export default Login;
