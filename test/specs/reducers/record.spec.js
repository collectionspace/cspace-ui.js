import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';

import {
  ADD_FIELD_INSTANCE,
  CREATE_NEW_RECORD,
  DELETE_FIELD_VALUE,
  MOVE_FIELD_VALUE,
  SET_FIELD_VALUE,
  RECORD_READ_STARTED,
  RECORD_READ_FULFILLED,
  RECORD_READ_REJECTED,
  RECORD_SAVE_STARTED,
  RECORD_SAVE_FULFILLED,
  RECORD_SAVE_REJECTED,
  REVERT_RECORD,
  VALIDATION_FAILED,
  VALIDATION_PASSED,
} from '../../../src/actions/record';

import {
  SUBJECT_RELATIONS_UPDATED,
} from '../../../src/actions/relation';

import {
  CREATE_ID_FULFILLED,
} from '../../../src/actions/idGenerator';

import reducer, {
  getData,
  getNewData,
  getRelationUpdatedTimestamp,
  getValidationErrors,
  isModified,
  isReadPending,
  isSavePending,
} from '../../../src/reducers/record';

const expect = chai.expect;

chai.use(chaiImmutable);
chai.should();

describe('record reducer', function suite() {
  it('should have empty immutable initial state', function test() {
    const state = reducer(undefined, {});

    state.should.equal(Immutable.Map());

    expect(getData(state, '1234')).to.equal(undefined);
    expect(getNewData(state)).to.equal(undefined);
  });

  it('should handle ADD_FIELD_INSTANCE', function test() {
    const csid = '1234';

    let data;
    let state;

    // Non-existent csid

    state = reducer(undefined, {
      type: ADD_FIELD_INSTANCE,
      meta: {
        csid,
        path: ['foo', 'bar'],
        recordTypeConfig: {
          fields: {},
        },
      },
    });

    state.should.equal(Immutable.Map());

    expect(getData(state, csid)).to.equal(undefined);
    isModified(state, csid).should.equal(false);

    // Single value

    data = Immutable.fromJS({
      foo: {
        bar: 'a',
      },
    });

    state = reducer(Immutable.fromJS({
      [csid]: {
        data: {
          baseline: data,
          current: data,
        },
      },
    }), {
      type: ADD_FIELD_INSTANCE,
      meta: {
        csid,
        path: ['foo', 'bar'],
        recordTypeConfig: {
          fields: {
            foo: {
              bar: {},
            },
          },
        },
      },
    });

    getData(state, csid).should.equal(Immutable.fromJS({
      foo: {
        bar: ['a', undefined],
      },
    }));

    isModified(state, csid).should.equal(true);

    // Array value

    data = Immutable.fromJS({
      foo: {
        bar: ['a', 'b'],
      },
    });

    state = reducer(Immutable.fromJS({
      [csid]: {
        data: {
          baseline: data,
          current: data,
        },
      },
    }), {
      type: ADD_FIELD_INSTANCE,
      meta: {
        csid,
        path: ['foo', 'bar'],
        recordTypeConfig: {
          fields: {
            foo: {
              bar: {},
            },
          },
        },
      },
    });

    getData(state, csid).should.equal(Immutable.fromJS({
      foo: {
        bar: ['a', 'b', undefined],
      },
    }));

    isModified(state, csid).should.equal(true);
  });

  it('should handle CREATE_NEW_RECORD', function test() {
    let state;

    // No existing new record data

    state = reducer(undefined, {
      type: CREATE_NEW_RECORD,
      meta: {
        recordTypeConfig: {
          serviceConfig: {
            documentName: 'groups',
          },
          fields: {
            document: {},
          },
        },
      },
    });

    getNewData(state).should.equal(Immutable.fromJS({
      document: {
        '@name': 'groups',
      },
    }));

    isModified(state, '').should.equal(false);

    // Existing new record data

    state = reducer(state, {
      type: CREATE_NEW_RECORD,
      meta: {
        recordTypeConfig: {
          serviceConfig: {
            documentName: 'collectionobjects',
          },
          fields: {
            document: {},
          },
        },
      },
    });

    getNewData(state).should.equal(Immutable.fromJS({
      document: {
        '@name': 'collectionobjects',
      },
    }));

    isModified(state, '').should.equal(false);

    // Clone

    const cloneData = Immutable.fromJS({
      foo: {
        bar: 'baz',
      },
    });

    state = reducer(Immutable.fromJS({
      1234: {
        data: {
          current: cloneData,
        },
      },
    }), {
      type: CREATE_NEW_RECORD,
      meta: {
        recordTypeConfig: {},
        cloneCsid: '1234',
      },
    });

    getNewData(state).should.equal(cloneData);
  });

  it('should handle DELETE_FIELD_VALUE', function test() {
    const csid = '1234';

    let data;
    let state;

    // Non-existent csid

    state = reducer(undefined, {
      type: DELETE_FIELD_VALUE,
      meta: {
        csid,
        path: ['foo', 'bar'],
      },
    });

    state.should.equal(Immutable.Map());

    expect(getData(state, csid)).to.equal(undefined);
    isModified(state, csid).should.equal(false);

    // Single value

    data = Immutable.fromJS({
      foo: {
        bar: 'a',
      },
    });

    state = reducer(Immutable.fromJS({
      [csid]: {
        data: {
          baseline: data,
          current: data,
        },
      },
    }), {
      type: DELETE_FIELD_VALUE,
      meta: {
        csid,
        path: ['foo', 'bar'],
      },
    });

    getData(state, csid).should.equal(Immutable.fromJS({
      foo: {},
    }));

    isModified(state, csid).should.equal(true);

    // Array value

    data = Immutable.fromJS({
      foo: {
        bar: ['a', 'b'],
      },
    });

    state = reducer(Immutable.fromJS({
      [csid]: {
        data: {
          baseline: data,
          current: data,
        },
      },
    }), {
      type: DELETE_FIELD_VALUE,
      meta: {
        csid,
        path: ['foo', 'bar', '0'],
      },
    });

    getData(state, csid).should.equal(Immutable.fromJS({
      foo: {
        bar: ['b'],
      },
    }));

    isModified(state, csid).should.equal(true);
  });

  it('should handle MOVE_FIELD_VALUE', function test() {
    const csid = '1234';

    let data;
    let state;

    // Non-existent csid

    state = reducer(undefined, {
      type: MOVE_FIELD_VALUE,
      meta: {
        csid,
        path: ['foo', 'bar', '1'],
        newPosition: '0',
      },
    });

    state.should.equal(Immutable.Map());

    expect(getData(state, csid)).to.equal(undefined);
    isModified(state, csid).should.equal(false);

    // Single value

    data = Immutable.fromJS({
      foo: {
        bar: 'a',
      },
    });

    state = reducer(Immutable.fromJS({
      [csid]: {
        data: {
          baseline: data,
          current: data,
        },
      },
    }), {
      type: MOVE_FIELD_VALUE,
      meta: {
        csid,
        path: ['foo', 'bar', '1'],
        newPosition: '0',
      },
    });

    getData(state, csid).should.equal(Immutable.fromJS({
      foo: {
        bar: 'a',
      },
    }));

    isModified(state, csid).should.equal(false);

    // Array value

    data = Immutable.fromJS({
      foo: {
        bar: ['a', 'b', 'c'],
      },
    });

    state = reducer(Immutable.fromJS({
      [csid]: {
        data: {
          baseline: data,
          current: data,
        },
      },
    }), {
      type: MOVE_FIELD_VALUE,
      meta: {
        csid,
        path: ['foo', 'bar', '1'],
        newPosition: 0,
      },
    });

    getData(state, csid).should.equal(Immutable.fromJS({
      foo: {
        bar: ['b', 'a', 'c'],
      },
    }));

    isModified(state, csid).should.equal(true);

    // String newPosition

    data = Immutable.fromJS({
      foo: {
        bar: ['a', 'b', 'c'],
      },
    });

    state = reducer(Immutable.fromJS({
      [csid]: {
        data: {
          baseline: data,
          current: data,
        },
      },
    }), {
      type: MOVE_FIELD_VALUE,
      meta: {
        csid,
        path: ['foo', 'bar', '1'],
        newPosition: '0',
      },
    });

    getData(state, csid).should.equal(Immutable.fromJS({
      foo: {
        bar: ['b', 'a', 'c'],
      },
    }));

    isModified(state, csid).should.equal(true);
  });

  it('should handle SET_FIELD_VALUE', function test() {
    const csid = '1234';

    let data;
    let state;

    // Non-existent csid

    state = reducer(undefined, {
      type: SET_FIELD_VALUE,
      payload: 'd',
      meta: {
        csid,
        path: ['foo', 'bar', '1'],
      },
    });

    state.should.equal(Immutable.Map());

    expect(getData(state, csid)).to.equal(undefined);
    isModified(state, csid).should.equal(false);

    // Set single value

    data = Immutable.fromJS({
      foo: {
        bar: 'a',
      },
    });

    state = reducer(Immutable.fromJS({
      [csid]: {
        data: {
          baseline: data,
          current: data,
        },
      },
    }), {
      type: SET_FIELD_VALUE,
      payload: 'b',
      meta: {
        csid,
        path: ['foo', 'bar'],
      },
    });

    getData(state, csid).should.equal(Immutable.fromJS({
      foo: {
        bar: 'b',
      },
    }));

    isModified(state, csid).should.equal(true);

    // Promote single value to array

    data = Immutable.fromJS({
      foo: {
        bar: 'a',
      },
    });

    state = reducer(Immutable.fromJS({
      [csid]: {
        data: {
          baseline: data,
          current: data,
        },
      },
    }), {
      type: SET_FIELD_VALUE,
      payload: 'b',
      meta: {
        csid,
        path: ['foo', 'bar', '1'],
      },
    });

    getData(state, csid).should.equal(Immutable.fromJS({
      foo: {
        bar: ['a', 'b'],
      },
    }));

    isModified(state, csid).should.equal(true);
  });

  it('should handle RECORD_READ_STARTED', function test() {
    const csid = '1234';

    const state = reducer(undefined, {
      type: RECORD_READ_STARTED,
      meta: {
        csid,
      },
    });

    state.should.equal(Immutable.fromJS({
      [csid]: {
        isReadPending: true,
      },
    }));

    isReadPending(state, csid).should.equal(true);
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

    state = reducer(undefined, {
      type: RECORD_READ_FULFILLED,
      payload: {
        data,
      },
      meta: {
        csid,
      },
    });

    getData(state, csid).should.equal(Immutable.fromJS(data));
    isModified(state, csid).should.equal(false);

    // Existing record data

    state = reducer(Immutable.fromJS({
      [csid]: {
        data: {
          current: {
            foo: 1,
          },
        },
        isReadPending: true,
      },
    }), {
      type: RECORD_READ_FULFILLED,
      payload: {
        data,
      },
      meta: {
        csid,
      },
    });

    getData(state, csid).should.equal(Immutable.fromJS(data));
    isModified(state, csid).should.equal(false);
    expect(isReadPending(state, csid)).to.equal(undefined);
  });

  it('should handle RECORD_READ_REJECTED', function test() {
    const csid = '1234';

    const state = reducer(Immutable.fromJS({
      [csid]: {
        isReadPending: true,
      },
    }), {
      type: RECORD_READ_REJECTED,
      payload: {
        code: 'ERR_CODE',
      },
      meta: {
        csid,
      },
    });

    state.should.equal(Immutable.fromJS({
      [csid]: {
        error: {
          code: 'ERR_CODE',
        },
      },
    }));

    expect(isReadPending(state, csid)).to.equal(undefined);
  });

  it('should handle RECORD_SAVE_STARTED', function test() {
    const csid = '1234';

    const state = reducer(undefined, {
      type: RECORD_SAVE_STARTED,
      meta: {
        csid,
      },
    });

    state.should.equal(Immutable.fromJS({
      [csid]: {
        isSavePending: true,
      },
    }));

    isSavePending(state, csid).should.equal(true);
  });

  it('should handle RECORD_SAVE_FULFILLED', function test() {
    const csid = '1234';
    const updatedAt = '2017-03-23-08:34:21.000Z';

    const data = {
      document: {
        '@name': 'groups',
        'ns2:collectionspace_core': {
          updatedAt,
        },
      },
    };

    let state;

    // No existing record data

    state = reducer(undefined, {
      type: RECORD_SAVE_FULFILLED,
      payload: {
        data,
      },
      meta: {
        csid,
      },
    });

    getData(state, csid).should.equal(Immutable.fromJS(data));
    isModified(state, csid).should.equal(false);

    // Existing record data

    state = reducer(Immutable.fromJS({
      [csid]: {
        data: {
          current: {
            foo: 1,
          },
        },
        isSavePending: true,
      },
    }), {
      type: RECORD_SAVE_FULFILLED,
      payload: {
        data,
      },
      meta: {
        csid,
      },
    });

    getData(state, csid).should.equal(Immutable.fromJS(data));
    expect(isSavePending(state, csid)).to.equal(undefined);
    expect(isSavePending(state, '')).to.equal(undefined);
    isModified(state, csid).should.equal(false);

    // With related subject csid

    const relatedSubjectCsid = '5678';

    state = reducer(Immutable.fromJS({
      [csid]: {
        data: {},
        isSavePending: true,
      },
    }), {
      type: RECORD_SAVE_FULFILLED,
      payload: {
        data,
      },
      meta: {
        csid,
        relatedSubjectCsid,
      },
    });

    getRelationUpdatedTimestamp(state, relatedSubjectCsid).should.equal(updatedAt);
  });

  it('should handle RECORD_SAVE_REJECTED', function test() {
    const csid = '1234';

    const state = reducer(Immutable.fromJS({
      [csid]: {
        isSavePending: true,
      },
    }), {
      type: RECORD_SAVE_REJECTED,
      payload: {
        code: 'ERR_CODE',
      },
      meta: {
        csid,
      },
    });

    state.should.equal(Immutable.fromJS({
      [csid]: {
        error: {
          code: 'ERR_CODE',
        },
      },
    }));

    expect(isSavePending(state, csid)).to.equal(undefined);
  });

  it('should handle REVERT_RECORD', function test() {
    const csid = '1234';

    const data = Immutable.fromJS({
      foo: {
        bar: 'a',
      },
    });

    const state = reducer(Immutable.fromJS({
      [csid]: {
        data: {
          baseline: data,
          current: {
            foo: {
              bar: 'b',
            },
          },
        },
      },
    }), {
      type: REVERT_RECORD,
      meta: {
        csid,
      },
    });

    state.should.equal(Immutable.fromJS({
      [csid]: {
        data: {
          baseline: data,
          current: data,
        },
      },
    }));

    isModified(state, csid).should.equal(false);
  });

  it('should handle SUBJECT_RELATIONS_UPDATED', function test() {
    const csid = '1234';

    let state;

    // No existing state for the csid

    state = reducer(undefined, {
      type: SUBJECT_RELATIONS_UPDATED,
      meta: {
        csid,
      },
    });

    expect(getRelationUpdatedTimestamp(state, csid)).to.equal(undefined);

    // Existing state

    state = reducer(Immutable.fromJS({
      [csid]: {},
    }), {
      type: SUBJECT_RELATIONS_UPDATED,
      meta: {
        csid,
      },
    });

    expect(Date.parse(getRelationUpdatedTimestamp(state, csid))).to.be.closeTo(Date.now(), 10);
  });

  it('should handle CREATE_ID_FULFILLED', function test() {
    const csid = '1234';

    let state;

    // Non-existent csid

    state = reducer(undefined, {
      type: CREATE_ID_FULFILLED,
      payload: {
        data: 'd',
      },
      meta: {
        csid,
        path: ['foo', 'bar', '1'],
      },
    });

    state.should.equal(Immutable.Map());

    expect(getData(state, csid)).to.equal(undefined);
    isModified(state, csid).should.equal(false);

    // Set single value

    const data = {
      foo: {
        bar: 'a',
      },
    };

    state = reducer(Immutable.fromJS({
      [csid]: {
        data: {
          current: data,
        },
      },
    }), {
      type: CREATE_ID_FULFILLED,
      payload: {
        data: 'b',
      },
      meta: {
        csid,
        path: ['foo', 'bar'],
      },
    });

    getData(state, csid).should.equal(Immutable.fromJS({
      foo: {
        bar: 'b',
      },
    }));

    isModified(state, csid).should.equal(true);
  });

  it('should handle VALIDATION_PASSED', function test() {
    const csid = '1234';
    const path = ['foo', 'bar'];

    const initialState = Immutable.Map().setIn(
      [csid, 'validation', ...path], {}
    );

    let state;

    state = reducer(initialState, {
      type: VALIDATION_PASSED,
      meta: {
        csid,
        path: ['foo', 'bar'],
      },
    });

    state.should.equal(Immutable.fromJS({
      [csid]: {
        validation: {
          foo: {},
        },
      },
    }));

    state = reducer(initialState, {
      type: VALIDATION_PASSED,
      meta: {
        csid,
        path: [],
      },
    });

    state.should.equal(Immutable.fromJS({
      [csid]: {},
    }));
  });

  it('should handle VALIDATION_FAILED', function test() {
    const csid = '1234';

    const error = {
      code: 'ERROR_CODE',
    };

    const state = reducer(undefined, {
      type: VALIDATION_FAILED,
      payload: error,
      meta: {
        csid,
        path: [],
      },
    });

    state.should.equal(Immutable.Map().setIn(
      [csid, 'validation'], error
    ));

    getValidationErrors(state, csid).should.equal(error);
  });
});
