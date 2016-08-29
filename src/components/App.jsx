import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import Router from '../containers/Router';

export default function App(props) {
  const {
    store,
    history,
  } = props;

  return (
    <Provider store={store}>
      <Router history={history} />
    </Provider>
  );
}

App.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
