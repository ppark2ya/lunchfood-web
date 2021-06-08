import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const Login = lazy(() => import('components/mobile/login/Login'));

function Mobile() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>loading...</div>}>
        <Switch>
          <Route path="/" component={Login} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default Mobile;
