import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import Immutable from 'immutable';
import MiniViewPopupAutocompleteInput from '../../../../src/components/record/MiniViewPopupAutocompleteInput';
import MiniViewPopupAutoCompleteInputContainer from '../../../../src/containers/record/MiniViewPopupAutocompleteInputContainer';

chai.should();

const mockStore = configureMockStore([]);

describe('MiniViewPopupAutoCompleteInput', function suite() {
  it('should set props on MiniViewPopupAutocompleteInput', function test() {
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

    shallowRenderer.render(<MiniViewPopupAutoCompleteInputContainer />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(MiniViewPopupAutocompleteInput);
    result.props.should.have.property('perms', perms);
  });
});
