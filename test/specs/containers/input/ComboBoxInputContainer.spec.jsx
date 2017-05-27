import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-addons-test-utils';
import { components as inputComponents } from 'cspace-input';
import { ConnectedComboBoxInput } from '../../../../src/containers/input/ComboBoxInputContainer';

chai.should();

const { ComboBoxInput } = inputComponents;
const mockStore = configureMockStore([]);

describe('ComboBoxInputContainer', function suite() {
  it('should set props on ComboBoxInput', function test() {
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
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ConnectedComboBoxInput source={optionListName} />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(ComboBoxInput);

    result.props.options.should.deep.equal(options);
    result.props.formatOptionLabel.should.be.a('function');
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
        formatMessage: () => {
          formatMessageCalled = true;
        },
      },
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ConnectedComboBoxInput
        intl={context.intl}
        source={optionListName}
      />, context);

    const result = shallowRenderer.getRenderOutput();

    result.props.formatOptionLabel(options[0]);

    formatMessageCalled.should.equal(true);
  });
});
