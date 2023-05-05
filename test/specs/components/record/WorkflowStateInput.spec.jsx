import React from 'react';
import { IntlProvider } from 'react-intl';
import createTestContainer from '../../../helpers/createTestContainer';
import { render } from '../../../helpers/renderHelpers';
import WorkflowStateInput from '../../../../src/components/record/WorkflowStateInput';

chai.should();

describe('WorkflowStateInput', () => {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    render(
      <IntlProvider locale="en">
        <WorkflowStateInput value="locked" />
      </IntlProvider>, this.container,
    );

    this.container.firstElementChild.tagName.should.equal('DIV');
  });

  it('should render a workflow state icon', function test() {
    render(
      <IntlProvider locale="en">
        <WorkflowStateInput value="locked" />
      </IntlProvider>, this.container,
    );

    this.container.querySelector('.cspace-ui-WorkflowStateIcon--common').should.not.equal(null);
  });
});
