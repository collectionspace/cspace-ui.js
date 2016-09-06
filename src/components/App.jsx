import React, { PropTypes } from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import RouterContainer from '../containers/RouterContainer';

export default function App(props) {
  const {
    store,
    history,
    locale,
    messages,
  } = props;

  return (
    <IntlProvider locale={locale} messages={messages}>
      <Provider store={store}>
        <RouterContainer history={history} />
      </Provider>
    </IntlProvider>
  );
}

App.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  locale: PropTypes.string,
  messages: PropTypes.object,
};

App.defaultProps = {
  locale: 'en',
};
