import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import { components as inputComponents } from 'cspace-input';
import { ConnectedOptionPickerInput } from '../../../../src/containers/input/OptionPickerInputContainer';

chai.should();

const { OptionPickerInput } = inputComponents;
const mockStore = configureMockStore([]);

describe('OptionPickerInputContainer', function suite() {
  it('should set props on OptionPickerInput', function test() {
    const optionListName = 'units';

    const options = [
      { value: 'cm', label: 'centimeters' },
    ];

    const store = mockStore({
      optionList: {
        [optionListName]: options,
      },
    });

    const context = {
      store,
      intl: {
        formatDate: () => null,
        formatTime: () => null,
        formatRelative: () => null,
        formatNumber: () => null,
        formatPlural: () => null,
        formatMessage: () => null,
        formatHTMLMessage: () => null,
        now: () => null,
      },
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ConnectedOptionPickerInput source={optionListName} />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(OptionPickerInput);
    result.props.options.should.deep.equal(options);
  });

  it('should connect formatOptionLabel to intl.formatMessage', function test() {
    const optionListName = 'units';

    const options = [
      {
        value: 'cm',
        message: {
          id: 'option.units.cm',
          defaultMessage: 'centimeters',
        },
      },
    ];

    const store = mockStore({
      optionList: {
        [optionListName]: options,
      },
    });

    let formatMessageCalled = false;

    const context = {
      store,
      intl: {
        formatDate: () => null,
        formatTime: () => null,
        formatRelative: () => null,
        formatNumber: () => null,
        formatPlural: () => null,
        formatMessage: () => {
          formatMessageCalled = true;
        },
        formatHTMLMessage: () => null,
        now: () => null,
      },
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ConnectedOptionPickerInput
        intl={context.intl}
        source={optionListName}
      />, context);

    const result = shallowRenderer.getRenderOutput();

    result.props.formatOptionLabel(options[0]);

    formatMessageCalled.should.equal(true);
  });

  it('should connect formatStatusMessage to intl.formatMessage', function test() {
    const optionListName = 'units';

    const options = [
      {
        value: 'cm',
        message: {
          id: 'option.units.cm',
          defaultMessage: 'centimeters',
        },
      },
    ];

    const store = mockStore({
      optionList: {
        [optionListName]: options,
      },
    });

    let formatMessageCalled = false;

    const context = {
      store,
      intl: {
        formatDate: () => null,
        formatTime: () => null,
        formatRelative: () => null,
        formatNumber: () => null,
        formatPlural: () => null,
        formatMessage: () => {
          formatMessageCalled = true;
        },
        formatHTMLMessage: () => null,
        now: () => null,
      },
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ConnectedOptionPickerInput
        intl={context.intl}
        source={optionListName}
      />, context);

    const result = shallowRenderer.getRenderOutput();

    result.props.formatStatusMessage();

    formatMessageCalled.should.equal(true);
  });
});
