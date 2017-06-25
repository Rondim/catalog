import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';


import App from './components/App';
import Adder from './containers/adder';
import MainConfig from './containers/mainConfig';
import PopupConfig from './containers/popupConfig';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import RequireAuth from './components/auth/require_auth';

const Routes = () => {
  return (
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={RequireAuth(Adder)}/>
        <Route path="/config1" component={RequireAuth(MainConfig)}/>
        <Route path="/config2" component={RequireAuth(PopupConfig)}/>
        <Route path="/signin" component={Signin}/>
        <Route path="/signout" component={Signout}/>
      </Route>
    </Router>
  );
};

export default Routes;
