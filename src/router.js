import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';


import App from './components/App';
import Catalog from './containers/Catalog';
import Manager from './components/Manager';
import DandDCells from './containers/CellsContainer';
import Signin from './containers/auth/signin';
import requireAuth from './containers/auth/require_auth';

const Routes = () => {
  return (
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={requireAuth(Catalog)} />
        <Route path="/manager" component={requireAuth(Manager)} />
        <Route path="/manager2" component={requireAuth(DandDCells)} />
        <Route path="/signin" component={Signin} />
      </Route>
    </Router>
  );
};

export default Routes;
