import React, { PropTypes } from 'react';
import { IntlProvider } from 'react-intl';
import { Provider as StoreProvider } from 'react-redux';
import ConfigProvider from './config/ConfigProvider';
import RouterContainer from '../containers/RouterContainer';

const propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  className: PropTypes.string,
  config: PropTypes.object,
};

const defaultProps = {
  locale: 'en',
};

export default function App(props) {
  const {
    className,
    config,
    history,
    store,
  } = props;

  const {
    index,
    locale,
    messages,
  } = config;

  return (
    <IntlProvider locale={locale} messages={messages}>
      <StoreProvider store={store}>
        <ConfigProvider config={config}>
          <RouterContainer
            className={className}
            history={history}
            index={index}
          />
        </ConfigProvider>
      </StoreProvider>
    </IntlProvider>
  );
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;
