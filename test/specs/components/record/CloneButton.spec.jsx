import React from 'react';
import { render } from 'react-dom';
import { IntlProvider } from 'react-intl';
import createTestContainer from '../../../helpers/createTestContainer';
import CloneButton from '../../../../src/components/record/CloneButton';

const expect = chai.expect;

chai.should();

describe('CloneButton', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render a button', function test() {
    render(
      <IntlProvider locale="en">
        <CloneButton csid="1234" />
      </IntlProvider>, this.container);

    this.container.firstElementChild.nodeName.should.equal('BUTTON');
  });

  it('should render nothing if no csid is provided', function test() {
    render(
      <IntlProvider locale="en">
        <CloneButton />
      </IntlProvider>, this.container);

    expect(this.container.firstElementChild).to.equal(null);
  });

  it('should render nothing if relatedSubjectWorkflowState is \'locked\'', function test() {
    render(
      <IntlProvider locale="en">
        <CloneButton csid="1234" relatedSubjectWorkflowState="locked" />
      </IntlProvider>, this.container);

    expect(this.container.firstElementChild).to.equal(null);
  });
});
