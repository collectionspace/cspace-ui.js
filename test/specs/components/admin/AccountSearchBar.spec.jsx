import React from 'react';
import { Simulate } from 'react-dom/test-utils';
import { IntlProvider } from 'react-intl';
import * as axe from 'axe-core';
import createTestContainer from '../../../helpers/createTestContainer';
import { render } from '../../../helpers/renderHelpers';
import AccountSearchBar from '../../../../src/components/admin/AccountSearchBar';
import throwAxeViolationsError from '../../../helpers/utils';

chai.should();

describe('AccountSearchBar', () => {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  // TODO: fix a11y violations
  it.skip('should render as a div without a11y violations', async function test() {
    render(
      <IntlProvider locale="en">
        <AccountSearchBar />
      </IntlProvider>, this.container,
    );

    this.container.firstElementChild.nodeName.should.equal('DIV');

    const results = await axe.run(this.container);
    if (results.violations.length > 0) {
      throwAxeViolationsError(results.violations);
    }
    results.violations.length.should.equal(0);
  });

  it('should render an input containing the value', function test() {
    const value = 'search value';

    render(
      <IntlProvider locale="en">
        <AccountSearchBar value={value} />
      </IntlProvider>, this.container,
    );

    this.container.querySelector('input[type="text"]').value.should.equal(value);
  });

  it('should call onChange when the input value changes', function test() {
    let changedValue = null;

    const handleChange = (valueArg) => {
      changedValue = valueArg;
    };

    render(
      <IntlProvider locale="en">
        <AccountSearchBar onChange={handleChange} />
      </IntlProvider>, this.container,
    );

    const input = this.container.querySelector('input[type="text"]');
    const newValue = 'new value';

    input.value = newValue;

    Simulate.change(input);

    changedValue.should.equal(newValue);
  });

  it('should set the value to empty string when the clear button is clicked', function test() {
    let changedValue = null;

    const handleChange = (valueArg) => {
      changedValue = valueArg;
    };

    render(
      <IntlProvider locale="en">
        <AccountSearchBar onChange={handleChange} value="some value" />
      </IntlProvider>, this.container,
    );

    const clearButton = this.container.querySelector('button');

    Simulate.click(clearButton);

    changedValue.should.equal('');
  });
});
