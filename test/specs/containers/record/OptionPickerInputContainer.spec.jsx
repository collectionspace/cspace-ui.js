import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import Immutable from 'immutable';
import OptionPickerInput from '../../../../src/components/record/OptionPickerInput';
import ConnectedOptionPickerInput from '../../../../src/containers/record/OptionPickerInputContainer';
import { findWithType } from 'react-shallow-testutils';

chai.should();

const mockStore = configureMockStore([]);

describe('OptionPickerInputContainer', () => {
  it('should set props on OptionPickerInput', () => {
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
      config: {},
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
      <ConnectedOptionPickerInput
        store={store}
        source={optionListName}
      />, context,
    );

    const result = shallowRenderer.getRenderOutput();
    const input = findWithType(result, OptionPickerInput);

    input.should.not.be.null;
    input.props.options.should.deep.equal(options);
  });
});
