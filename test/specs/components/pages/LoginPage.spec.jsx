import React from 'react';
import { render } from 'react-dom';
import { findRenderedComponentWithType } from 'react-addons-test-utils';
import { IntlProvider } from 'react-intl';
import { Provider as StoreProvider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Immutable from 'immutable';

import createTestContainer from '../../../helpers/createTestContainer';
import mockRouter from '../../../helpers/mockRouter';

import LoginFormContainer from '../../../../src/containers/login/LoginFormContainer';
import LoginPage from '../../../../src/components/pages/LoginPage';

chai.should();

const mockStore = configureMockStore();

const store = mockStore({
  login: Immutable.Map(),
});

const router = mockRouter();

describe('LoginPage', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <LoginPage router={router} />
        </StoreProvider>
      </IntlProvider>, this.container);

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });

  it('should call onMount when mounted', function test() {
    let handlerCalled = false;

    const handleMount = () => {
      handlerCalled = true;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <LoginPage
            router={router}
            onMount={handleMount}
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    handlerCalled.should.equal(true);
  });

  it('should replace router url with continuation when login form is submitted', function test() {
    const continuationUrl = '/foo';

    let replacementUrl = null;

    const stubbedRouter = mockRouter({
      replace: (url) => {
        replacementUrl = url;
      },
    });

    const resultTree = render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <LoginPage
            router={stubbedRouter}
            continuation={continuationUrl}
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    const loginFormContainer = findRenderedComponentWithType(resultTree, LoginFormContainer);

    return loginFormContainer.props.onSuccess()
      .then(() => {
        replacementUrl.should.equal(continuationUrl);
      });
  });
});
