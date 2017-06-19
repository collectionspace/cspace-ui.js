import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import { Provider as StoreProvider } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import ConfigProvider from './config/ConfigProvider';
import RootPage from './pages/RootPage';
import withClassName from '../enhancers/withClassName';

const propTypes = {
  store: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
  router: PropTypes.func,
  openModal: PropTypes.func,
};

export default class App extends Component {
  constructor() {
    super();

    this.showConfirmNavigationModal = this.showConfirmNavigationModal.bind(this);
  }

  showConfirmNavigationModal(message, callback) {
    const {
      openModal,
    } = this.props;

    if (openModal) {
      openModal(message, callback);
    }
  }

  render() {
    const {
      config,
      store,
      router,
    } = this.props;

    const {
      basename,
      className,
      index,
      locale,
      messages,
      prettyUrls,
    } = config;

    // Allow a router to be supplied as a prop. This is used for tests.

    let Router = router;

    if (!Router) {
      Router = prettyUrls ? BrowserRouter : HashRouter;
    }

    return (
      <IntlProvider locale={locale} messages={messages}>
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <Router basename={basename} getUserConfirmation={this.showConfirmNavigationModal}>
              <Switch>
                <Redirect exact path="/" to={index} />
                <Route component={withClassName(RootPage, className)} />
              </Switch>
            </Router>
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>
    );
  }
}

App.propTypes = propTypes;
