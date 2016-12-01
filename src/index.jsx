/* global document, window */

import React from 'react';
import { render } from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { hashHistory, useRouterHistory } from 'react-router';
import { createHistory } from 'history';
import { syncHistoryWithStore } from 'react-router-redux';
import Immutable from 'immutable';
import script from 'scriptjs';
import warning from 'warning';

import { configureCSpace } from './actions/cspace';
import { addOptions } from './actions/options';
import reducer from './reducers';
import App from './components/App';

import sharedOptionLists from './plugins/optionLists/shared';
import citationRecordType from './plugins/recordTypes/citation';
import conceptRecordType from './plugins/recordTypes/concept';
import objectRecordType from './plugins/recordTypes/object';
import personRecordType from './plugins/recordTypes/person';
import placeRecordType from './plugins/recordTypes/place';
import organizationRecordType from './plugins/recordTypes/organization';

import { mergeConfig } from './helpers/configHelpers';

const loadPolyfills = (locale, callback) => {
  if (window.Intl) {
    window.setTimeout(callback, 0);
  } else {
    const url = `https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.${locale}`;

    script(url, callback);
  }
};

const pluginContext = {
  Immutable,
  React,
};

const defaultConfig = mergeConfig({
  basename: '',
  className: '',
  container: 'main',
  cspaceUrl: '',
  index: undefined,
  locale: 'en',
  messages: undefined,
  prettyUrls: false,
}, {
  plugins: [
    sharedOptionLists(),
    citationRecordType(),
    conceptRecordType(),
    objectRecordType(),
    personRecordType(),
    placeRecordType(),
    organizationRecordType(),
  ],
}, pluginContext);

module.exports = (uiConfig) => {
  const {
    basename,
    className,
    container,
    cspaceUrl,
    index,
    locale,
    messages,
    optionLists,
    prettyUrls,
    recordTypes,
  } = mergeConfig(defaultConfig, uiConfig, pluginContext);

  const mountNode = document.querySelector(container);

  warning(mountNode,
    `No container element was found using the selector '${container}'. The CollectionSpace UI will not be rendered.`);

  if (mountNode) {
    warning(mountNode !== document.body,
      `The container element for the CollectionSpace UI found using the selector '${container}' is the document body. This may cause problems, and is not supported.`);

    const store = createStore(reducer, applyMiddleware(thunk));
    const baseHistory = prettyUrls ? useRouterHistory(createHistory)({ basename }) : hashHistory;
    const history = syncHistoryWithStore(baseHistory, store);

    store.dispatch(configureCSpace({
      url: cspaceUrl,
    }));

    store.dispatch(addOptions(optionLists));

    const props = {
      className,
      history,
      index,
      locale,
      messages,
      recordTypes,
      store,
    };

    loadPolyfills(locale, () => {
      render(<App {...props} />, mountNode);
    });
  }
};
