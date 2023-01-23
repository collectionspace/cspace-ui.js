import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';

import {
  LOGIN_FULFILLED,
  LOGOUT_FULFILLED,
  ADD_FIELD_INSTANCE,
  CLEAR_RECORD,
  CREATE_NEW_RECORD,
  CREATE_NEW_SUBRECORD,
  DELETE_FIELD_VALUE,
  DETACH_SUBRECORD,
  FIELD_COMPUTE_FULFILLED,
  MOVE_FIELD_VALUE,
  SET_FIELD_VALUE,
  RECORD_CREATED,
  RECORD_DELETE_STARTED,
  RECORD_DELETE_FULFILLED,
  RECORD_DELETE_REJECTED,
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
  SORT_FIELD_INSTANCES,
  SUBJECT_RELATIONS_UPDATED,
  CREATE_ID_FULFILLED,
  READ_VOCABULARY_ITEM_REFS_STARTED,
  READ_VOCABULARY_ITEM_REFS_FULFILLED,
  READ_VOCABULARY_ITEM_REFS_REJECTED,
} from '../../../src/constants/actionCodes';

import reducer, {
  getData,
  getError,
  getNewData,
  getNewSubrecordCsid,
  getRelationUpdatedTimestamp,
  getSubrecordCsid,
  getValidationErrors,
  isModified,
  isModifiedExceptPart,
  isReadPending,
  isSavePending,
  isReadVocabularyItemRefsPending,
  getSubrecordData,
} from '../../../src/reducers/record';

const { expect } = chai;

chai.use(chaiImmutable);
chai.should();

