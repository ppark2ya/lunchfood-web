import React, { useEffect } from 'react';
import useAccount from 'hooks/useAccount';
import { useHistory } from 'react-router-dom';
import { Account } from 'api/types';

function Intro() {
  const history = useHistory();
  const { id } = localStorage;
  const { asyncGetAccount } = useAccount();

  useEffect(() => {
    asyncGetAccount()
      .then((account: Account) => {
        history.push({
          pathname: '/main/recommend',
          state: {
            latlng: [account?.y, account?.x],
          },
        });
      })
      .catch((e: string) => {
        console.error(e);
        history.push({
          pathname: '/login',
        });
      });
  }, [id]);

  return <div></div>;
}

export default Intro;
