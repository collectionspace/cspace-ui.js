/* global document, window */

import React from 'react';
import { render } from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { useRouterHistory } from 'react-router';
import { createHistory, createHashHistory, useBeforeUnload } from 'history';
import { syncHistoryWithStore } from 'react-router-redux';
import script from 'scriptjs';
import warning from 'warning';

import { configureCSpace } from './actions/cspace';
import { addIDGenerators } from './actions/idGenerator';
import { addOptionLists } from './actions/optionList';
import { loadPrefs, savePrefs } from './actions/prefs';
import reducer from './reducers';
import App from './components/App';
import createPluginContext from './helpers/createPluginContext';

import sharedOptionLists from './plugins/optionLists/shared';
import defaultListTypes from './plugins/listTypes/default';
import allRecordType from './plugins/recordTypes/all';
import authorityRecordType from './plugins/recordTypes/authority';
import citationRecordType from './plugins/recordTypes/citation';
import conceptRecordType from './plugins/recordTypes/concept';
import groupRecordType from './plugins/recordTypes/group';
import intakeRecordType from './plugins/recordTypes/intake';
import loaninRecordType from './plugins/recordTypes/loanin';
import mediaRecordType from './plugins/recordTypes/media';
import collectionobjectRecordType from './plugins/recordTypes/collectionobject';
import organizationRecordType from './plugins/recordTypes/organization';
import personRecordType from './plugins/recordTypes/person';
import placeRecordType from './plugins/recordTypes/place';
import procedureRecordType from './plugins/recordTypes/procedure';
import refsSubresource from './plugins/subresources/refs';
import termsSubresource from './plugins/subresources/terms';

import { mergeConfig, normalizeConfig } from './helpers/configHelpers';

const loadPolyfills = (locale, callback) => {
  if (window.Intl) {
    window.setTimeout(callback, 0);
  } else {
    const url = `https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.${locale}`;

    script(url, callback);
  }
};

const pluginContext = createPluginContext();

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
    defaultListTypes(),
    allRecordType(),
    authorityRecordType(),
    citationRecordType(),
    conceptRecordType(),
    groupRecordType(),
    intakeRecordType(),
    loaninRecordType(),
    mediaRecordType(),
    collectionobjectRecordType(),
    personRecordType(),
    placeRecordType(),
    organizationRecordType(),
    procedureRecordType(),
    refsSubresource(),
    termsSubresource(),
  ],
}, pluginContext);

module.exports = (uiConfig) => {
  const config = normalizeConfig(mergeConfig(defaultConfig, uiConfig, pluginContext));

  const {
    basename,
    className,
    container,
    cspaceUrl,
    idGenerators,
    locale,
    optionLists,
    prettyUrls,
  } = config;

  const mountNode = document.querySelector(container);

  warning(mountNode,
    `No container element was found using the selector '${container}'. The CollectionSpace UI will not be rendered.`);

  if (mountNode) {
    warning(mountNode !== document.body,
      `The container element for the CollectionSpace UI found using the selector '${container}' is the document body. This may cause problems, and is not supported.`);

    const store = createStore(reducer, applyMiddleware(thunk));

    const baseHistory = prettyUrls
      ? useRouterHistory(useBeforeUnload(createHistory))({ basename })
      : useRouterHistory(useBeforeUnload(createHashHistory))();

    baseHistory.listenBeforeUnload(() => {
      store.dispatch(savePrefs());
    });

    const history = syncHistoryWithStore(baseHistory, store);

    store.dispatch(configureCSpace({
      url: cspaceUrl,
    }));

    store.dispatch(loadPrefs());
    store.dispatch(addOptionLists(optionLists));
    store.dispatch(addIDGenerators(idGenerators));

    const props = {
      className,
      config,
      history,
      store,
    };

    loadPolyfills(locale, () => {
      render(<App {...props} />, mountNode);
    });
  }
};
