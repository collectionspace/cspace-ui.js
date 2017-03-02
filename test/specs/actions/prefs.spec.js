/* global window */

import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  COLLAPSE_PANEL,
  PREFS_LOADED,
  SET_QUICK_SEARCH_RECORD_TYPE,
  SET_QUICK_SEARCH_VOCABULARY,
  SET_SEARCH_PAGE_SIZE,
  SET_SEARCH_PANEL_PAGE_SIZE,
  storageKey,
  collapsePanel,
  loadPrefs,
  savePrefs,
  setQuickSearchRecordType,
  setQuickSearchVocabulary,
  setSearchPageSize,
  setSearchPanelPageSize,
} from '../../../src/actions/prefs';

chai.use(chaiImmutable);
chai.should();

const mockStore = configureMockStore([thunk]);

describe('prefs action creator', function suite() {
  describe('collapsePanel', function actionSuite() {
    it('should create a COLLAPSE_PANEL action', function test() {
      const recordType = 'object';
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

  describe('setSearchPageSize', function actionSuite() {
    it('should create a SET_SEARCH_PAGE_SIZE action', function test() {
      const pageSize = 45;

      setSearchPageSize(pageSize).should.deep.equal({
        type: SET_SEARCH_PAGE_SIZE,
        payload: pageSize,
      });
    });
  });

  describe('setSearchPanelPageSize', function actionSuite() {
    it('should create a SET_SEARCH_PANEL_PAGE_SIZE action', function test() {
      const recordType = 'object';
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

  describe('loadPrefs', function actionSuite() {
    it('should create a PREFS_LOADED action', function test() {
      const prefs = {
        foo: {
          bar: true,
        },
        baz: 'a',
      };

      window.localStorage.setItem(storageKey, JSON.stringify(prefs));

      loadPrefs().should.deep.equal({
        type: PREFS_LOADED,
        payload: Immutable.fromJS(prefs),
      });
    });

    it('should return null prefs if serialized prefs are not valid JSON', function test() {
      window.localStorage.setItem(storageKey, 'not json!');

      loadPrefs().should.deep.equal({
        type: PREFS_LOADED,
        payload: null,
      });
    });

    it('should return null prefs if no serialized prefs exist in local storage', function test() {
      window.localStorage.removeItem(storageKey);

      loadPrefs().should.deep.equal({
        type: PREFS_LOADED,
        payload: null,
      });
    });
  });

  describe('savePrefs', function actionSuite() {
    it('should save prefs to local storage', function test() {
      const prefs = {
        foo: {
          bar: true,
        },
        baz: 'a',
      };

      const store = mockStore({
        prefs: Immutable.fromJS(prefs),
      });

      store.dispatch(savePrefs());

      const serializedPrefs = window.localStorage.getItem(storageKey);

      JSON.parse(serializedPrefs).should.deep.equal(prefs);
    });
  });
});
