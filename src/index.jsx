/* global document, window */

import React from 'react';
import { render } from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { useRouterHistory } from 'react-router';
import { createHistory, createHashHistory, useBeforeUnload } from 'history';
import { syncHistoryWithStore } from 'react-router-redux';
import warning from 'warning';
import { Modal } from 'cspace-layout';

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
import collectionobjectRecordType from './plugins/recordTypes/collectionobject';
import conceptRecordType from './plugins/recordTypes/concept';
import groupRecordType from './plugins/recordTypes/group';
import intakeRecordType from './plugins/recordTypes/intake';
import loaninRecordType from './plugins/recordTypes/loanin';
import mediaRecordType from './plugins/recordTypes/media';
import objectRecordType from './plugins/recordTypes/object';
import organizationRecordType from './plugins/recordTypes/organization';
import personRecordType from './plugins/recordTypes/person';
import placeRecordType from './plugins/recordTypes/place';
import procedureRecordType from './plugins/recordTypes/procedure';
import refsSubresource from './plugins/subresources/refs';
import termsSubresource from './plugins/subresources/terms';

import { mergeConfig, normalizeConfig } from './helpers/configHelpers';

const pluginContext = createPluginContext();

const defaultConfig = mergeConfig({
  basename: '',
  className: '',
  container: 'main',
  index: undefined,
  locale: 'en',
  messages: undefined,
  prettyUrls: false,
  serverUrl: '',
  serverTimeZone: 'UTC',
}, {
  plugins: [
    sharedOptionLists(),
    defaultListTypes(),
    allRecordType(),
    authorityRecordType(),
    citationRecordType(),
    collectionobjectRecordType(),
    conceptRecordType(),
    groupRecordType(),
    intakeRecordType(),
    loaninRecordType(),
    mediaRecordType(),
    objectRecordType(),
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
    idGenerators,
    locale,
    optionLists,
    prettyUrls,
    serverUrl,
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
      url: serverUrl,
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

    Modal.setAppElement(mountNode);

    render(<App {...props} />, mountNode);
  }
};
