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
const DayMenu = lazy(() => import('components/mobile/history/DayMenu'));
const Filter = lazy(() => import('components/mobile/filter/Filter'));
const Favorites = lazy(() => import('components/mobile/filter/Favorites'));
const PlaceSearch = lazy(() => import('components/mobile/filter/PlaceSearch'));

function Mobile() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading isLoading={true} />}>
        <Switch>
          <Route path="/" component={Intro} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/address" component={Address} exact />
          <Route path="/mylocation" component={MyLocation} exact />
          <Route
            path="/main(/address|/recommend|/history|/filter)"
            render={Wrapper}
            exact
          />
          <Route path="/main/history/dayMenu" component={DayMenu} exact />
          <Route path="/main/filter/favorites" component={Favorites} exact />
          <Route path="/main/filter/search" component={PlaceSearch} exact />
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
