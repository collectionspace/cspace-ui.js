import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-addons-test-utils';
import thunk from 'redux-thunk';
import VocabularyControlledInput from '../../../../src/components/input/VocabularyControlledInput';
import { ConnectedVocabularyControlledInput } from '../../../../src/containers/input/VocabularyControlledInputContainer';

import {
  READ_VOCABULARY_ITEMS_STARTED,
} from '../../../../src/actions/vocabulary';

chai.should();

const mockStore = configureMockStore([thunk]);

describe('VocabularyControlledInputContainer', function suite() {
  it('should set props on VocabularyControlledInput', function test() {
    const vocabularyName = 'languages';

    const vocabulary = {
      isReadPending: true,
      items: [
        { refname: 'en', displayName: 'English' },
      ],
    };

    const store = mockStore({
      vocabulary: {
        [vocabularyName]: vocabulary,
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
      <ConnectedVocabularyControlledInput vocabularyName={vocabularyName} />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(VocabularyControlledInput);
    result.props.should.have.property('items', vocabulary.items);
    // result.props.should.have.property('isLoading', vocabulary.isReadPending);
    result.props.should.have.property('onMount').that.is.a('function');

    // The call to onMount will fail because we haven't stubbed out everything it needs,
    // but there's enough to verify that the readVocabularyItems action creator gets called, and
    // dispatches READ_VOCABULARY_ITEMS_STARTED.

    try {
      result.props.onMount();
    } catch (error) {
      const action = store.getActions()[0];

      action.should.have.property('type', READ_VOCABULARY_ITEMS_STARTED);
      action.should.have.deep.property('meta.vocabularyName', vocabularyName);
    }
  });

  it('should not set onMount on the base component vocabularyName is not set', function test() {
    const store = mockStore({
      vocabulary: {},
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

    shallowRenderer.render(<ConnectedVocabularyControlledInput />, context);

    const result = shallowRenderer.getRenderOutput();

    result.props.should.not.have.property('onMount');
  });
});
