/* global document, window */

import React from 'react';
import { render } from 'react-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { addLocaleData, IntlProvider } from 'react-intl';
import en from 'react-intl/locale-data/en';
import warning from 'warning';
import { Modal } from 'cspace-layout';
import logoUrl from '../images/collectionspace.svg';
import { configureCSpace, readSystemInfo } from './actions/cspace';
import { addIDGenerators } from './actions/idGenerator';
import { addOptionLists } from './actions/optionList';
import { savePrefs } from './actions/prefs';
import { OP_OR } from './constants/searchOperators';
import defaultPlugins from './plugins';
import reducer from './reducers';
import AppContainer from './containers/AppContainer';
import createConfigContext from './helpers/createConfigContext';
import { evaluatePlugin, finalizeRecordTypes, mergeConfig } from './helpers/configHelpers';

const configContext = createConfigContext();

const defaultConfig = mergeConfig({
  allowDeleteHierarchyLeaves: false,
  autocompleteFindDelay: 500,
  autocompleteMinLength: 3,
  basename: '',
  className: '',
  container: '#cspace',
  defaultAdvancedSearchBooleanOp: OP_OR,
  defaultDropdownFilter: 'substring',
  defaultUserPrefs: {
    panels: {
      collectionobject: {
        mediaSnapshotPanel: {
          collapsed: false,
        },
      },
    },
  },
  index: '/search',
  locale: 'en-US',
  logo: logoUrl,
  mediaSnapshotSort: 'title',
  messages: undefined,
  prettyUrls: false,
  relationMemberPerm: 'U',
  serverUrl: '',
  showTermListStateIcon: false,
  structDateOptionListNames: ['dateQualifiers'],
  structDateVocabNames: ['dateera', 'datecertainty', 'datequalifier'],
  tenantId: '1',
  termDeprecationEnabled: false,
}, {
  plugins: defaultPlugins.map(plugin => plugin()),
}, configContext);

module.exports = (uiConfig) => {
  const resolvedUiConfig = evaluatePlugin(uiConfig, configContext);
  const config = finalizeRecordTypes(mergeConfig(defaultConfig, resolvedUiConfig, configContext));

  const {
    container,
    idGenerators,
    optionLists,
  } = config;

  const mountNode = document.querySelector(container);

  warning(mountNode,
    `No container element was found using the selector '${container}'. The CollectionSpace UI will not be rendered.`);

  if (mountNode) {
    warning(mountNode !== document.body,
      `The container element for the CollectionSpace UI found using the selector '${container}' is the document body. This may cause problems, and is not supported.`);

    addLocaleData([...en]);

    const intlProvider = new IntlProvider({
      locale: config.locale,
      messages: config.messages,
    });

    const { intl } = intlProvider.getChildContext();

    // eslint-disable-next-line no-underscore-dangle
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(reducer, composeEnhancers(
      applyMiddleware(thunk.withExtraArgument(intl))
    ));

    window.addEventListener('beforeunload', () => {
      store.dispatch(savePrefs());
    });

    store.dispatch(configureCSpace(config));
    store.dispatch(addOptionLists(optionLists));
    store.dispatch(addIDGenerators(idGenerators));
    store.dispatch(readSystemInfo());

    const props = {
      config,
      store,
    };

    Modal.setAppElement(mountNode);

    render(<AppContainer {...props} />, mountNode);
  }
};
