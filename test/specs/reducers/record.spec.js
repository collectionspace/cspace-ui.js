import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';

import {
  ADD_FIELD_INSTANCE,
  CREATE_NEW_RECORD,
  CREATE_NEW_SUBRECORD,
  DELETE_FIELD_VALUE,
  DETACH_SUBRECORD,
  MOVE_FIELD_VALUE,
  SET_FIELD_VALUE,
  RECORD_CREATED,
  RECORD_READ_STARTED,
  RECORD_READ_FULFILLED,
  RECORD_READ_REJECTED,
  RECORD_SAVE_STARTED,
  RECORD_SAVE_FULFILLED,
  RECORD_SAVE_REJECTED,
  RECORD_TRANSITION_STARTED,
  RECORD_TRANSITION_FULFILLED,
  RECORD_TRANSITION_REJECTED,
  REVERT_RECORD,
  SUBRECORD_CREATED,
  SUBRECORD_READ_FULFILLED,
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
  getError,
  getNewData,
  getNewSubrecordCsid,
  getRelationUpdatedTimestamp,
  getSubrecordCsid,
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

    // Subrecord

    state = reducer(undefined, {
      type: CREATE_NEW_RECORD,
      meta: {
        config: {
          recordTypes: {
            contact: {
              serviceConfig: {
                documentName: 'contacts',
              },
              fields: {
                document: {},
              },
            },
          },
        },
        recordTypeConfig: {
          serviceConfig: {
            documentName: 'groups',
          },
          fields: {
            document: {},
          },
          subrecords: {
            contact: {
              recordType: 'contact',
            },
          },
        },
      },
    });

    getNewData(state).should.equal(Immutable.fromJS({
      document: {
        '@name': 'groups',
      },
    }));

    const contactSubrecordCsid = getNewSubrecordCsid(state, 'contact');

    getData(state, contactSubrecordCsid).should.equal(Immutable.fromJS({
      document: {
        '@name': 'contacts',
      },
    }));

    getSubrecordCsid(state, '', 'contact').should.equal(contactSubrecordCsid);

    // Subrecord referenced by a csid field

    state = reducer(undefined, {
      type: CREATE_NEW_RECORD,
      meta: {
        config: {
          recordTypes: {
            blob: {
              serviceConfig: {
                documentName: 'blobs',
              },
              fields: {
                document: {},
              },
            },
          },
        },
        recordTypeConfig: {
          serviceConfig: {
            documentName: 'media',
          },
          fields: {
            document: {},
          },
          subrecords: {
            blob: {
              recordType: 'blob',
              csidField: ['foo', 'blobCsid'],
            },
          },
        },
      },
    });

    const blobSubrecordCsid = getNewSubrecordCsid(state, 'blob');

    getData(state, blobSubrecordCsid).should.equal(Immutable.fromJS({
      document: {
        '@name': 'blobs',
      },
    }));

    getSubrecordCsid(state, '', 'blob').should.equal(blobSubrecordCsid);

    // Subrecord referenced by a csid field, via clone

    state = reducer(Immutable.fromJS({
      1234: {
        data: {
          current: {
            foo: {
              blobCsid: '8888',
            },
          },
        },
      },
    }), {
      type: CREATE_NEW_RECORD,
      meta: {
        cloneCsid: '1234',
        config: {
          recordTypes: {
            blob: {
              serviceConfig: {
                documentName: 'blobs',
              },
              fields: {
                document: {},
              },
            },
          },
        },
        recordTypeConfig: {
          serviceConfig: {
            documentName: 'media',
          },
          fields: {
            document: {},
          },
          subrecords: {
            blob: {
              recordType: 'blob',
              csidField: ['foo', 'blobCsid'],
            },
          },
        },
      },
    });

    getSubrecordCsid(state, '', 'blob').should.equal('8888');
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

    getError(state, csid).should.equal(Immutable.fromJS({
      code: 'ERR_CODE',
    }));
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
      [csid]: {},
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

    const subrecordCsid = '5678';

    const subrecordData = Immutable.fromJS({
      baz: 'abc',
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
        subrecord: {
          contact: subrecordCsid,
        },
      },
      [subrecordCsid]: {
        data: {
          baseline: subrecordData,
          current: {
            baz: 'xyz',
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
        subrecord: {
          contact: subrecordCsid,
        },
      },
      [subrecordCsid]: {
        data: {
          baseline: subrecordData,
          current: subrecordData,
        },
      },
    }));

    isModified(state, csid).should.equal(false);
  });

  it('should handle REVERT_RECORD when subrecord csid fields are present', function test() {
    const baselineSubrecordCsid = '0000';

    const baselineSubrecordBaselineData = Immutable.fromJS({
      baz: 'abc',
    });

    const baselineSubrecordCurrentData = Immutable.fromJS({
      baz: 'xyz',
    });

    const currentSubrecordCsid = '1111';

    const currentSubrecordData = Immutable.fromJS({
      baz: 'def',
    });

    const csid = '1234';

    const baselineData = Immutable.fromJS({
      foo: {
        bar: 'a',
        blobCsid: baselineSubrecordCsid,
      },
    });

    const currentData = Immutable.fromJS({
      foo: {
        bar: 'b',
        blobCsid: currentSubrecordCsid,
      },
    });

    const recordTypeConfig = {
      subrecords: {
        blob: {
          csidField: ['foo', 'blobCsid'],
        },
      },
    };

    const state = reducer(Immutable.fromJS({
      [csid]: {
        data: {
          baseline: baselineData,
          current: currentData,
        },
        subrecord: {
          blob: currentSubrecordCsid,
        },
      },
      [currentSubrecordCsid]: {
        data: {
          baseline: currentSubrecordData,
          current: currentSubrecordData,
        },
      },
      [baselineSubrecordCsid]: {
        data: {
          baseline: baselineSubrecordBaselineData,
          current: baselineSubrecordCurrentData,
        },
      },
    }), {
      type: REVERT_RECORD,
      meta: {
        csid,
        recordTypeConfig,
      },
    });

    state.should.equal(Immutable.fromJS({
      [csid]: {
        data: {
          baseline: baselineData,
          current: baselineData,
        },
        subrecord: {
          blob: baselineSubrecordCsid,
        },
      },
      [currentSubrecordCsid]: {
        data: {
          baseline: currentSubrecordData,
          current: currentSubrecordData,
        },
      },
      [baselineSubrecordCsid]: {
        data: {
          baseline: baselineSubrecordBaselineData,
          current: baselineSubrecordBaselineData,
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

  it('should handle RECORD_TRANSITION_STARTED', function test() {
    const csid = '1234';

    const state = reducer(undefined, {
      type: RECORD_TRANSITION_STARTED,
      meta: {
        csid,
      },
    });

    state.should.equal(Immutable.Map().setIn(
      [csid, 'isSavePending'], true
    ));

    isSavePending(state, csid).should.equal(true);
  });

  it('should handle RECORD_TRANSITION_FULFILLED', function test() {
    const csid = '1234';

    const initialState = Immutable.fromJS({
      [csid]: {
        isSavePending: true,
      },
    });

    let state;

    // Any transition should remove isSavePending.

    state = reducer(initialState, {
      type: RECORD_TRANSITION_FULFILLED,
      meta: {
        csid,
      },
    });

    state.should.equal(Immutable.fromJS({
      [csid]: {},
    }));

    expect(isSavePending(state, csid)).to.equal(undefined);

    // Delete transition should remove entire record state for the csid.

    state = reducer(initialState, {
      type: RECORD_TRANSITION_FULFILLED,
      meta: {
        csid,
        transitionName: 'delete',
      },
    });

    state.should.equal(Immutable.Map());

    // Non-delete transition should update data.

    const data = {
      foo: {
        bar: 'baz',
      },
    };

    state = reducer(initialState, {
      type: RECORD_TRANSITION_FULFILLED,
      payload: {
        data,
      },
      meta: {
        csid,
        transitionName: 'lock',
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

    // Should update relationUpdatedTime if a relatedSubjectCsid is present.

    const relatedSubjectCsid = '8888';
    const updatedTimestamp = '2000-01-01T12:00:00Z';

    state = reducer(initialState, {
      type: RECORD_TRANSITION_FULFILLED,
      meta: {
        csid,
        relatedSubjectCsid,
        updatedTimestamp,
      },
    });

    state.should.equal(Immutable.fromJS({
      [csid]: {},
      [relatedSubjectCsid]: {
        relationUpdatedTime: updatedTimestamp,
      },
    }));
  });

  it('should handle RECORD_TRANSITION_REJECTED', function test() {
    const csid = '1234';

    const initialState = Immutable.fromJS({
      [csid]: {
        isSavePending: true,
      },
    });

    // Any transition should remove isSavePending.

    const state = reducer(initialState, {
      type: RECORD_TRANSITION_REJECTED,
      meta: {
        csid,
      },
    });

    state.should.equal(Immutable.fromJS({
      [csid]: {},
    }));

    expect(isSavePending(state, csid)).to.equal(undefined);
  });

  it('should handle RECORD_CREATED', function test() {
    const currentCsid = '1234';
    const newRecordCsid = '5678';

    const data = Immutable.fromJS({
      foo: 'abc',
    });

    const initialState = Immutable.fromJS({
      [currentCsid]: {
        data: {
          current: data,
        },
      },
    });

    const state = reducer(initialState, {
      type: RECORD_CREATED,
      meta: {
        currentCsid,
        newRecordCsid,
      },
    });

    state.should.equal(Immutable.fromJS({
      [newRecordCsid]: {
        data: {
          current: data,
        },
      },
    }));
  });

  it('should handle CREATE_NEW_SUBRECORD', function test() {
    const csid = '1234';
    const csidField = ['document', 'ns2:media_common', 'blobCsid'];
    const subrecordName = 'blob';

    const blobConfig = {
      fields: {
        document: {},
      },
      serviceConfig: {
        documentName: 'blobs',
      },
    };

    const config = {
      recordTypes: {
        blob: blobConfig,
      },
    };

    const state = reducer(undefined, {
      type: CREATE_NEW_SUBRECORD,
      meta: {
        config,
        csid,
        csidField,
        subrecordName,
        subrecordTypeConfig: blobConfig,
      },
    });

    const expectedNewSubrecordKey = `/${subrecordName}`;

    state.should.equal(Immutable.fromJS({
      [csid]: {
        data: {
          current: {
            document: {
              'ns2:media_common': {
                blobCsid: expectedNewSubrecordKey,
              },
            },
          },
        },
        subrecord: {
          [subrecordName]: expectedNewSubrecordKey,
        },
      },
      [expectedNewSubrecordKey]: {
        data: {
          baseline: {
            document: {
              '@name': 'blobs',
            },
          },
          current: {
            document: {
              '@name': 'blobs',
            },
          },
        },
      },
    }));
  });

  it('should handle DETACH_SUBRECORD', function test() {
    const csid = '1234';
    const csidField = ['document', 'ns2:media_common', 'blobCsid'];
    const subrecordName = 'blob';

    const blobConfig = {
      fields: {
        document: {},
      },
      serviceConfig: {
        documentName: 'blobs',
      },
    };

    const config = {
      recordTypes: {
        blob: blobConfig,
      },
    };

    const state = reducer(undefined, {
      type: DETACH_SUBRECORD,
      meta: {
        config,
        csid,
        csidField,
        subrecordName,
        subrecordTypeConfig: blobConfig,
      },
    });

    const expectedNewSubrecordKey = `/${subrecordName}`;

    state.should.equal(Immutable.fromJS({
      [csid]: {
        data: {
          current: {
            document: {
              'ns2:media_common': {
                blobCsid: expectedNewSubrecordKey,
              },
            },
          },
        },
        subrecord: {
          [subrecordName]: expectedNewSubrecordKey,
        },
      },
      [expectedNewSubrecordKey]: {
        data: {
          baseline: {
            document: {
              '@name': 'blobs',
            },
          },
          current: {
            document: {
              '@name': 'blobs',
            },
          },
        },
      },
    }));
  });

  it('should handle SUBRECORD_CREATED', function test() {
    const csid = '1234';
    const subrecordName = 'contact';
    const subrecordCsid = '5678';

    const state = reducer(undefined, {
      type: SUBRECORD_CREATED,
      meta: {
        csid,
        subrecordName,
        subrecordCsid,
      },
    });

    state.should.equal(Immutable.fromJS({
      [csid]: {
        subrecord: {
          [subrecordName]: subrecordCsid,
        },
      },
    }));

    expect(getSubrecordCsid(state, csid, subrecordName)).to.equal(subrecordCsid);
  });

  it('should handle SUBRECORD_CREATED with a csidField', function test() {
    const csid = '1234';
    const subrecordName = 'blob';
    const subrecordCsid = '5678';
    const csidField = ['document', 'ns2:media_common', 'blobCsid'];

    const state = reducer(undefined, {
      type: SUBRECORD_CREATED,
      meta: {
        csid,
        subrecordName,
        subrecordCsid,
        csidField,
      },
    });

    state.should.equal(Immutable.fromJS({
      [csid]: {
        subrecord: {
          [subrecordName]: subrecordCsid,
        },
        data: {
          current: {
            document: {
              'ns2:media_common': {
                blobCsid: subrecordCsid,
              },
            },
          },
        },
      },
    }));

    expect(getSubrecordCsid(state, csid, subrecordName)).to.equal(subrecordCsid);
  });

  it('should handle SUBRECORD_CREATED with a csidField where isDefault is true', function test() {
    const csid = '1234';
    const subrecordName = 'blob';
    const subrecordCsid = '5678';
    const csidField = ['document', 'ns2:media_common', 'blobCsid'];

    const state = reducer(undefined, {
      type: SUBRECORD_CREATED,
      meta: {
        csid,
        subrecordName,
        subrecordCsid,
        csidField,
        isDefault: true,
      },
    });

    // Should set both baseline and current data.

    state.should.equal(Immutable.fromJS({
      [csid]: {
        subrecord: {
          [subrecordName]: subrecordCsid,
        },
        data: {
          baseline: {
            document: {
              'ns2:media_common': {
                blobCsid: subrecordCsid,
              },
            },
          },
          current: {
            document: {
              'ns2:media_common': {
                blobCsid: subrecordCsid,
              },
            },
          },
        },
      },
    }));

    expect(getSubrecordCsid(state, csid, subrecordName)).to.equal(subrecordCsid);
  });

  it('should handle SUBRECORD_READ_FULFILLED', function test() {
    const csid = '1234';
    const subrecordName = 'contact';
    const subrecordCsid = '5678';

    const state = reducer(undefined, {
      type: SUBRECORD_READ_FULFILLED,
      meta: {
        csid,
        subrecordName,
        subrecordCsid,
      },
    });

    state.should.equal(Immutable.fromJS({
      [csid]: {
        subrecord: {
          [subrecordName]: subrecordCsid,
        },
      },
    }));

    expect(getSubrecordCsid(state, csid, subrecordName)).to.equal(subrecordCsid);
  });

  it('should detect subrecord modifications', function test() {
    const csid = '1234';

    const data = Immutable.fromJS({
      foo: {
        bar: 'a',
      },
    });

    const subrecordCsid = '5678';

    const subrecordData = Immutable.fromJS({
      baz: 'abc',
    });

    const state = Immutable.fromJS({
      [csid]: {
        data: {
          baseline: data,
          current: data,
        },
        subrecord: {
          contact: subrecordCsid,
        },
      },
      [subrecordCsid]: {
        data: {
          baseline: subrecordData,
          current: {
            baz: 'xyz',
          },
        },
      },
    });

    isModified(state, csid).should.equal(true);
  });
});
