import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';

import {
  SET_SEARCH_PAGE_ADVANCED,
  SET_SEARCH_PAGE_KEYWORD,
} from '../../../src/actions/searchPage';

import {
  SET_SEARCH_PAGE_RECORD_TYPE,
} from '../../../src/actions/prefs';

import reducer, {
  getAdvanced,
  getKeyword,
} from '../../../src/reducers/searchPage';

const expect = chai.expect;

chai.use(chaiImmutable);
chai.should();

describe('search page reducer', function suite() {
  it('should have an empty immutable initial state', function test() {
    reducer(undefined, {}).should.equal(Immutable.Map({}));
  });

  it('should handle SET_SEARCH_PAGE_ADVANCED', function test() {
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

  it('should handle SET_SEARCH_PAGE_KEYWORD', function test() {
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

  it('should delete advanced search condition on SET_SEARCH_PAGE_RECORD_TYPE', function test() {
    const state = reducer(Immutable.Map({
      advanced: Immutable.Map(),
      keyword: 'foo',
    }), {
      type: SET_SEARCH_PAGE_RECORD_TYPE,
      payload: 'group',
    });

    state.should.equal(Immutable.Map({
      keyword: 'foo',
    }));

    expect(getAdvanced(state)).to.equal(undefined);
  });
});
