import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';

import {
  COLLAPSE_PANEL,
  PREFS_LOADED,
  SET_ADMIN_TAB,
  SET_FORM,
  SET_RECORD_BROWSER_NAV_BAR_ITEMS,
  SET_SEARCH_PAGE_RECORD_TYPE,
  SET_SEARCH_PAGE_VOCABULARY,
  SET_QUICK_SEARCH_RECORD_TYPE,
  SET_QUICK_SEARCH_VOCABULARY,
  SET_SEARCH_PANEL_PAGE_SIZE,
  SET_SEARCH_RESULT_PAGE_PAGE_SIZE,
  SET_SEARCH_TO_RELATE_PAGE_SIZE,
  SET_UPLOAD_TYPE,
} from '../../../src/actions/prefs';

import {
  SET_SEARCH_PAGE_ADVANCED,
} from '../../../src/actions/searchPage';

import {
  SET_SEARCH_TO_RELATE_ADVANCED,
} from '../../../src/actions/searchToRelate';

import reducer, {
  getAdminTab,
  getAdvancedSearchBooleanOp,
  getForm,
  getRecordBrowserNavBarItems,
  getSearchPageRecordType,
  getSearchPageVocabulary,
  getQuickSearchRecordType,
  getQuickSearchVocabulary,
  getSearchPanelPageSize,
  getSearchResultPagePageSize,
  getSearchToRelatePageSize,
  getUploadType,
  isPanelCollapsed,
} from '../../../src/reducers/prefs';

chai.use(chaiImmutable);
chai.should();

