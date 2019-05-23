import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createRenderer } from 'react-test-renderer/shallow';
import Immutable from 'immutable';
import mockHistory from '../../../helpers/mockHistory';
import QuickSearchForm from '../../../../src/components/search/QuickSearchForm';
import QuickSearchFormContainer from '../../../../src/containers/search/QuickSearchFormContainer';

import {
  SET_QUICK_SEARCH_KEYWORD,
  SET_QUICK_SEARCH_RECORD_TYPE,
  SET_QUICK_SEARCH_VOCABULARY,
} from '../../../../src/constants/actionCodes';

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

    shallowRenderer.render(<QuickSearchFormContainer />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(QuickSearchForm);

    result.props.keywordValue.should.equal('hello world');
    result.props.recordTypeValue.should.equal('concept');
    result.props.vocabularyValue.should.equal('material');
    result.props.getAuthorityVocabCsid.should.be.a('function');

    result.props.onKeywordCommit.should.be.a('function');
    result.props.onRecordTypeCommit.should.be.a('function');
    result.props.onVocabularyCommit.should.be.a('function');
    result.props.search.should.be.a('function');
  });

  it('should connect getAuthorityVocabCsid to getAuthorityVocabCsid selector', function test() {
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
      authority: Immutable.fromJS({
        person: {
          local: {
            csid: '1234',
          },
        },
      }),
    });

    const context = {
      store,
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<QuickSearchFormContainer />, context);

    const result = shallowRenderer.getRenderOutput();

    result.props.getAuthorityVocabCsid('person', 'local').should.equal('1234');
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

    shallowRenderer.render(<QuickSearchFormContainer />, context);

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

    shallowRenderer.render(<QuickSearchFormContainer />, context);

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

    shallowRenderer.render(<QuickSearchFormContainer />, context);

    const result = shallowRenderer.getRenderOutput();

    result.props.onVocabularyCommit('ulan');

    const action = store.getActions()[0];

    action.should.have.property('type', SET_QUICK_SEARCH_VOCABULARY);
    action.should.have.deep.property('payload', 'ulan');
  });

  it('should connect search to initiateSearch action creator', function test() {
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

    const history = mockHistory({
      push: (location) => {
        pushedLocation = location;
      },
    });

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<QuickSearchFormContainer history={history} />, context);

    const result = shallowRenderer.getRenderOutput();

    result.props.search();

    pushedLocation.should.deep.equal({
      pathname: '/list/concept/material',
      search: '?kw=hello%20world',
    });
  });
});
