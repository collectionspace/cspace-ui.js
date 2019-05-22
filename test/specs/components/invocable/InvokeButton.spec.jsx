import React from 'react';
import { render } from 'react-dom';
import { IntlProvider } from 'react-intl';
import createTestContainer from '../../../helpers/createTestContainer';
import InvokeButton from '../../../../src/components/invocable/InvokeButton';

chai.should();

describe('InvokeButton', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render a button', function test() {
    render(
      <IntlProvider locale="en">
        <InvokeButton />
      </IntlProvider>, this.container);

    this.container.firstElementChild.nodeName.should.equal('BUTTON');
  });

  it('should render as disabled if isRunning is true', function test() {
    render(
      <IntlProvider locale="en">
        <InvokeButton isRunning />
      </IntlProvider>, this.container);

    this.container.firstElementChild.disabled.should.equal(true);
  });
});
