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
  SET_SEARCH_TO_SELECT_PAGE_SIZE,
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
  setSearchToSelectPageSize,
  toggleRecordSidebar,
} from '../../../src/actions/prefs';

chai.use(chaiImmutable);
chai.should();

const mockStore = configureMockStore([thunk]);

describe('prefs action creator', () => {
  describe('collapsePanel', () => {
    it('should create a COLLAPSE_PANEL action', () => {
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

  describe('setAdminTab', () => {
    it('should create a SET_ADMIN_TAB action', () => {
      const tabName = 'vocabulary';

      setAdminTab(tabName).should.deep.equal({
        type: SET_ADMIN_TAB,
        payload: tabName,
      });
    });
  });

  describe('setForm', () => {
    it('should create a SET_FORM action', () => {
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

  describe('setUploadType', () => {
    it('should create a SET_UPLOAD_TYPE action', () => {
      const uploadType = 'file';

      setUploadType(uploadType).should.deep.equal({
        type: SET_UPLOAD_TYPE,
        payload: uploadType,
      });
    });
  });

  describe('setQuickSearchRecordType', () => {
    it('should create a SET_QUICK_SEARCH_RECORD_TYPE action', () => {
      const value = 'loanin';

      setQuickSearchRecordType(value).should.deep.equal({
        type: SET_QUICK_SEARCH_RECORD_TYPE,
        payload: value,
      });
    });
  });

  describe('setQuickSearchVocabulary', () => {
    it('should create a SET_QUICK_SEARCH_VOCABULARY action', () => {
      const value = 'ulan';

      setQuickSearchVocabulary(value).should.deep.equal({
        type: SET_QUICK_SEARCH_VOCABULARY,
        payload: value,
      });
    });
  });

  describe('setRecordBrowserNavBarItems', () => {
    it('should create a SET_RECORD_BROWSER_NAV_BAR_ITEMS action', () => {
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

  describe('setSearchPageRecordType', () => {
    it('should create a SET_SEARCH_PAGE_RECORD_TYPE action', () => {
      const value = 'loanin';

      const store = mockStore({
        prefs: Immutable.Map(),
      });

      store.dispatch(setSearchPageRecordType(value));

      const actions = store.getActions();

      actions[0].should.deep.equal({
        type: SET_SEARCH_PAGE_RECORD_TYPE,
        payload: value,
      });
    });

    it('should not dispatch any action of the record type has not changed', () => {
      const prevValue = 'foo';

      const store = mockStore({
        prefs: Immutable.fromJS({
          searchPage: {
            recordType: prevValue,
          },
        }),
      });

      store.dispatch(setSearchPageRecordType(prevValue));

      const actions = store.getActions();

      actions.should.have.lengthOf(0);
    });
  });

  describe('setSearchPageVocabulary', () => {
    it('should create a SET_SEARCH_PAGE_VOCABULARY action', () => {
      const value = 'ulan';

      setSearchPageVocabulary(value).should.deep.equal({
        type: SET_SEARCH_PAGE_VOCABULARY,
        payload: value,
      });
    });
  });

  describe('setSearchResultPagePageSize', () => {
    it('should create a SET_SEARCH_RESULT_PAGE_PAGE_SIZE action', () => {
      const pageSize = 45;

      setSearchResultPagePageSize(pageSize).should.deep.equal({
        type: SET_SEARCH_RESULT_PAGE_PAGE_SIZE,
        payload: pageSize,
      });
    });
  });

  describe('setSearchToSelectPagePageSize', () => {
    it('should create a SET_SEARCH_TO_SELECT_PAGE_SIZE action', () => {
      const pageSize = 23;

      setSearchToSelectPageSize(pageSize).should.deep.equal({
        type: SET_SEARCH_TO_SELECT_PAGE_SIZE,
        payload: pageSize,
      });
    });
  });

  describe('setSearchPanelPageSize', () => {
    it('should create a SET_SEARCH_PANEL_PAGE_SIZE action', () => {
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

  describe('toggleRecordSidebar', () => {
    it('should create a TOGGLE_RECORD_SIDEBAR action', () => {
      toggleRecordSidebar().should.deep.equal({
        type: TOGGLE_RECORD_SIDEBAR,
      });
    });
  });

  describe('loadPrefs', () => {
    it('should dispatch a PREFS_LOADED action', () => {
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

    it('should return null prefs if serialized prefs are not valid JSON', () => {
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

    it('should return null prefs if no serialized prefs exist in local storage', () => {
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

    it('should return null prefs if there is no username', () => {
      const store = mockStore();

      store.dispatch(loadPrefs());

      const actions = store.getActions();

      actions.should.have.lengthOf(1);

      actions[0].should.deep.equal({
        type: PREFS_LOADED,
        payload: null,
      });
    });

    it('should merge user prefs into default prefs, if present', () => {
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

    it('should return default prefs if present and no serialized prefs exist in local storage', () => {
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

  describe('savePrefs', () => {
    it('should save prefs to local storage', () => {
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

    it('should not save prefs if there is no username', () => {
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

    it('should not affect prefs for other users', () => {
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

    it('should overwrite existing prefs that are not valid JSON', () => {
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
