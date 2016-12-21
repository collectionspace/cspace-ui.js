import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Immutable from 'immutable';

import {
  SET_KEYWORD_SEARCH_KEYWORD,
  SET_KEYWORD_SEARCH_RECORD_TYPE,
  SET_KEYWORD_SEARCH_VOCABULARY,
  setKeywordSearchKeyword,
  setKeywordSearchRecordType,
  setKeywordSearchVocabulary,
  initiateSearch,
} from '../../../src/actions/keywordSearch';

chai.should();

const mockStore = configureMockStore([thunk]);

describe('keyword search action creator', function suite() {
  describe('setKeywordSearchKeyword', function actionSuite() {
    it('should create a SET_KEYWORD_SEARCH_KEYWORD action', function test() {
      const value = 'search keywords';

      setKeywordSearchKeyword(value).should.deep.equal({
        type: SET_KEYWORD_SEARCH_KEYWORD,
        payload: value,
      });
    });
  });

  describe('setKeywordSearchRecordType', function actionSuite() {
    it('should create a SET_KEYWORD_SEARCH_RECORD_TYPE action', function test() {
      const value = 'loanin';

      setKeywordSearchRecordType(value).should.deep.equal({
        type: SET_KEYWORD_SEARCH_RECORD_TYPE,
        payload: value,
      });
    });
  });

  describe('setKeywordSearchVocabulary', function actionSuite() {
    it('should create a SET_KEYWORD_SEARCH_VOCABULARY action', function test() {
      const value = 'ulan';

      setKeywordSearchVocabulary(value).should.deep.equal({
        type: SET_KEYWORD_SEARCH_VOCABULARY,
        payload: value,
      });
    });
  });

  describe('initiateSearch', function actionSuite() {
    it('should push a search location onto history for authority records', function test() {
      const store = mockStore({
        keywordSearch: Immutable.fromJS({
          keyword: 'hello',
          recordType: 'person',
          vocabulary: 'ulan',
        }),
      });

      let pushedLocation = null;

      const push = (location) => {
        pushedLocation = location;
      };

      store.dispatch(initiateSearch(push));

      pushedLocation.pathname.should.equal('/search/person/ulan');
      pushedLocation.query.should.deep.equal({ kw: 'hello' });
    });

    it('should push a search location onto history for procedure records', function test() {
      const store = mockStore({
        keywordSearch: Immutable.fromJS({
          keyword: 'hello',
          recordType: 'loanin',
        }),
      });

      let pushedLocation = null;

      const push = (location) => {
        pushedLocation = location;
      };

      store.dispatch(initiateSearch(push));

      pushedLocation.pathname.should.equal('/search/loanin');
      pushedLocation.query.should.deep.equal({ kw: 'hello' });
    });
  });
});
