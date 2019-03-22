import React from 'react';
import { render } from 'react-dom';
import { IntlProvider } from 'react-intl';
import createTestContainer from '../../../helpers/createTestContainer';
import RunButton from '../../../../src/components/record/RunButton';

chai.should();

const invocables = ['report', 'batch'];

describe('RunButton', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render a button only when the record type is an invocable', function test() {
    const recordType = 'report';

    render(
      <IntlProvider locale="en">
        <RunButton
          isRunnable={invocables.includes(recordType)}
        />
      </IntlProvider>, this.container);

    this.container.firstElementChild.nodeName.should.equal('BUTTON');
  });

  it('should not render a button if the record type is not an invocable', function test() {
    const recordType = 'group';

    render(
      <IntlProvider locale="en">
        <RunButton
          isRunnable={invocables.includes(recordType)}
        />
      </IntlProvider>, this.container);

    expect(this.container.firstElementChild).to.not.exist
  });
});
