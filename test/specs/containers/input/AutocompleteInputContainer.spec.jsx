import React from 'react';
import Immutable from 'immutable';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-addons-test-utils';
import thunk from 'redux-thunk';
import { components as inputComponents } from 'cspace-input';
import { ConnectedAutocompleteInput } from '../../../../src/containers/input/AutocompleteInputContainer';

import {
  ADD_TERM_STARTED,
  PARTIAL_TERM_SEARCH_STARTED,
  CLEAR_PARTIAL_TERM_SEARCH_RESULTS,
} from '../../../../src/actions/partialTermSearch';

chai.should();

const { AutocompleteInput } = inputComponents;
const mockStore = configureMockStore([thunk]);

describe('AutocompleteInputContainer', function suite() {
  it('should set props on AutocompleteInput', function test() {
    const matches = Immutable.Map({});

    const store = mockStore({
      partialTermSearch: matches,
    });

    const context = {
      store,
    };

    const config = {
      recordTypes: {
        person: {
          serviceConfig: {
            name: 'personauthorities',
            quickAddData: () => {},
          },
          vocabularies: {
            local: {
              serviceConfig: {
                servicePath: 'urn:cspace:name(person)',
              },
            },
          },
        },
      },
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ConnectedAutocompleteInput
        source="person/local"
        config={config}
      />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(AutocompleteInput);
    result.props.should.have.property('matches', matches);
    result.props.should.have.property('recordTypes', config.recordTypes);
    result.props.should.have.property('formatAddPrompt').that.is.a('function');
    result.props.should.have.property('formatMoreCharsRequiredMessage').that.is.a('function');
    result.props.should.have.property('formatSearchResultMessage').that.is.a('function');
    result.props.should.have.property('formatSourceName').that.is.a('function');
    result.props.should.have.property('addTerm').that.is.a('function');
    result.props.should.have.property('findMatchingTerms').that.is.a('function');
    result.props.should.have.property('onClose').that.is.a('function');
  });

  it('should connect addTerm, findMatchingTerms, and onClose to action creators', function test() {
    const matches = Immutable.Map({});

    const store = mockStore({
      partialTermSearch: matches,
    });

    const context = {
      store,
    };

    const config = {
      recordTypes: {
        person: {
          name: 'person',
          serviceConfig: {
            name: 'personauthorities',
            quickAddData: () => {},
          },
          vocabularies: {
            local: {
              serviceConfig: {
                servicePath: 'urn:cspace:name(person)',
              },
            },
          },
        },
      },
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ConnectedAutocompleteInput
        source="person/local"
        config={config}
      />, context);

    const result = shallowRenderer.getRenderOutput();

    // The call to addTerm will fail because we haven't stubbed out everything it needs,
    // but there's enough to verify that the addTerm action creator gets called, and
    // dispatches ADD_TERM_STARTED.

    try {
      result.props.addTerm('person', 'local', 'abcd');
    } catch (error) {
      const action = store.getActions()[0];

      action.should.have.property('type', ADD_TERM_STARTED);
      action.should.have.deep.property('meta.recordType', 'person');
      action.should.have.deep.property('meta.vocabulary', 'local');
      action.should.have.deep.property('meta.displayName', 'abcd');
    }

    // The call to findMatchingTerms will fail because we haven't stubbed out everything it needs,
    // but there's enough to verify that the findMatchingTerms action creator gets called, and
    // dispatches PARTIAL_TERM_SEARCH_STARTED.

    try {
      result.props.findMatchingTerms('abcd');
    } catch (error) {
      const action = store.getActions()[1];

      action.should.have.property('type', PARTIAL_TERM_SEARCH_STARTED);
      action.should.have.deep.property('meta.recordType', 'person');
      action.should.have.deep.property('meta.vocabulary', 'local');
      action.should.have.deep.property('meta.partialTerm', 'abcd');
    }

    result.props.onClose();

    store.getActions()[2].should.have.property('type', CLEAR_PARTIAL_TERM_SEARCH_RESULTS);
  });

  it('should connect formatAddPrompt, formatMoreCharsRequiredMessage, formatSearchResultMessage, and formatSourceName to intl.formatMessage', function test() {
    const matches = Immutable.Map({});

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

    const store = mockStore({
      partialTermSearch: matches,
    });

    const context = {
      store,
    };

    const config = {
      recordTypes: {
        person: {
          serviceConfig: {
            name: 'personauthorities',
            quickAddData: () => {},
          },
          vocabularies: {
            local: {
              serviceConfig: {
                servicePath: 'urn:cspace:name(person)',
              },
            },
          },
        },
      },
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ConnectedAutocompleteInput
        source="person/local"
        intl={intl}
        config={config}
      />, context);

    const result = shallowRenderer.getRenderOutput();

    result.props.formatAddPrompt();

    formatMessageCalledCount.should.equal(1);

    result.props.formatMoreCharsRequiredMessage();

    formatMessageCalledCount.should.equal(2);

    result.props.formatSearchResultMessage(1);

    formatMessageCalledCount.should.equal(3);

    result.props.formatSourceName({ messages: {} });

    formatMessageCalledCount.should.equal(4);
  });
});
