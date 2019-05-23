/* global window */

import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  PREFS_LOADED,
  COLLAPSE_PANEL,
  SET_ADMIN_TAB,
  SET_RECORD_BROWSER_NAV_BAR_ITEMS,
  SET_SEARCH_PAGE_RECORD_TYPE,
  SET_SEARCH_PAGE_VOCABULARY,
  SET_QUICK_SEARCH_RECORD_TYPE,
  SET_QUICK_SEARCH_VOCABULARY,
  SET_SEARCH_PANEL_PAGE_SIZE,
  SET_SEARCH_RESULT_PAGE_PAGE_SIZE,
  SET_SEARCH_TO_RELATE_PAGE_SIZE,
  SET_FORM,
  SET_UPLOAD_TYPE,
  TOGGLE_RECORD_SIDEBAR,
} from '../../../src/constants/actionCodes';

import {
  storageKey,
  collapsePanel,
  loadPrefs,
  savePrefs,
  setAdminTab,
  setForm,
  setUploadType,
  setQuickSearchRecordType,
  setQuickSearchVocabulary,
  setRecordBrowserNavBarItems,
  setSearchPageRecordType,
  setSearchPageVocabulary,
  setSearchPanelPageSize,
  setSearchResultPagePageSize,
  setSearchToRelatePageSize,
  toggleRecordSidebar,
} from '../../../src/actions/prefs';

chai.use(chaiImmutable);
chai.should();

const mockStore = configureMockStore([thunk]);

