import React from 'react';
import Immutable from 'immutable';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import thunk from 'redux-thunk';
import { components as inputComponents } from 'cspace-input';
import { findWithType } from 'react-shallow-testutils';
import { ConnectedAutocompleteInput } from '../../../../src/containers/input/AutocompleteInputContainer';

import {
  ADD_TERM_STARTED,
  PARTIAL_TERM_SEARCH_STARTED,
  CLEAR_PARTIAL_TERM_SEARCH_RESULTS,
} from '../../../../src/constants/actionCodes';

chai.should();

const { AutocompleteInput } = inputComponents;
const mockStore = configureMockStore([thunk]);

describe('AutocompleteInputContainer', () => {
  it('should set props on AutocompleteInput', () => {
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
        store={store}
        source="person/local"
        config={config}
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const input = findWithType(result, AutocompleteInput);

    input.props.should.have.property('matches', matches);
    input.props.should.have.property('recordTypes').that.deep.equals(config.recordTypes);
    input.props.should.have.property('formatAddPrompt').that.is.a('function');
    input.props.should.have.property('formatCloneOptionLabel').that.is.a('function');
    input.props.should.have.property('formatCreateNewOptionLabel').that.is.a('function');
    input.props.should.have.property('formatMoreCharsRequiredMessage').that.is.a('function');
    input.props.should.have.property('formatSearchResultMessage').that.is.a('function');
    input.props.should.have.property('formatSourceName').that.is.a('function');
    input.props.should.have.property('addTerm').that.is.a('function');
    input.props.should.have.property('findMatchingTerms').that.is.a('function');
    input.props.should.have.property('onClose').that.is.a('function');
  });

  it('should render if no source is provided', () => {
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
        store={store}
        config={config}
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const input = findWithType(result, AutocompleteInput);

    input.props.should.have.property('matches', matches);
    input.props.should.have.property('recordTypes').that.deep.equals(config.recordTypes);
    input.props.should.have.property('formatAddPrompt').that.is.a('function');
    input.props.should.have.property('formatCloneOptionLabel').that.is.a('function');
    input.props.should.have.property('formatCreateNewOptionLabel').that.is.a('function');
    input.props.should.have.property('formatMoreCharsRequiredMessage').that.is.a('function');
    input.props.should.have.property('formatSearchResultMessage').that.is.a('function');
    input.props.should.have.property('formatSourceName').that.is.a('function');
    input.props.should.have.property('addTerm').that.is.a('function');
    input.props.should.have.property('findMatchingTerms').that.is.a('function');
    input.props.should.have.property('onClose').that.is.a('function');
  });

  it('should remove from source any record types for which there are not list permissions', () => {
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
        store={store}
        source="person/local,organization/local"
        config={config}
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const input = findWithType(result, AutocompleteInput);

    input.props.should.have.property('source').that.equals('person/local');
  });

  it('should set quickAddTo to contain source record types for which there are create permissions, and are not locked', () => {
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
        store={store}
        source="person/local,person/shared,organization/local"
        config={config}
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const input = findWithType(result, AutocompleteInput);

    input.props.should.have.property('quickAddTo').that.equals('person/local');
  });

  it('should connect addTerm, findMatchingTerms, and onClose to action creators', () => {
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
        store={store}
        source="person/local"
        config={config}
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const input = findWithType(result, AutocompleteInput);

    // The call to addTerm will fail because we haven't stubbed out everything it needs,
    // but there's enough to verify that the addTerm action creator gets called, and
    // dispatches ADD_TERM_STARTED.

    try {
      input.props.addTerm('person', 'local', 'abcd');
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
      input.props.findMatchingTerms('person/local', 'abcd');
    } catch (error) {
      const action = store.getActions()[1];

      action.should.have.property('type', PARTIAL_TERM_SEARCH_STARTED);
      action.should.have.deep.property('meta.recordType', 'person');
      action.should.have.deep.property('meta.vocabulary', 'local');
      action.should.have.deep.property('meta.partialTerm', 'abcd');
    }

    input.props.onClose();

    store.getActions()[2].should.have.property('type', CLEAR_PARTIAL_TERM_SEARCH_RESULTS);
  });

  it('should connect formatAddPrompt, formatCloneOptionLabel, formatCreateNewOptionLabel, formatMoreCharsRequiredMessage, formatSearchResultMessage, and formatSourceName to intl.formatMessage', () => {
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
        store={store}
        source="person/local"
        intl={intl}
        config={config}
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const input = findWithType(result, AutocompleteInput);

    input.props.formatAddPrompt();

    formatMessageCalledCount.should.equal(1);

    input.props.formatCloneOptionLabel();

    formatMessageCalledCount.should.equal(2);

    input.props.formatCreateNewOptionLabel();

    formatMessageCalledCount.should.equal(3);

    input.props.formatMoreCharsRequiredMessage();

    formatMessageCalledCount.should.equal(4);

    input.props.formatSearchResultMessage(1);

    formatMessageCalledCount.should.equal(5);

    input.props.formatSourceName({ messages: {} });

    formatMessageCalledCount.should.equal(6);
  });
});
