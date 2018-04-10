import React from 'react';
import { render } from 'react-dom';
import { findRenderedComponentWithType } from 'react-dom/test-utils';
import { IntlProvider } from 'react-intl';
import Immutable from 'immutable';
import { baseComponents as inputComponents } from 'cspace-input';
import createTestContainer from '../../../helpers/createTestContainer';
import CheckboxInput from '../../../../src/components/record/CheckboxInput';

chai.should();

const { CheckboxInput: BaseCheckboxInput } = inputComponents;

describe('CheckboxInput', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render a cspace-input CheckboxInput', function test() {
    const resultTree = render(
      <IntlProvider locale="en">
        <CheckboxInput />
      </IntlProvider>, this.container);

    findRenderedComponentWithType(resultTree, BaseCheckboxInput).should.not.equal(null);
  });

  it('should supply labels to the base component', function test() {
    const resultTree = render(
      <IntlProvider locale="en">
        <CheckboxInput />
      </IntlProvider>, this.container);

    const checkboxInput = findRenderedComponentWithType(resultTree, BaseCheckboxInput);

    checkboxInput.props.trueLabel.should.equal('yes');
    checkboxInput.props.falseLabel.should.equal('no');
    checkboxInput.props.indeterminateLabel.should.equal('indeterminate');
  });

  it('should supply a custom transition map to the base input of viewType is \'search\'', function test() {
    const resultTree = render(
      <IntlProvider locale="en">
        <CheckboxInput viewType="search" />
      </IntlProvider>, this.container);

    const checkboxInput = findRenderedComponentWithType(resultTree, BaseCheckboxInput);

    checkboxInput.props.transition.should.deep.equal({
      null: true,
      true: false,
      false: null,
    });
  });
});
