import React, { PropTypes } from 'react';
import { IntlProvider } from 'react-intl';
import { Provider as StoreProvider } from 'react-redux';
import RecordPluginProvider from './record/RecordPluginProvider';
import RouterContainer from '../containers/RouterContainer';

const propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  className: PropTypes.string,
  index: PropTypes.string,
  locale: PropTypes.string,
  messages: PropTypes.object,
  recordTypes: PropTypes.object,
};

const defaultProps = {
  locale: 'en',
};

export default function App(props) {
  const {
    className,
    history,
    index,
    locale,
    messages,
    recordTypes,
    store,
  } = props;

  return (
    <IntlProvider locale={locale} messages={messages}>
      <StoreProvider store={store}>
        <RecordPluginProvider recordPlugins={recordTypes}>
          <RouterContainer
            className={className}
            history={history}
            index={index}
          />
        </RecordPluginProvider>
      </StoreProvider>
    </IntlProvider>
  );
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;
