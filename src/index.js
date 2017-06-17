import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxPromise from 'redux-promise';
import reducers from './reducers';
import Routes from './router';
import '../style/style.css';
import reduxThunk from 'redux-thunk';

const App = () => {
  const store = createStore(reducers, {}, applyMiddleware(ReduxPromise, reduxThunk));

  return <Provider store={store}>
    <Routes />
  </Provider>;
};
ReactDOM.render(<App />, document.getElementById('root'));
