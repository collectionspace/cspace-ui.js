import React from 'react';
import { IntlProvider } from 'react-intl';
import createTestContainer from '../../../helpers/createTestContainer';
import { render } from '../../../helpers/renderHelpers';
import RevertButton from '../../../../src/components/record/RevertButton';

const { expect } = chai;

chai.should();

describe('RevertButton', () => {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render a button', function test() {
    render(
      <IntlProvider locale="en">
        <RevertButton />
      </IntlProvider>, this.container,
    );

    this.container.firstElementChild.nodeName.should.equal('BUTTON');
  });

  it('should render nothing if readOnly is true', function test() {
    render(
      <IntlProvider locale="en">
        <RevertButton readOnly />
      </IntlProvider>, this.container,
    );

    expect(this.container.firstElementChild).to.equal(null);
  });

  it('should render the supplied label', function test() {
    const label = 'Hello';

    render(
      <IntlProvider locale="en">
        <RevertButton label={label} />
      </IntlProvider>, this.container,
    );

    this.container.firstElementChild.textContent.should.equal(label);
  });

  it('should be disabled if isModified is false', function test() {
    render(
      <IntlProvider locale="en">
        <RevertButton isModified={false} />
      </IntlProvider>, this.container,
    );

    this.container.firstElementChild.disabled.should.equal(true);
  });

  it('should be disabled if isSavePending is true', function test() {
    render(
      <IntlProvider locale="en">
        <RevertButton isSavePending />
      </IntlProvider>, this.container,
    );

    this.container.firstElementChild.disabled.should.equal(true);
  });
});
