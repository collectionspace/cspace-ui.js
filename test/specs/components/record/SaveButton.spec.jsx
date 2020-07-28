import React from 'react';
import { render } from 'react-dom';
import { IntlProvider } from 'react-intl';
import Immutable from 'immutable';
import createTestContainer from '../../../helpers/createTestContainer';
import SaveButton from '../../../../src/components/record/SaveButton';

const { expect } = chai;

chai.should();

describe('SaveButton', () => {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render nothing when readOnly is true', function test() {
    render(
      <IntlProvider locale="en">
        <SaveButton readOnly />
      </IntlProvider>, this.container,
    );

    expect(this.container.firstElementChild).to.equal(null);
  });

  context('without validation errors', () => {
    it('should render a button', function test() {
      render(
        <IntlProvider locale="en">
          <SaveButton />
        </IntlProvider>, this.container,
      );

      this.container.firstElementChild.nodeName.should.equal('BUTTON');
    });

    it('should apply the pending class if isSavePending is true', function test() {
      render(
        <IntlProvider locale="en">
          <SaveButton isSavePending />
        </IntlProvider>, this.container,
      );

      this.container.firstElementChild.className.should.contain('cspace-ui-SaveButton--pending');
    });

    it('should apply the pending class if isSavePending is true', function test() {
      render(
        <IntlProvider locale="en">
          <SaveButton isSavePending />
        </IntlProvider>, this.container,
      );

      this.container.firstElementChild.className.should.contain('cspace-ui-SaveButton--pending');
    });

    it('should apply the normal class if isSavePending is true', function test() {
      render(
        <IntlProvider locale="en">
          <SaveButton isModified />
        </IntlProvider>, this.container,
      );

      this.container.firstElementChild.className.should.contain('cspace-ui-SaveButton--normal');
    });

    it('should apply the done class if isSavePending and isModified are both false', function test() {
      render(
        <IntlProvider locale="en">
          <SaveButton />
        </IntlProvider>, this.container,
      );

      this.container.firstElementChild.className.should.contain('cspace-ui-SaveButton--done');
    });
  });

  context('with validation errors', () => {
    it('should render a div with a save button and an error badge', function test() {
      render(
        <IntlProvider locale="en">
          <SaveButton validationErrors={Immutable.Map()} />
        </IntlProvider>, this.container,
      );

      const div = this.container.firstElementChild;

      div.nodeName.should.equal('DIV');

      div.querySelector('button[name="save"]').should.not.equal(null);
      div.querySelector('button.cspace-ui-Badge--common').should.not.equal(null);
    });

    it('should render a disabled save button', function test() {
      render(
        <IntlProvider locale="en">
          <SaveButton validationErrors={Immutable.Map()} />
        </IntlProvider>, this.container,
      );

      this.container.querySelector('button[name="save"]').disabled.should.equal(true);
    });
  });
});
