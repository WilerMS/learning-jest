import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { createBrowserHistory } from 'history';

import initialState from '../initialState';
import reducer from '../reducers';

const store = createStore(reducer, initialState);
const history = createBrowserHistory();

const ProviderMock = props => (
  <Provider store={store}>
    <Router history={history}>
      {props.children}
    </Router>
  </Provider>
);

export default ProviderMock;
