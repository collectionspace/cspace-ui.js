import React from 'react';
import { IntlProvider } from 'react-intl';
import { render } from 'react-dom';

import createTestContainer from '../../../helpers/createTestContainer';

import LogoutIndicator from '../../../../src/components/login/LogoutIndicator';

chai.should();

describe('LogoutIndicator', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  context('when isPending is true', function context() {
    it('should render as a div', function test() {
      render(
        <IntlProvider
          locale="en"
        >
          <LogoutIndicator
            isPending
          />
        </IntlProvider>, this.container);

      this.container.firstElementChild.nodeName.should.equal('DIV');
    });

    it('should show pending message', function test() {
      const messages = {
        'logoutIndicator.pending': 'this is the pending message',
      };

      render(
        <IntlProvider
          locale="en"
          messages={messages}
        >
          <LogoutIndicator
            isPending
          />
        </IntlProvider>, this.container);

      this.container.querySelector('div').textContent.should
        .equal(messages['logoutIndicator.pending']);
    });
  });

  context('when response exists', function context() {
    it('should render as a div', function test() {
      const response = {};

      render(
        <IntlProvider
          locale="en"
        >
          <LogoutIndicator
            response={response}
          />
        </IntlProvider>, this.container);

      this.container.firstElementChild.nodeName.should.equal('DIV');
    });

    it('should show success message', function test() {
      const response = {};

      const messages = {
        'logoutIndicator.success': 'this is the success message',
      };

      render(
        <IntlProvider
          locale="en"
          messages={messages}
        >
          <LogoutIndicator
            response={response}
          />
        </IntlProvider>, this.container);

      this.container.querySelector('div').textContent.should
        .equal(messages['logoutIndicator.success']);
    });
  });

  context('when error exists', function context() {
    it('should render as a div', function test() {
      const error = new Error();

      render(
        <IntlProvider
          locale="en"
        >
          <LogoutIndicator
            error={error}
          />
        </IntlProvider>, this.container);

      this.container.firstElementChild.nodeName.should.equal('DIV');
    });

    it('should show error message', function test() {
      const errorMessage = 'this is the error message';
      const error = new Error(errorMessage);

      render(
        <IntlProvider
          locale="en"
        >
          <LogoutIndicator
            error={error}
          />
        </IntlProvider>, this.container);

      this.container.querySelector('div').textContent.should
        .equal(errorMessage);
    });
  });

  it('should call onSuccess when isPending changes from true to false and a response exists', function test() {
    let handlerCalled = false;

    const handleSuccess = () => {
      handlerCalled = true;
    };

    // Initial render - onSuccess should not be called

    render(
      <IntlProvider
        locale="en"
      >
        <LogoutIndicator
          isPending
          onSuccess={handleSuccess}
        />
      </IntlProvider>, this.container);

    handlerCalled.should.equal(false);

    // Change from isPending to not, but no response - onSuccess should not be called

    render(
      <IntlProvider
        locale="en"
      >
        <LogoutIndicator
          onSuccess={handleSuccess}
        />
      </IntlProvider>, this.container);

    handlerCalled.should.equal(false);

    // Change isPending from false to true - onSuccess should not be called

    render(
      <IntlProvider
        locale="en"
      >
        <LogoutIndicator
          isPending
          onSuccess={handleSuccess}
        />
      </IntlProvider>, this.container);

    // Change isPending to false, with response - onSuccess should be called

    const response = {};

    render(
      <IntlProvider
        locale="en"
      >
        <LogoutIndicator
          response={response}
          onSuccess={handleSuccess}
        />
      </IntlProvider>, this.container);

    handlerCalled.should.equal(true);

    // Reset handler called flag

    handlerCalled = false;

    // isPending stays false - onSuccess should not be called

    render(
      <IntlProvider
        locale="en"
      >
        <LogoutIndicator
          onSuccess={handleSuccess}
        />
      </IntlProvider>, this.container);

    handlerCalled.should.equal(false);

    // Change isPending from false to true - onSuccess should not be called

    render(
      <IntlProvider
        locale="en"
      >
        <LogoutIndicator
          isPending
          onSuccess={handleSuccess}
        />
      </IntlProvider>, this.container);

    handlerCalled.should.equal(false);

    // Change isPending to false, with response, but no onSuccess - handler should not be called

    render(
      <IntlProvider
        locale="en"
      >
        <LogoutIndicator
          response={response}
        />
      </IntlProvider>, this.container);

    handlerCalled.should.equal(false);
  });
});
