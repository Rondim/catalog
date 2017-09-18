import React, { Component } from 'react';
import { HashRouter as Router } from 'react-router-dom';

import AdderNav from '../containers/AdderNav';
import routes from '../router';
import RouteWithSubRoutes from './RouteWithSubRoutes';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <AdderNav />
            {routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
            ))}
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

