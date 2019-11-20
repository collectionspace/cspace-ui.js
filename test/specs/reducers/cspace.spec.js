import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';
import reducer, { getConfig, getSystemInfo } from '../../../src/reducers/cspace';

import {
  CSPACE_CONFIGURED,
  SYSTEM_INFO_READ_FULFILLED,
  SYSTEM_INFO_READ_REJECTED,
} from '../../../src/constants/actionCodes';

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

  it('should handle SYSTEM_INFO_READ_FULFILLED', function test() {
    const state = reducer(undefined, {
      type: SYSTEM_INFO_READ_FULFILLED,
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

  it('should handle SYSTEM_INFO_READ_REJECTED', function test() {
    const state = reducer(undefined, {
      type: SYSTEM_INFO_READ_REJECTED,
      payload: {
        data: 'Error',
        message: 'Network Error',
      },
    });

    state.should.equal(Immutable.fromJS({
      systemInfo: {
        error: {
          data: 'Error',
          message: 'Network Error',
        },
      },
    }));

    getSystemInfo(state).should.equal(Immutable.fromJS({
      error: {
        data: 'Error',
        message: 'Network Error',
      },
    }));
  });
});
