import React, { PropTypes } from 'react';
import { IntlProvider } from 'react-intl';
import { Provider as StoreProvider } from 'react-redux';
import RecordTypePluginProvider from './record/RecordTypePluginProvider';
import RouterContainer from '../containers/RouterContainer';

export default function App(props) {
  const {
    history,
    index,
    locale,
    messages,
    recordTypePlugins,
    store,
  } = props;

  return (
    <IntlProvider locale={locale} messages={messages}>
      <StoreProvider store={store}>
        <RecordTypePluginProvider recordTypePlugins={recordTypePlugins}>
          <RouterContainer
            history={history}
            index={index}
          />
        </RecordTypePluginProvider>
      </StoreProvider>
    </IntlProvider>
  );
}

App.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  index: PropTypes.string,
  locale: PropTypes.string,
  messages: PropTypes.object,
  recordTypePlugins: PropTypes.object,
};

App.defaultProps = {
  locale: 'en',
};
