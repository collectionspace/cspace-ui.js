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

  it('should render nothing if value is project', function test() {
    render(
      <IntlProvider locale="en">
        <WorkflowStateIcon value="project" />
      </IntlProvider>, this.container);

    expect(this.container.firstElementChild).to.equal(null);
  });

  it('should render nothing if value is replicated', function test() {
    render(
      <IntlProvider locale="en">
        <WorkflowStateIcon value="replicated" />
      </IntlProvider>, this.container);

    expect(this.container.firstElementChild).to.equal(null);
  });

  it('should render an img if value is locked', function test() {
    render(
      <IntlProvider locale="en">
        <WorkflowStateIcon value="locked" />
      </IntlProvider>, this.container);

    this.container.firstElementChild.tagName.should.equal('IMG');
  });
});
