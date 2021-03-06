import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';
import { OP_AND, OP_EQ } from '../../../src/constants/searchOperators';
import { clearAdvancedSearchConditionValues } from '../../../src/helpers/searchHelpers';

import {
  PREFS_LOADED,
  COLLAPSE_PANEL,
  SET_ADMIN_TAB,
  SET_TOOL_TAB,
  SET_RECORD_BROWSER_NAV_BAR_ITEMS,
  SET_SEARCH_PAGE_RECORD_TYPE,
  SET_SEARCH_PAGE_VOCABULARY,
  SET_QUICK_SEARCH_RECORD_TYPE,
  SET_QUICK_SEARCH_VOCABULARY,
  SET_SEARCH_PANEL_PAGE_SIZE,
  SET_SEARCH_RESULT_PAGE_PAGE_SIZE,
  SET_SEARCH_TO_SELECT_PAGE_SIZE,
  SET_FORM,
  SET_UPLOAD_TYPE,
  TOGGLE_RECORD_SIDEBAR,
  TOGGLE_SEARCH_RESULT_SIDEBAR,
  SET_STICKY_FIELDS,
  SET_SEARCH_PAGE_ADVANCED,
  SET_SEARCH_TO_SELECT_ADVANCED,
} from '../../../src/constants/actionCodes';

import reducer, {
  getAdminTab,
  getAdvancedSearchBooleanOp,
  getForm,
  getRecordBrowserNavBarItems,
  getSearchCondition,
  getSearchPageRecordType,
  getSearchPageVocabulary,
  getQuickSearchRecordType,
  getQuickSearchVocabulary,
  getSearchPanelPageSize,
  getSearchResultPagePageSize,
  getSearchToSelectPageSize,
  getStickyFields,
  getToolTab,
  getUploadType,
  isPanelCollapsed,
  isRecordSidebarOpen,
  isSearchResultSidebarOpen,
} from '../../../src/reducers/prefs';

chai.use(chaiImmutable);
chai.should();

