import {
  RECORD_READ_STARTED,
  RECORD_READ_FULFILLED,
  RECORD_READ_REJECTED,
} from '../../../../src/actions/record';

import reducer, {
  get,
} from '../../../../src/reducers/record/readsPending';

const expect = chai.expect;

chai.should();

describe('record reads pending reducer', function suite() {
  it('should have empty initial state', function test() {
    const state = reducer(undefined, {});

    state.should.deep.equal({});

    expect(get(state, '')).to.equal(undefined);
  });

  it('should handle RECORD_READ_STARTED', function test() {
    const csid = '1234';

    const state = reducer({}, {
      type: RECORD_READ_STARTED,
      meta: {
        csid,
      },
    });

    state.should.deep.equal({
      [csid]: true,
    });

    get(state, csid).should.equal(true);
  });

  it('should handle RECORD_READ_FULFILLED', function test() {
    const csid = '1234';

    const state = reducer({
      [csid]: true,
    }, {
      type: RECORD_READ_FULFILLED,
      meta: {
        csid,
      },
    });

    state.should.deep.equal({});

    expect(get(state, csid)).to.equal(undefined);
  });

  it('should handle RECORD_READ_REJECTED', function test() {
    const csid = '1234';

    const state = reducer({
      [csid]: true,
    }, {
      type: RECORD_READ_REJECTED,
      meta: {
        csid,
      },
    });

    state.should.deep.equal({});

    expect(get(state, csid)).to.equal(undefined);
  });
});
