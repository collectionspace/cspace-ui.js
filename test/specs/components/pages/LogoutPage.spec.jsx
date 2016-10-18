import React from 'react';
import { render } from 'react-dom';
import { findRenderedComponentWithType } from 'react-addons-test-utils';
import { IntlProvider } from 'react-intl';
import { Provider as StoreProvider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import chai from 'chai';

import createTestContainer from '../../../helpers/createTestContainer';

import LogoutIndicator from '../../../../src/components/login/LogoutIndicator';
import LogoutPage from '../../../../src/components/pages/LogoutPage';

chai.should();

const mockStore = configureMockStore([]);

const store = mockStore({
  logout: {},
});

const mockRouter = {
  push: () => null,
  replace: () => null,
  go: () => null,
  goBack: () => null,
  goForward: () => null,
  setRouteLeaveHook: () => null,
  isActive: () => null,
};

describe('LogoutPage', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <LogoutPage router={mockRouter} />
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
          <LogoutPage
            router={mockRouter}
            onMount={handleMount}
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    handlerCalled.should.equal(true);
  });

  it('should replace router url with continuation when logout form is submitted', function test() {
    let replacementUrl = null;

    const stubReplaceMockRouter = {
      push: () => null,
      replace: (url) => {
        replacementUrl = url;
      },
      go: () => null,
      goBack: () => null,
      goForward: () => null,
      setRouteLeaveHook: () => null,
      isActive: () => null,
    };

    const resultTree = render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <LogoutPage
            router={stubReplaceMockRouter}
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    const logoutIndicator = findRenderedComponentWithType(resultTree, LogoutIndicator);

    logoutIndicator.props.onSuccess();

    replacementUrl.should.equal('/login');
  });
});
