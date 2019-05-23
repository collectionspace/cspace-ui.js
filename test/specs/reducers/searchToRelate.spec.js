import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';

import {
  CLEAR_SEARCH_TO_RELATE,
  SET_SEARCH_TO_RELATE_ADVANCED,
  SET_SEARCH_TO_RELATE_KEYWORD,
  SET_SEARCH_TO_RELATE_RECORD_TYPE,
  SET_SEARCH_TO_RELATE_VOCABULARY,
} from '../../../src/constants/actionCodes';

import reducer, {
  getAdvanced,
  getKeyword,
  getRecordType,
  getVocabulary,
} from '../../../src/reducers/searchToRelate';

chai.use(chaiImmutable);
chai.should();

describe('search to relate reducer', function suite() {
  it('should have empty immutable initial state', function test() {
    reducer(undefined, {}).should.equal(Immutable.Map({}));
  });

  it('should handle SET_SEARCH_TO_RELATE_RECORD_TYPE', function test() {
    const recordType = 'loanin';

    const state = reducer(Immutable.Map(), {
      type: SET_SEARCH_TO_RELATE_RECORD_TYPE,
      payload: recordType,
    });

    state.should.deep.equal(Immutable.fromJS({
      recordType,
    }));

    getRecordType(state).should.equal(recordType);
  });

  it('should handle SET_SEARCH_TO_RELATE_VOCABULARY', function test() {
    const recordType = 'person';
    const vocabulary = 'local';

    const state = reducer(Immutable.Map({
      recordType,
    }), {
      type: SET_SEARCH_TO_RELATE_VOCABULARY,
      payload: vocabulary,
    });

    state.should.deep.equal(Immutable.fromJS({
      recordType,
      vocabulary: {
        [recordType]: vocabulary,
      },
    }));

    getVocabulary(state, recordType).should.equal(vocabulary);
  });

  it('should handle SET_SEARCH_TO_RELATE_ADVANCED', function test() {
    const advancedSearchCondition = Immutable.Map({
      op: 'eq',
      path: '',
      value: '',
    });

    const state = reducer(Immutable.Map(), {
      type: SET_SEARCH_TO_RELATE_ADVANCED,
      payload: advancedSearchCondition,
    });

    state.should.equal(Immutable.fromJS({
      advanced: advancedSearchCondition,
    }));

    getAdvanced(state).should.equal(advancedSearchCondition);
  });

  it('should handle SET_SEARCH_TO_RELATE_KEYWORD', function test() {
    const keyword = 'some stuff';

    const state = reducer(Immutable.Map(), {
      type: SET_SEARCH_TO_RELATE_KEYWORD,
      payload: keyword,
    });

    state.should.equal(Immutable.fromJS({
      keyword,
    }));

    getKeyword(state).should.equal(keyword);
  });

  it('should handle CLEAR_SEARCH_TO_RELATE', function test() {
    const state = reducer(Immutable.fromJS({
      recordType: 'person',
      vocabulary: {
        person: 'ulan',
      },
      keyword: 'abc',
      advanced: Immutable.Map({
        op: 'eq',
        path: '',
        value: '',
      }),
    }), {
      type: CLEAR_SEARCH_TO_RELATE,
    });

    state.should.equal(Immutable.fromJS({
      recordType: 'person',
      vocabulary: {
        person: 'ulan',
      },
    }));
  });
});
