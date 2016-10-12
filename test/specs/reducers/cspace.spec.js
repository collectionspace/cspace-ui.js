import chai from 'chai';

import { CSPACE_CONFIGURED } from '../../../src/actions/cspace';
import reducer, { getConfig } from '../../../src/reducers/cspace';

chai.should();

describe('cspace reducer', function suite() {
  it('should have an empty initial state', function test() {
    reducer(undefined, {}).should.deep.equal({});
  });

  it('should handle CSPACE_CONFIGURED', function test() {
    let state = reducer({}, {
      type: CSPACE_CONFIGURED,
      payload: {
        foo: 'abc',
        bar: 'def',
      },
    });

    state.should.deep.equal({
      foo: 'abc',
      bar: 'def',
    });

    getConfig(state).should.deep.equal({
      foo: 'abc',
      bar: 'def',
    });

    state = reducer({
      foo: 'abc',
      bar: 'def',
    }, {
      type: CSPACE_CONFIGURED,
      payload: {
        baz: '123',
      },
    });

    state.should.deep.equal({
      baz: '123',
    });

    getConfig(state).should.deep.equal({
      baz: '123',
    });
  });
});
