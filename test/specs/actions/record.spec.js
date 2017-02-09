import Immutable from 'immutable';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

import {
  configureCSpace,
} from '../../../src/actions/cspace';

import {
  CREATE_NEW_RECORD,
  RECORD_READ_STARTED,
  RECORD_READ_FULFILLED,
  RECORD_READ_REJECTED,
  RECORD_SAVE_STARTED,
  RECORD_SAVE_FULFILLED,
  RECORD_SAVE_REJECTED,
  ADD_FIELD_INSTANCE,
  DELETE_FIELD_VALUE,
  MOVE_FIELD_VALUE,
  SET_FIELD_VALUE,
  createNewRecord,
  readRecord,
  saveRecord,
  addFieldInstance,
  deleteFieldValue,
  moveFieldValue,
  setFieldValue,
} from '../../../src/actions/record';

chai.should();

describe('record action creator', function suite() {
  describe('createNewRecord', function actionSuite() {
    const mockStore = configureMockStore([thunk]);

    it('should dispatch CREATE_NEW_RECORD', function test() {
      const store = mockStore({});
      const recordTypeConfig = {};

      return store.dispatch(createNewRecord(recordTypeConfig))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(1);

          actions[0].should.deep.equal({
            type: CREATE_NEW_RECORD,
            meta: {
              recordTypeConfig,
            },
          });
        });
    });
  });

  describe('readRecord', function actionSuite() {
    context('for an object/procedure', function contextSuite() {
      const mockStore = configureMockStore([thunk]);
      const servicePath = 'collectionobjects';
      const csid = '1234';
      const readRecordUrl = new RegExp(`^/cspace-services/${servicePath}/${csid}.*`);

      const recordTypeConfig = {
        serviceConfig: {
          servicePath,
        },
      };

      const vocabularyConfig = null;

      before(() => {
        configureCSpace({});
      });

      beforeEach(() => {
        moxios.install();
      });

      afterEach(() => {
        moxios.uninstall();
      });

      it('should dispatch RECORD_READ_FULFILLED on success', function test() {
        moxios.stubRequest(readRecordUrl, {
          status: 200,
          response: {},
        });

        const store = mockStore({});

        return store.dispatch(readRecord(recordTypeConfig, vocabularyConfig, csid))
          .then(() => {
            const actions = store.getActions();

            actions.should.have.lengthOf(2);

            actions[0].should.deep.equal({
              type: RECORD_READ_STARTED,
              meta: {
                csid,
                recordTypeConfig,
              },
            });

            actions[1].should.deep.equal({
              type: RECORD_READ_FULFILLED,
              payload: {
                status: 200,
                statusText: undefined,
                headers: undefined,
                data: {},
              },
              meta: {
                csid,
                recordTypeConfig,
              },
            });
          });
      });

      it('should dispatch RECORD_READ_REJECTED on error', function test() {
        moxios.stubRequest(readRecordUrl, {
          status: 400,
          response: {},
        });

        const store = mockStore({});

        return store.dispatch(readRecord(recordTypeConfig, vocabularyConfig, csid))
          .then(() => {
            const actions = store.getActions();

            actions.should.have.lengthOf(2);

            actions[0].should.deep.equal({
              type: RECORD_READ_STARTED,
              meta: {
                csid,
                recordTypeConfig,
              },
            });

            actions[1].should.have.property('type', RECORD_READ_REJECTED);
            actions[1].should.have.property('meta')
              .that.deep.equals({
                csid,
                recordTypeConfig,
              });
          });
      });
    });

    context('for an authority', function contextSuite() {
      const mockStore = configureMockStore([thunk]);
      const recordServicePath = 'personauthorities';
      const vocabularyServicePath = 'urn:cspace:name(person)';
      const csid = '1234';
      const readRecordUrl = new RegExp(`^/cspace-services/${recordServicePath}/${vocabularyServicePath.replace('(', '\\(').replace(')', '\\)')}/items/${csid}.*`);

      const recordTypeConfig = {
        serviceConfig: {
          servicePath: recordServicePath,
        },
      };

      const vocabularyConfig = {
        serviceConfig: {
          servicePath: vocabularyServicePath,
        },
      };

      before(() => {
        configureCSpace({});
      });

      beforeEach(() => {
        moxios.install();
      });

      afterEach(() => {
        moxios.uninstall();
      });

      it('should dispatch RECORD_READ_FULFILLED on success', function test() {
        moxios.stubRequest(readRecordUrl, {
          status: 200,
          response: {},
        });

        const store = mockStore({});

        return store.dispatch(readRecord(recordTypeConfig, vocabularyConfig, csid))
          .then(() => {
            const actions = store.getActions();

            actions.should.have.lengthOf(2);

            actions[0].should.deep.equal({
              type: RECORD_READ_STARTED,
              meta: {
                csid,
                recordTypeConfig,
              },
            });

            actions[1].should.deep.equal({
              type: RECORD_READ_FULFILLED,
              payload: {
                status: 200,
                statusText: undefined,
                headers: undefined,
                data: {},
              },
              meta: {
                csid,
                recordTypeConfig,
              },
            });
          });
      });
    });
  });

  describe('saveRecord', function actionSuite() {
    context('for an object/procedure', function contextSuite() {
      const mockStore = configureMockStore([thunk]);
      const recordType = 'object';
      const servicePath = 'collectionobjects';
      const csid = '5678';
      const saveRecordUrl = `/cspace-services/${servicePath}/${csid}`;
      const readRecordUrl = new RegExp(`^/cspace-services/${servicePath}/${csid}.*`);
      const saveNewRecordUrl = `/cspace-services/${servicePath}`;

      const recordTypeConfig = {
        name: recordType,
        serviceConfig: {
          servicePath,
        },
      };

      before(() => {
        configureCSpace({});
      });

      beforeEach(() => {
        moxios.install();
      });

      afterEach(() => {
        moxios.uninstall();
      });

      it('should dispatch RECORD_SAVE_FULFILLED on success', function test() {
        moxios.stubRequest(saveRecordUrl, {
          status: 200,
          response: {},
        });

        moxios.stubRequest(readRecordUrl, {
          status: 200,
          response: {},
        });

        const store = mockStore({
          record: {
            data: {
              [csid]: Immutable.fromJS({
                document: {},
              }),
            },
          },
        });

        return store.dispatch(saveRecord(recordTypeConfig, undefined, csid))
          .then(() => {
            const actions = store.getActions();

            actions.should.have.lengthOf(2);

            actions[0].should.deep.equal({
              type: RECORD_SAVE_STARTED,
              meta: {
                csid,
                recordTypeConfig,
              },
            });

            actions[1].should.deep.equal({
              type: RECORD_SAVE_FULFILLED,
              payload: {
                status: 200,
                statusText: undefined,
                headers: undefined,
                data: {},
              },
              meta: {
                csid,
                recordTypeConfig,
              },
            });
          });
      });

      it('should dispatch RECORD_SAVE_REJECTED on error', function test() {
        moxios.stubRequest(saveRecordUrl, {
          status: 400,
          response: {},
        });

        const store = mockStore({
          record: {
            data: {
              [csid]: Immutable.fromJS({
                document: {},
              }),
            },
          },
        });

        return store.dispatch(saveRecord(recordTypeConfig, undefined, csid))
          .then(() => {
            const actions = store.getActions();

            actions.should.have.lengthOf(2);

            actions[0].should.deep.equal({
              type: RECORD_SAVE_STARTED,
              meta: {
                csid,
                recordTypeConfig,
              },
            });

            actions[1].should.have.property('type', RECORD_SAVE_REJECTED);
            actions[1].should.have.property('meta')
              .that.deep.equals({
                csid,
                recordTypeConfig,
              });
          });
      });

      it('should replace the URL when a new record is saved', function test() {
        const createdCsid = '6789';

        // Mock a response for a newly created record.

        moxios.stubRequest(saveNewRecordUrl, {
          status: 201,
          headers: {
            location: `some/new/url/${createdCsid}`,
          },
        });

        const store = mockStore({
          record: {
            data: {
              '': Immutable.fromJS({
                document: {},
              }),
            },
          },
        });

        let replaceArg = null;

        const replace = (arg) => {
          replaceArg = arg;
        };

        // Pass an empty csid and a replace function to saveRecord.

        return store.dispatch(saveRecord(recordTypeConfig, undefined, '', replace))
          .then(() => {
            const actions = store.getActions();

            actions.should.have.lengthOf(2);

            actions[0].should.deep.equal({
              type: RECORD_SAVE_STARTED,
              meta: {
                csid: '',
                recordTypeConfig,
              },
            });

            actions[1].should.deep.equal({
              type: RECORD_SAVE_FULFILLED,
              payload: {
                status: 201,
                statusText: undefined,
                headers: {
                  location: 'some/new/url/6789',
                },
                data: undefined,
              },
              meta: {
                csid: '',
                recordTypeConfig,
              },
            });

            // The replace function should be called.

            replaceArg.should.equal(`/record/${recordType}/${createdCsid}`);
          });
      });
    });

    context('for an authority', function contextSuite() {
      const mockStore = configureMockStore([thunk]);
      const recordType = 'person';
      const recordServicePath = 'personauthorities';
      const vocabulary = 'ulan';
      const vocabularyServicePath = 'urn:cspace:name(ulan)';
      const csid = '5678';
      const saveRecordUrl = `/cspace-services/${recordServicePath}/${vocabularyServicePath}/items/${csid}`;
      const readRecordUrl = new RegExp(`^/cspace-services/${recordServicePath}/${vocabularyServicePath.replace('(', '\\(').replace(')', '\\)')}/items/${csid}.*`);

      const vocabularyConfig = {
        name: vocabulary,
        serviceConfig: {
          servicePath: vocabularyServicePath,
        },
      };

      const recordTypeConfig = {
        name: recordType,
        serviceConfig: {
          servicePath: recordServicePath,
        },
        vocabularies: {
          [vocabulary]: vocabularyConfig,
        },
      };

      before(() => {
        configureCSpace({});
      });

      beforeEach(() => {
        moxios.install();
      });

      afterEach(() => {
        moxios.uninstall();
      });

      it('should dispatch RECORD_SAVE_FULFILLED on success', function test() {
        moxios.stubRequest(saveRecordUrl, {
          status: 200,
          response: {},
        });

        moxios.stubRequest(readRecordUrl, {
          status: 200,
          response: {},
        });

        const store = mockStore({
          record: {
            data: {
              [csid]: Immutable.fromJS({
                document: {},
              }),
            },
          },
        });

        return store.dispatch(saveRecord(recordTypeConfig, vocabularyConfig, csid))
          .then(() => {
            const actions = store.getActions();

            actions.should.have.lengthOf(2);

            actions[0].should.deep.equal({
              type: RECORD_SAVE_STARTED,
              meta: {
                csid,
                recordTypeConfig,
              },
            });

            actions[1].should.deep.equal({
              type: RECORD_SAVE_FULFILLED,
              payload: {
                status: 200,
                statusText: undefined,
                headers: undefined,
                data: {},
              },
              meta: {
                csid,
                recordTypeConfig,
              },
            });
          });
      });
    });
  });

  describe('addFieldInstance', function actionSuite() {
    it('should create an ADD_FIELD_INSTANCE action', function test() {
      const csid = '1234';
      const path = ['path', 'to', 'a', 'field'];
      const recordTypeConfig = {};

      addFieldInstance(recordTypeConfig, csid, path).should.deep.equal({
        type: ADD_FIELD_INSTANCE,
        meta: {
          csid,
          path,
          recordTypeConfig,
        },
      });
    });
  });

  describe('deleteFieldValue', function actionSuite() {
    it('should create a DELETE_FIELD_VALUE action', function test() {
      const csid = '1234';
      const path = ['path', 'to', 'a', 'field'];

      deleteFieldValue(csid, path).should.deep.equal({
        type: DELETE_FIELD_VALUE,
        meta: {
          csid,
          path,
        },
      });
    });
  });

  describe('moveFieldValue', function actionSuite() {
    it('should create a MOVE_FIELD_VALUE action', function test() {
      const csid = '1234';
      const path = ['path', 'to', 'a', 'field', '2'];
      const newPosition = '0';

      moveFieldValue(csid, path, newPosition).should.deep.equal({
        type: MOVE_FIELD_VALUE,
        meta: {
          csid,
          path,
          newPosition,
        },
      });
    });
  });

  describe('setFieldValue', function actionSuite() {
    it('should create a SET_FIELD_VALUE action', function test() {
      const csid = '1234';
      const path = ['path', 'to', 'a', 'field'];
      const value = 'foo';

      setFieldValue(csid, path, value).should.deep.equal({
        type: SET_FIELD_VALUE,
        payload: value,
        meta: {
          csid,
          path,
        },
      });
    });
  });
});
