import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import thunk from 'redux-thunk';
import Immutable from 'immutable';
import TermPickerInput from '../../../../src/components/record/TermPickerInput';
import TermPickerInputContainer from '../../../../src/containers/record/TermPickerInputContainer';

import {
  READ_VOCABULARY_ITEMS_STARTED,
} from '../../../../src/constants/actionCodes';

chai.should();

const mockStore = configureMockStore([thunk]);

describe('TermPickerInputContainer', () => {
  it('should set props on TermPickerInput', () => {
    const vocabularyName = 'languages';

    const vocabulary = {
      isReadPending: true,
      items: [
        { refname: 'en', displayName: 'English' },
      ],
    };

    const perms = Immutable.fromJS({
      collectionobject: {
        data: 'CRUDL',
      },
    });

    const store = mockStore({
      user: Immutable.Map({
        perms,
      }),
      vocabulary: {
        [vocabularyName]: vocabulary,
      },
    });

    const context = {
      store,
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <TermPickerInputContainer source={vocabularyName} />, context,
    );

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(TermPickerInput);
    result.props.should.have.property('terms', vocabulary.items);
    result.props.should.have.property('perms', perms);
    result.props.should.have.property('readTerms').that.is.a('function');
  });

  it('should set terms to null if the source vocabulary does not exist', () => {
    const vocabularyName = 'foobar';

    const store = mockStore({
      user: Immutable.Map(),
      vocabulary: {},
    });

    const context = {
      store,
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <TermPickerInputContainer source={vocabularyName} />, context,
    );

    const result = shallowRenderer.getRenderOutput();

    result.props.should.have.property('terms', null);
  });

  it('should connect readTerms to readVocabularyItems action creator', () => {
    const vocabularyName = 'languages';

    const vocabulary = {
      isReadPending: true,
      items: [
        { refname: 'en', displayName: 'English' },
      ],
    };

    const store = mockStore({
      user: Immutable.Map(),
      vocabulary: {
        [vocabularyName]: vocabulary,
      },
    });

    const context = {
      store,
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <TermPickerInputContainer source={vocabularyName} />, context,
    );

    const result = shallowRenderer.getRenderOutput();

    // The call to readTerms will fail because we haven't stubbed out everything it needs,
    // but there's enough to verify that the readVocabularyItems action creator gets called, and
    // dispatches READ_VOCABULARY_ITEMS_STARTED.

    try {
      result.props.readTerms(vocabularyName);
    } catch (error) {
      const action = store.getActions()[0];

      action.should.have.property('type', READ_VOCABULARY_ITEMS_STARTED);
      action.should.have.deep.property('meta.vocabularyName', vocabularyName);
    }
  });
});
