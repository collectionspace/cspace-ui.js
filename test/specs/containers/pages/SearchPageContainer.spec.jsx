import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createRenderer } from 'react-test-renderer/shallow';
import Immutable from 'immutable';
import mockHistory from '../../../helpers/mockHistory';
import SearchPage from '../../../../src/components/pages/SearchPage';
import { ConnectedSearchPage } from '../../../../src/containers/pages/SearchPageContainer';

import {
  CLEAR_SEARCH_PAGE,
  SET_SEARCH_PAGE_ADVANCED,
  SET_SEARCH_PAGE_KEYWORD,
} from '../../../../src/actions/searchPage';

import {
  SET_SEARCH_PAGE_RECORD_TYPE,
  SET_SEARCH_PAGE_VOCABULARY,
} from '../../../../src/actions/prefs';

chai.should();

const mockStore = configureMockStore([thunk]);

describe('SearchPageContainer', function suite() {
  it('should set props on SearchPage', function test() {
    const store = mockStore({
      searchPage: Immutable.Map({
        keyword: 'foo',
      }),
      prefs: Immutable.fromJS({
        searchPage: {
          recordType: 'person',
          vocabulary: {
            person: 'local',
          },
        },
      }),
      user: Immutable.fromJS({
        perms: {
          person: {
            data: 'CRUDL',
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
    result.props.should.have.property('recordTypeValue', 'person');
    result.props.should.have.property('vocabularyValue', 'local');
    result.props.should.have.property('getAuthorityVocabCsid').that.is.a('function');
    result.props.should.have.property('onAdvancedSearchConditionCommit').that.is.a('function');
    result.props.should.have.property('onClearButtonClick').that.is.a('function');
    result.props.should.have.property('onKeywordCommit').that.is.a('function');
    result.props.should.have.property('onRecordTypeCommit').that.is.a('function');
    result.props.should.have.property('onVocabularyCommit').that.is.a('function');
    result.props.should.have.property('onSearch').that.is.a('function');
  });

  it('should connect getAuthorityVocabCsid to getAuthorityVocabCsid selector', function test() {
    const store = mockStore({
      searchPage: Immutable.fromJS({
        keyword: 'hello world',
      }),
      prefs: Immutable.fromJS({
        searchPage: {
          recordType: 'concept',
          vocabulary: {
            concept: 'material',
          },
        },
      }),
      user: Immutable.fromJS({
        perms: {
          concept: {
            data: 'CRUDL',
          },
        },
      }),
      authority: Immutable.fromJS({
        concept: {
          material: {
            csid: '1234',
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

    result.props.getAuthorityVocabCsid('concept', 'material').should.equal('1234');
  });

  it('should connect onAdvancedSearchConditionCommit to setSearchPageAdvanced action creator', function test() {
    const store = mockStore({
      searchPage: Immutable.fromJS({
        keyword: 'hello world',
      }),
      prefs: Immutable.fromJS({
        searchPage: {
          recordType: 'concept',
          vocabulary: {
            concept: 'material',
          },
        },
      }),
      user: Immutable.fromJS({
        perms: {
          concept: {
            data: 'CRUDL',
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

    const condition = Immutable.fromJS({
      op: 'and',
      value: [],
    });

    result.props.onAdvancedSearchConditionCommit(condition);

    const action = store.getActions()[0];

    action.should.have.property('type', SET_SEARCH_PAGE_ADVANCED);
    action.should.have.deep.property('payload', condition);
  });

  it('should connect onKeywordCommit to setSearchPageKeyword action creator', function test() {
    const store = mockStore({
      searchPage: Immutable.fromJS({
        keyword: 'hello world',
      }),
      prefs: Immutable.fromJS({
        searchPage: {
          recordType: 'concept',
          vocabulary: {
            concept: 'material',
          },
        },
      }),
      user: Immutable.fromJS({
        perms: {
          concept: {
            data: 'CRUDL',
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

    action.should.have.property('type', SET_SEARCH_PAGE_KEYWORD);
    action.should.have.deep.property('payload', 'new keyword');
  });

  it('should connect onRecordTypeCommit to setSearchPageRecordType action creator', function test() {
    const store = mockStore({
      searchPage: Immutable.fromJS({
        keyword: 'hello world',
      }),
      prefs: Immutable.fromJS({
        searchPage: {
          recordType: 'concept',
          vocabulary: {
            concept: 'material',
          },
        },
      }),
      user: Immutable.fromJS({
        perms: {
          concept: {
            data: 'CRUDL',
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

    action.should.have.property('type', SET_SEARCH_PAGE_RECORD_TYPE);
    action.should.have.deep.property('payload', 'person');
  });

  it('should connect onVocabularyCommit to setSearchPageVocabulary action creator', function test() {
    const store = mockStore({
      searchPage: Immutable.fromJS({
        keyword: 'hello world',
      }),
      prefs: Immutable.fromJS({
        searchPage: {
          recordType: 'concept',
          vocabulary: {
            concept: 'material',
          },
        },
      }),
      user: Immutable.fromJS({
        perms: {
          concept: {
            data: 'CRUDL',
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

    action.should.have.property('type', SET_SEARCH_PAGE_VOCABULARY);
    action.should.have.deep.property('payload', 'ulan');
  });

  it('should connect onSearch to initiateSearch action creator', function test() {
    const store = mockStore({
      searchPage: Immutable.fromJS({
        keyword: 'hello world',
      }),
      prefs: Immutable.fromJS({
        searchPage: {
          recordType: 'concept',
          vocabulary: {
            concept: 'material',
          },
        },
      }),
      user: Immutable.fromJS({
        perms: {
          concept: {
            data: 'CRUDL',
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

    shallowRenderer.render(<ConnectedSearchPage history={history} />, context);

    const result = shallowRenderer.getRenderOutput();

    result.props.onSearch();

    pushedLocation.should.deep.equal({
      pathname: '/list/concept/material',
      search: '?kw=hello%20world',
    });
  });

  it('should connect onClearButtonClick to clearSearchPage action creator', function test() {
    const store = mockStore({
      searchPage: Immutable.fromJS({
        keyword: 'hello world',
      }),
      prefs: Immutable.fromJS({
        searchPage: {
          recordType: 'concept',
          vocabulary: {
            concept: 'material',
          },
        },
      }),
      user: Immutable.fromJS({
        perms: {
          concept: {
            data: 'CRUDL',
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

    result.props.onClearButtonClick();

    const action = store.getActions()[0];

    action.should.have.property('type', CLEAR_SEARCH_PAGE);
  });
});
