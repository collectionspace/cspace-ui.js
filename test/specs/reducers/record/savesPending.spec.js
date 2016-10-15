import {
  RECORD_SAVE_STARTED,
  RECORD_SAVE_FULFILLED,
  RECORD_SAVE_REJECTED,
} from '../../../../src/actions/record';

import reducer, {
  get,
} from '../../../../src/reducers/record/savesPending';

const expect = chai.expect;

chai.should();

describe('record saves pending reducer', function suite() {
  it('should have empty initial state', function test() {
    const state = reducer(undefined, {});

    state.should.deep.equal({});

    expect(get(state, '')).to.equal(undefined);
  });

  it('should handle RECORD_SAVE_STARTED', function test() {
    const csid = '1234';

    const state = reducer({}, {
      type: RECORD_SAVE_STARTED,
      meta: {
        csid,
      },
    });

    state.should.deep.equal({
      [csid]: true,
    });

    get(state, csid).should.equal(true);
  });

  it('should handle RECORD_SAVE_FULFILLED', function test() {
    const csid = '1234';

    const state = reducer({
      [csid]: true,
    }, {
      type: RECORD_SAVE_FULFILLED,
      meta: {
        csid,
      },
    });

    state.should.deep.equal({});

    expect(get(state, csid)).to.equal(undefined);
  });

  it('should handle RECORD_SAVE_REJECTED', function test() {
    const csid = '1234';

    const state = reducer({
      [csid]: true,
    }, {
      type: RECORD_SAVE_REJECTED,
      meta: {
        csid,
      },
    });

    state.should.deep.equal({});

    expect(get(state, csid)).to.equal(undefined);
  });
});
