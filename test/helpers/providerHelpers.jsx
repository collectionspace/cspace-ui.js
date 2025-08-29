import React from 'react';
import { render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { applyMiddleware, compose, createStore as reduxCreateStore } from 'redux';
import thunk from 'redux-thunk';
import ConfigProvider from '../../src/components/config/ConfigProvider';
import reducers from '../../src/reducers';
import createConfigContext from '../../src/helpers/createConfigContext';
import { evaluatePlugin, finalizeRecordTypes, mergeConfig } from '../../src/helpers/configHelpers';
import plugins from '../../src/plugins';

/**
 * @returns the CSpace configuration object
 */
export function createCSpaceConfig() {
  const configContext = createConfigContext();

  const defaultConfig = mergeConfig({
    structDateOptionListNames: ['dateQualifiers'],
    structDateVocabNames: ['dateera', 'datecertainty', 'datequalifier'],
    tags: {
      defaultGroup: {
        sortOrder: 0,
      },
      nagpra: {
        sortOrder: 1,
      },
      legacy: {
        sortOrder: 3,
      },
    },
    tenantId: '1',
  }, {
    plugins: plugins.map((plugin) => plugin()),
  }, configContext);

  const resolvedUiConfig = evaluatePlugin({}, createConfigContext());
  return finalizeRecordTypes(mergeConfig(defaultConfig, resolvedUiConfig, configContext));
}

/**
 * @returns a redux store
 */
export function createStore() {
  return reduxCreateStore(reducers, compose(
    applyMiddleware(thunk),
  ));
}

/**
 * Render a React component/function with all expected providers
 *
 * @param {*} element the React component to render
 * @param {*} config the CollectionSpace configuration for the ConfigProvider
 * @param {*} store the Redux store for the Redux Provider
 * @param {*} container the container to render to
 * @returns
 */
export function renderWithProviders(element, config, store, container) {
  let resultTree;

  const fullTree = (
    <IntlProvider locale="en">
      <Provider store={store}>
        <ConfigProvider config={config}>
          <MemoryRouter>
            {element}
          </MemoryRouter>
        </ConfigProvider>
      </Provider>
    </IntlProvider>
  );

  act(() => {
    resultTree = render(fullTree, container);
  });

  return resultTree;
}
