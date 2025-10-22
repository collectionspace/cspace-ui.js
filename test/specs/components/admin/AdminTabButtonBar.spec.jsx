import React from 'react';
import { IntlProvider } from 'react-intl';
import * as axe from 'axe-core';
import createTestContainer from '../../../helpers/createTestContainer';
import { render } from '../../../helpers/renderHelpers';
import AdminTabButtonBar from '../../../../src/components/admin/AdminTabButtonBar';
import throwAxeViolationsError from '../../../helpers/utils';

const { expect } = chai;

chai.should();

describe('AdminTabButtonBar', () => {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div without a11y violations', async function test() {
    render(
      <IntlProvider locale="en">
        <AdminTabButtonBar isCreatable />
      </IntlProvider>, this.container,
    );

    this.container.firstElementChild.nodeName.should.equal('DIV');

    const results = await axe.run(this.container);
    if (results.violations.length > 0) {
      throwAxeViolationsError(results.violations);
    }
    results.violations.length.should.equal(0);
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
