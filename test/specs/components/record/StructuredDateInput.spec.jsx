import React from 'react';
import { render } from 'react-dom';
import { findRenderedComponentWithType } from 'react-dom/test-utils';
import { IntlProvider } from 'react-intl';
import Immutable from 'immutable';
import { baseComponents as inputComponents } from 'cspace-input';
import createTestContainer from '../../../helpers/createTestContainer';
import StructuredDateInput from '../../../../src/components/record/StructuredDateInput';

chai.should();

const { StructuredDateInput: BaseStructuredDateInput } = inputComponents;

describe('StructuredDateInput', function suite() {
  const config = {
    structDateOptionListNames: ['dateQualifiers'],
    structDateVocabNames: ['dateera', 'datecertainty', 'datequalifier'],
  };

  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render a cspace-input StructuredDateInput', function test() {
    const resultTree = render(
      <IntlProvider locale="en">
        <StructuredDateInput />
      </IntlProvider>, this.container);

    findRenderedComponentWithType(resultTree, BaseStructuredDateInput).should.not.equal(null);
  });

  it('should call readTerms when mounted', function test() {
    const readTermsSources = [];

    const readTerms = (sourceArg) => {
      readTermsSources.push(sourceArg);
    };

    render(
      <IntlProvider locale="en">
        <StructuredDateInput config={config} readTerms={readTerms} />
      </IntlProvider>, this.container);

    readTermsSources.should.deep.equal(config.structDateVocabNames);
  });

  it('should call readTerms when new perms are supplied via props', function test() {
    const readTermsSources = [];

    const readTerms = (sourceArg) => {
      readTermsSources.push(sourceArg);
    };

    const perms = Immutable.fromJS({
      vocabulary: {
        data: 'CRUDL',
      },
    });

    render(
      <IntlProvider locale="en">
        <StructuredDateInput
          config={config}
          perms={perms}
        />
      </IntlProvider>, this.container);

    const newPerms = perms.setIn(['vocabulary', 'data'], 'CRUL');

    render(
      <IntlProvider locale="en">
        <StructuredDateInput
          config={config}
          perms={newPerms}
          readTerms={readTerms}
        />
      </IntlProvider>, this.container);

    readTermsSources.should.deep.equal(config.structDateVocabNames);
  });

  it('should call intl.formatMessage to format field labels', function test() {
    const messages = {
      'field.structuredDate.datePeriod': 'formatted datePeriod',
    };

    const resultTree = render(
      <IntlProvider locale="en" messages={messages}>
        <StructuredDateInput />
      </IntlProvider>, this.container);

    const structuredDateInput = findRenderedComponentWithType(resultTree, BaseStructuredDateInput);

    structuredDateInput.props.formatFieldLabel('datePeriod').should.equal('formatted datePeriod');
  });

  it('should call intl.formatMessage to format option labels', function test() {
    const messages = {
      optionMessageId: 'formatted option label',
    };

    const resultTree = render(
      <IntlProvider locale="en" messages={messages}>
        <StructuredDateInput />
      </IntlProvider>, this.container);

    const structuredDateInput = findRenderedComponentWithType(resultTree, BaseStructuredDateInput);

    const option = {
      message: {
        id: 'optionMessageId',
      },
    };

    structuredDateInput.props.formatOptionLabel(option).should.equal('formatted option label');
  });

  it('should use the option value as the label for an option that does not have a message', function test() {
    const resultTree = render(
      <IntlProvider locale="en">
        <StructuredDateInput />
      </IntlProvider>, this.container);

    const structuredDateInput = findRenderedComponentWithType(resultTree, BaseStructuredDateInput);

    const option = {
      value: 'option value',
    };

    structuredDateInput.props.formatOptionLabel(option).should.equal('option value');
  });

  it('should call intl.formatMessage to format the parse failed message', function test() {
    const messages = {
      'structuredDateInput.parseFailed': 'formatted parseFailed',
    };

    const resultTree = render(
      <IntlProvider locale="en" messages={messages}>
        <StructuredDateInput />
      </IntlProvider>, this.container);

    const structuredDateInput = findRenderedComponentWithType(resultTree, BaseStructuredDateInput);

    structuredDateInput.props.formatParseFailedMessage().should.equal('formatted parseFailed');
  });
});
