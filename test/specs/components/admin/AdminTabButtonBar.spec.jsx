import React from 'react';
import { render } from 'react-dom';
import { IntlProvider } from 'react-intl';
import createTestContainer from '../../../helpers/createTestContainer';
import AdminTabButtonBar from '../../../../src/components/admin/AdminTabButtonBar';

const expect = chai.expect;

chai.should();

describe('AdminTabButtonBar', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    render(
      <IntlProvider locale="en">
        <AdminTabButtonBar isCreatable />
      </IntlProvider>, this.container);

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });

  it('should render nothing if isCreatable is not true', function test() {
    render(
      <IntlProvider locale="en">
        <AdminTabButtonBar />
      </IntlProvider>, this.container);

    expect(this.container.firstElementChild).to.equal(null);
  });
});
