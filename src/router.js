import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import App from './components/App';

const Routes = () => {
  return (
    <Router history={hashHistory}>
      <Route path="/" component={App}>
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