describe('record reducer', () => {
  it('should have empty immutable initial state', () => {
    const state = reducer(undefined, {});

    state.should.equal(Immutable.Map());

    expect(getData(state, '1234')).to.equal(undefined);
    expect(getNewData(state)).to.equal(undefined);
  });

  it('should handle ADD_FIELD_INSTANCE', () => {
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

  context('on SORT_FIELD_INSTANCES', () => {
    const csid = '1234';

    const data = Immutable.fromJS({
      foo: {
        bar: [
          'Oakland',
          'Berkeley',
          'San Francisco',
        ],
      },
      placeList: [
        { name: 'United States', type: 'country' },
        { name: 'California', type: 'state' },
        { name: 'Alameda', type: 'city' },
      ],
    });

    const initialState = Immutable.fromJS({
      [csid]: {
        data: {
          baseline: data,
          current: data,
        },
      },
    });

    it('should sort the list', () => {
      const state = reducer(initialState, {
        type: SORT_FIELD_INSTANCES,
        meta: {
          csid,
          config: { locale: 'en-US' },
          path: ['foo', 'bar'],
        },
      });

      getData(state, csid).should.equal(Immutable.fromJS({
        foo: {
          bar: [
            'Berkeley',
            'Oakland',
            'San Francisco',
          ],
        },
        placeList: [
          { name: 'United States', type: 'country' },
          { name: 'California', type: 'state' },
          { name: 'Alameda', type: 'city' },
        ],
      }));
    });

    it('should sort the list by the specified subfield', () => {
      const state = reducer(initialState, {
        type: SORT_FIELD_INSTANCES,
        meta: {
          csid,
          config: { locale: 'en-US' },
          path: ['placeList'],
          byField: 'name',
        },
      });

      getData(state, csid).should.equal(Immutable.fromJS({
        foo: {
          bar: [
            'Oakland',
            'Berkeley',
            'San Francisco',
          ],
        },
        placeList: [
          { name: 'Alameda', type: 'city' },
          { name: 'California', type: 'state' },
          { name: 'United States', type: 'country' },
        ],
      }));
    });

    it('should not change state if there is no data', () => {
      const noDataInitialState = Immutable.fromJS({
        [csid]: {
          data: {},
        },
      });

      const state = reducer(noDataInitialState, {
        type: SORT_FIELD_INSTANCES,
        meta: {
          csid,
          path: ['placeList'],
          byField: 'name',
        },
      });

      state.should.equal(noDataInitialState);
    });
  });

  describe('on CREATE_NEW_RECORD', () => {
    it('should create new record data when there is no existing new record data', () => {
      const state = reducer(undefined, {
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
        document: {},
      }));

      isModified(state, '').should.equal(false);
    });

    it('should create new record data when there is existing new record data', () => {
      const state = reducer(Immutable.fromJS({
        '': {
          data: {
            baseline: {},
            current: {
              foo: 'bar',
            },
          },
        },
      }), {
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
        document: {},
      }));

      isModified(state, '').should.equal(false);
    });

    it('should copy data from another record when a cloneCsid is supplied', () => {
      const cloneData = Immutable.fromJS({
        foo: {
          bar: 'baz',
        },
      });

      const state = reducer(Immutable.fromJS({
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

    it('should create new subrecord data', () => {
      const state = reducer(undefined, {
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
        document: {},
      }));

      const contactSubrecordCsid = getNewSubrecordCsid(state, 'contact');

      getData(state, contactSubrecordCsid).should.equal(Immutable.fromJS({
        document: {},
      }));

      getSubrecordCsid(state, '', 'contact').should.equal(contactSubrecordCsid);

      getSubrecordData(state, '').should.equal(Immutable.fromJS({
        contact: {
          document: {},
        },
      }));
    });

    it('should create new subrecord data for a subrecord referenced by a csid field', () => {
      const state = reducer(undefined, {
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
        document: {},
      }));

      getSubrecordCsid(state, '', 'blob').should.equal(blobSubrecordCsid);

      getSubrecordData(state, '').should.equal(Immutable.fromJS({
        blob: {
          document: {},
        },
      }));
    });

    it('should copy the csid in a subrecord csid field from a cloned record', () => {
      const state = reducer(Immutable.fromJS({
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

    it('should copy sticky field values into new record data when supplied', () => {
      const state = reducer(undefined, {
        type: CREATE_NEW_RECORD,
        meta: {
          recordTypeConfig: {
            name: 'collectionobject',
            serviceConfig: {
              documentName: 'collectionobjects',
            },
            fields: {
              document: {},
            },
          },
          stickyFields: Immutable.fromJS({
            collectionobject: {
              document: {
                foo: 'bar',
              },
            },
          }),
        },
      });

      getNewData(state).should.equal(Immutable.fromJS({
        document: {
          foo: 'bar',
        },
      }));

      isModified(state, '').should.equal(false);
    });
  });

  it('should handle DELETE_FIELD_VALUE', () => {
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

  it('should handle MOVE_FIELD_VALUE', () => {
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

  it('should handle SET_FIELD_VALUE', () => {
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

  it('should handle RECORD_READ_STARTED', () => {
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

  it('should handle RECORD_READ_FULFILLED', () => {
    const recordTypeConfig = {};
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
        recordTypeConfig,
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
        recordTypeConfig,
        csid,
      },
    });

    getData(state, csid).should.equal(Immutable.fromJS(data));
    isModified(state, csid).should.equal(false);
    expect(isReadPending(state, csid)).to.equal(undefined);
  });

  it('should handle RECORD_READ_REJECTED', () => {
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

  it('should handle RECORD_SAVE_STARTED', () => {
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

  describe('on RECORD_SAVE_FULFILLED', () => {
    const recordTypeConfig = {};
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

    it('should set the record data from the payload when there is no existing record data', () => {
      const state = reducer(undefined, {
        type: RECORD_SAVE_FULFILLED,
        payload: {
          data,
        },
        meta: {
          recordTypeConfig,
          csid,
        },
      });

      getData(state, csid).should.equal(Immutable.fromJS(data));
      isModified(state, csid).should.equal(false);
    });

    it('should set the record data from the payload when there is existing record data', () => {
      const state = reducer(Immutable.fromJS({
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
          recordTypeConfig,
          csid,
        },
      });

      getData(state, csid).should.equal(Immutable.fromJS(data));
      expect(isSavePending(state, csid)).to.equal(undefined);
      expect(isSavePending(state, '')).to.equal(undefined);
      isModified(state, csid).should.equal(false);
    });

    it('should update the relation updated timestamp of a related subject', () => {
      // With related subject csid

      const relatedSubjectCsid = '5678';

      const state = reducer(Immutable.fromJS({
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
          recordTypeConfig,
          csid,
          relatedSubjectCsid,
        },
      });

      getRelationUpdatedTimestamp(state, relatedSubjectCsid).should.equal(updatedAt);
    });

    it('should clear all record state except for the saved record, subrecords of the saved record, new unsaved records, and records with pending saves', () => {
      const initialState = Immutable.fromJS({
        [csid]: {
          data: {},
          isSavePending: true,
          subrecord: {
            blob: '5555',
          },
        },
        1111: {},
        2222: {
          isSavePending: true,
        },
        3333: {},
        4444: {},
        5555: {},
        '': {}, // new record
        '/blob': {}, // new subrecord
      });

      const state = reducer(initialState, {
        type: RECORD_SAVE_FULFILLED,
        payload: {
          data,
        },
        meta: {
          recordTypeConfig,
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
            blob: '5555',
          },
        },
        2222: {
          isSavePending: true,
        },
        5555: {},
        '': {},
        '/blob': {},
      }));
    });
  });

  it('should handle RECORD_SAVE_REJECTED', () => {
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

  it('should handle REVERT_RECORD', () => {
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

  it('should handle REVERT_RECORD when subrecord csid fields are present', () => {
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

  it('should handle SUBJECT_RELATIONS_UPDATED', () => {
    const csid = '1234';
    const updatedTime = (new Date()).toISOString();

    let state;

    // No existing state for the csid

    state = reducer(undefined, {
      type: SUBJECT_RELATIONS_UPDATED,
      meta: {
        updatedTime,
        subject: {
          csid,
        },
      },
    });

    expect(getRelationUpdatedTimestamp(state, csid)).to.equal(undefined);

    // Existing state

    state = reducer(Immutable.fromJS({
      [csid]: {},
    }), {
      type: SUBJECT_RELATIONS_UPDATED,
      meta: {
        updatedTime,
        subject: {
          csid,
        },
      },
    });

    getRelationUpdatedTimestamp(state, csid).should.equal(updatedTime);
  });

  it('should handle CREATE_ID_FULFILLED', () => {
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

    // Transform function should be applied to the value

    state = reducer(Immutable.fromJS({
      [csid]: {
        data: {
          current: data,
        },
      },
    }), {
      type: CREATE_ID_FULFILLED,
      payload: {
        data: 'c',
      },
      meta: {
        csid,
        path: ['foo', 'bar'],
        transform: (number) => `FOO ${number}`,
      },
    });

    getData(state, csid).should.equal(Immutable.fromJS({
      foo: {
        bar: 'FOO c',
      },
    }));

    isModified(state, csid).should.equal(true);
  });

  it('should handle VALIDATION_PASSED', () => {
    const csid = '1234';
    const path = ['foo', 'bar'];

    const initialState = Immutable.Map().setIn(
      [csid, 'validation', ...path], {},
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

  it('should handle VALIDATION_FAILED', () => {
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
      [csid, 'validation'], error,
    ));

    getValidationErrors(state, csid).should.equal(error);
  });

  it('should handle RECORD_TRANSITION_STARTED', () => {
    const csid = '1234';

    const state = reducer(undefined, {
      type: RECORD_TRANSITION_STARTED,
      meta: {
        csid,
      },
    });

    state.should.equal(Immutable.Map().setIn(
      [csid, 'isSavePending'], true,
    ));

    isSavePending(state, csid).should.equal(true);
  });

  describe('on RECORD_TRANSITION_FULFILLED', () => {
    const recordTypeConfig = {};
    const csid = '1234';

    it('should delete isSavePending on any transition', () => {
      const initialState = Immutable.fromJS({
        [csid]: {
          isSavePending: true,
        },
      });

      const state = reducer(initialState, {
        type: RECORD_TRANSITION_FULFILLED,
        meta: {
          recordTypeConfig,
          csid,
        },
      });

      state.should.equal(Immutable.fromJS({
        [csid]: {},
      }));

      expect(isSavePending(state, csid)).to.equal(undefined);
    });

    it('should remove the record state on a delete transition', () => {
      const initialState = Immutable.fromJS({
        [csid]: {
          isSavePending: true,
        },
      });

      const state = reducer(initialState, {
        type: RECORD_TRANSITION_FULFILLED,
        meta: {
          recordTypeConfig,
          csid,
          transitionName: 'delete',
        },
      });

      state.should.equal(Immutable.Map());
    });

    it('should update the record data on a non-delete transition', () => {
      const initialState = Immutable.fromJS({
        [csid]: {
          isSavePending: true,
        },
      });

      const data = {
        foo: {
          bar: 'baz',
        },
      };

      const state = reducer(initialState, {
        type: RECORD_TRANSITION_FULFILLED,
        payload: {
          data,
        },
        meta: {
          recordTypeConfig,
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
    });

    it('should update relationUpdatedTime if a relatedSubjectCsid is present', () => {
      const initialState = Immutable.fromJS({
        [csid]: {
          isSavePending: true,
        },
      });

      const relatedSubjectCsid = '8888';
      const updatedTimestamp = '2000-01-01T12:00:00Z';

      const state = reducer(initialState, {
        type: RECORD_TRANSITION_FULFILLED,
        meta: {
          recordTypeConfig,
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

    it('should clear all record state on a delete transition, except for records with pending saves', () => {
      const initialState = Immutable.fromJS({
        [csid]: {
          data: {},
          isSavePending: true,
          subrecord: {
            blob: '5555',
          },
        },
        1111: {},
        2222: {
          isSavePending: true,
        },
        3333: {},
        4444: {},
        5555: {},
        '': {}, // new record
        '/blob': {}, // new subrecord
      });

      const state = reducer(initialState, {
        type: RECORD_TRANSITION_FULFILLED,
        meta: {
          recordTypeConfig,
          csid,
          transitionName: 'delete',
        },
      });

      state.should.equal(Immutable.fromJS({
        2222: {
          isSavePending: true,
        },
      }));
    });
  });

  it('should handle RECORD_TRANSITION_REJECTED', () => {
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

  it('should handle RECORD_CREATED', () => {
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

  it('should handle CREATE_NEW_SUBRECORD', () => {
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
            document: {},
          },
          current: {
            document: {},
          },
        },
      },
    }));
  });

  it('should handle DETACH_SUBRECORD', () => {
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
            document: {},
          },
          current: {
            document: {},
          },
        },
      },
    }));
  });

  it('should handle SUBRECORD_CREATED', () => {
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

  it('should handle SUBRECORD_CREATED with a csidField', () => {
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

  it('should handle SUBRECORD_CREATED with a csidField where isDefault is true', () => {
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

  it('should handle SUBRECORD_READ_FULFILLED', () => {
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

  it('should detect subrecord modifications', () => {
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

  context('on LOGIN_FULFILLED', () => {
    const initialState = Immutable.fromJS({
      recordCsid1: {},
      recordCsid2: {},
      recordCsid3: {},
    });

    it('should clear all record state if the previous username is different than the new username', () => {
      const state = reducer(initialState, {
        type: LOGIN_FULFILLED,
        meta: {
          prevUsername: 'prevUser',
          username: 'newUser',
        },
      });

      state.should.equal(Immutable.Map({}));
    });

    it('should not clear record state if the previous username is the same as the new username', () => {
      const state = reducer(initialState, {
        type: LOGIN_FULFILLED,
        meta: {
          prevUsername: 'user',
          username: 'user',
        },
      });

      state.should.equal(initialState);
    });
  });

  it('should handle LOGOUT_FULFILLED', () => {
    const state = reducer(Immutable.fromJS({
      recordCsid1: {},
      recordCsid2: {},
      recordCsid3: {},
    }), {
      type: LOGOUT_FULFILLED,
    });

    state.should.equal(Immutable.Map({}));
  });

  describe('on FIELD_COMPUTE_FULFILLED', () => {
    it('should merge the computed data into the current data', () => {
      const csid = '1234';

      const initialState = Immutable.fromJS({
        [csid]: {
          data: {
            current: {
              document: {
                part: {
                  foo: 'a',
                  bar: 'b',
                },
              },
            },
          },
        },
      });

      const state = reducer(initialState, {
        type: FIELD_COMPUTE_FULFILLED,
        payload: Immutable.fromJS({
          document: {
            part: {
              foo: 'x',
              baz: 'y',
            },
          },
        }),
        meta: {
          csid,
          path: [],
        },
      });

      state.should.equal(Immutable.fromJS({
        [csid]: {
          data: {
            current: {
              document: {
                part: {
                  foo: 'x',
                  bar: 'b',
                  baz: 'y',
                },
              },
            },
          },
        },
      }));
    });

    it('should do nothing if there is no current data', () => {
      const csid = '1234';

      const initialState = Immutable.fromJS({
        [csid]: {
          data: {},
        },
      });

      const state = reducer(initialState, {
        type: FIELD_COMPUTE_FULFILLED,
        payload: Immutable.fromJS({
          document: {
            part: {
              foo: 'x',
              baz: 'y',
            },
          },
        }),
        meta: {
          csid,
          path: [],
        },
      });

      state.should.equal(initialState);
    });

    it('should do nothing if the computed value path is not empty', () => {
      const csid = '1234';

      const initialState = Immutable.fromJS({
        [csid]: {
          data: {
            current: {
              document: {
                part: {
                  foo: 'a',
                  bar: 'b',
                },
              },
            },
          },
        },
      });

      const state = reducer(initialState, {
        type: FIELD_COMPUTE_FULFILLED,
        payload: Immutable.fromJS({
          part: {
            foo: 'x',
            baz: 'y',
          },
        }),
        meta: {
          csid,
          path: ['document'],
        },
      });

      state.should.equal(initialState);
    });
  });

  describe('on RECORD_DELETE_STARTED', () => {
    it('should set isSavePending to true', () => {
      const csid = '1234';

      const state = reducer(undefined, {
        type: RECORD_DELETE_STARTED,
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
  });

  describe('on RECORD_DELETE_FULFILLED', () => {
    it('should remove state associated with the deleted csid', () => {
      const csid = '1234';

      const state = reducer(Immutable.fromJS({
        [csid]: {
          isSavePending: true,
        },
      }), {
        type: RECORD_DELETE_FULFILLED,
        meta: {
          csid,
        },
      });

      state.should.equal(Immutable.fromJS({
      }));

      expect(isSavePending(state, csid)).to.equal(undefined);
    });

    it('should update relationUpdatedTime of a related record', () => {
      const csid = '1234';
      const relatedSubjectCsid = '5678';
      const updatedTimestamp = '2000-01-01T12:00:00Z';

      const state = reducer(Immutable.fromJS({
        [csid]: {
          data: {},
          isSavePending: true,
        },
      }), {
        type: RECORD_DELETE_FULFILLED,
        meta: {
          csid,
          relatedSubjectCsid,
          updatedTimestamp,
        },
      });

      getRelationUpdatedTimestamp(state, relatedSubjectCsid).should.equal(updatedTimestamp);
    });
  });

  describe('on RECORD_DELETE_REJECTED', () => {
    it('should unset isSavePending', () => {
      const csid = '1234';

      const state = reducer(Immutable.fromJS({
        [csid]: {
          isSavePending: true,
        },
      }), {
        type: RECORD_DELETE_REJECTED,
        meta: {
          csid,
        },
      });

      state.should.equal(Immutable.fromJS({
        [csid]: {},
      }));

      expect(isSavePending(state, csid)).to.equal(undefined);
    });
  });

  describe('on CLEAR_RECORD', () => {
    it('should delete record state for the csid', () => {
      const csid = '1234';

      const state = reducer(Immutable.fromJS({
        [csid]: {
          data: {
            current: {},
          },
        },
      }), {
        type: CLEAR_RECORD,
        meta: {
          csid,
        },
      });

      state.should.equal(Immutable.fromJS({}));

      expect(getData(state, csid)).to.equal(undefined);
    });

    it('should clear state for any subrecords', () => {
      const csid = '1234';
      const subrecordCsid = 'abcd';
      const clearSubrecords = true;

      const state = reducer(Immutable.fromJS({
        [csid]: {
          data: {
            current: {},
          },
          subrecord: {
            contact: subrecordCsid,
          },
        },
        [subrecordCsid]: {
          data: {
            current: {},
          },
        },
      }), {
        type: CLEAR_RECORD,
        meta: {
          csid,
          clearSubrecords,
        },
      });

      state.should.equal(Immutable.fromJS({}));

      expect(getData(state, csid)).to.equal(undefined);
      expect(getData(state, subrecordCsid)).to.equal(undefined);
    });

    it('should do nothing if there is no state for the csid', () => {
      const csid = '1234';

      const initialState = Immutable.fromJS({
        5678: {
          data: {},
        },
      });

      const state = reducer(initialState, {
        type: CLEAR_RECORD,
        meta: {
          csid,
        },
      });

      state.should.equal(initialState);
    });
  });

  describe('on READ_VOCABULARY_ITEM_REFS_STARTED', () => {
    it('should set isReadVocabularyItemRefsPending to true', () => {
      const csid = '1234';

      const state = reducer(Immutable.fromJS({
        [csid]: {},
      }), {
        type: READ_VOCABULARY_ITEM_REFS_STARTED,
        meta: {
          csid,
        },
      });

      state.should.equal(Immutable.fromJS({
        [csid]: {
          isReadVocabularyItemRefsPending: true,
        },
      }));

      expect(isReadVocabularyItemRefsPending(state, csid)).to.equal(true);
    });
  });

  describe('on READ_VOCABULARY_ITEM_REFS_REJECTED', () => {
    it('should delete isReadVocabularyItemRefsPending', () => {
      const csid = '1234';
      const data = {};

      const state = reducer(Immutable.fromJS({
        [csid]: {
          data: {
            baseline: data,
            current: data,
          },
          isReadVocabularyItemRefsPending: true,
        },
      }), {
        type: READ_VOCABULARY_ITEM_REFS_FULFILLED,
        payload: {},
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

      expect(isReadVocabularyItemRefsPending(state, csid)).to.equal(undefined);
    });

    it('should merge referenced states into baseline and current data', () => {
      const csid = '1234';

      const data = {
        document: {
          'ns2:abstract-common-list': {
            'list-item': [
              { csid: 'aaaa' },
              { csid: 'bbbb' },
            ],
          },
        },
      };

      const state = reducer(Immutable.fromJS({
        [csid]: {
          data: {
            baseline: data,
            current: data,
          },
          isReadVocabularyItemRefsPending: true,
        },
      }), {
        type: READ_VOCABULARY_ITEM_REFS_FULFILLED,
        payload: {
          data: {
            'ns2:abstract-common-list': {
              'list-item': [
                { csid: 'bbbb', referenced: 'false' },
                { csid: 'aaaa', referenced: 'true' },
              ],
            },
          },
        },
        meta: {
          csid,
        },
      });

      const expectedNextData = Immutable.fromJS({
        document: {
          'ns2:abstract-common-list': {
            'list-item': [
              { csid: 'aaaa', referenced: 'true' },
              { csid: 'bbbb', referenced: 'false' },
            ],
          },
        },
      });

      state.should.equal(Immutable.fromJS({
        [csid]: {
          data: {
            baseline: expectedNextData,
            current: expectedNextData,
          },
        },
      }));
    });

    it('should handle single (non-list) items', () => {
      const csid = '1234';

      const data = {
        document: {
          'ns2:abstract-common-list': {
            'list-item': { csid: 'aaaa' },
          },
        },
      };

      const state = reducer(Immutable.fromJS({
        [csid]: {
          data: {
            baseline: data,
            current: data,
          },
          isReadVocabularyItemRefsPending: true,
        },
      }), {
        type: READ_VOCABULARY_ITEM_REFS_FULFILLED,
        payload: {
          data: {
            'ns2:abstract-common-list': {
              'list-item': { csid: 'aaaa', referenced: 'true' },
            },
          },
        },
        meta: {
          csid,
        },
      });

      const expectedNextData = Immutable.fromJS({
        document: {
          'ns2:abstract-common-list': {
            'list-item': [
              { csid: 'aaaa', referenced: 'true' },
            ],
          },
        },
      });

      state.should.equal(Immutable.fromJS({
        [csid]: {
          data: {
            baseline: expectedNextData,
            current: expectedNextData,
          },
        },
      }));
    });
  });

  describe('on READ_VOCABULARY_ITEM_REFS_REJECTED', () => {
    it('should delete isReadVocabularyItemRefsPending and set the error', () => {
      const csid = '1234';
      const error = {};

      const state = reducer(Immutable.fromJS({
        [csid]: {
          isReadVocabularyItemRefsPending: true,
        },
      }), {
        type: READ_VOCABULARY_ITEM_REFS_REJECTED,
        payload: error,
        meta: {
          csid,
        },
      });

      state.should.equal(Immutable.fromJS({
        [csid]: {
          error,
        },
      }));

      expect(isReadVocabularyItemRefsPending(state, csid)).to.equal(undefined);
    });
  });

  describe('isModifiedExceptPart', () => {
    const csid = '1234';
    const exceptPart = 'ns2:foo';

    it('should return false if no data exists for the csid', () => {
      const state = Immutable.fromJS({
        [csid]: {},
      });

      isModifiedExceptPart(state, csid, exceptPart).should.equal(false);
    });

    it('should return false if current data is referentially equal to baseline data', () => {
      const data = Immutable.fromJS({
        document: {
          'ns2:collectionspace_common': {},
        },
      });

      const state = Immutable.fromJS({
        [csid]: {
          data: {
            baseline: data,
            current: data,
          },
        },
      });

      isModifiedExceptPart(state, csid, exceptPart).should.equal(false);
    });

    it('should return false if current document is referentially equal to baseline document', () => {
      const document = Immutable.fromJS({
        'ns2:collectionspace_common': {},
      });

      const state = Immutable.fromJS({
        [csid]: {
          data: {
            baseline: {
              document,
            },
            current: {
              document,
            },
          },
        },
      });

      isModifiedExceptPart(state, csid, exceptPart).should.equal(false);
    });

    it('should return false if no part in the current document is referentially not equal to a part in the baseline document', () => {
      const commonPartData = Immutable.fromJS({
        foo: '1',
        bar: '2',
      });

      const state = Immutable.fromJS({
        [csid]: {
          data: {
            baseline: {
              document: {
                'ns2:collectionspace_common': commonPartData,
              },
            },
            current: {
              document: {
                'ns2:collectionspace_common': commonPartData,
              },
            },
          },
        },
      });

      isModifiedExceptPart(state, csid, exceptPart).should.equal(false);
    });

    it('should return true if the a part other than the excepted part in the current document is referentially not equal to a part in the baseline document', () => {
      const state = Immutable.fromJS({
        [csid]: {
          data: {
            baseline: {
              document: {
                'ns2:collectionspace_common': {
                  foo: '1',
                },
              },
            },
            current: {
              document: {
                'ns2:collectionspace_common': {
                  foo: '2',
                },
              },
            },
          },
        },
      });

      isModifiedExceptPart(state, csid, exceptPart).should.equal(true);
    });

    it('should return false if the only part in the current document is referentially not equal to a part in the baseline document is the excepted part', () => {
      const state = Immutable.fromJS({
        [csid]: {
          data: {
            baseline: {
              document: {
                [exceptPart]: {
                  foo: '1',
                },
              },
            },
            current: {
              document: {
                [exceptPart]: {
                  foo: '2',
                },
              },
            },
          },
        },
      });

      isModifiedExceptPart(state, csid, exceptPart).should.equal(false);
    });

    it('should return true if a subrecord has been modified', () => {
      const data = Immutable.fromJS({
        document: {
          'ns2:collectionspace_common': {},
        },
      });

      const state = Immutable.fromJS({
        [csid]: {
          data: {
            baseline: data,
            current: data,
          },
          subrecord: {
            blob: '5555',
          },
        },
        5555: {
          data: {
            baseline: {
              foo: '1',
            },
            current: {
              bar: '2',
            },
          },
        },
      });

      isModifiedExceptPart(state, csid, exceptPart).should.equal(true);
    });
  });
});
