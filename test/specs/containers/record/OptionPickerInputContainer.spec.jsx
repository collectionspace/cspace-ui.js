import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import Immutable from 'immutable';
import { findWithType } from 'react-shallow-testutils';
import OptionPickerInput from '../../../../src/components/record/OptionPickerInput';
import ConnectedOptionPickerInput from '../../../../src/containers/record/OptionPickerInputContainer';

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

    const intl = {
      formatDate: () => null,
      formatTime: () => null,
      formatRelative: () => null,
      formatNumber: () => null,
      formatPlural: () => null,
      formatMessage: () => null,
      formatHTMLMessage: () => null,
      now: () => null,
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ConnectedOptionPickerInput
        intl={intl}
        store={store}
        source={optionListName}
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const input = findWithType(result, OptionPickerInput);

    input.props.options.should.deep.equal(options);
  });
});
