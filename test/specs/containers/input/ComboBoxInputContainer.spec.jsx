import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import Immutable from 'immutable';
import { components as inputComponents } from 'cspace-input';
import { findWithType } from 'react-shallow-testutils';
import { ConnectedComboBoxInput } from '../../../../src/containers/input/ComboBoxInputContainer';

chai.should();

const { ComboBoxInput } = inputComponents;
const mockStore = configureMockStore([]);

describe('ComboBoxInputContainer', () => {
  it('should set props on ComboBoxInput', () => {
    const optionListName = 'units';

    const options = [
      { value: 'cm', label: 'centimeters' },
    ];

    const store = mockStore({
      optionList: Immutable.Map({
        [optionListName]: options,
      }),
    });

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ConnectedComboBoxInput
        store={store}
        source={optionListName}
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const input = findWithType(result, ComboBoxInput);

    input.props.options.should.deep.equal(options);
    input.props.formatOptionLabel.should.be.a('function');
  });

  it('should connect formatOptionLabel to intl.formatMessage', () => {
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
      optionList: Immutable.Map({
        [optionListName]: options,
      }),
    });

    let formatMessageCalled = false;

    const intl = {
      formatMessage: () => {
        formatMessageCalled = true;
      },
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ConnectedComboBoxInput
        store={store}
        intl={intl}
        source={optionListName}
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const input = findWithType(result, ComboBoxInput);

    input.props.formatOptionLabel(options[0]);

    formatMessageCalled.should.equal(true);
  });
});
