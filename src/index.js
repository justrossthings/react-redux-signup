import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import Promise from 'redux-promise';

import Routes from './routes';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(
    Promise
)(createStore);

//Let react router handle page routes and refer to routes.js
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
      <Router history={browserHistory} routes={Routes} />
  </Provider>
  , document.querySelector('.container'));
