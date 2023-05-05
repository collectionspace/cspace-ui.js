import React from 'react';
import { IntlProvider } from 'react-intl';
import createTestContainer from '../../../helpers/createTestContainer';
import { render } from '../../../helpers/renderHelpers';
import UndeprecateButton from '../../../../src/components/record/UndeprecateButton';

const { expect } = chai;

chai.should();

describe('UndeprecateButton', () => {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render a button', function test() {
    render(
      <IntlProvider locale="en">
        <UndeprecateButton isUndeprecatable />
      </IntlProvider>, this.container,
    );

    this.container.firstElementChild.nodeName.should.equal('BUTTON');
  });

  it('should render nothing if isUndeprecatable is false', function test() {
    render(
      <IntlProvider locale="en">
        <UndeprecateButton isUndeprecatable={false} />
      </IntlProvider>, this.container,
    );

    expect(this.container.firstElementChild).to.equal(null);
  });

  it('should be disabled if isModified is true', function test() {
    render(
      <IntlProvider locale="en">
        <UndeprecateButton isUndeprecatable isModified />
      </IntlProvider>, this.container,
    );

    this.container.firstElementChild.disabled.should.equal(true);
  });

  it('should be disabled if isSavePending is true', function test() {
    render(
      <IntlProvider locale="en">
        <UndeprecateButton isUndeprecatable isSavePending />
      </IntlProvider>, this.container,
    );

    this.container.firstElementChild.disabled.should.equal(true);
  });
});
