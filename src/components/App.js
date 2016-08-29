import React from 'react';
import { Provider } from 'react-redux';
import Router from '../containers/Router';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <Router history={this.props.history}/>
      </Provider>
    );
  }
}

App.propTypes = {
  store: React.PropTypes.object.isRequired,
  history: React.PropTypes.object.isRequired,
};
