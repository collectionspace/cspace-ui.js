import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';

import {
  CLEAR_RELATION_STATE,
  RELATION_FIND_FULFILLED,
  SUBJECT_RELATIONS_UPDATED,
} from '../../../src/constants/actionCodes';

import reducer, {
  getFindResult,
} from '../../../src/reducers/relation';

const expect = chai.expect;

chai.use(chaiImmutable);
chai.should();

describe('relation reducer', function suite() {
  it('should have an empty immutable initial state', function test() {
    reducer(undefined, {}).should.equal(Immutable.Map());
  });

  it('should handle CLEAR_RELATION_STATE', function test() {
    const subject = {
      csid: '1234',
    };

    const object = {
      csid: '5678',
    };

    const predicate = 'affects';

    const state = reducer(Immutable.fromJS({
      find: {
        [subject.csid]: {
          [object.csid]: {
            [predicate]: {
              result: {},
            },
          },
        },
      },
    }), {
      type: CLEAR_RELATION_STATE,
    });

    state.should.equal(Immutable.Map());

    expect(getFindResult(state, subject, object, predicate)).to.equal(undefined);
  });

  it('should handle RELATION_FIND_FULFILLED', function test() {
    const subject = {
      csid: '1234',
    };

    const object = {
      csid: '5678',
    };

    const predicate = 'affects';

    const data = {
      'rel:relations-common-list': {
        totalItems: '1',
      },
    };

    const state = reducer(undefined, {
      type: RELATION_FIND_FULFILLED,
      payload: {
        data,
      },
      meta: {
        subject,
        object,
        predicate,
      },
    });

    state.should.equal(Immutable.fromJS({
      find: {
        [subject.csid]: {
          [object.csid]: {
            [predicate]: {
              result: data,
            },
          },
        },
      },
    }));

    getFindResult(state, subject, object, predicate).should
      .equal(Immutable.fromJS(data));
  });

  it('should handle SUBJECT_RELATIONS_UPDATED', function test() {
    const subject = {
      csid: '1234',
    };

    const initialState = Immutable.fromJS({
      find: {
        [subject.csid]: {},
      },
    });

    const state = reducer(initialState, {
      type: SUBJECT_RELATIONS_UPDATED,
      meta: {
        subject,
      },
    });

    state.should.equal(Immutable.fromJS({
      find: {},
    }));
  });
});
