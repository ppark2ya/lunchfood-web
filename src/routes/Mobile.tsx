import React from 'react';
import { history } from 'store';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import Login from 'components/mobile/login/Login';

function Mobile() {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" component={Login} />
      </Switch>
    </ConnectedRouter>
  );
}

export default Mobile;
