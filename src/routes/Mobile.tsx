import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Loading from 'components/common/Loading';

const Intro = lazy(() => import('components/mobile/intro/Intro'));
const Login = lazy(() => import('components/mobile/login/Login'));
const Address = lazy(() => import('components/mobile/address/Address'));
const MyLocation = lazy(() => import('components/mobile/address/MyLocation'));
const Recommend = lazy(() => import('components/mobile/recommend/Recommend'));
const History = lazy(() => import('components/mobile/history/History'));
const Filter = lazy(() => import('components/mobile/filter/Filter'));

function Mobile() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading isLoading={true} />}>
        <Switch>
          <Route path="/" component={Intro} exact />
          <Route path="/login" component={Login} />
          <Route path="/address" component={Address} />
          <Route path="/mylocation" component={MyLocation} />
          <Route path="/recommend" component={Recommend} />
          <Route path="/history" component={History} />
          <Route path="/filter" component={Filter} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default Mobile;
