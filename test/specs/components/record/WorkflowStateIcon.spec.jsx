import React from 'react';
import { IntlProvider } from 'react-intl';
import createTestContainer from '../../../helpers/createTestContainer';
import { render } from '../../../helpers/renderHelpers';
import WorkflowStateIcon from '../../../../src/components/record/WorkflowStateIcon';

const { expect } = chai;

chai.should();

describe('WorkflowStateIcon', () => {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    render(
      <IntlProvider locale="en">
        <WorkflowStateIcon value="locked" />
      </IntlProvider>, this.container,
    );

    this.container.firstElementChild.tagName.should.equal('DIV');
  });

  it('should render the locked icon image if value contains \'locked\'', function test() {
    render(
      <IntlProvider locale="en">
        <WorkflowStateIcon value="locked" />
      </IntlProvider>, this.container,
    );

    const img = this.container.querySelector('img');

    img.alt.should.equal('Locked');
  });

  it('should render the replicated icon image if value contains \'replicated\'', function test() {
    render(
      <IntlProvider locale="en">
        <WorkflowStateIcon value="replicated" />
      </IntlProvider>, this.container,
    );

    const img = this.container.querySelector('img');

    img.alt.should.equal('Replicated');
  });

  it('should render the replicated icon image if value contains \'deprecated\'', function test() {
    render(
      <IntlProvider locale="en">
        <WorkflowStateIcon value="deprecated" />
      </IntlProvider>, this.container,
    );

    const img = this.container.querySelector('img');

    img.alt.should.equal('Deprecated');
  });

  it('should render nothing if the value is empty', function test() {
    render(
      <IntlProvider locale="en">
        <WorkflowStateIcon value="" />
      </IntlProvider>, this.container,
    );

    expect(this.container.firstElementChild).to.equal(null);
  });

  it('should render nothing if the value does not contain a known workflow state', function test() {
    render(
      <IntlProvider locale="en">
        <WorkflowStateIcon value="something_else" />
      </IntlProvider>, this.container,
    );

    expect(this.container.firstElementChild).to.equal(null);
  });

  it('should render a title that differs from the alt text on icon images', function test() {
    render(
      <IntlProvider locale="en">
        <WorkflowStateIcon value="locked replicated" />
      </IntlProvider>, this.container,
    );

    const imgs = this.container.querySelectorAll('img');

    imgs.length.should.equal(2);

    imgs[0].alt.should.equal('Replicated');
    imgs[0].title.should.equal('This record is replicated');

    imgs[1].alt.should.equal('Locked');
    imgs[1].title.should.equal('This record is locked');

    imgs.forEach((img) => {
      img.title.should.not.equal(img.alt);
    });
  });
});