describe('prefs reducer', () => {
  it('should have empty immutable initial state', () => {
    reducer(undefined, {}).should.equal(Immutable.Map({}));
  });

  it('should handle COLLAPSE_PANEL', () => {
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

  it('should handle SET_ADMIN_TAB', () => {
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

  it('should handle SET_TOOL_TAB', () => {
    const tabName = 'report';

    const state = reducer(undefined, {
      type: SET_TOOL_TAB,
      payload: tabName,
    });

    state.should.deep.equal(Immutable.fromJS({
      toolTab: tabName,
    }));

    getToolTab(state).should.equal(tabName);
  });

  it('should handle SET_FORM', () => {
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

  it('should handle SET_RECORD_BROWSER_NAV_BAR_ITEMS', () => {
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

  it('should handle SET_SEARCH_PAGE_ADVANCED', () => {
    const op = OP_AND;
    const recordType = 'conditioncheck';

    const condition = Immutable.fromJS({
      op,
      value: [
        {
          op: OP_EQ,
          path: 'ns2:conditionchecks_common/foo',
          value: 'some value',
        },
      ],
    });

    let state;

    state = reducer(Immutable.Map(), {
      type: SET_SEARCH_PAGE_ADVANCED,
      payload: condition,
      meta: {
        recordType,
      },
    });

    state.should.equal(Immutable.fromJS({
      advancedSearchBooleanOp: op,
      searchCond: {
        [recordType]: clearAdvancedSearchConditionValues(condition),
      },
    }));

    getAdvancedSearchBooleanOp(state).should.equal(op);

    getSearchCondition(state, recordType).should
      .equal(clearAdvancedSearchConditionValues(condition));

    // Should do nothing if recordType is not supplied.

    state = reducer(Immutable.Map(), {
      type: SET_SEARCH_PAGE_ADVANCED,
      payload: condition,
      meta: {
        recordType: undefined,
      },
    });

    state.should.equal(Immutable.Map());
  });

  it('should handle SET_SEARCH_TO_SELECT_ADVANCED', () => {
    const op = OP_AND;
    const recordType = 'intake';

    const condition = Immutable.fromJS({
      op,
      value: [
        {
          op: OP_EQ,
          path: 'ns2:intakes_common/bar',
          value: 'search it',
        },
      ],
    });

    let state;

    state = reducer(Immutable.Map(), {
      type: SET_SEARCH_TO_SELECT_ADVANCED,
      payload: condition,
      meta: {
        recordType,
      },
    });

    state.should.equal(Immutable.fromJS({
      advancedSearchBooleanOp: op,
      searchCond: {
        [recordType]: clearAdvancedSearchConditionValues(condition),
      },
    }));

    getAdvancedSearchBooleanOp(state).should.equal(op);

    getSearchCondition(state, recordType).should
      .equal(clearAdvancedSearchConditionValues(condition));

    // Should do nothing if recordType is not supplied.

    state = reducer(Immutable.Map(), {
      type: SET_SEARCH_TO_SELECT_ADVANCED,
      payload: condition,
      meta: {
        recordType: undefined,
      },
    });

    state.should.equal(Immutable.Map());
  });

  it('should handle SET_SEARCH_PAGE_RECORD_TYPE', () => {
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

  it('should handle SET_SEARCH_PAGE_VOCABULARY', () => {
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

  it('should handle SET_QUICK_SEARCH_RECORD_TYPE', () => {
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

  it('should handle SET_QUICK_SEARCH_VOCABULARY', () => {
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

  it('should handle SET_SEARCH_RESULT_PAGE_PAGE_SIZE', () => {
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

  it('should handle SET_SEARCH_PANEL_PAGE_SIZE', () => {
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

  it('should handle SET_SEARCH_TO_SELECT_PAGE_SIZE', () => {
    const pageSize = 19;

    const state = reducer(undefined, {
      type: SET_SEARCH_TO_SELECT_PAGE_SIZE,
      payload: pageSize,
    });

    state.should.deep.equal(Immutable.fromJS({
      searchToSelectPageSize: pageSize,
    }));

    getSearchToSelectPageSize(state).should.equal(pageSize);
  });

  it('should handle SET_UPLOAD_TYPE', () => {
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

  it('should handle PREFS_LOADED', () => {
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

  it('should handle TOGGLE_RECORD_SIDEBAR', () => {
    let state;

    state = reducer(undefined, {
      type: TOGGLE_RECORD_SIDEBAR,
    });

    state.should.equal(Immutable.fromJS({
      recordSidebarOpen: false,
    }));

    state = reducer(state, {
      type: TOGGLE_RECORD_SIDEBAR,
    });

    state.should.equal(Immutable.fromJS({
      recordSidebarOpen: true,
    }));

    state = reducer(state, {
      type: TOGGLE_RECORD_SIDEBAR,
    });

    state.should.equal(Immutable.fromJS({
      recordSidebarOpen: false,
    }));

    isRecordSidebarOpen(state).should.equal(false);
  });

  it('should handle TOGGLE_SEARCH_RESULT_SIDEBAR', () => {
    let state;

    state = reducer(undefined, {
      type: TOGGLE_SEARCH_RESULT_SIDEBAR,
    });

    state.should.equal(Immutable.fromJS({
      searchResultSidebarOpen: false,
    }));

    state = reducer(state, {
      type: TOGGLE_SEARCH_RESULT_SIDEBAR,
    });

    state.should.equal(Immutable.fromJS({
      searchResultSidebarOpen: true,
    }));

    state = reducer(state, {
      type: TOGGLE_SEARCH_RESULT_SIDEBAR,
    });

    state.should.equal(Immutable.fromJS({
      searchResultSidebarOpen: false,
    }));

    isSearchResultSidebarOpen(state).should.equal(false);
  });

  it('should handle SET_STICKY_FIELDS', () => {
    const recordType = 'media';

    const stickyFields = Immutable.fromJS({
      foo: 'bar',
    });

    const state = reducer(undefined, {
      type: SET_STICKY_FIELDS,
      payload: stickyFields,
      meta: {
        recordTypeConfig: {
          name: recordType,
        },
      },
    });

    state.should.deep.equal(Immutable.fromJS({
      stickyFields: {
        [recordType]: stickyFields,
      },
    }));

    getStickyFields(state).should.equal(Immutable.fromJS({
      [recordType]: stickyFields,
    }));

    getStickyFields(state, recordType).should.equal(stickyFields);
  });
});
