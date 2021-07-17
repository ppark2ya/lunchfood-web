import React from 'react';
import {
  Route,
  Switch,
  BrowserRouter,
  RouteComponentProps,
} from 'react-router-dom';
import Header from 'components/web/common/Header';
import Footer from 'components/web/common/Footer';
import Login from 'components/web/login/Login';
import History from 'components/web/history/History';
import Filter from 'components/web/filter/Filter';
import Address from 'components/web/address/Address';
import NotFoundPage from 'components/web/common/NotFountPage';
import Recommend from 'components/web/recommend/Recommend';
import Favorites from 'components/web/filter/Favorites';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Intro from 'components/web/intro/Intro';

function Browser() {
  return (
    <BrowserRouter>
      <Header />
      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition key={location.key} timeout={400} classNames="fade">
              <Switch location={location}>
                <Route path="/" component={Intro} exact />
                <Route path="/login" component={Login} exact />
                <Route path="/address" component={Address} exact />
                <Route
                  path="/main(/address|/recommend|/history|/filter)"
                  render={Wrapper}
                  exact
                />
                <Route
                  path="/main/filter/favorites"
                  component={Favorites}
                  exact
                />
                {/* <Route path="/main/filter/search" component={PlaceSearch} exact /> */}
                <Route component={NotFoundPage} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
      <Footer />
    </BrowserRouter>
  );
}

function Wrapper(props: RouteComponentProps) {
  const { pathname } = props.location;

  return (
    <div>
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
    </div>
  );
}

export default Browser;
