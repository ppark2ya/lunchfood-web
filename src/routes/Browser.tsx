import React from 'react';
import { Provider } from 'react-redux';
import configureStore, { history } from 'store';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import Login from 'components/web/login/Login';

const store = configureStore();
function Browser() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" component={Login} />
        </Switch>
      </ConnectedRouter>
    </Provider>
  );
}

export default Browser;
