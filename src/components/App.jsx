import React, { PropTypes } from 'react';
import { IntlProvider } from 'react-intl';
import { Provider as StoreProvider } from 'react-redux';
import RecordPluginProvider from './record/RecordPluginProvider';
import RouterContainer from '../containers/RouterContainer';

export default function App(props) {
  const {
    history,
    index,
    locale,
    messages,
    plugins,
    store,
  } = props;

  return (
    <IntlProvider locale={locale} messages={messages}>
      <StoreProvider store={store}>
        <RecordPluginProvider recordPlugins={plugins.record}>
          <RouterContainer
            history={history}
            index={index}
          />
        </RecordPluginProvider>
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
  plugins: PropTypes.object,
};

App.defaultProps = {
  locale: 'en',
};
