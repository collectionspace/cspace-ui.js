import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createRenderer } from 'react-test-renderer/shallow';
import Immutable from 'immutable';
import StructuredDateInput from '../../../../src/components/record/StructuredDateInput';
import { ConnectedStructuredDateInput } from '../../../../src/containers/record/StructuredDateInputContainer';

import {
  READ_VOCABULARY_ITEMS_STARTED,
} from '../../../../src/actions/vocabulary';

chai.should();

const mockStore = configureMockStore([thunk]);

describe('StructuredDateInputContainer', function suite() {
  const config = {
    structDateOptionListNames: ['dateQualifiers'],
    structDateVocabNames: ['dateera', 'datecertainty', 'datequalifier'],
  };

  it('should set props on StructuredDateInput', function test() {
    const dateQualifiers = [
      { value: 'qual1', label: 'Qual 1' },
    ];

    const optionLists = {
      dateQualifiers,
    };

    const vocabulary = {
      dateera: { items: [] },
      datecertainty: { items: [] },
      datequalifier: { items: [] },
    };

    const perms = Immutable.fromJS({
      collectionobject: {
        data: 'CRUDL',
      },
    });

    const store = mockStore({
      vocabulary,
      optionList: optionLists,
      user: Immutable.Map({
        perms,
      }),
    });

    const context = {
      store,
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ConnectedStructuredDateInput config={config} />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(StructuredDateInput);
    result.props.optionLists.should.deep.equal(optionLists);
    result.props.perms.should.equal(perms);

    result.props.terms.should.deep.equal({
      dateera: [],
      datecertainty: [],
      datequalifier: [],
    });
  });

  it('should connect readTerms to readVocabularyItems action creator', function test() {
    const dateQualifiers = [
      { value: 'qual1', label: 'Qual 1' },
    ];

    const optionLists = {
      dateQualifiers,
    };

    const vocabularyName = 'dateera';

    const vocabulary = {
      items: [],
    };

    const store = mockStore({
      optionList: optionLists,
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
      <ConnectedStructuredDateInput config={config} />, context);

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
