import React from 'react';
import { getAddressList } from 'api/address';
import { OPEN_API_ROAD_ADDRESS_KEY } from 'Constants';
import queryString from 'query-string';

function Login() {
  React.useEffect(() => {
    async function asyncGetAddressList() {
      const param = {
        confmKey: OPEN_API_ROAD_ADDRESS_KEY,
        currentPage: 1,
        countPerPage: 10,
        keyword: '하안동',
        // resultType: 'json',
      };
      // 'confmKey=U01TX0FVVEgyMDIxMDQxMDIxMzQyNzExMTAzNDU=&countPerPage=10&currentPage=1&keyword=하안동&resultType=json'

      const data = await getAddressList({
        param: queryString.stringify(param),
        prefix: '',
        name: 'jsonp',
        timeout: 3000,
      });
      console.log(data);
    }
    asyncGetAddressList();
  }, []);

  return <div>Mobile Login</div>;
}

export default Login;
