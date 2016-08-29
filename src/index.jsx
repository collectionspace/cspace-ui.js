/* global document */

import React from 'react';
import { render } from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { useRouterHistory } from 'react-router';
import { createHistory } from 'history';
import { syncHistoryWithStore } from 'react-router-redux';

import reducer from './reducers';
import { configureCSpace } from './actions';
import App from './components/App';

export default (config) => {
  const {
    selector,
    basename,
    cspaceUrl,
  } = config;

  const container = document.querySelector(selector);

  if (container) {
    const store = createStore(reducer, applyMiddleware(thunk));
    const history = syncHistoryWithStore(
      useRouterHistory(createHistory)({ basename }),
      store);

    store.dispatch(configureCSpace({
      url: cspaceUrl,
    }));

    const props = {
      store,
      history,
    };

    render(<App {...props} />, container);
  }
};
