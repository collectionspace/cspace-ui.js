/* global document, window */

import React from 'react';
import { render } from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { IntlProvider } from 'react-intl';
import warning from 'warning';
import { Modal } from 'cspace-layout';

import { configureCSpace } from './actions/cspace';
import { addIDGenerators } from './actions/idGenerator';
import { addOptionLists } from './actions/optionList';
import { savePrefs } from './actions/prefs';
import defaultPlugins from './plugins';
import reducer from './reducers';
import App from './components/App';
import createPluginContext from './helpers/createPluginContext';

import { mergeConfig, normalizeConfig } from './helpers/configHelpers';

const pluginContext = createPluginContext();

const defaultConfig = mergeConfig({
  basename: '',
  className: '',
  container: 'main',
  index: '/dashboard',
  locale: 'en',
  messages: undefined,
  prettyUrls: false,
  serverUrl: '',
  serverTimeZone: 'UTC',
}, {
  plugins: defaultPlugins.map(plugin => plugin()),
}, pluginContext);

module.exports = (uiConfig) => {
  const config = normalizeConfig(mergeConfig(defaultConfig, uiConfig, pluginContext));

  const {
    container,
    idGenerators,
    optionLists,
    serverUrl,
  } = config;

  const mountNode = document.querySelector(container);

  warning(mountNode,
    `No container element was found using the selector '${container}'. The CollectionSpace UI will not be rendered.`);

  if (mountNode) {
    warning(mountNode !== document.body,
      `The container element for the CollectionSpace UI found using the selector '${container}' is the document body. This may cause problems, and is not supported.`);

    const intlProvider = new IntlProvider({
      locale: config.locale,
      messages: config.messages,
    });

    const { intl } = intlProvider.getChildContext();

    const store = createStore(reducer, applyMiddleware(thunk.withExtraArgument(intl)));

    window.addEventListener('beforeunload', () => {
      store.dispatch(savePrefs());
    });

    store.dispatch(configureCSpace({
      url: serverUrl,
    }));

    store.dispatch(addOptionLists(optionLists));
    store.dispatch(addIDGenerators(idGenerators));

    const props = {
      config,
      store,
    };

    Modal.setAppElement(mountNode);

    render(<App {...props} />, mountNode);
  }
};
