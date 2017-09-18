import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';

import App from './components/App';
import { AUTH_USER } from './containers/Auth/actions/types';
import { client, store } from './store';
import './style/style.css';

const token = localStorage.getItem('token');
// If we have a token, consider the user to signed in
if (token) {
  // we need update application state
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <ApolloProvider store={store} client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'));

