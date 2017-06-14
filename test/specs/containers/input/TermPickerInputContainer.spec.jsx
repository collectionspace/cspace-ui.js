import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import thunk from 'redux-thunk';
import { components as inputComponents } from 'cspace-input';
import { ConnectedTermPickerInput } from '../../../../src/containers/input/TermPickerInputContainer';

import {
  READ_VOCABULARY_ITEMS_STARTED,
} from '../../../../src/actions/vocabulary';

chai.should();

const { TermPickerInput } = inputComponents;
const mockStore = configureMockStore([thunk]);

describe('TermPickerInputContainer', function suite() {
  it('should set props on TermPickerInput', function test() {
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
      <ConnectedTermPickerInput source={vocabularyName} />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(TermPickerInput);
    result.props.should.have.property('formatStatusMessage').that.is.a('function');
    result.props.should.have.property('terms', vocabulary.items);
    // result.props.should.have.property('isLoading', vocabulary.isReadPending);
    result.props.should.have.property('onMount').that.is.a('function');
  });

  it('should connect onMount to readVocabularyItems action creator', function test() {
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
      <ConnectedTermPickerInput source={vocabularyName} />, context);

    const result = shallowRenderer.getRenderOutput();

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

  it('should not set onMount on the base component if source is not provided', function test() {
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

    shallowRenderer.render(<ConnectedTermPickerInput />, context);

    const result = shallowRenderer.getRenderOutput();

    result.props.should.not.have.property('onMount');
  });

  it('should connect formatStatusMessage to intl.formatMessage', function test() {
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

    let formatMessageCalled = false;

    const context = {
      store,
      intl: {
        formatDate: () => null,
        formatTime: () => null,
        formatRelative: () => null,
        formatNumber: () => null,
        formatPlural: () => null,
        formatMessage: () => {
          formatMessageCalled = true;
        },
        formatHTMLMessage: () => null,
        now: () => null,
      },
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ConnectedTermPickerInput
        intl={context.intl}
        source={vocabularyName}
      />, context);

    const result = shallowRenderer.getRenderOutput();

    result.props.formatStatusMessage();

    formatMessageCalled.should.equal(true);
  });
});
