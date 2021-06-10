import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createRenderer } from 'react-test-renderer/shallow';
import { findWithType } from 'react-shallow-testutils';
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

describe('QuickSearchFormContainer', () => {
  it('should set props on QuickSearchForm', () => {
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

    shallowRenderer.render(<QuickSearchFormContainer store={store} />, context);

    const result = shallowRenderer.getRenderOutput();
    const form = findWithType(result, QuickSearchForm);

    form.should.not.be.null;

    form.props.keywordValue.should.equal('hello world');
    form.props.recordTypeValue.should.equal('concept');
    form.props.vocabularyValue.should.equal('material');
    form.props.getAuthorityVocabCsid.should.be.a('function');

    form.props.onKeywordCommit.should.be.a('function');
    form.props.onRecordTypeCommit.should.be.a('function');
    form.props.onVocabularyCommit.should.be.a('function');
    form.props.search.should.be.a('function');
  });

  it('should connect getAuthorityVocabCsid to getAuthorityVocabCsid selector', () => {
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

    shallowRenderer.render(<QuickSearchFormContainer store={store} />, context);

    const result = shallowRenderer.getRenderOutput();
    const form = findWithType(result, QuickSearchForm);

    form.props.getAuthorityVocabCsid('person', 'local').should.equal('1234');
  });

  it('should connect onKeywordCommit to setQuickSearchKeyword action creator', () => {
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

    shallowRenderer.render(<QuickSearchFormContainer store={store} />, context);

    const result = shallowRenderer.getRenderOutput();
    const form = findWithType(result, QuickSearchForm);

    form.props.onKeywordCommit('new keyword');

    const action = store.getActions()[0];

    action.should.have.property('type', SET_QUICK_SEARCH_KEYWORD);
    action.should.have.deep.property('payload', 'new keyword');
  });

  it('should connect onRecordTypeCommit to setQuickSearchRecordType action creator', () => {
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

    shallowRenderer.render(<QuickSearchFormContainer store={store} />, context);

    const result = shallowRenderer.getRenderOutput();
    const form = findWithType(result, QuickSearchForm);

    form.props.onRecordTypeCommit('person');

    const action = store.getActions()[0];

    action.should.have.property('type', SET_QUICK_SEARCH_RECORD_TYPE);
    action.should.have.deep.property('payload', 'person');
  });

  it('should connect onVocabularyCommit to setQuickSearchVocabulary action creator', () => {
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

    shallowRenderer.render(<QuickSearchFormContainer store={store} />, context);

    const result = shallowRenderer.getRenderOutput();
    const form = findWithType(result, QuickSearchForm);

    form.props.onVocabularyCommit('ulan');

    const action = store.getActions()[0];

    action.should.have.property('type', SET_QUICK_SEARCH_VOCABULARY);
    action.should.have.deep.property('payload', 'ulan');
  });

  it('should connect search to initiateSearch action creator', () => {
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

    shallowRenderer.render(
      <QuickSearchFormContainer
        store={store}
        history={history}
      />, context
    );

    const result = shallowRenderer.getRenderOutput();
    const form = findWithType(result, QuickSearchForm);

    form.props.search();

    pushedLocation.should.deep.equal({
      pathname: '/list/concept/material',
      search: '?kw=hello%20world',
    });
  });
});
