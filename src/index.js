import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxPromise from 'redux-promise';
import reducers from './reducers';
import Routes from './router';
import '../style/style.css';

const App = () => {
  const store = createStore(reducers, {}, applyMiddleware(ReduxPromise));

  return <Provider store={store}>
      <Routes />
    </Provider>;
};

ReactDOM.render(<App />, document.getElementById('root'));
