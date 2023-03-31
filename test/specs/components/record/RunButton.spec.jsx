import React from 'react';
import { IntlProvider } from 'react-intl';
import createTestContainer from '../../../helpers/createTestContainer';
import { render } from '../../../helpers/renderHelpers';
import RunButton from '../../../../src/components/record/RunButton';

chai.should();

const invocables = ['report', 'batch'];

describe('RunButton', () => {
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
      </IntlProvider>, this.container,
    );

    this.container.firstElementChild.nodeName.should.equal('BUTTON');
  });

  it('should not render a run button if the record type is not an invocable', function test() {
    const recordType = 'group';

    render(
      <IntlProvider locale="en">
        <RunButton
          isRunnable={invocables.includes(recordType)}
        />
      </IntlProvider>, this.container,
    );

    /* eslint-disable */
    chai.expect(this.container.firstElementChild).to.not.exist;
    /* eslint-enable */
  });
});
