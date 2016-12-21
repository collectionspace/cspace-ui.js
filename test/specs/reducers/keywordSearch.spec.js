import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';

import {
  SET_KEYWORD_SEARCH_KEYWORD,
  SET_KEYWORD_SEARCH_RECORD_TYPE,
  SET_KEYWORD_SEARCH_VOCABULARY,
} from '../../../src/actions/keywordSearch';

import reducer, {
  getKeyword,
  getRecordType,
  getVocabulary,
} from '../../../src/reducers/keywordSearch';

chai.use(chaiImmutable);
chai.should();

describe('keyword search reducer', function suite() {
  it('should have an empty immutable initial state', function test() {
    reducer(undefined, {}).should.equal(Immutable.Map({}));
  });

  it('should handle SET_KEYWORD_SEARCH_KEYWORD', function test() {
    const keyword = 'some stuff';

    const state = reducer(Immutable.Map(), {
      type: SET_KEYWORD_SEARCH_KEYWORD,
      payload: keyword,
    });

    state.should.deep.equal(Immutable.fromJS({
      keyword,
    }));

    getKeyword(state).should.equal(keyword);
  });

  it('should handle SET_KEYWORD_SEARCH_RECORD_TYPE', function test() {
    const recordType = 'loanin';

    const state = reducer(Immutable.Map(), {
      type: SET_KEYWORD_SEARCH_RECORD_TYPE,
      payload: recordType,
    });

    state.should.deep.equal(Immutable.fromJS({
      recordType,
    }));

    getRecordType(state).should.equal(recordType);
  });

  it('should delete vocabulary on SET_KEYWORD_SEARCH_RECORD_TYPE', function test() {
    const recordType = 'loanin';

    const state = reducer(Immutable.Map({
      keyword: 'hello',
      recordType: 'person',
      vocabulary: 'local',
    }), {
      type: SET_KEYWORD_SEARCH_RECORD_TYPE,
      payload: recordType,
    });

    state.should.deep.equal(Immutable.fromJS({
      recordType,
      keyword: 'hello',
    }));

    getRecordType(state).should.equal(recordType);
  });

  it('should handle SET_KEYWORD_SEARCH_VOCABULARY', function test() {
    const vocabulary = 'ulan';

    const state = reducer(Immutable.Map(), {
      type: SET_KEYWORD_SEARCH_VOCABULARY,
      payload: vocabulary,
    });

    state.should.deep.equal(Immutable.fromJS({
      vocabulary,
    }));

    getVocabulary(state).should.equal(vocabulary);
  });
});
