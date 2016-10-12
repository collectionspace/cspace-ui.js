import chai from 'chai';
import Immutable from 'immutable';

import {
  ADD_FIELD_INSTANCE,
  CREATE_NEW_RECORD,
  DELETE_FIELD_VALUE,
  MOVE_FIELD_VALUE,
  SET_FIELD_VALUE,
  RECORD_READ_FULFILLED,
  RECORD_SAVE_FULFILLED,
} from '../../../../src/actions/record';

import reducer, {
  get,
  getNew,
} from '../../../../src/reducers/record/data';

const expect = chai.expect;

chai.should();

describe('record data reducer', function suite() {
  it('should have empty initial state', function test() {
    const state = reducer(undefined, {});

    state.should.deep.equal({});

    expect(get(state, '1234')).to.equal(undefined);
    expect(getNew(state)).to.equal(undefined);
  });

  it('should handle ADD_FIELD_INSTANCE', function test() {
    const csid = '1234';

    let data;
    let state;

    // Non-existent csid

    state = reducer({}, {
      type: ADD_FIELD_INSTANCE,
      meta: {
        csid,
        path: ['foo', 'bar'],
      },
    });

    state.should.deep.equal({});

    expect(get(state, csid)).to.equal(undefined);

    // Single value

    data = {
      foo: {
        bar: 'a',
      },
    };

    state = reducer({
      [csid]: Immutable.fromJS(data),
    }, {
      type: ADD_FIELD_INSTANCE,
      meta: {
        csid,
        path: ['foo', 'bar'],
      },
    });

    get(state, csid).toJS().should.deep.equal({
      foo: {
        bar: ['a', undefined],
      },
    });

    // Array value

    data = {
      foo: {
        bar: ['a', 'b'],
      },
    };

    state = reducer({
      [csid]: Immutable.fromJS(data),
    }, {
      type: ADD_FIELD_INSTANCE,
      meta: {
        csid,
        path: ['foo', 'bar'],
      },
    });

    get(state, csid).toJS().should.deep.equal({
      foo: {
        bar: ['a', 'b', undefined],
      },
    });
  });

  it('should handle CREATE_NEW_RECORD', function test() {
    let state;

    // No existing new record data

    state = reducer({}, {
      type: CREATE_NEW_RECORD,
      meta: {
        serviceConfig: {
          name: 'groups',
          parts: {},
        },
      },
    });

    getNew(state).toJS().should.deep.equal({
      document: {
        '@name': 'groups',
      },
    });

    // Existing new record data

    state = reducer(state, {
      type: CREATE_NEW_RECORD,
      meta: {
        serviceConfig: {
          name: 'collectionobjects',
          parts: {},
        },
      },
    });

    getNew(state).toJS().should.deep.equal({
      document: {
        '@name': 'collectionobjects',
      },
    });
  });

  it('should handle DELETE_FIELD_VALUE', function test() {
    const csid = '1234';

    let data;
    let state;

    // Non-existent csid

    state = reducer({}, {
      type: DELETE_FIELD_VALUE,
      meta: {
        csid,
        path: ['foo', 'bar'],
      },
    });

    state.should.deep.equal({});

    expect(get(state, csid)).to.equal(undefined);

    // Single value

    data = {
      foo: {
        bar: 'a',
      },
    };

    state = reducer({
      [csid]: Immutable.fromJS(data),
    }, {
      type: DELETE_FIELD_VALUE,
      meta: {
        csid,
        path: ['foo', 'bar'],
      },
    });

    get(state, csid).toJS().should.deep.equal({
      foo: {},
    });

    // Array value

    data = {
      foo: {
        bar: ['a', 'b'],
      },
    };

    state = reducer({
      [csid]: Immutable.fromJS(data),
    }, {
      type: DELETE_FIELD_VALUE,
      meta: {
        csid,
        path: ['foo', 'bar', '0'],
      },
    });

    get(state, csid).toJS().should.deep.equal({
      foo: {
        bar: ['b'],
      },
    });
  });

  it('should handle MOVE_FIELD_VALUE', function test() {
    const csid = '1234';

    let data;
    let state;

    // Non-existent csid

    state = reducer({}, {
      type: MOVE_FIELD_VALUE,
      meta: {
        csid,
        path: ['foo', 'bar', '1'],
        newPosition: '0',
      },
    });

    state.should.deep.equal({});

    expect(get(state, csid)).to.equal(undefined);

    // Single value

    data = {
      foo: {
        bar: 'a',
      },
    };

    state = reducer({
      [csid]: Immutable.fromJS(data),
    }, {
      type: MOVE_FIELD_VALUE,
      meta: {
        csid,
        path: ['foo', 'bar', '1'],
        newPosition: '0',
      },
    });

    get(state, csid).toJS().should.deep.equal({
      foo: {
        bar: 'a',
      },
    });

    // Array value

    data = {
      foo: {
        bar: ['a', 'b', 'c'],
      },
    };

    state = reducer({
      [csid]: Immutable.fromJS(data),
    }, {
      type: MOVE_FIELD_VALUE,
      meta: {
        csid,
        path: ['foo', 'bar', '1'],
        newPosition: 0,
      },
    });

    get(state, csid).toJS().should.deep.equal({
      foo: {
        bar: ['b', 'a', 'c'],
      },
    });

    // String newPosition

    data = {
      foo: {
        bar: ['a', 'b', 'c'],
      },
    };

    state = reducer({
      [csid]: Immutable.fromJS(data),
    }, {
      type: MOVE_FIELD_VALUE,
      meta: {
        csid,
        path: ['foo', 'bar', '1'],
        newPosition: '0',
      },
    });

    get(state, csid).toJS().should.deep.equal({
      foo: {
        bar: ['b', 'a', 'c'],
      },
    });
  });

  it('should handle SET_FIELD_VALUE', function test() {
    const csid = '1234';

    let data;
    let state;

    // Non-existent csid

    state = reducer({}, {
      type: SET_FIELD_VALUE,
      payload: 'd',
      meta: {
        csid,
        path: ['foo', 'bar', '1'],
      },
    });

    state.should.deep.equal({});

    expect(get(state, csid)).to.equal(undefined);

    // Set single value

    data = {
      foo: {
        bar: 'a',
      },
    };

    state = reducer({
      [csid]: Immutable.fromJS(data),
    }, {
      type: SET_FIELD_VALUE,
      payload: 'b',
      meta: {
        csid,
        path: ['foo', 'bar'],
      },
    });

    get(state, csid).toJS().should.deep.equal({
      foo: {
        bar: 'b',
      },
    });

    // Promote single value to array

    data = {
      foo: {
        bar: 'a',
      },
    };

    state = reducer({
      [csid]: Immutable.fromJS(data),
    }, {
      type: SET_FIELD_VALUE,
      payload: 'b',
      meta: {
        csid,
        path: ['foo', 'bar', '1'],
      },
    });

    get(state, csid).toJS().should.deep.equal({
      foo: {
        bar: ['a', 'b'],
      },
    });
  });

  it('should handle RECORD_READ_FULFILLED', function test() {
    const csid = '1234';

    const data = {
      document: {
        '@name': 'groups',
      },
    };

    let state;

    // No existing record data

    state = reducer({}, {
      type: RECORD_READ_FULFILLED,
      payload: {
        data,
      },
      meta: {
        csid,
      },
    });

    get(state, csid).toJS().should.deep.equal(data);

    // Existing record data

    state = reducer({
      [csid]: {
        foo: 1,
      },
    }, {
      type: RECORD_READ_FULFILLED,
      payload: {
        data,
      },
      meta: {
        csid,
      },
    });

    get(state, csid).toJS().should.deep.equal(data);
  });

  it('should handle RECORD_SAVE_FULFILLED', function test() {
    const csid = '1234';

    const data = {
      document: {
        '@name': 'groups',
      },
    };

    let state;

    // No existing record data

    state = reducer({}, {
      type: RECORD_SAVE_FULFILLED,
      payload: {
        data,
      },
      meta: {
        csid,
      },
    });

    get(state, csid).toJS().should.deep.equal(data);

    // Existing record data

    state = reducer({
      [csid]: {
        foo: 1,
      },
    }, {
      type: RECORD_SAVE_FULFILLED,
      payload: {
        data,
      },
      meta: {
        csid,
      },
    });

    get(state, csid).toJS().should.deep.equal(data);

    // New record

    state = reducer({
      '': Immutable.fromJS(data),
    }, {
      type: RECORD_SAVE_FULFILLED,
      payload: {
        data,
        status: 201,
        headers: {
          location: '/groups/5678',
        },
      },
      meta: {
        csid: '',
      },
    });

    get(state, '5678').toJS().should.deep.equal(data);
  });
});
