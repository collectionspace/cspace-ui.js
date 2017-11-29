import React from 'react';
import { render } from 'react-dom';
import { findRenderedComponentWithType } from 'react-dom/test-utils';
import { IntlProvider } from 'react-intl';
import { Provider as StoreProvider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { MemoryRouter as Router } from 'react-router';
import Immutable from 'immutable';
import createTestContainer from '../../../helpers/createTestContainer';
import mockHistory from '../../../helpers/mockHistory';
import LoginFormContainer from '../../../../src/containers/login/LoginFormContainer';
import LoginPage from '../../../../src/components/pages/LoginPage';

chai.should();

const mockStore = configureMockStore();

const store = mockStore({
  login: Immutable.Map(),
});

const history = mockHistory();

describe('LoginPage', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <Router>
            <LoginPage
              history={history}
              location={{}}
            />
          </Router>
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
          <Router>
            <LoginPage
              history={history}
              location={{}}
              onMount={handleMount}
            />
          </Router>
        </StoreProvider>
      </IntlProvider>, this.container);

    handlerCalled.should.equal(true);
  });

  it('should replace history with continuation when login form is submitted', function test() {
    const continuationUrl = '/foo';

    let replacementUrl = null;

    const stubbedHistory = mockHistory({
      replace: (url) => {
        replacementUrl = url;
      },
    });

    const location = {
      state: {
        continuation: continuationUrl,
      },
    };

    const resultTree = render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <Router>
            <LoginPage
              history={stubbedHistory}
              location={location}
            />
          </Router>
        </StoreProvider>
      </IntlProvider>, this.container);

    const loginFormContainer = findRenderedComponentWithType(resultTree, LoginFormContainer);

    return loginFormContainer.props.onSuccess()
      .then(() => {
        replacementUrl.should.equal(continuationUrl);
      });
  });
});
