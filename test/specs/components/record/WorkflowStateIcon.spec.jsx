import React from 'react';
import { render } from 'react-dom';
import { IntlProvider } from 'react-intl';
import createTestContainer from '../../../helpers/createTestContainer';
import WorkflowStateIcon from '../../../../src/components/record/WorkflowStateIcon';

const expect = chai.expect;

chai.should();

describe('WorkflowStateIcon', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render nothing if state is project', function test() {
    render(
      <IntlProvider locale="en">
        <WorkflowStateIcon state="project" />
      </IntlProvider>, this.container);

    expect(this.container.firstElementChild).to.equal(null);
  });

  it('should render nothing if state is replicated', function test() {
    render(
      <IntlProvider locale="en">
        <WorkflowStateIcon state="replicated" />
      </IntlProvider>, this.container);

    expect(this.container.firstElementChild).to.equal(null);
  });

  it('should render a div if state is locked', function test() {
    render(
      <IntlProvider locale="en">
        <WorkflowStateIcon state="locked" />
      </IntlProvider>, this.container);

    this.container.firstElementChild.tagName.should.equal('DIV');
  });
});
