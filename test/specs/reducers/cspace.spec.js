import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';
import { CSPACE_CONFIGURED, READ_SYSTEM_INFO_FULFILLED } from '../../../src/actions/cspace';
import reducer, { getConfig, getSystemInfo } from '../../../src/reducers/cspace';

chai.use(chaiImmutable);
chai.should();

describe('cspace reducer', function suite() {
  it('should have an empty initial state', function test() {
    reducer(undefined, {}).should.equal(Immutable.Map());
  });

  it('should handle CSPACE_CONFIGURED', function test() {
    let state = reducer(undefined, {
      type: CSPACE_CONFIGURED,
      payload: {
        foo: 'abc',
        bar: 'def',
      },
    });

    state.should.equal(Immutable.fromJS({
      config: {
        foo: 'abc',
        bar: 'def',
      },
    }));

    getConfig(state).should.equal(Immutable.Map({
      foo: 'abc',
      bar: 'def',
    }));

    state = reducer(Immutable.fromJS({
      config: {
        foo: 'abc',
        bar: 'def',
      },
    }), {
      type: CSPACE_CONFIGURED,
      payload: {
        baz: '123',
      },
    });

    state.should.equal(Immutable.fromJS({
      config: {
        baz: '123',
      },
    }));

    getConfig(state).should.equal(Immutable.Map({
      baz: '123',
    }));
  });

  it('should handle READ_SYSTEM_INFO_FULFILLED', function test() {
    const state = reducer(undefined, {
      type: READ_SYSTEM_INFO_FULFILLED,
      payload: {
        data: {
          'ns2:system_info_common': {
            version: {
              major: '5',
              minor: '1',
            },
          },
        },
      },
    });

    state.should.equal(Immutable.fromJS({
      systemInfo: {
        'ns2:system_info_common': {
          version: {
            major: '5',
            minor: '1',
          },
        },
      },
    }));

    getSystemInfo(state).should.equal(Immutable.fromJS({
      'ns2:system_info_common': {
        version: {
          major: '5',
          minor: '1',
        },
      },
    }));
  });
});
