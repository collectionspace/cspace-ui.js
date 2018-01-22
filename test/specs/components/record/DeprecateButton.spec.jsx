import React from 'react';
import { render } from 'react-dom';
import { IntlProvider } from 'react-intl';
import createTestContainer from '../../../helpers/createTestContainer';
import DeprecateButton from '../../../../src/components/record/DeprecateButton';

const expect = chai.expect;

chai.should();

describe('DeprecateButton', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render a button', function test() {
    render(
      <IntlProvider locale="en">
        <DeprecateButton showDeprecationButtons />
      </IntlProvider>, this.container);

    this.container.firstElementChild.nodeName.should.equal('BUTTON');
  });

  it('should render nothing if showDeprecationButtons is false', function test() {
    render(
      <IntlProvider locale="en">
        <DeprecateButton showDeprecationButtons={false} />
      </IntlProvider>, this.container);

    expect(this.container.firstElementChild).to.equal(null);
  });

  it('should render nothing if isDeprecated is true', function test() {
    render(
      <IntlProvider locale="en">
        <DeprecateButton showDeprecationButtons isDeprecated />
      </IntlProvider>, this.container);

    expect(this.container.firstElementChild).to.equal(null);
  });

  it('should be disabled if isModified is true', function test() {
    render(
      <IntlProvider locale="en">
        <DeprecateButton showDeprecationButtons isModified />
      </IntlProvider>, this.container);

    this.container.firstElementChild.disabled.should.equal(true);
  });

  it('should be disabled if isSavePending is true', function test() {
    render(
      <IntlProvider locale="en">
        <DeprecateButton showDeprecationButtons isSavePending />
      </IntlProvider>, this.container);

    this.container.firstElementChild.disabled.should.equal(true);
  });
});
