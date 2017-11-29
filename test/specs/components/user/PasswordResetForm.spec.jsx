import React from 'react';
import { render } from 'react-dom';
import { IntlProvider } from 'react-intl';
import createTestContainer from '../../../helpers/createTestContainer';
import PasswordResetForm from '../../../../src/components/user/PasswordResetForm';

chai.should();

describe('PasswordResetForm', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    render(
      <IntlProvider locale="en">
        <PasswordResetForm />
      </IntlProvider>, this.container);

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });
});
