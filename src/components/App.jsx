import React, { PropTypes } from 'react';
import { IntlProvider } from 'react-intl';
import { Provider as StoreProvider } from 'react-redux';
import RecordProvider from './record/RecordProvider';
import RouterContainer from '../containers/RouterContainer';

export default function App(props) {
  const {
    history,
    index,
    locale,
    messages,
    records,
    store,
  } = props;

  return (
    <IntlProvider locale={locale} messages={messages}>
      <StoreProvider store={store}>
        <RecordProvider records={records}>
          <RouterContainer
            history={history}
            index={index}
            records={records}
          />
        </RecordProvider>
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
  records: PropTypes.object,
};

App.defaultProps = {
  locale: 'en',
};
