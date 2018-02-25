import React from 'react';
import Immutable from 'immutable';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
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
      authority: Immutable.Map(),
      partialTermSearch: matches,
      user: Immutable.fromJS({
        perms: {
          person: {
            data: 'CRUDL',
          },
        },
      }),
    });

    const context = {
      store,
    };

    const config = {
      recordTypes: {
        person: {
          serviceConfig: {
            name: 'personauthorities',
            serviceType: 'authority',
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
    result.props.should.have.property('recordTypes').that.deep.equals(config.recordTypes);
    result.props.should.have.property('formatAddPrompt').that.is.a('function');
    result.props.should.have.property('formatCloneOptionLabel').that.is.a('function');
    result.props.should.have.property('formatCreateNewOptionLabel').that.is.a('function');
    result.props.should.have.property('formatMoreCharsRequiredMessage').that.is.a('function');
    result.props.should.have.property('formatSearchResultMessage').that.is.a('function');
    result.props.should.have.property('formatSourceName').that.is.a('function');
    result.props.should.have.property('addTerm').that.is.a('function');
    result.props.should.have.property('findMatchingTerms').that.is.a('function');
    result.props.should.have.property('onClose').that.is.a('function');
  });

  it('should render if no source is provided', function test() {
    const matches = Immutable.Map({});

    const store = mockStore({
      authority: Immutable.Map(),
      partialTermSearch: matches,
      user: Immutable.fromJS({
        perms: {
          person: {
            data: 'CRUDL',
          },
        },
      }),
    });

    const context = {
      store,
    };

    const config = {
      recordTypes: {
        person: {
          serviceConfig: {
            name: 'personauthorities',
            serviceType: 'authority',
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
        config={config}
      />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(AutocompleteInput);
  });

  it('should remove from source any record types for which there are not list permissions', function test() {
    const matches = Immutable.Map();

    const store = mockStore({
      authority: Immutable.Map(),
      partialTermSearch: matches,
      user: Immutable.fromJS({
        perms: {
          person: {
            data: 'CRUDL',
          },
          organization: {
            data: '',
          },
        },
      }),
    });

    const context = {
      store,
    };

    const config = {
      recordTypes: {
        person: {
          serviceConfig: {
            name: 'personauthorities',
            serviceType: 'authority',
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
        organization: {
          serviceConfig: {
            name: 'orgauthorities',
            serviceType: 'authority',
            quickAddData: () => {},
          },
          vocabularies: {
            local: {
              serviceConfig: {
                servicePath: 'urn:cspace:name(organization)',
              },
            },
          },
        },
      },
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ConnectedAutocompleteInput
        source="person/local,organization/local"
        config={config}
      />, context);

    const result = shallowRenderer.getRenderOutput();

    result.props.should.have.property('source').that.equals('person/local');
  });

  it('should set quickAddTo to contain source record types for which there are create permissions, and are not locked', function test() {
    const matches = Immutable.Map();

    const store = mockStore({
      authority: Immutable.fromJS({
        person: {
          shared: {
            workflowState: 'locked',
          },
        },
      }),
      partialTermSearch: matches,
      user: Immutable.fromJS({
        perms: {
          person: {
            data: 'CRUDL',
          },
          organization: {
            data: 'RL',
          },
        },
      }),
    });

    const context = {
      store,
    };

    const config = {
      recordTypes: {
        person: {
          serviceConfig: {
            name: 'personauthorities',
            serviceType: 'authority',
            quickAddData: () => {},
          },
          vocabularies: {
            local: {
              serviceConfig: {
                servicePath: 'urn:cspace:name(person)',
              },
            },
            shared: {
              serviceConfig: {
                servicePath: 'urn:cspace:name(shared)',
              },
            },
          },
        },
        organization: {
          serviceConfig: {
            name: 'orgauthorities',
            serviceType: 'authority',
            quickAddData: () => {},
          },
          vocabularies: {
            local: {
              serviceConfig: {
                servicePath: 'urn:cspace:name(organization)',
              },
            },
          },
        },
      },
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ConnectedAutocompleteInput
        source="person/local,person/shared,organization/local"
        config={config}
      />, context);

    const result = shallowRenderer.getRenderOutput();

    result.props.should.have.property('quickAddTo').that.equals('person/local');
  });

  it('should connect addTerm, findMatchingTerms, and onClose to action creators', function test() {
    const matches = Immutable.Map({});

    const store = mockStore({
      authority: Immutable.Map(),
      partialTermSearch: matches,
      user: Immutable.fromJS({
        perms: {
          person: {
            data: 'CRUDL',
          },
        },
      }),
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
            serviceType: 'authority',
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
      result.props.findMatchingTerms('person/local', 'abcd');
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

  it('should connect formatAddPrompt, formatCloneOptionLabel, formatCreateNewOptionLabel, formatMoreCharsRequiredMessage, formatSearchResultMessage, and formatSourceName to intl.formatMessage', function test() {
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
      authority: Immutable.Map(),
      partialTermSearch: matches,
      user: Immutable.fromJS({
        perms: {
          person: {
            data: 'CRUDL',
          },
        },
      }),
    });

    const context = {
      store,
    };

    const config = {
      recordTypes: {
        person: {
          serviceConfig: {
            name: 'personauthorities',
            serviceType: 'authority',
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

    result.props.formatCloneOptionLabel();

    formatMessageCalledCount.should.equal(2);

    result.props.formatCreateNewOptionLabel();

    formatMessageCalledCount.should.equal(3);

    result.props.formatMoreCharsRequiredMessage();

    formatMessageCalledCount.should.equal(4);

    result.props.formatSearchResultMessage(1);

    formatMessageCalledCount.should.equal(5);

    result.props.formatSourceName({ messages: {} });

    formatMessageCalledCount.should.equal(6);
  });
});
