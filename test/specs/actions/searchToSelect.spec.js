import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Immutable from 'immutable';

import {
  SET_SEARCH_TO_SELECT_KEYWORD,
  SET_SEARCH_TO_SELECT_ADVANCED,
  SET_SEARCH_TO_SELECT_RECORD_TYPE,
  SET_SEARCH_TO_SELECT_VOCABULARY,
} from '../../../src/constants/actionCodes';

import {
  setSearchToSelectKeyword,
  setSearchToSelectAdvanced,
  setSearchToSelectRecordType,
  setSearchToSelectVocabulary,
} from '../../../src/actions/searchToSelect';

chai.should();

const mockStore = configureMockStore([thunk]);

describe('search to select action creator', function suite() {
  describe('setSearchToSelectKeyword', function actionSuite() {
    it('should create a SET_SEARCH_TO_SELECT_KEYWORD action', function test() {
      const value = 'keyword';

      setSearchToSelectKeyword(value).should.deep.equal({
        type: SET_SEARCH_TO_SELECT_KEYWORD,
        payload: value,
      });
    });
  });

  describe('setSearchToSelectAdvanced', function actionSuite() {
    it('should create a SET_SEARCH_TO_SELECT_ADVANCED action', function test() {
      const store = mockStore({
        searchToSelect: Immutable.Map({
          recordType: 'intake',
        }),
      });

      const condition = {
        op: 'eq',
        path: 'path',
        value: 'value',
      };

      store.dispatch(setSearchToSelectAdvanced(condition));

      const actions = store.getActions();

      actions[0].should.deep.equal({
        type: SET_SEARCH_TO_SELECT_ADVANCED,
        payload: condition,
        meta: {
          recordType: 'intake',
        },
      });
    });
  });

  describe('setSearchToSelectRecordType', function actionSuite() {
    it('should create a SET_SEARCH_TO_SELECT_RECORD_TYPE action', function test() {
      const recordType = 'collectionobject';

      setSearchToSelectRecordType(recordType).should.deep.equal({
        type: SET_SEARCH_TO_SELECT_RECORD_TYPE,
        payload: recordType,
      });
    });
  });

  describe('setSearchToSelectVocabulary', function actionSuite() {
    it('should create a SET_SEARCH_TO_SELECT_VOCABULARY action', function test() {
      const vocabulary = 'local';

      setSearchToSelectVocabulary(vocabulary).should.deep.equal({
        type: SET_SEARCH_TO_SELECT_VOCABULARY,
        payload: vocabulary,
      });
    });
  });
});
