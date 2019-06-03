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

describe('search to relate action creator', function suite() {
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
      const condition = {
        op: 'eq',
        path: 'path',
        value: 'value',
      };

      setSearchToSelectAdvanced(condition).should.deep.equal({
        type: SET_SEARCH_TO_SELECT_ADVANCED,
        payload: condition,
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
