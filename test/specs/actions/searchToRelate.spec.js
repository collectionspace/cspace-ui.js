import {
  SET_SEARCH_TO_RELATE_KEYWORD,
  SET_SEARCH_TO_RELATE_ADVANCED,
  SET_SEARCH_TO_RELATE_RECORD_TYPE,
  SET_SEARCH_TO_RELATE_VOCABULARY,
} from '../../../src/constants/actionCodes';

import {
  setSearchToRelateKeyword,
  setSearchToRelateAdvanced,
  setSearchToRelateRecordType,
  setSearchToRelateVocabulary,
} from '../../../src/actions/searchToRelate';

chai.should();

describe('search to relate action creator', function suite() {
  describe('setSearchToRelateKeyword', function actionSuite() {
    it('should create a SET_SEARCH_TO_RELATE_KEYWORD action', function test() {
      const value = 'keyword';

      setSearchToRelateKeyword(value).should.deep.equal({
        type: SET_SEARCH_TO_RELATE_KEYWORD,
        payload: value,
      });
    });
  });

  describe('setSearchToRelateAdvanced', function actionSuite() {
    it('should create a SET_SEARCH_TO_RELATE_ADVANCED action', function test() {
      const condition = {
        op: 'eq',
        path: 'path',
        value: 'value',
      };

      setSearchToRelateAdvanced(condition).should.deep.equal({
        type: SET_SEARCH_TO_RELATE_ADVANCED,
        payload: condition,
      });
    });
  });

  describe('setSearchToRelateRecordType', function actionSuite() {
    it('should create a SET_SEARCH_TO_RELATE_RECORD_TYPE action', function test() {
      const recordType = 'collectionobject';

      setSearchToRelateRecordType(recordType).should.deep.equal({
        type: SET_SEARCH_TO_RELATE_RECORD_TYPE,
        payload: recordType,
      });
    });
  });

  describe('setSearchToRelateVocabulary', function actionSuite() {
    it('should create a SET_SEARCH_TO_RELATE_VOCABULARY action', function test() {
      const vocabulary = 'local';

      setSearchToRelateVocabulary(vocabulary).should.deep.equal({
        type: SET_SEARCH_TO_RELATE_VOCABULARY,
        payload: vocabulary,
      });
    });
  });
});
