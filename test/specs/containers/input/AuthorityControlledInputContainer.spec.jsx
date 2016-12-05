import React from 'react';
import Immutable from 'immutable';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-addons-test-utils';
import thunk from 'redux-thunk';
import { components as inputComponents } from 'cspace-input';
import { ConnectedAuthorityControlledInput } from '../../../../src/containers/input/AuthorityControlledInputContainer';

import {
  ADD_TERM_STARTED,
  PARTIAL_TERM_SEARCH_STARTED,
  CLEAR_PARTIAL_TERM_SEARCH_RESULTS,
} from '../../../../src/actions/partialTermSearch';

chai.should();

const { AuthorityControlledInput } = inputComponents;
const mockStore = configureMockStore([thunk]);

describe('AuthorityControlledInputContainer', function suite() {
  it('should set props on AuthorityControlledInput', function test() {
    const matches = Immutable.Map({});

    const store = mockStore({
      partialTermSearch: matches,
    });

    const context = {
      store,
    };

    const recordPlugins = {
      person: {
        serviceConfig: {
          name: 'personauthorities',
          vocabularies: {
            person: {},
          },
          quickAddData: () => {},
        },
      },
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ConnectedAuthorityControlledInput
        authority="person/person"
        recordPlugins={recordPlugins}
      />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(AuthorityControlledInput);
    result.props.should.have.property('matches', matches);
    result.props.should.have.property('addTerm').that.is.a('function');
    result.props.should.have.property('findMatchingTerms').that.is.a('function');
    result.props.should.have.property('onClose').that.is.a('function');

    // The call to addTerm will fail because we haven't stubbed out everything it needs,
    // but there's enough to verify that the addTerm action creator gets called, and
    // dispatches ADD_TERM_STARTED.

    try {
      result.props.addTerm('person', 'person', 'abcd');
    } catch (error) {
      const action = store.getActions()[0];

      action.should.have.property('type', ADD_TERM_STARTED);
      action.should.have.deep.property('meta.authorityServiceName', 'personauthorities');
      action.should.have.deep.property('meta.vocabularyName', 'person');
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
      action.should.have.deep.property('meta.authorityServiceName', 'personauthorities');
      action.should.have.deep.property('meta.vocabularyName', 'person');
      action.should.have.deep.property('meta.partialTerm', 'abcd');
    }

    result.props.onClose();

    store.getActions()[2].should.have.property('type', CLEAR_PARTIAL_TERM_SEARCH_RESULTS);
  });
});
