import React from 'react';
import { render } from 'react-dom';
import { IntlProvider } from 'react-intl';
import createTestContainer from '../../../helpers/createTestContainer';
import UndeprecateButton from '../../../../src/components/record/UndeprecateButton';

const expect = chai.expect;

chai.should();

describe('UndeprecateButton', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render a button', function test() {
    render(
      <IntlProvider locale="en">
        <UndeprecateButton isUndeprecatable />
      </IntlProvider>, this.container);

    this.container.firstElementChild.nodeName.should.equal('BUTTON');
  });

  it('should render nothing if isUndeprecatable is false', function test() {
    render(
      <IntlProvider locale="en">
        <UndeprecateButton isUndeprecatable={false} />
      </IntlProvider>, this.container);

    expect(this.container.firstElementChild).to.equal(null);
  });

  it('should be disabled if isModified is true', function test() {
    render(
      <IntlProvider locale="en">
        <UndeprecateButton isUndeprecatable isModified />
      </IntlProvider>, this.container);

    this.container.firstElementChild.disabled.should.equal(true);
  });

  it('should be disabled if isSavePending is true', function test() {
    render(
      <IntlProvider locale="en">
        <UndeprecateButton isUndeprecatable isSavePending />
      </IntlProvider>, this.container);

    this.container.firstElementChild.disabled.should.equal(true);
  });
});
