import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const Login = lazy(() => import('components/mobile/login/Login'));
const Address = lazy(() => import('components/mobile/address/Address'));
const Recommend = lazy(() => import('components/mobile/recommend/Recommend'));
const History = lazy(() => import('components/mobile/history/History'));
const Filter = lazy(() => import('components/mobile/filter/Filter'));

function Mobile() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>loading...</div>}>
        <Switch>
          <Route path="/" component={Login} exact />
          <Route path="/address" component={Address} />
          <Route path="/Recommend" component={Recommend} />
          <Route path="/history" component={History} />
          <Route path="/filter" component={Filter} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default Mobile;
