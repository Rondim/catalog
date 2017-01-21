import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import App from './components/App';
import Catalog from './containers/Catalog';
import Manager from './containers/Manager';

const Routes = () => {
  return (
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Catalog} />
        <Route path="/manager" component={Manager} />
      </Route>
    </Router>
  );
};

export default Routes;


// ROUTE CHUNKING
// const componentRoutes = {
//   component: Home,
//   path: '/',
//   indexRoute: { component: ArtistMain },
//   childRoutes: [
//     {
//       path: '/artists/new',
//       getComponent(location, cb) {
//         System.import('./components/artists/ArtistCreate').
//           then(module => cb(null, module.default));
//       }
//     },
//     {
//       path: '/artists/:id',
//       getComponent(location, cb) {
//         System.import('./components/artists/ArtistDetail').
//           then(module => cb(null, module.default));
//       }
//     },
//     {
//       path: 'artists/:id/edit',
//       getComponent(location, cb) {
//         System.import('./components/artists/ArtistEdit').
//           then(module => cb(null, module.default));
//       }
//     }
//   ]
// };
//
// const Routes = () => {
//   return (
//     <Router history={hashHistory} routes={componentRoutes}/>
//   );
// };
