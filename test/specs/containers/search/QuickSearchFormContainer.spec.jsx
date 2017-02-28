import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createRenderer } from 'react-addons-test-utils';
import Immutable from 'immutable';
import mockRouter from '../../../helpers/mockRouter';
import QuickSearchForm from '../../../../src/components/search/QuickSearchForm';
import { ConnectedQuickSearchForm } from '../../../../src/containers/search/QuickSearchFormContainer';

import {
  SET_QUICK_SEARCH_KEYWORD,
} from '../../../../src/actions/quickSearch';

import {
  SET_QUICK_SEARCH_RECORD_TYPE,
  SET_QUICK_SEARCH_VOCABULARY,
} from '../../../../src/actions/prefs';

chai.should();

const mockStore = configureMockStore([thunk]);

describe('QuickSearchFormContainer', function suite() {
  it('should set props on QuickSearchForm', function test() {
    const store = mockStore({
      quickSearch: Immutable.fromJS({
        keyword: 'hello world',
      }),
      prefs: Immutable.fromJS({
        quickSearch: {
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

    shallowRenderer.render(<ConnectedQuickSearchForm />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(QuickSearchForm);

    result.props.keywordValue.should.equal('hello world');
    result.props.recordTypeValue.should.equal('concept');
    result.props.vocabularyValue.should.equal('material');

    result.props.onKeywordCommit.should.be.a('function');
    result.props.onRecordTypeCommit.should.be.a('function');
    result.props.onVocabularyCommit.should.be.a('function');
    result.props.onSearch.should.be.a('function');
  });

  it('should connect onKeywordCommit to setQuickSearchKeyword action creator', function test() {
    const store = mockStore({
      quickSearch: Immutable.fromJS({
        keyword: 'hello world',
      }),
      prefs: Immutable.fromJS({
        quickSearch: {
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

    shallowRenderer.render(<ConnectedQuickSearchForm />, context);

    const result = shallowRenderer.getRenderOutput();

    result.props.onKeywordCommit('new keyword');

    const action = store.getActions()[0];

    action.should.have.property('type', SET_QUICK_SEARCH_KEYWORD);
    action.should.have.deep.property('payload', 'new keyword');
  });

  it('should connect onRecordTypeCommit to setQuickSearchRecordType action creator', function test() {
    const store = mockStore({
      quickSearch: Immutable.fromJS({
        keyword: 'hello world',
      }),
      prefs: Immutable.fromJS({
        quickSearch: {
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

    shallowRenderer.render(<ConnectedQuickSearchForm />, context);

    const result = shallowRenderer.getRenderOutput();

    result.props.onRecordTypeCommit('person');

    const action = store.getActions()[0];

    action.should.have.property('type', SET_QUICK_SEARCH_RECORD_TYPE);
    action.should.have.deep.property('payload', 'person');
  });

  it('should connect onVocabularyCommit to setQuickSearchVocabulary action creator', function test() {
    const store = mockStore({
      quickSearch: Immutable.fromJS({
        keyword: 'hello world',
      }),
      prefs: Immutable.fromJS({
        quickSearch: {
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

    shallowRenderer.render(<ConnectedQuickSearchForm />, context);

    const result = shallowRenderer.getRenderOutput();

    result.props.onVocabularyCommit('ulan');

    const action = store.getActions()[0];

    action.should.have.property('type', SET_QUICK_SEARCH_VOCABULARY);
    action.should.have.deep.property('payload', 'ulan');
  });

  it('should connect onSearch to initiateSearch action creator', function test() {
    const store = mockStore({
      quickSearch: Immutable.fromJS({
        keyword: 'hello world',
      }),
      prefs: Immutable.fromJS({
        quickSearch: {
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

    shallowRenderer.render(<ConnectedQuickSearchForm router={router} />, context);

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
