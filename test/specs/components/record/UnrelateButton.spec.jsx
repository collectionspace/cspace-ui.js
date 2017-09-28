import React from 'react';
import { render } from 'react-dom';
import { IntlProvider } from 'react-intl';
import createTestContainer from '../../../helpers/createTestContainer';
import UnrelateButton from '../../../../src/components/record/UnrelateButton';

const expect = chai.expect;

chai.should();

describe('UnrelateButton', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render a button', function test() {
    render(
      <IntlProvider locale="en">
        <UnrelateButton />
      </IntlProvider>, this.container);

    this.container.firstElementChild.nodeName.should.equal('BUTTON');
  });

  it('should render nothing if subjectWorkflowState is \'locked\'', function test() {
    render(
      <IntlProvider locale="en">
        <UnrelateButton subjectWorkflowState="locked" />
      </IntlProvider>, this.container);

    expect(this.container.firstElementChild).to.equal(null);
  });

  it('should render nothing if objectWorkflowState is \'locked\'', function test() {
    render(
      <IntlProvider locale="en">
        <UnrelateButton objectWorkflowState="locked" />
      </IntlProvider>, this.container);

    expect(this.container.firstElementChild).to.equal(null);
  });
});
