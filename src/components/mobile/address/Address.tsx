import React from 'react';
import { getAccount } from 'api/account';

function Address() {
  React.useEffect(() => {
    async function asyncGetAccount() {
      const { data } = await getAccount({ id: 1660286870 });
      console.log(`getAccount res: `, data);
    }
    // asyncGetAccount();
  }, []);

  return <div></div>;
}

export default Address;
