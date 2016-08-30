import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import RouterContainer from '../containers/RouterContainer';

export default function App(props) {
  const {
    store,
    history,
  } = props;

  return (
    <Provider store={store}>
      <RouterContainer history={history} />
    </Provider>
  );
}

App.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
