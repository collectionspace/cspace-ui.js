import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import Immutable from 'immutable';
import MiniViewPopupAutocompleteInput from '../../../../src/components/record/MiniViewPopupAutocompleteInput';
import MiniViewPopupAutoCompleteInputContainer from '../../../../src/containers/record/MiniViewPopupAutocompleteInputContainer';
import { findWithType } from 'react-shallow-testutils';

chai.should();

const mockStore = configureMockStore([]);

describe('MiniViewPopupAutoCompleteInput', () => {
  it('should set props on MiniViewPopupAutocompleteInput', () => {
    const perms = Immutable.fromJS({
      person: {
        data: 'CRUDL',
      },
    });

    const store = mockStore({
      user: Immutable.fromJS({
        perms,
      }),
    });

    const context = { store };
    const shallowRenderer = createRenderer();

    shallowRenderer.render(<MiniViewPopupAutoCompleteInputContainer store={store} />, context);

    const result = shallowRenderer.getRenderOutput();
    const input = findWithType(result, MiniViewPopupAutocompleteInput);

    input.should.not.be.null;
    input.props.should.have.property('perms', perms);
  });
});
