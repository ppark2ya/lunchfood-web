import { useCallback, useState } from 'react';
import { getAccount } from 'api/account';
import { Account } from 'api/types';
import { COMMON_MESSAGE } from 'Constants';

function useAccount() {
  const [account, setAccount] = useState<Account>();
  const asyncGetAccount = useCallback(async (id: number) => {
    try {
      if (localStorage.id) {
        const { data } = await getAccount({ id: localStorage.id });

        if (data.resultCode === 200) {
          setAccount(data.data);
        } else {
          window.alert(COMMON_MESSAGE.ACCOUNT_MESSAGE.NO_RESULT);
        }
      } else {
        window.alert(COMMON_MESSAGE.ACCOUNT_MESSAGE.LOAD_FAIL);
      }
    } catch (e) {
      window.alert(COMMON_MESSAGE.ACCOUNT_MESSAGE.LOAD_FAIL);
    }
  }, []);

  return {
    account,
    asyncGetAccount,
  };
}

export default useAccount;