import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter,
  Route,
  RouteComponentProps,
  Switch,
} from 'react-router-dom';
import Loading from 'components/common/Loading';
import Header from 'components/mobile/common/Header';
import Navigation from 'components/mobile/common/Navigation';

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
          <Route
            path="/main(/address|/recommend|/history|/filter)"
            render={Wrapper}
          />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

function Wrapper(props: RouteComponentProps) {
  const { pathname } = props.location;

  return (
    <>
      <Header isBackBtn={false} />
      {pathname === '/main/address' ? (
        <Address />
      ) : pathname === '/main/recommend' ? (
        <Recommend />
      ) : pathname === '/main/history' ? (
        <History />
      ) : pathname === '/main/filter' ? (
        <Filter />
      ) : (
        ''
      )}
      <Navigation />
    </>
  );
}

export default Mobile;
