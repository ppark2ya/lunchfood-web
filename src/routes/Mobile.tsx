import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from 'components/mobile/login/Login';

function Mobile() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default Mobile;
