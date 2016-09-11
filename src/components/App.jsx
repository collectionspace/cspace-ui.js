import React, { PropTypes } from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import RouterContainer from '../containers/RouterContainer';

export default function App(props) {
  const {
    history,
    index,
    locale,
    messages,
    store,
  } = props;

  return (
    <IntlProvider locale={locale} messages={messages}>
      <Provider store={store}>
        <RouterContainer
          history={history}
          index={index}
        />
      </Provider>
    </IntlProvider>
  );
}

App.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  index: PropTypes.string,
  locale: PropTypes.string,
  messages: PropTypes.object,
};

App.defaultProps = {
  locale: 'en',
};
