import React from 'react';
import { render } from 'react-dom';
import { findRenderedComponentWithType } from 'react-dom/test-utils';
import { IntlProvider } from 'react-intl';
import { Provider as StoreProvider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import createTestContainer from '../../../helpers/createTestContainer';
import PasswordResetForm from '../../../../src/components/user/PasswordResetForm';
import PasswordResetRequestForm from '../../../../src/components/user/PasswordResetRequestForm';
import ResetPasswordPage from '../../../../src/components/pages/ResetPasswordPage';

chai.should();

const mockStore = configureMockStore();
const store = mockStore();

describe('ResetPasswordPage', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    const match = {
      params: {},
    };

    const location = {
      state: {},
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ResetPasswordPage location={location} match={match} />
        </StoreProvider>
      </IntlProvider>, this.container);

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });

  it('should render a PasswordResetRequestForm if no token exists in params', function test() {
    const match = {
      params: {},
    };

    const location = {
      state: {},
    };

    const renderTree = render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ResetPasswordPage location={location} match={match} />
        </StoreProvider>
      </IntlProvider>, this.container);

    findRenderedComponentWithType(renderTree, PasswordResetRequestForm).should.not.equal(null);
  });

  it('should render a PasswordResetForm if a token exists in params', function test() {
    const match = {
      params: {
        token: '1234',
      },
    };

    const location = {
      state: {},
    };

    const renderTree = render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ResetPasswordPage location={location} match={match} />
        </StoreProvider>
      </IntlProvider>, this.container);

    findRenderedComponentWithType(renderTree, PasswordResetForm).should.not.equal(null);
  });
});
