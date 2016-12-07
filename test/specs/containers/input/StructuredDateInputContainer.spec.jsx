import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-addons-test-utils';
import { components as inputComponents } from 'cspace-input';
import thunk from 'redux-thunk';
import { ConnectedStructuredDateInput } from '../../../../src/containers/input/StructuredDateInputContainer';

import {
  READ_VOCABULARY_ITEMS_STARTED,
} from '../../../../src/actions/vocabulary';

chai.should();

const { StructuredDateInput } = inputComponents;
const mockStore = configureMockStore([thunk]);

describe('StructuredDateInputContainer', function suite() {
  it('should set props on StructuredDateInput', function test() {
    const dateQualifiers = [
      { value: 'qual1', label: 'Qual 1' },
    ];

    const options = {
      dateQualifiers,
    };

    const vocabulary = {
      dateera: { items: [] },
      datecertainty: { items: [] },
      datequalifier: { items: [] },
    };

    const store = mockStore({
      options,
      vocabulary,
    });

    const context = {
      store,
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ConnectedStructuredDateInput />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(StructuredDateInput);
    result.props.optionLists.should.deep.equal(options);
    result.props.terms.should.deep.equal({
      dateera: [],
      datecertainty: [],
      datequalifier: [],
    });
    result.props.formatFieldLabel.should.be.a('function');
    result.props.formatOptionLabel.should.be.a('function');
    result.props.onMount.should.be.a('function');
  });

  it('should connect onMount to an action creator', function test() {
    const dateQualifiers = [
      { value: 'qual1', label: 'Qual 1' },
    ];

    const options = {
      dateQualifiers,
    };

    const vocabulary = {
      dateera: { items: [] },
      datecertainty: { items: [] },
      datequalifier: { items: [] },
    };

    const store = mockStore({
      options,
      vocabulary,
    });

    const context = {
      store,
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ConnectedStructuredDateInput />, context);

    const result = shallowRenderer.getRenderOutput();

    // The call to onMount will fail because we haven't stubbed out everything it needs,
    // but there's enough to verify that the readVocabularyItems action creator gets called, and
    // dispatches READ_VOCABULARY_ITEMS_STARTED.

    try {
      result.props.onMount();
    } catch (error) {
      const action = store.getActions()[0];

      action.should.have.property('type', READ_VOCABULARY_ITEMS_STARTED);
    }
  });

  it('should connect formatFieldLabel and formatOptionLabel to intl.formatMessage', function test() {
    let formatMessageCalledCount = 0;

    const intl = {
      formatDate: () => null,
      formatTime: () => null,
      formatRelative: () => null,
      formatNumber: () => null,
      formatPlural: () => null,
      formatMessage: () => {
        formatMessageCalledCount += 1;
      },
      formatHTMLMessage: () => null,
      now: () => null,
    };

    const dateQualifiers = [
      { value: 'qual1', label: 'Qual 1' },
    ];

    const options = {
      dateQualifiers,
    };

    const vocabulary = {
      dateera: { items: [] },
      datecertainty: { items: [] },
      datequalifier: { items: [] },
    };

    const store = mockStore({
      options,
      vocabulary,
    });

    const context = {
      store,
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ConnectedStructuredDateInput intl={intl} />, context);

    const result = shallowRenderer.getRenderOutput();

    result.props.formatFieldLabel();

    formatMessageCalledCount.should.equal(1);

    result.props.formatOptionLabel({ messageDescriptor: {} });

    formatMessageCalledCount.should.equal(2);
  });
});
