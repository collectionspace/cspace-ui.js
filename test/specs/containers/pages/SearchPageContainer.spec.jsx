import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createRenderer } from 'react-test-renderer/shallow';
import Immutable from 'immutable';
import mockHistory from '../../../helpers/mockHistory';
import SearchPage from '../../../../src/components/pages/SearchPage';
import { ConnectedSearchPage } from '../../../../src/containers/pages/SearchPageContainer';

import {
  ADD_OPTION_LISTS,
  CLEAR_SEARCH_PAGE,
  SET_SEARCH_PAGE_ADVANCED,
  SET_SEARCH_PAGE_KEYWORD,
  SET_SEARCH_PAGE_RECORD_TYPE,
  SET_SEARCH_PAGE_VOCABULARY,
} from '../../../../src/constants/actionCodes';
import { findWithType } from 'react-shallow-testutils';

chai.should();

const mockStore = configureMockStore([thunk]);

describe('SearchPageContainer', () => {
  it('should set props on SearchPage', () => {
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
      <ConnectedSearchPage store={store} />, context,
    );

    const result = shallowRenderer.getRenderOutput();
    const searchPage = findWithType(result, SearchPage);

    searchPage.should.not.be.null;
    searchPage.props.should.have.property('keywordValue', 'foo');
    searchPage.props.should.have.property('recordTypeValue', 'person');
    searchPage.props.should.have.property('vocabularyValue', 'local');
    searchPage.props.should.have.property('getAuthorityVocabCsid').that.is.a('function');
    searchPage.props.should.have.property('onAdvancedSearchConditionCommit').that.is.a('function');
    searchPage.props.should.have.property('onClearButtonClick').that.is.a('function');
    searchPage.props.should.have.property('onKeywordCommit').that.is.a('function');
    searchPage.props.should.have.property('onRecordTypeCommit').that.is.a('function');
    searchPage.props.should.have.property('onVocabularyCommit').that.is.a('function');
    searchPage.props.should.have.property('initiateSearch').that.is.a('function');
  });

  it('should connect getAuthorityVocabCsid to getAuthorityVocabCsid selector', () => {
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

    shallowRenderer.render(<ConnectedSearchPage store={store} />, context);

    const result = shallowRenderer.getRenderOutput();
    const searchPage = findWithType(result, SearchPage);

    searchPage.props.getAuthorityVocabCsid('concept', 'material').should.equal('1234');
  });

  it('should connect buildRecordFieldOptionLists to buildRecordFieldOptionLists action creator', () => {
    const store = mockStore({
      optionList: Immutable.Map(),
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

    shallowRenderer.render(<ConnectedSearchPage store={store} />, context);

    const result = shallowRenderer.getRenderOutput();
    const searchPage = findWithType(result, SearchPage);

    searchPage.props.buildRecordFieldOptionLists({
      recordTypes: {
        collectionobject: {
          fields: {},
        },
      },
    }, 'collectionobject');

    const action = store.getActions()[0];

    action.should.deep.equal({
      type: ADD_OPTION_LISTS,
      payload: {
        _field_collectionobject: [],
        _fieldgroup_collectionobject: [],
      },
    });
  });

  it('should connect onAdvancedSearchConditionCommit to setSearchPageAdvanced action creator', () => {
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

    shallowRenderer.render(<ConnectedSearchPage store={store} />, context);

    const result = shallowRenderer.getRenderOutput();
    const searchPage = findWithType(result, SearchPage);

    const condition = Immutable.fromJS({
      op: 'and',
      value: [],
    });

    searchPage.props.onAdvancedSearchConditionCommit(condition);

    const action = store.getActions()[0];

    action.should.have.property('type', SET_SEARCH_PAGE_ADVANCED);
    action.should.have.deep.property('payload', condition);
  });

  it('should connect onKeywordCommit to setSearchPageKeyword action creator', () => {
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

    shallowRenderer.render(<ConnectedSearchPage store={store} />, context);

    const result = shallowRenderer.getRenderOutput();
    const searchPage = findWithType(result, SearchPage);

    searchPage.props.onKeywordCommit('new keyword');

    const action = store.getActions()[0];

    action.should.have.property('type', SET_SEARCH_PAGE_KEYWORD);
    action.should.have.deep.property('payload', 'new keyword');
  });

  it('should connect onRecordTypeCommit to setSearchPageRecordType action creator', () => {
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

    shallowRenderer.render(<ConnectedSearchPage store={store} />, context);

    const result = shallowRenderer.getRenderOutput();
    const searchPage = findWithType(result, SearchPage);

    searchPage.props.onRecordTypeCommit('person');

    const action = store.getActions()[0];

    action.should.have.property('type', SET_SEARCH_PAGE_RECORD_TYPE);
    action.should.have.deep.property('payload', 'person');
  });

  it('should connect onVocabularyCommit to setSearchPageVocabulary action creator', () => {
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

    shallowRenderer.render(<ConnectedSearchPage store={store} />, context);

    const result = shallowRenderer.getRenderOutput();
    const searchPage = findWithType(result, SearchPage);

    searchPage.props.onVocabularyCommit('ulan');

    const action = store.getActions()[0];

    action.should.have.property('type', SET_SEARCH_PAGE_VOCABULARY);
    action.should.have.deep.property('payload', 'ulan');
  });

  it('should connect initiateSearch to initiateSearch action creator', () => {
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

    shallowRenderer.render(<ConnectedSearchPage store={store} history={history} />, context);

    const result = shallowRenderer.getRenderOutput();
    const searchPage = findWithType(result, SearchPage);

    searchPage.props.initiateSearch({}, history.push);

    pushedLocation.should.deep.equal({
      pathname: '/list/concept/material',
      search: '?kw=hello%20world',
      state: {
        originSearchPage: {
          searchDescriptor: {
            recordType: 'concept',
            vocabulary: 'material',
            searchQuery: {
              as: undefined,
              kw: 'hello world',
            },
          },
        },
      },
    });
  });

  it('should connect onClearButtonClick to clearSearchPage action creator', () => {
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

    shallowRenderer.render(<ConnectedSearchPage store={store} />, context);

    const result = shallowRenderer.getRenderOutput();
    const searchPage = findWithType(result, SearchPage);

    searchPage.props.onClearButtonClick();

    const action = store.getActions()[0];

    action.should.have.property('type', CLEAR_SEARCH_PAGE);
  });
});
