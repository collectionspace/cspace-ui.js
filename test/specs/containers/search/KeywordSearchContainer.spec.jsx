import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createRenderer } from 'react-addons-test-utils';
import Immutable from 'immutable';
import KeywordSearch from '../../../../src/components/search/KeywordSearch';
import { ConnectedKeywordSearch } from '../../../../src/containers/search/KeywordSearchContainer';

import {
  SET_KEYWORD_SEARCH_KEYWORD,
  SET_KEYWORD_SEARCH_RECORD_TYPE,
  SET_KEYWORD_SEARCH_VOCABULARY,
} from '../../../../src/actions/keywordSearch';

chai.should();

const mockStore = configureMockStore([thunk]);

describe('KeywordSearchContainer', function suite() {
  it('should set props on KeywordSearch', function test() {
    const store = mockStore({
      keywordSearch: Immutable.fromJS({
        keyword: 'hello world',
        recordType: 'concept',
        vocabulary: 'material',
      }),
    });

    const context = {
      store,
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<ConnectedKeywordSearch />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(KeywordSearch);

    result.props.keywordValue.should.equal('hello world');
    result.props.recordTypeValue.should.equal('concept');
    result.props.vocabularyValue.should.equal('material');

    result.props.onKeywordCommit.should.be.a('function');
    result.props.onRecordTypeCommit.should.be.a('function');
    result.props.onVocabularyCommit.should.be.a('function');
    result.props.onSearch.should.be.a('function');
  });

  it('should connect onKeywordCommit to setKeywordSearchKeyword action creator', function test() {
    const store = mockStore({
      keywordSearch: Immutable.fromJS({
        keyword: 'hello world',
        recordType: 'concept',
        vocabulary: 'material',
      }),
    });

    const context = {
      store,
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<ConnectedKeywordSearch />, context);

    const result = shallowRenderer.getRenderOutput();

    result.props.onKeywordCommit('new keyword');

    const action = store.getActions()[0];

    action.should.have.property('type', SET_KEYWORD_SEARCH_KEYWORD);
    action.should.have.deep.property('payload', 'new keyword');
  });

  it('should connect onRecordTypeCommit to setKeywordSearchRecordType action creator', function test() {
    const store = mockStore({
      keywordSearch: Immutable.fromJS({
        keyword: 'hello world',
        recordType: 'concept',
        vocabulary: 'material',
      }),
    });

    const context = {
      store,
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<ConnectedKeywordSearch />, context);

    const result = shallowRenderer.getRenderOutput();

    result.props.onRecordTypeCommit('person');

    const action = store.getActions()[0];

    action.should.have.property('type', SET_KEYWORD_SEARCH_RECORD_TYPE);
    action.should.have.deep.property('payload', 'person');
  });

  it('should connect onVocabularyCommit to setKeywordSearchVocabulary action creator', function test() {
    const store = mockStore({
      keywordSearch: Immutable.fromJS({
        keyword: 'hello world',
        recordType: 'concept',
        vocabulary: 'material',
      }),
    });

    const context = {
      store,
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<ConnectedKeywordSearch />, context);

    const result = shallowRenderer.getRenderOutput();

    result.props.onVocabularyCommit('ulan');

    const action = store.getActions()[0];

    action.should.have.property('type', SET_KEYWORD_SEARCH_VOCABULARY);
    action.should.have.deep.property('payload', 'ulan');
  });

  it('should connect onSearch to initiateSearch action creator', function test() {
    const store = mockStore({
      keywordSearch: Immutable.fromJS({
        keyword: 'hello world',
        recordType: 'concept',
        vocabulary: 'material',
      }),
    });

    const context = {
      store,
    };

    let pushedLocation = null;

    const router = {
      push: (location) => {
        pushedLocation = location;
      },
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<ConnectedKeywordSearch router={router} />, context);

    const result = shallowRenderer.getRenderOutput();

    result.props.onSearch();

    pushedLocation.should.deep.equal({
      pathname: '/search/concept/material',
      query: {
        kw: 'hello world',
      },
    });
  });
});
