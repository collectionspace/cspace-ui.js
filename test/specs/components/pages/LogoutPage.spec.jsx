import React from 'react';
import { findRenderedComponentWithType } from 'react-dom/test-utils';
import { IntlProvider } from 'react-intl';
import { Provider as StoreProvider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import createTestContainer from '../../../helpers/createTestContainer';
import { render } from '../../../helpers/renderHelpers';
import mockHistory from '../../../helpers/mockHistory';
import LogoutIndicator from '../../../../src/components/login/LogoutIndicator';
import LogoutPage from '../../../../src/components/pages/LogoutPage';

chai.should();

const mockStore = configureMockStore([]);

const store = mockStore({
  logout: {},
});

const history = mockHistory();

describe('LogoutPage', () => {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <LogoutPage history={history} />
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });

  it('should call logout when mounted', function test() {
    let logoutCalled = false;

    const logout = () => {
      logoutCalled = true;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <LogoutPage
            history={history}
            logout={logout}
          />
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    logoutCalled.should.equal(true);
  });

  it('should call resetLogin and replace history with continuation when logout succeeds', function test() {
    let replacementUrl = null;

    const stubbedHistory = mockHistory({
      replace: (url) => {
        replacementUrl = url;
      },
    });

    let resetLoginCalled = false;

    const resetLogin = () => {
      resetLoginCalled = true;
    };

    const resultTree = render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <LogoutPage
            history={stubbedHistory}
            resetLogin={resetLogin}
          />
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    const logoutIndicator = findRenderedComponentWithType(resultTree, LogoutIndicator);

    logoutIndicator.props.onSuccess();

    resetLoginCalled.should.equal(true);
    replacementUrl.should.equal('/login');
  });
});
