import Adder from './containers/Adder';
import MainConfig from './containers/mainConfig';
import PopupConfig from './containers/popupConfig';
import Signin from './containers/Auth/Signin';
import requireAuth from './containers/Auth/require_auth';


const routes = [
  {
    path: '/',
    component: requireAuth(Adder)
  },
  {
    path: '/signin',
    component: Signin
  },
  /* {
    path: '/config1',
    component: requireAuth(MainConfig)
  },
  {
    path: '/config2',
    component: requireAuth(PopupConfig)
  } */
];

export default routes;
