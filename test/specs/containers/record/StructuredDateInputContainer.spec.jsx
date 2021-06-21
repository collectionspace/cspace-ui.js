import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createRenderer } from 'react-test-renderer/shallow';
import Immutable from 'immutable';
import { findWithType } from 'react-shallow-testutils';
import StructuredDateInput from '../../../../src/components/record/StructuredDateInput';
import { ConnectedStructuredDateInput } from '../../../../src/containers/record/StructuredDateInputContainer';

import {
  READ_VOCABULARY_ITEMS_STARTED,
} from '../../../../src/constants/actionCodes';

chai.should();

const mockStore = configureMockStore([thunk]);

describe('StructuredDateInputContainer', () => {
  const config = {
    structDateOptionListNames: ['dateQualifiers'],
    structDateVocabNames: ['dateera', 'datecertainty', 'datequalifier'],
  };

  it('should set props on StructuredDateInput', () => {
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
      optionList: Immutable.Map(optionLists),
      user: Immutable.Map({
        perms,
      }),
    });

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ConnectedStructuredDateInput
        store={store}
        config={config}
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const input = findWithType(result, StructuredDateInput);

    input.props.optionLists.should.deep.equal(optionLists);
    input.props.perms.should.equal(perms);

    input.props.terms.should.deep.equal({
      dateera: [],
      datecertainty: [],
      datequalifier: [],
    });
  });

  it('should override vocab names in config with vocab names in props if present', () => {
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
      foobar: { items: [] },
    };

    const perms = Immutable.fromJS({
      collectionobject: {
        data: 'CRUDL',
      },
    });

    const store = mockStore({
      vocabulary,
      optionList: Immutable.Map(optionLists),
      user: Immutable.Map({
        perms,
      }),
    });

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ConnectedStructuredDateInput
        config={config}
        store={store}
        structDateVocabNames={['foobar']}
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const input = findWithType(result, StructuredDateInput);

    input.props.terms.should.deep.equal({
      foobar: [],
    });
  });

  it('should connect readTerms to readVocabularyItems action creator', () => {
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
      optionList: Immutable.Map(optionLists),
      user: Immutable.Map(),
      vocabulary: {
        [vocabularyName]: vocabulary,
      },
    });

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ConnectedStructuredDateInput
        store={store}
        config={config}
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const input = findWithType(result, StructuredDateInput);

    // The call to readTerms will fail because we haven't stubbed out everything it needs,
    // but there's enough to verify that the readVocabularyItems action creator gets called, and
    // dispatches READ_VOCABULARY_ITEMS_STARTED.

    try {
      input.props.readTerms(vocabularyName);
    } catch (error) {
      const action = store.getActions()[0];

      action.should.have.property('type', READ_VOCABULARY_ITEMS_STARTED);
      action.should.have.deep.property('meta.vocabularyName', vocabularyName);
    }
  });
});
