import React from 'react';
import { render } from 'react-dom';
import { findRenderedComponentWithType } from 'react-dom/test-utils';
import { IntlProvider } from 'react-intl';
import { Provider as StoreProvider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import createTestContainer from '../../../helpers/createTestContainer';
import mockHistory from '../../../helpers/mockHistory';
import LogoutIndicator from '../../../../src/components/login/LogoutIndicator';
import LogoutPage from '../../../../src/components/pages/LogoutPage';

chai.should();

const mockStore = configureMockStore([]);

const store = mockStore({
  logout: {},
});

const history = mockHistory();

describe('LogoutPage', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <LogoutPage history={history} />
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
            history={history}
            onMount={handleMount}
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    handlerCalled.should.equal(true);
  });

  it('should replace history with continuation when logout form is submitted', function test() {
    let replacementUrl = null;

    const stubbedHistory = mockHistory({
      replace: (url) => {
        replacementUrl = url;
      },
    });

    const resultTree = render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <LogoutPage
            history={stubbedHistory}
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    const logoutIndicator = findRenderedComponentWithType(resultTree, LogoutIndicator);

    logoutIndicator.props.onSuccess();

    replacementUrl.should.equal('/login');
  });
});
