import React from 'react';
import { IntlProvider } from 'react-intl';
import createTestContainer from '../../../helpers/createTestContainer';
import { render } from '../../../helpers/renderHelpers';
import AdminTabButtonBar from '../../../../src/components/admin/AdminTabButtonBar';

const { expect } = chai;

chai.should();

describe('AdminTabButtonBar', () => {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    render(
      <IntlProvider locale="en">
        <AdminTabButtonBar isCreatable />
      </IntlProvider>, this.container,
    );

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });

  it('should render nothing if isCreatable is not true', function test() {
    render(
      <IntlProvider locale="en">
        <AdminTabButtonBar />
      </IntlProvider>, this.container,
    );

    expect(this.container.firstElementChild).to.equal(null);
  });
});
