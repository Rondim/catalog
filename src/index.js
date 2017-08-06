import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './router';
import '../style/style.css';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';

const networkInterface = createNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/cj5tpc7zsj16i012285uxa6j5'
});
networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};
    }

    // get the authentication token from local storage if it exists
    if (localStorage.getItem('token')) {
      req.options.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
    }
    next();
  },
}]);
const client = new ApolloClient({ networkInterface });
ReactDOM.render((
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
), document.getElementById('root'));