describe('prefs reducer', function suite() {
  it('should have empty immutable initial state', function test() {
    reducer(undefined, {}).should.equal(Immutable.Map({}));
  });

  it('should handle COLLAPSE_PANEL', function test() {
    const recordType = 'collectionobject';
    const panelName = 'desc';
    const collapsed = true;

    const state = reducer(undefined, {
      type: COLLAPSE_PANEL,
      payload: collapsed,
      meta: {
        recordType,
        name: panelName,
      },
    });

    state.should.deep.equal(Immutable.fromJS({
      panels: {
        collectionobject: {
          desc: {
            collapsed,
          },
        },
      },
    }));

    isPanelCollapsed(state, recordType, panelName).should.equal(collapsed);
  });

  it('should handle SET_ADMIN_TAB', function test() {
    const tabName = 'account';

    const state = reducer(undefined, {
      type: SET_ADMIN_TAB,
      payload: tabName,
    });

    state.should.deep.equal(Immutable.fromJS({
      adminTab: tabName,
    }));

    getAdminTab(state).should.equal(tabName);
  });

  it('should handle SET_FORM', function test() {
    const recordType = 'collectionobject';
    const formName = 'default';

    const state = reducer(undefined, {
      type: SET_FORM,
      payload: formName,
      meta: {
        recordType,
      },
    });

    state.should.deep.equal(Immutable.fromJS({
      form: {
        collectionobject: formName,
      },
    }));

    getForm(state, recordType).should.equal(formName);
  });

  it('should handle SET_RECORD_BROWSER_NAV_BAR_ITEMS', function test() {
    const recordType = 'collectionobject';
    const navBarItems = Immutable.List(['group', 'media']);

    const state = reducer(undefined, {
      type: SET_RECORD_BROWSER_NAV_BAR_ITEMS,
      payload: navBarItems,
      meta: {
        recordType,
      },
    });

    state.should.deep.equal(Immutable.fromJS({
      recordBrowserNavBarItems: {
        collectionobject: navBarItems,
      },
    }));

    getRecordBrowserNavBarItems(state, recordType).should.equal(navBarItems);
  });

  it('should handle SET_SEARCH_PAGE_ADVANCED', function test() {
    const op = 'and';

    const state = reducer(Immutable.Map(), {
      type: SET_SEARCH_PAGE_ADVANCED,
      payload: Immutable.fromJS({
        op,
      }),
    });

    state.should.equal(Immutable.fromJS({
      advancedSearchBooleanOp: op,
    }));

    getAdvancedSearchBooleanOp(state).should.equal(op);
  });

  it('should handle SET_SEARCH_TO_RELATE_ADVANCED', function test() {
    const op = 'and';

    const state = reducer(Immutable.Map(), {
      type: SET_SEARCH_TO_RELATE_ADVANCED,
      payload: Immutable.fromJS({
        op,
      }),
    });

    state.should.equal(Immutable.fromJS({
      advancedSearchBooleanOp: op,
    }));

    getAdvancedSearchBooleanOp(state).should.equal(op);
  });

  it('should handle SET_SEARCH_PAGE_RECORD_TYPE', function test() {
    const recordType = 'loanin';

    const state = reducer(Immutable.Map(), {
      type: SET_SEARCH_PAGE_RECORD_TYPE,
      payload: recordType,
    });

    state.should.deep.equal(Immutable.fromJS({
      searchPage: {
        recordType,
      },
    }));

    getSearchPageRecordType(state).should.equal(recordType);
  });

  it('should handle SET_SEARCH_PAGE_VOCABULARY', function test() {
    const recordType = 'person';
    const vocabulary = 'ulan';

    const state = reducer(Immutable.fromJS({
      searchPage: {
        recordType,
      },
    }), {
      type: SET_SEARCH_PAGE_VOCABULARY,
      payload: vocabulary,
    });

    state.should.deep.equal(Immutable.fromJS({
      searchPage: {
        recordType,
        vocabulary: {
          [recordType]: vocabulary,
        },
      },
    }));

    getSearchPageVocabulary(state, recordType).should.equal(vocabulary);
  });

  it('should handle SET_QUICK_SEARCH_RECORD_TYPE', function test() {
    const recordType = 'loanin';

    const state = reducer(Immutable.Map(), {
      type: SET_QUICK_SEARCH_RECORD_TYPE,
      payload: recordType,
    });

    state.should.deep.equal(Immutable.fromJS({
      quickSearch: {
        recordType,
      },
    }));

    getQuickSearchRecordType(state).should.equal(recordType);
  });

  it('should handle SET_QUICK_SEARCH_VOCABULARY', function test() {
    const recordType = 'person';
    const vocabulary = 'ulan';

    const state = reducer(Immutable.fromJS({
      quickSearch: {
        recordType,
      },
    }), {
      type: SET_QUICK_SEARCH_VOCABULARY,
      payload: vocabulary,
    });

    state.should.deep.equal(Immutable.fromJS({
      quickSearch: {
        recordType,
        vocabulary: {
          [recordType]: vocabulary,
        },
      },
    }));

    getQuickSearchVocabulary(state, recordType).should.equal(vocabulary);
  });

  it('should handle SET_SEARCH_RESULT_PAGE_PAGE_SIZE', function test() {
    const pageSize = 14;

    const state = reducer(undefined, {
      type: SET_SEARCH_RESULT_PAGE_PAGE_SIZE,
      payload: pageSize,
    });

    state.should.deep.equal(Immutable.fromJS({
      searchResultPagePageSize: pageSize,
    }));

    getSearchResultPagePageSize(state).should.equal(pageSize);
  });

  it('should handle SET_SEARCH_PANEL_PAGE_SIZE', function test() {
    const recordType = 'collectionobject';
    const panelName = 'desc';
    const pageSize = 35;

    const state = reducer(undefined, {
      type: SET_SEARCH_PANEL_PAGE_SIZE,
      payload: pageSize,
      meta: {
        recordType,
        name: panelName,
      },
    });

    state.should.deep.equal(Immutable.fromJS({
      panels: {
        collectionobject: {
          desc: {
            pageSize,
          },
        },
      },
    }));

    getSearchPanelPageSize(state, recordType, panelName).should.equal(pageSize);
  });

  it('should handle SET_SEARCH_TO_RELATE_PAGE_SIZE', function test() {
    const pageSize = 19;

    const state = reducer(undefined, {
      type: SET_SEARCH_TO_RELATE_PAGE_SIZE,
      payload: pageSize,
    });

    state.should.deep.equal(Immutable.fromJS({
      searchToRelatePageSize: pageSize,
    }));

    getSearchToRelatePageSize(state).should.equal(pageSize);
  });

  it('should handle SET_UPLOAD_TYPE', function test() {
    const uploadType = 'file';

    const state = reducer(undefined, {
      type: SET_UPLOAD_TYPE,
      payload: uploadType,
    });

    state.should.deep.equal(Immutable.fromJS({
      uploadType,
    }));

    getUploadType(state).should.equal(uploadType);
  });

  it('should handle PREFS_LOADED', function test() {
    const prefs = Immutable.fromJS({
      panels: {
        collectionobject: {
          desc: {
            collapsed: true,
          },
        },
      },
    });

    const state = reducer(undefined, {
      type: PREFS_LOADED,
      payload: prefs,
    });

    state.should.deep.equal(prefs);
  });
});
