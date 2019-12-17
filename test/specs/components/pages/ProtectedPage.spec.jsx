/* global window */
/* eslint-disable no-unused-expressions */

import React from 'react';
import { render } from 'react-dom';
import { createRenderer } from 'react-test-renderer/shallow';
import { findWithType } from 'react-shallow-testutils';
import { MemoryRouter as Router } from 'react-router';
import { IntlProvider } from 'react-intl';
import { Provider as StoreProvider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Immutable from 'immutable';
import createTestContainer from '../../../helpers/createTestContainer';
import ConfigProvider from '../../../../src/components/config/ConfigProvider';
import LoginModal from '../../../../src/components/login/LoginModal';
import ProtectedPage from '../../../../src/components/pages/ProtectedPage';

const { expect } = chai;

chai.should();

const mockStore = configureMockStore();

const store = mockStore({
  cspace: Immutable.Map(),
  login: Immutable.Map(),
  quickSearch: Immutable.Map(),
  prefs: Immutable.Map(),
});

const config = {
  recordTypes: {},
};

describe('ProtectedPage', () => {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <Router>
              <ProtectedPage
                username="user@collectionspace.org"
                userPrefsLoaded
              />
            </Router>
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });

  it('should render the content', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <Router>
              <ProtectedPage
                username="user@collectionspace.org"
                userPrefsLoaded
              >
                <div id="content">This is some content</div>
              </ProtectedPage>
            </Router>
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    this.container.querySelector('div > div#content').textContent.should
      .equal('This is some content');
  });

  it('should not render the content if userPrefsLoaded is false', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <Router>
              <ProtectedPage
                username="user@collectionspace.org"
              >
                <div id="content">This is some content</div>
              </ProtectedPage>
            </Router>
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    expect(this.container.querySelector('div > div#content')).to.equal(null);
  });

  it('should render a header containing a user menu', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <Router>
              <ProtectedPage
                username="user@collectionspace.org"
                userPrefsLoaded
              >
                <div id="content">This is some content</div>
              </ProtectedPage>
            </Router>
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    this.container.querySelector('header .cspace-ui-UserMenu--common').should.not.be.null;
  });

  it('should render a login modal', () => {
    const shallowRenderer = createRenderer();

    const result = shallowRenderer.render(
      <ProtectedPage
        username="user@collectionspace.org"
        userPrefsLoaded
      >
        <div id="content">This is some content</div>
      </ProtectedPage>,
    );

    const loginModal = findWithType(result, LoginModal);

    loginModal.should.not.equal(null);
  });

  it('should render a login modal', () => {
    const shallowRenderer = createRenderer();

    const result = shallowRenderer.render(
      <ProtectedPage
        username="user@collectionspace.org"
        userPrefsLoaded
      >
        <div id="content">This is some content</div>
      </ProtectedPage>,
    );

    const loginModal = findWithType(result, LoginModal);

    loginModal.should.not.equal(null);
  });

  it('should when login succeeds', () => {
    let closeModalCalled = false;

    const closeModal = () => {
      closeModalCalled = true;
    };

    let resetLoginCalled = false;

    const resetLogin = () => {
      resetLoginCalled = true;
    };

    const shallowRenderer = createRenderer();

    const result = shallowRenderer.render(
      <ProtectedPage
        closeModal={closeModal}
        resetLogin={resetLogin}
        username="user@collectionspace.org"
        userPrefsLoaded
      >
        <div id="content">This is some content</div>
      </ProtectedPage>,
    );

    const loginModal = findWithType(result, LoginModal);

    loginModal.props.onSuccess();

    return new Promise((resolve) => {
      window.setTimeout(() => {
        closeModalCalled.should.equal(true);
        resetLoginCalled.should.equal(true);

        resolve();
      }, 0);
    });
  });
});
