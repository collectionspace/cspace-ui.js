import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createRenderer } from 'react-addons-test-utils';
import Immutable from 'immutable';
import mockRouter from '../../../helpers/mockRouter';
import SearchPage from '../../../../src/components/pages/SearchPage';
import { ConnectedSearchPage } from '../../../../src/containers/pages/SearchPageContainer';

import {
  SET_ADVANCED_SEARCH_KEYWORD,
} from '../../../../src/actions/advancedSearch';

import {
  SET_ADVANCED_SEARCH_RECORD_TYPE,
  SET_ADVANCED_SEARCH_VOCABULARY,
} from '../../../../src/actions/prefs';

chai.should();

const mockStore = configureMockStore([thunk]);

describe('SearchPageContainer', function suite() {
  it('should set props on SearchPage', function test() {
    const store = mockStore({
      advancedSearch: Immutable.Map({
        keyword: 'foo',
      }),
      prefs: Immutable.fromJS({
        advancedSearch: {
          recordType: 'person',
          vocabulary: {
            person: 'local',
          },
        },
      }),
    });

    const shallowRenderer = createRenderer();

    const context = {
      store,
    };

    shallowRenderer.render(
      <ConnectedSearchPage />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(SearchPage);
    result.props.should.have.property('keywordValue', 'foo');
    result.props.should.have.property('preferredRecordType', 'person');
    result.props.should.have.property('preferredVocabulary', 'local');
    result.props.should.have.property('onKeywordCommit').that.is.a('function');
    result.props.should.have.property('onRecordTypeCommit').that.is.a('function');
    result.props.should.have.property('onVocabularyCommit').that.is.a('function');
    result.props.should.have.property('onSearch').that.is.a('function');
  });

  it('should connect onKeywordCommit to setAdvancedSearchKeyword action creator', function test() {
    const store = mockStore({
      advancedSearch: Immutable.fromJS({
        keyword: 'hello world',
      }),
      prefs: Immutable.fromJS({
        advancedSearch: {
          recordType: 'concept',
          vocabulary: {
            concept: 'material',
          },
        },
      }),
    });

    const context = {
      store,
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<ConnectedSearchPage />, context);

    const result = shallowRenderer.getRenderOutput();

    result.props.onKeywordCommit('new keyword');

    const action = store.getActions()[0];

    action.should.have.property('type', SET_ADVANCED_SEARCH_KEYWORD);
    action.should.have.deep.property('payload', 'new keyword');
  });

  it('should connect onRecordTypeCommit to setAdvancedSearchRecordType action creator', function test() {
    const store = mockStore({
      advancedSearch: Immutable.fromJS({
        keyword: 'hello world',
      }),
      prefs: Immutable.fromJS({
        advancedSearch: {
          recordType: 'concept',
          vocabulary: {
            concept: 'material',
          },
        },
      }),
    });

    const context = {
      store,
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<ConnectedSearchPage />, context);

    const result = shallowRenderer.getRenderOutput();

    result.props.onRecordTypeCommit('person');

    const action = store.getActions()[0];

    action.should.have.property('type', SET_ADVANCED_SEARCH_RECORD_TYPE);
    action.should.have.deep.property('payload', 'person');
  });

  it('should connect onVocabularyCommit to setAdvancedSearchVocabulary action creator', function test() {
    const store = mockStore({
      advancedSearch: Immutable.fromJS({
        keyword: 'hello world',
      }),
      prefs: Immutable.fromJS({
        advancedSearch: {
          recordType: 'concept',
          vocabulary: {
            concept: 'material',
          },
        },
      }),
    });

    const context = {
      store,
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<ConnectedSearchPage />, context);

    const result = shallowRenderer.getRenderOutput();

    result.props.onVocabularyCommit('ulan');

    const action = store.getActions()[0];

    action.should.have.property('type', SET_ADVANCED_SEARCH_VOCABULARY);
    action.should.have.deep.property('payload', 'ulan');
  });

  it('should connect onSearch to initiateSearch action creator', function test() {
    const store = mockStore({
      advancedSearch: Immutable.fromJS({
        keyword: 'hello world',
      }),
      prefs: Immutable.fromJS({
        advancedSearch: {
          recordType: 'concept',
          vocabulary: {
            concept: 'material',
          },
        },
      }),
    });

    const context = {
      store,
    };

    let pushedLocation = null;

    const router = mockRouter({
      push: (location) => {
        pushedLocation = location;
      },
    });

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<ConnectedSearchPage router={router} />, context);

    const result = shallowRenderer.getRenderOutput();

    result.props.onSearch();

    pushedLocation.should.deep.equal({
      pathname: '/list/concept/material',
      query: {
        kw: 'hello world',
      },
    });
  });
});
