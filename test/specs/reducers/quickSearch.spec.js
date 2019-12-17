import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';

import {
  SET_QUICK_SEARCH_KEYWORD,
} from '../../../src/constants/actionCodes';

import reducer, {
  getKeyword,
} from '../../../src/reducers/quickSearch';

chai.use(chaiImmutable);
chai.should();

describe('quick search reducer', () => {
  it('should have an empty immutable initial state', () => {
    reducer(undefined, {}).should.equal(Immutable.Map({}));
  });

  it('should handle SET_QUICK_SEARCH_KEYWORD', () => {
    const keyword = 'some stuff';

    const state = reducer(Immutable.Map(), {
      type: SET_QUICK_SEARCH_KEYWORD,
      payload: keyword,
    });

    state.should.deep.equal(Immutable.fromJS({
      keyword,
    }));

    getKeyword(state).should.equal(keyword);
  });
});
