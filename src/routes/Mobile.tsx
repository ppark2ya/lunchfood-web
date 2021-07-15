import React from 'react';
import {
  BrowserRouter,
  Route,
  RouteComponentProps,
  Switch,
} from 'react-router-dom';
import Header from 'components/mobile/common/Header';
import Navigation from 'components/mobile/common/Navigation';
import Intro from 'components/mobile/intro/Intro';
import Login from 'components/mobile/login/Login';
import Address from 'components/mobile/address/Address';
import MyLocation from 'components/mobile/address/MyLocation';
import Recommend from 'components/mobile/recommend/Recommend';
import History from 'components/mobile/history/History';
import DayMenu from 'components/mobile/history/DayMenu';
import Filter from 'components/mobile/filter/Filter';
import Favorites from 'components/mobile/filter/Favorites';
import PlaceSearch from 'components/mobile/filter/PlaceSearch';
import FoodSearch from 'components/mobile/history/FoodSearch';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

function Mobile() {
  return (
    <BrowserRouter>
      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition key={location.key} timeout={400} classNames="fade">
              <Switch location={location}>
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
                <Route
                  path="/main/history/food_search"
                  component={FoodSearch}
                  exact
                />
                <Route
                  path="/main/filter/favorites"
                  component={Favorites}
                  exact
                />
                <Route
                  path="/main/filter/search"
                  component={PlaceSearch}
                  exact
                />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    </BrowserRouter>
  );
}

function Wrapper(props: RouteComponentProps) {
  const { pathname } = props.location;

  return (
    <div>
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
    </div>
  );
}

export default Mobile;
