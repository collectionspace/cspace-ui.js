import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';

import {
  CLEAR_SEARCH_PAGE,
  SET_SEARCH_PAGE_ADVANCED,
  SET_SEARCH_PAGE_KEYWORD,
  SET_SEARCH_PAGE_RECORD_TYPE,
} from '../../../src/constants/actionCodes';

import reducer, {
  getAdvanced,
  getKeyword,
} from '../../../src/reducers/searchPage';

const { expect } = chai;

chai.use(chaiImmutable);
chai.should();

describe('search page reducer', () => {
  it('should have an empty immutable initial state', () => {
    reducer(undefined, {}).should.equal(Immutable.Map({}));
  });

  it('should handle SET_SEARCH_PAGE_ADVANCED', () => {
    const advancedSearchCondition = Immutable.Map({
      op: 'eq',
      path: '',
      value: '',
    });

    const state = reducer(Immutable.Map(), {
      type: SET_SEARCH_PAGE_ADVANCED,
      payload: advancedSearchCondition,
    });

    state.should.equal(Immutable.fromJS({
      advanced: advancedSearchCondition,
    }));

    getAdvanced(state).should.equal(advancedSearchCondition);
  });

  it('should handle SET_SEARCH_PAGE_KEYWORD', () => {
    const keyword = 'some stuff';

    const state = reducer(Immutable.Map(), {
      type: SET_SEARCH_PAGE_KEYWORD,
      payload: keyword,
    });

    state.should.equal(Immutable.fromJS({
      keyword,
    }));

    getKeyword(state).should.equal(keyword);
  });

  context('on SET_SEARCH_PAGE_RECORD_TYPE', () => {
    it('should delete advanced search condition if the record type has changed', () => {
      const state = reducer(Immutable.Map({
        advanced: Immutable.Map(),
        keyword: 'foo',
      }), {
        type: SET_SEARCH_PAGE_RECORD_TYPE,
        payload: 'group',
        meta: {
          prevRecordType: 'loanin',
        },
      });

      state.should.equal(Immutable.Map({
        keyword: 'foo',
      }));

      expect(getAdvanced(state)).to.equal(undefined);
    });
  });

  it('should handle CLEAR_SEARCH_PAGE', () => {
    const state = reducer(Immutable.Map({
      advanced: Immutable.Map(),
      keyword: 'foo',
    }), {
      type: CLEAR_SEARCH_PAGE,
    });

    state.should.equal(Immutable.Map());
  });
});
