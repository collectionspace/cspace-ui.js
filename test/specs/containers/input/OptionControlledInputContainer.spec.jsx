import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-addons-test-utils';
import OptionControlledInput from '../../../../src/components/input/OptionControlledInput';
import { ConnectedOptionControlledInput } from '../../../../src/containers/input/OptionControlledInputContainer';

chai.should();

const mockStore = configureMockStore([]);

describe('OptionControlledInputContainer', function suite() {
  it('should set props on OptionControlledInput', function test() {
    const optionListName = 'units';

    const options = [
      { value: 'cm', label: 'centimeters' },
    ];

    const store = mockStore({
      options: {
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
      <ConnectedOptionControlledInput optionListName={optionListName} />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(OptionControlledInput);
    result.props.should.have.property('options', options);
  });
});
