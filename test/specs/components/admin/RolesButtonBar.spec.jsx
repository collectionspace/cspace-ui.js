import React from 'react';
import { render } from 'react-dom';
import { IntlProvider } from 'react-intl';
import createTestContainer from '../../../helpers/createTestContainer';
import RolesButtonBar from '../../../../src/components/admin/RolesButtonBar';

const expect = chai.expect;

chai.should();

describe('RolesButtonBar', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    render(
      <IntlProvider locale="en">
        <RolesButtonBar isCreatable />
      </IntlProvider>, this.container);

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });

  it('should render nothing if isCreatable is not true', function test() {
    render(
      <IntlProvider locale="en">
        <RolesButtonBar />
      </IntlProvider>, this.container);

    expect(this.container.firstElementChild).to.equal(null);
  });
});