describe('prefs action creator', function suite() {
  describe('collapsePanel', function actionSuite() {
    it('should create a COLLAPSE_PANEL action', function test() {
      const recordType = 'collectionobject';
      const name = 'desc';
      const collapsed = true;

      collapsePanel(recordType, name, collapsed).should.deep.equal({
        type: COLLAPSE_PANEL,
        payload: collapsed,
        meta: {
          recordType,
          name,
        },
      });
    });
  });

  describe('setAdminTab', function actionSuite() {
    it('should create a SET_ADMIN_TAB action', function test() {
      const tabName = 'vocabulary';

      setAdminTab(tabName).should.deep.equal({
        type: SET_ADMIN_TAB,
        payload: tabName,
      });
    });
  });

  describe('setForm', function actionSuite() {
    it('should create a SET_FORM action', function test() {
      const recordType = 'collectionobject';
      const formName = 'default';

      setForm(recordType, formName).should.deep.equal({
        type: SET_FORM,
        payload: formName,
        meta: {
          recordType,
        },
      });
    });
  });

  describe('setUploadType', function actionSuite() {
    it('should create a SET_UPLOAD_TYPE action', function test() {
      const uploadType = 'file';

      setUploadType(uploadType).should.deep.equal({
        type: SET_UPLOAD_TYPE,
        payload: uploadType,
      });
    });
  });

  describe('setQuickSearchRecordType', function actionSuite() {
    it('should create a SET_QUICK_SEARCH_RECORD_TYPE action', function test() {
      const value = 'loanin';

      setQuickSearchRecordType(value).should.deep.equal({
        type: SET_QUICK_SEARCH_RECORD_TYPE,
        payload: value,
      });
    });
  });

  describe('setQuickSearchVocabulary', function actionSuite() {
    it('should create a SET_QUICK_SEARCH_VOCABULARY action', function test() {
      const value = 'ulan';

      setQuickSearchVocabulary(value).should.deep.equal({
        type: SET_QUICK_SEARCH_VOCABULARY,
        payload: value,
      });
    });
  });

  describe('setRecordBrowserNavBarItems', function actionSuite() {
    it('should create a SET_RECORD_BROWSER_NAV_BAR_ITEMS action', function test() {
      const recordType = 'collectionobject';
      const navBarItems = ['group', 'media'];

      setRecordBrowserNavBarItems(recordType, navBarItems).should.deep.equal({
        type: SET_RECORD_BROWSER_NAV_BAR_ITEMS,
        payload: navBarItems,
        meta: {
          recordType,
        },
      });
    });
  });

  describe('setSearchPageRecordType', function actionSuite() {
    it('should create a SET_SEARCH_PAGE_RECORD_TYPE action', function test() {
      const value = 'loanin';

      setSearchPageRecordType(value).should.deep.equal({
        type: SET_SEARCH_PAGE_RECORD_TYPE,
        payload: value,
      });
    });
  });

  describe('setSearchPageVocabulary', function actionSuite() {
    it('should create a SET_SEARCH_PAGE_VOCABULARY action', function test() {
      const value = 'ulan';

      setSearchPageVocabulary(value).should.deep.equal({
        type: SET_SEARCH_PAGE_VOCABULARY,
        payload: value,
      });
    });
  });

  describe('setSearchResultPagePageSize', function actionSuite() {
    it('should create a SET_SEARCH_RESULT_PAGE_PAGE_SIZE action', function test() {
      const pageSize = 45;

      setSearchResultPagePageSize(pageSize).should.deep.equal({
        type: SET_SEARCH_RESULT_PAGE_PAGE_SIZE,
        payload: pageSize,
      });
    });
  });

  describe('setSearchToRelatePagePageSize', function actionSuite() {
    it('should create a SET_SEARCH_TO_RELATE_PAGE_SIZE action', function test() {
      const pageSize = 23;

      setSearchToRelatePageSize(pageSize).should.deep.equal({
        type: SET_SEARCH_TO_RELATE_PAGE_SIZE,
        payload: pageSize,
      });
    });
  });

  describe('setSearchPanelPageSize', function actionSuite() {
    it('should create a SET_SEARCH_PANEL_PAGE_SIZE action', function test() {
      const recordType = 'collectionobject';
      const name = 'termsUsed';
      const pageSize = 21;

      setSearchPanelPageSize(recordType, name, pageSize).should.deep.equal({
        type: SET_SEARCH_PANEL_PAGE_SIZE,
        payload: pageSize,
        meta: {
          recordType,
          name,
        },
      });
    });
  });

  describe('toggleRecordSidebar', function actionSuite() {
    it('should create a TOGGLE_RECORD_SIDEBAR action', function test() {
      toggleRecordSidebar().should.deep.equal({
        type: TOGGLE_RECORD_SIDEBAR,
      });
    });
  });

  describe('loadPrefs', function actionSuite() {
    it('should dispatch a PREFS_LOADED action', function test() {
      const username = 'user@collectionspace.org';

      const prefs = {
        foo: {
          bar: true,
        },
        baz: 'a',
      };

      window.localStorage.setItem(storageKey, JSON.stringify({ [username]: prefs }));

      const store = mockStore();

      store.dispatch(loadPrefs(null, username));

      const actions = store.getActions();

      actions.should.have.lengthOf(1);

      actions[0].should.deep.equal({
        type: PREFS_LOADED,
        payload: Immutable.fromJS(prefs),
      });
    });

    it('should return null prefs if serialized prefs are not valid JSON', function test() {
      const username = 'user@collectionspace.org';

      window.localStorage.setItem(storageKey, '{invalid json!');

      const store = mockStore();

      store.dispatch(loadPrefs(null, username));

      const actions = store.getActions();

      actions.should.have.lengthOf(1);

      actions[0].should.deep.equal({
        type: PREFS_LOADED,
        payload: null,
      });
    });

    it('should return null prefs if no serialized prefs exist in local storage', function test() {
      const username = 'user@collectionspace.org';

      window.localStorage.removeItem(storageKey);

      const store = mockStore();

      store.dispatch(loadPrefs(null, username));

      const actions = store.getActions();

      actions.should.have.lengthOf(1);

      actions[0].should.deep.equal({
        type: PREFS_LOADED,
        payload: null,
      });
    });

    it('should return null prefs if there is no username', function test() {
      const store = mockStore();

      store.dispatch(loadPrefs());

      const actions = store.getActions();

      actions.should.have.lengthOf(1);

      actions[0].should.deep.equal({
        type: PREFS_LOADED,
        payload: null,
      });
    });

    it('should merge user prefs into default prefs, if present', function test() {
      const config = {
        defaultUserPrefs: {
          foo: {
            blat: 1,
          },
          baz: 'b',
        },
      };

      const username = 'user@collectionspace.org';

      const prefs = {
        foo: {
          bar: true,
        },
        baz: 'a',
      };

      window.localStorage.setItem(storageKey, JSON.stringify({ [username]: prefs }));

      const store = mockStore();

      store.dispatch(loadPrefs(config, username));

      const actions = store.getActions();

      actions.should.have.lengthOf(1);

      actions[0].type.should.equal(PREFS_LOADED);

      actions[0].payload.should.equal(Immutable.fromJS({
        foo: {
          bar: true,
          blat: 1,
        },
        baz: 'a',
      }));
    });

    it('should return default prefs if present and no serialized prefs exist in local storage', function test() {
      const config = {
        defaultUserPrefs: {
          foo: {
            blat: 1,
          },
          baz: 'b',
        },
      };

      const username = 'user@collectionspace.org';

      window.localStorage.removeItem(storageKey);

      const store = mockStore();

      store.dispatch(loadPrefs(config, username));

      const actions = store.getActions();

      actions.should.have.lengthOf(1);

      actions[0].type.should.equal(PREFS_LOADED);

      actions[0].payload.should.equal(Immutable.fromJS({
        foo: {
          blat: 1,
        },
        baz: 'b',
      }));
    });
  });

  describe('savePrefs', function actionSuite() {
    it('should save prefs to local storage', function test() {
      const username = 'user@collectionspace.org';

      const prefs = {
        foo: {
          bar: true,
        },
        baz: 'a',
      };

      const store = mockStore({
        prefs: Immutable.fromJS(prefs),
        user: Immutable.Map({
          username,
        }),
      });

      store.dispatch(savePrefs());

      const serializedPrefs = window.localStorage.getItem(storageKey);
      const revivedPrefs = JSON.parse(serializedPrefs);

      revivedPrefs[username].should.deep.equal(prefs);
    });

    it('should not save prefs if there is no username', function test() {
      const prevStoredPrefs = { foo: 'bar' };

      window.localStorage.setItem(storageKey, JSON.stringify(prevStoredPrefs));

      const prefs = {
        foo: {
          bar: true,
        },
        baz: 'a',
      };

      const store = mockStore({
        prefs: Immutable.fromJS(prefs),
        user: Immutable.Map(),
      });

      store.dispatch(savePrefs());

      const serializedPrefs = window.localStorage.getItem(storageKey);
      const revivedPrefs = JSON.parse(serializedPrefs);

      revivedPrefs.should.deep.equal(prevStoredPrefs);
    });

    it('should not affect prefs for other users', function test() {
      const username = 'user@collectionspace.org';

      const prefs = {
        foo: {
          bar: true,
        },
        baz: 'a',
      };

      const store = mockStore({
        prefs: Immutable.fromJS(prefs),
        user: Immutable.Map({
          username,
        }),
      });

      const otherUsername = 'otheruser';

      const otherPrefs = {
        xyz: 123,
      };

      window.localStorage.setItem(storageKey, JSON.stringify({ [otherUsername]: otherPrefs }));

      store.dispatch(savePrefs());

      const serializedPrefs = window.localStorage.getItem(storageKey);
      const revivedPrefs = JSON.parse(serializedPrefs);

      revivedPrefs[username].should.deep.equal(prefs);
      revivedPrefs[otherUsername].should.deep.equal(otherPrefs);
    });

    it('should overwrite existing prefs that are not valid JSON', function test() {
      const username = 'user@collectionspace.org';

      const prefs = {
        foo: {
          bar: true,
        },
        baz: 'a',
      };

      const store = mockStore({
        prefs: Immutable.fromJS(prefs),
        user: Immutable.Map({
          username,
        }),
      });

      window.localStorage.setItem(storageKey, '{foobar');

      store.dispatch(savePrefs());

      const serializedPrefs = window.localStorage.getItem(storageKey);
      const revivedPrefs = JSON.parse(serializedPrefs);

      revivedPrefs[username].should.deep.equal(prefs);
    });
  });
});
