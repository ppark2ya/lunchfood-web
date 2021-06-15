import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Header from 'components/web/common/Header';
import Footer from 'components/web/common/Footer';
import Login from 'components/web/login/Login';
import History from 'components/web/history/History';
import Filter from 'components/web/filter/Filter';
import Address from 'components/web/address/Address';
import NotFoundPage from 'components/web/common/NotFountPage';

function Browser() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" component={Login} exact />
        <Route path="/filter" component={Filter} />
        <Route path="/address" component={Address} />
        <Route path="/history" component={History} />
        <Route component={NotFoundPage} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default Browser;
