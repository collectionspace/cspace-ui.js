import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import Immutable from 'immutable';
import { components as inputComponents } from 'cspace-input';
import { ConnectedComboBoxInput } from '../../../../src/containers/input/ComboBoxInputContainer';
import { findWithType } from 'react-shallow-testutils';

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

    const context = {
      store,
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ConnectedComboBoxInput
        store={store}
        source={optionListName}
      />, context,
    );

    const result = shallowRenderer.getRenderOutput();
    const input = findWithType(result, ComboBoxInput);

    input.should.not.be.null;
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
        store={store}
        intl={context.intl}
        source={optionListName}
      />, context,
    );

    const result = shallowRenderer.getRenderOutput();
    const input = findWithType(result, ComboBoxInput);

    input.props.formatOptionLabel(options[0]);

    formatMessageCalled.should.equal(true);
  });
});
