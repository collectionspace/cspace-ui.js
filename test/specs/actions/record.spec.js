/* global window */

import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { searchKey } from '../../../src/reducers/search';

import {
  ERR_MISSING_REQ_FIELD,
} from '../../../src/constants/errorCodes';

import {
  STATUS_ERROR,
  STATUS_PENDING,
  STATUS_SUCCESS,
} from '../../../src/constants/notificationStatusCodes';

import {
  configKey,
} from '../../../src/helpers/configHelpers';

import {
  ERROR_KEY,
} from '../../../src/helpers/recordDataHelpers';

import {
  configureCSpace,
} from '../../../src/actions/cspace';

import {
  SHOW_NOTIFICATION,
  REMOVE_NOTIFICATION,
  NOTIFICATION_ID_VALIDATION,
} from '../../../src/actions/notification';

import {
  CREATE_NEW_RECORD,
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
  SUBRECORD_CREATED,
  SUBRECORD_READ_FULFILLED,
  REVERT_RECORD,
  ADD_FIELD_INSTANCE,
  DELETE_FIELD_VALUE,
  MOVE_FIELD_VALUE,
  SET_FIELD_VALUE,
  VALIDATION_FAILED,
  VALIDATION_PASSED,
  createNewRecord,
  readRecord,
  saveRecord,
  revertRecord,
  transitionRecord,
  addFieldInstance,
  deleteFieldValue,
  moveFieldValue,
  setFieldValue,
} from '../../../src/actions/record';

import {
  SEARCH_STARTED,
  SEARCH_FULFILLED,
  SET_MOST_RECENT_SEARCH,
} from '../../../src/actions/search';

const expect = chai.expect;

chai.use(chaiImmutable);
chai.should();

describe('record action creator', function suite() {
  describe('createNewRecord', function actionSuite() {
    const mockStore = configureMockStore([thunk]);

    before(() => {
      const store = mockStore({
        user: Immutable.Map(),
      });

      return store.dispatch(configureCSpace());
    });

    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });

    it('should dispatch CREATE_NEW_RECORD', function test() {
      const store = mockStore({});

      const config = {
        foo: 'abc',
      };

      const recordTypeConfig = {
        bar: '123',
      };

      const vocabularyConfig = {
        baz: 'xyz',
      };

      const cloneCsid = undefined;

      return store.dispatch(createNewRecord(config, recordTypeConfig, vocabularyConfig, cloneCsid))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(1);

          actions[0].should.deep.equal({
            type: CREATE_NEW_RECORD,
            meta: {
              config,
              recordTypeConfig,
              cloneCsid,
            },
          });
        });
    });

    it('should read the record to be cloned', function test() {
      const servicePath = 'collectionobjects';

      const config = {
        foo: 'abc',
      };

      const recordTypeConfig = {
        serviceConfig: {
          servicePath,
        },
      };

      const vocabularyConfig = null;
      const cloneCsid = '1234';
      const readRecordUrl = new RegExp(`^/cspace-services/${servicePath}/${cloneCsid}.*`);

      moxios.stubRequest(readRecordUrl, {
        status: 200,
        response: {},
      });

      const store = mockStore({
        record: Immutable.Map(),
      });

      return store.dispatch(createNewRecord(config, recordTypeConfig, vocabularyConfig, cloneCsid))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(3);

          actions[0].should.deep.equal({
            type: RECORD_READ_STARTED,
            meta: {
              csid: cloneCsid,
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
              csid: cloneCsid,
              recordTypeConfig,
            },
          });

          actions[2].should.deep.equal({
            type: CREATE_NEW_RECORD,
            meta: {
              config,
              recordTypeConfig,
              cloneCsid,
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

      const config = {};

      const recordTypeConfig = {
        serviceConfig: {
          servicePath,
        },
      };

      const vocabularyConfig = null;

      before(() => {
        const store = mockStore({
          user: Immutable.Map(),
        });

        return store.dispatch(configureCSpace());
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

        const store = mockStore({
          record: Immutable.Map(),
        });

        return store.dispatch(readRecord(config, recordTypeConfig, vocabularyConfig, csid))
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

        const store = mockStore({
          record: Immutable.Map(),
        });

        return store.dispatch(readRecord(config, recordTypeConfig, vocabularyConfig, csid))
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

      it('should return null if a read is already pending for the given csid', function test() {
        const store = mockStore({
          record: Immutable.fromJS({
            [csid]: {
              isReadPending: true,
            },
          }),
        });

        expect(store.dispatch(readRecord(config, recordTypeConfig, vocabularyConfig, csid)))
          .to.equal(null);
      });

      it('should return null if data is already available for the given csid', function test() {
        const store = mockStore({
          record: Immutable.fromJS({
            [csid]: {
              data: {
                current: {},
              },
            },
          }),
        });

        expect(store.dispatch(readRecord(config, recordTypeConfig, vocabularyConfig, csid)))
          .to.equal(null);
      });
    });

    context('for an authority', function contextSuite() {
      const mockStore = configureMockStore([thunk]);
      const recordServicePath = 'personauthorities';
      const vocabularyServicePath = 'urn:cspace:name(person)';
      const csid = '1234';
      const readRecordUrl = new RegExp(`^/cspace-services/${recordServicePath}/${vocabularyServicePath.replace('(', '\\(').replace(')', '\\)')}/items/${csid}.*`);

      const config = {};

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
        const store = mockStore({
          user: Immutable.Map(),
        });

        return store.dispatch(configureCSpace());
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

        const store = mockStore({
          record: Immutable.Map(),
        });

        return store.dispatch(readRecord(config, recordTypeConfig, vocabularyConfig, csid))
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

    context('for a record with subrecords', function contextSuite() {
      const mockStore = configureMockStore([thunk]);
      const recordType = 'person';
      const recordServicePath = 'personauthorities';
      const vocabulary = 'local';
      const vocabularyServicePath = 'urn:cspace:name(person)';
      const csid = '5678';
      const subrecordName = 'contact';
      const subrecordType = 'contact';
      const subrecordServicePath = 'contacts';
      const subrecordSubresource = 'contacts';
      const subrecordSubresourceServicePath = 'contacts';
      const subrecordCsid = 'abcd';
      const readRecordUrl = new RegExp(`^/cspace-services/${recordServicePath}/${vocabularyServicePath.replace('(', '\\(').replace(')', '\\)')}/items/${csid}.*`);
      const searchSubrecordUrl = new RegExp(`^/cspace-services/${recordServicePath}/${vocabularyServicePath.replace('(', '\\(').replace(')', '\\)')}/items/${csid}/${subrecordSubresourceServicePath}.*`);
      const readSubrecordUrl = `/cspace-services/${subrecordServicePath}/${subrecordCsid}?showRelations=true&wf_deleted=false`;

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
        subrecords: {
          [subrecordName]: {
            recordType: subrecordType,
            subresource: subrecordSubresource,
          },
          foo: {
            // This subrecord config doesn't contain a subresource or csidField, so it should have
            // no effect.
          },
        },
        title: () => '',
        vocabularies: {
          [vocabulary]: vocabularyConfig,
        },
      };

      const subresourceConfig = {
        recordType: subrecordType,
        serviceConfig: {
          servicePath: subrecordSubresourceServicePath,
        },
      };

      const subrecordTypeConfig = {
        name: subrecordType,
        serviceConfig: {
          servicePath: subrecordServicePath,
        },
        title: () => '',
      };

      const config = {
        listTypes: {
          common: {
            listNodeName: 'ns2:abstract-common-list',
            itemNodeName: 'list-item',
          },
        },
        recordTypes: {
          [recordType]: recordTypeConfig,
          [subrecordType]: subrecordTypeConfig,
        },
        subresources: {
          [subrecordSubresource]: subresourceConfig,
        },
      };

      const expectedSubrecordSearchDescriptor = Immutable.fromJS({
        recordType,
        vocabulary,
        csid,
        subresource: subrecordSubresource,
        searchQuery: {
          p: 0,
          size: 1,
        },
      });

      const expectedSubrecordSearchName = `subrecords/${csid}/${subrecordName}`;

      before(() => {
        const store = mockStore({
          user: Immutable.Map(),
        });

        return store.dispatch(configureCSpace());
      });

      beforeEach(() => {
        moxios.install();
      });

      afterEach(() => {
        moxios.uninstall();
      });

      it('should dispatch SEARCH_STARTED and SEARCH_FULFILLED when a subrecord search is needed', function test() {
        moxios.stubRequest(searchSubrecordUrl, {
          status: 200,
          response: {
            'ns2:abstract-common-list': {
              'list-item': {
                csid: subrecordCsid,
              },
            },
          },
        });

        moxios.stubRequest(readRecordUrl, {
          status: 200,
          response: {},
        });

        const store = mockStore({
          record: Immutable.Map(),
          search: Immutable.Map(
            // No subrecord search results, so a subrecord search should be initiated.
          ),
        });

        return store.dispatch(readRecord(config, recordTypeConfig, vocabularyConfig, csid))
          .then(() => {
            const actions = store.getActions();

            actions.should.have.lengthOf(4);

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

            actions[2].type.should.equal(SEARCH_STARTED);
            actions[2].meta.searchDescriptor.should.equal(expectedSubrecordSearchDescriptor);
            actions[2].meta.searchName.should.equal(expectedSubrecordSearchName);

            actions[3].type.should.equal(SEARCH_FULFILLED);
            actions[3].meta.searchDescriptor.should.equal(expectedSubrecordSearchDescriptor);
            actions[3].meta.searchName.should.equal(expectedSubrecordSearchName);
          });
      });

      it('should dispatch SUBRECORD_READ_FULFILLED after reading the container record and subrecord', function test() {
        moxios.stubRequest(readSubrecordUrl, {
          status: 200,
          response: {},
        });

        moxios.stubRequest(readRecordUrl, {
          status: 200,
          response: {},
        });

        const store = mockStore({
          record: Immutable.Map(),
          search: Immutable.fromJS({
            [expectedSubrecordSearchName]: {
              byKey: {
                [searchKey(expectedSubrecordSearchDescriptor)]: {
                  result: {
                    'ns2:abstract-common-list': {
                      'list-item': {
                        csid: subrecordCsid,
                      },
                    },
                  },
                },
              },
            },
          }),
        });

        return store.dispatch(readRecord(config, recordTypeConfig, vocabularyConfig, csid))
          .then(() => {
            const actions = store.getActions();

            actions.should.have.lengthOf(6);

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

            actions[2].type.should.equal(SET_MOST_RECENT_SEARCH);

            actions[3].should.deep.equal({
              type: RECORD_READ_STARTED,
              meta: {
                csid: subrecordCsid,
                recordTypeConfig: subrecordTypeConfig,
              },
            });

            actions[4].should.deep.equal({
              type: RECORD_READ_FULFILLED,
              payload: {
                status: 200,
                statusText: undefined,
                headers: undefined,
                data: {},
              },
              meta: {
                csid: subrecordCsid,
                recordTypeConfig: subrecordTypeConfig,
              },
            });

            actions[5].should.deep.equal({
              type: SUBRECORD_READ_FULFILLED,
              meta: {
                csid,
                subrecordCsid,
                subrecordName,
              },
            });
          });
      });
    });
  });

  describe('saveRecord', function actionSuite() {
    context('for an object/procedure', function contextSuite() {
      const mockStore = configureMockStore([thunk]);
      const recordType = 'collectionobject';
      const servicePath = 'collectionobjects';
      const csid = '5678';
      const saveRecordUrl = `/cspace-services/${servicePath}/${csid}`;
      const readRecordUrl = new RegExp(`^/cspace-services/${servicePath}/${csid}.*`);
      const saveNewRecordUrl = `/cspace-services/${servicePath}`;

      const config = {};

      const recordTypeConfig = {
        name: recordType,
        serviceConfig: {
          servicePath,
        },
        title: () => '',
      };

      before(() => {
        const store = mockStore({
          user: Immutable.Map(),
        });

        return store.dispatch(configureCSpace());
      });

      beforeEach(() => {
        moxios.install();
      });

      afterEach(() => {
        moxios.uninstall();
      });

      it('should dispatch RECORD_SAVE_REJECTED if there are validation errors', function test() {
        const recordTypeConfigWithRequiredField = Object.assign({}, recordTypeConfig, {
          fields: {
            objectNumber: {
              [configKey]: {
                required: true,
              },
            },
          },
        });

        const store = mockStore({
          record: Immutable.fromJS({
            [csid]: {
              data: {
                current: {
                  document: {
                    'ns2:collectionspace_core': {
                      uri: `/${servicePath}/${csid}`,
                    },
                  },
                },
              },
              validation: {},
            },
          }),
        });

        store.dispatch(saveRecord(config, recordTypeConfigWithRequiredField, undefined, csid));

        return new Promise((resolve) => {
          setTimeout(() => {
            const actions = store.getActions();

            actions.should.have.lengthOf(4);

            actions[0].should.deep.equal({
              type: RECORD_SAVE_STARTED,
              meta: {
                csid,
              },
            });

            actions[1].type.should.equal(VALIDATION_FAILED);
            actions[1].payload.should.equal(Immutable.Map().setIn(['objectNumber', ERROR_KEY, 'code'], ERR_MISSING_REQ_FIELD));
            actions[1].meta.should.deep.equal({
              csid,
              path: [],
            });

            actions[2].should.have.property('type', SHOW_NOTIFICATION);
            actions[2].should.have.deep.property('payload.status', STATUS_ERROR);

            actions[3].should.have.property('type', RECORD_SAVE_REJECTED);
            actions[3].should.have.property('meta')
              .that.deep.equals({
                csid,
              });

            resolve();
          }, 0);
        });
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
          record: Immutable.fromJS({
            [csid]: {
              data: {
                current: {
                  document: {
                    'ns2:collectionspace_core': {
                      uri: `/${servicePath}/${csid}`,
                    },
                  },
                },
              },
            },
          }),
        });

        return store.dispatch(saveRecord(config, recordTypeConfig, undefined, csid))
          .then(() => {
            const actions = store.getActions();

            actions.should.have.lengthOf(6);

            actions[0].should.deep.equal({
              type: RECORD_SAVE_STARTED,
              meta: {
                csid,
              },
            });

            actions[1].should.deep.equal({
              type: 'VALIDATION_PASSED',
              meta: {
                csid,
                path: [],
              },
            });

            actions[2].should.deep.equal({
              type: REMOVE_NOTIFICATION,
              meta: {
                notificationID: NOTIFICATION_ID_VALIDATION,
              },
            });

            actions[3].should.have.property('type', SHOW_NOTIFICATION);
            actions[3].should.have.deep.property('payload.status', STATUS_PENDING);

            actions[4].should.have.property('type', SHOW_NOTIFICATION);
            actions[4].should.have.deep.property('payload.status', STATUS_SUCCESS);

            actions[5].should.deep.equal({
              type: RECORD_SAVE_FULFILLED,
              payload: {
                status: 200,
                statusText: undefined,
                headers: undefined,
                data: {},
              },
              meta: {
                csid,
                relatedSubjectCsid: undefined,
              },
            });
          });
      });

      it('should dispatch RECORD_SAVE_REJECTED on an update error', function test() {
        moxios.stubRequest(saveRecordUrl, {
          status: 400,
          response: {},
        });

        const store = mockStore({
          record: Immutable.fromJS({
            [csid]: {
              data: {
                current: {
                  document: {
                    'ns2:collectionspace_core': {
                      uri: `/${servicePath}/${csid}`,
                    },
                  },
                },
              },
            },
          }),
        });

        return store.dispatch(saveRecord(config, recordTypeConfig, undefined, csid))
          .catch(() => {
            const actions = store.getActions();

            actions.should.have.lengthOf(6);

            actions[0].should.deep.equal({
              type: RECORD_SAVE_STARTED,
              meta: {
                csid,
              },
            });

            actions[1].should.deep.equal({
              type: 'VALIDATION_PASSED',
              meta: {
                csid,
                path: [],
              },
            });

            actions[2].should.deep.equal({
              type: REMOVE_NOTIFICATION,
              meta: {
                notificationID: NOTIFICATION_ID_VALIDATION,
              },
            });

            actions[3].should.have.property('type', SHOW_NOTIFICATION);
            actions[3].should.have.deep.property('payload.status', STATUS_PENDING);

            actions[4].should.have.property('type', SHOW_NOTIFICATION);
            actions[4].should.have.deep.property('payload.status', STATUS_ERROR);

            actions[5].should.have.property('type', RECORD_SAVE_REJECTED);
            actions[5].should.have.property('meta')
              .that.deep.equals({
                csid,
              });
          });
      });

      it('should dispatch RECORD_SAVE_REJECTED on a create error', function test() {
        moxios.stubRequest(saveNewRecordUrl, {
          status: 400,
          response: {},
        });

        const store = mockStore({
          record: Immutable.fromJS({
            '': {
              data: {
                current: {
                  document: {},
                },
              },
            },
          }),
        });

        return store.dispatch(saveRecord(config, recordTypeConfig, undefined, ''))
          .catch(() => {
            const actions = store.getActions();

            actions.should.have.lengthOf(6);

            actions[0].should.deep.equal({
              type: RECORD_SAVE_STARTED,
              meta: {
                csid: '',
              },
            });

            actions[1].should.deep.equal({
              type: 'VALIDATION_PASSED',
              meta: {
                csid: '',
                path: [],
              },
            });

            actions[2].should.deep.equal({
              type: REMOVE_NOTIFICATION,
              meta: {
                notificationID: NOTIFICATION_ID_VALIDATION,
              },
            });

            actions[3].should.have.property('type', SHOW_NOTIFICATION);
            actions[3].should.have.deep.property('payload.status', STATUS_PENDING);

            actions[4].should.have.property('type', SHOW_NOTIFICATION);
            actions[4].should.have.deep.property('payload.status', STATUS_ERROR);

            actions[5].should.have.property('type', RECORD_SAVE_REJECTED);
            actions[5].should.have.property('meta')
              .that.deep.equals({
                csid: '',
              });
          });
      });

      it('should dispatch RECORD_SAVE_REJECTED if a create request does not return a 201 with a location', function test() {
        moxios.stubRequest(saveNewRecordUrl, {
          status: 200,
          response: {},
        });

        const store = mockStore({
          record: Immutable.fromJS({
            '': {
              data: {
                current: {
                  document: {},
                },
              },
            },
          }),
        });

        return store.dispatch(saveRecord(config, recordTypeConfig, undefined, ''))
          .catch(() => {
            const actions = store.getActions();

            actions.should.have.lengthOf(6);

            actions[0].should.deep.equal({
              type: RECORD_SAVE_STARTED,
              meta: {
                csid: '',
              },
            });

            actions[1].should.deep.equal({
              type: 'VALIDATION_PASSED',
              meta: {
                csid: '',
                path: [],
              },
            });

            actions[2].should.deep.equal({
              type: REMOVE_NOTIFICATION,
              meta: {
                notificationID: NOTIFICATION_ID_VALIDATION,
              },
            });

            actions[3].should.have.property('type', SHOW_NOTIFICATION);
            actions[3].should.have.deep.property('payload.status', STATUS_PENDING);

            actions[4].should.have.property('type', SHOW_NOTIFICATION);
            actions[4].should.have.deep.property('payload.status', STATUS_ERROR);

            actions[5].should.have.property('type', RECORD_SAVE_REJECTED);
            actions[5].should.have.property('meta')
              .that.deep.equals({
                csid: '',
              });
          });
      });

      it('should call the passed callback when a new record is saved', function test() {
        const createdCsid = '6789';

        let reportedCreatedCsid = null;

        const handleRecordCreated = (createdCsidArg) => {
          reportedCreatedCsid = createdCsidArg;
        };

        // Mock a response for a newly created record.

        moxios.stubRequest(saveNewRecordUrl, {
          status: 201,
          headers: {
            location: `some/new/url/${createdCsid}`,
          },
        });

        moxios.stubRequest(`${saveNewRecordUrl}/${createdCsid}?showRelations=true&wf_deleted=false`, {
          status: 200,
          response: {},
        });

        const store = mockStore({
          record: Immutable.fromJS({
            '': {
              data: {
                current: {
                  document: {},
                },
              },
            },
          }),
        });

        // Pass an empty csid and a replace function to saveRecord.

        return store.dispatch(saveRecord(config, recordTypeConfig, undefined, '', undefined, undefined, undefined, handleRecordCreated))
          .then(() => {
            const actions = store.getActions();

            actions.should.have.lengthOf(7);

            actions[0].should.deep.equal({
              type: RECORD_SAVE_STARTED,
              meta: {
                csid: '',
              },
            });

            actions[1].should.deep.equal({
              type: 'VALIDATION_PASSED',
              meta: {
                csid: '',
                path: [],
              },
            });

            actions[2].should.deep.equal({
              type: REMOVE_NOTIFICATION,
              meta: {
                notificationID: NOTIFICATION_ID_VALIDATION,
              },
            });

            actions[3].should.have.property('type', SHOW_NOTIFICATION);
            actions[3].should.have.deep.property('payload.status', STATUS_PENDING);

            actions[4].should.deep.equal({
              type: RECORD_CREATED,
              meta: {
                currentCsid: '',
                newRecordCsid: createdCsid,
              },
            });

            actions[5].should.have.property('type', SHOW_NOTIFICATION);
            actions[5].should.have.deep.property('payload.status', STATUS_SUCCESS);

            actions[6].should.deep.equal({
              type: RECORD_SAVE_FULFILLED,
              payload: {
                status: 200,
                statusText: undefined,
                headers: undefined,
                data: {},
              },
              meta: {
                csid: createdCsid,
                relatedSubjectCsid: undefined,
              },
            });

            reportedCreatedCsid.should.equal(createdCsid);
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

      const config = {};

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
        title: () => '',
        vocabularies: {
          [vocabulary]: vocabularyConfig,
        },
      };

      before(() => {
        const store = mockStore({
          user: Immutable.Map(),
        });

        return store.dispatch(configureCSpace());
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
          record: Immutable.fromJS({
            [csid]: {
              data: {
                current: {
                  document: {
                    'ns2:collectionspace_core': {
                      uri: `/${recordServicePath}/${vocabularyServicePath}/items/${csid}`,
                    },
                  },
                },
              },
            },
          }),
        });

        return store.dispatch(saveRecord(config, recordTypeConfig, vocabularyConfig, csid))
          .then(() => {
            const actions = store.getActions();

            actions.should.have.lengthOf(6);

            actions[0].should.deep.equal({
              type: RECORD_SAVE_STARTED,
              meta: {
                csid,
              },
            });

            actions[1].should.deep.equal({
              type: 'VALIDATION_PASSED',
              meta: {
                csid,
                path: [],
              },
            });

            actions[2].should.deep.equal({
              type: REMOVE_NOTIFICATION,
              meta: {
                notificationID: NOTIFICATION_ID_VALIDATION,
              },
            });

            actions[3].should.have.property('type', SHOW_NOTIFICATION);
            actions[3].should.have.deep.property('payload.status', STATUS_PENDING);

            actions[4].should.have.property('type', SHOW_NOTIFICATION);
            actions[4].should.have.deep.property('payload.status', STATUS_SUCCESS);

            actions[5].should.deep.equal({
              type: RECORD_SAVE_FULFILLED,
              payload: {
                status: 200,
                statusText: undefined,
                headers: undefined,
                data: {},
              },
              meta: {
                csid,
                relatedSubjectCsid: undefined,
              },
            });
          });
      });
    });

    context('for a record with subrecords', function contextSuite() {
      const mockStore = configureMockStore([thunk]);
      const recordType = 'person';
      const recordServicePath = 'personauthorities';
      const vocabulary = 'local';
      const vocabularyServicePath = 'urn:cspace:name(person)';
      const csid = '5678';
      const subrecordName = 'contact';
      const subrecordType = 'contact';
      const subrecordServicePath = 'contacts';
      const subrecordSubresource = 'contacts';
      const subrecordSubresourceServicePath = 'contacts';
      const subrecordCsid = 'abcd';
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
        subrecords: {
          [subrecordName]: {
            subresource: subrecordSubresource,
            saveAfterContainer: true,
          },
          foo: {
            // This subrecord config doesn't contain a subresource or csidField, so it should have
            // no effect.
            saveAfterContainer: true,
          },
        },
        title: () => '',
        vocabularies: {
          [vocabulary]: vocabularyConfig,
        },
      };

      const subresourceConfig = {
        recordType: subrecordType,
        serviceConfig: {
          servicePath: subrecordSubresourceServicePath,
        },
      };

      const subrecordTypeConfig = {
        name: subrecordType,
        serviceConfig: {
          servicePath: subrecordServicePath,
        },
        title: () => '',
      };

      const config = {
        recordTypes: {
          [recordType]: recordTypeConfig,
          [subrecordType]: subrecordTypeConfig,
        },
        subresources: {
          [subrecordSubresource]: subresourceConfig,
        },
      };

      before(() => {
        const store = mockStore({
          user: Immutable.Map(),
        });

        return store.dispatch(configureCSpace());
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
          record: Immutable.fromJS({
            [csid]: {
              data: {
                current: {
                  document: {
                    'ns2:collectionspace_core': {
                      uri: `/${recordServicePath}/${vocabularyServicePath}/items/${csid}`,
                    },
                  },
                },
              },
              subrecord: {
                [subrecordName]: subrecordCsid,
              },
            },
            [subrecordCsid]: {
              data: {
                current: {
                  document: {
                    'ns2:collectionspace_core': {
                      uri: `/${recordServicePath}/${vocabularyServicePath}/items/${csid}/${subrecordSubresourceServicePath}/${subrecordCsid}`,
                    },
                  },
                },
              },
            },
          }),
        });

        return store.dispatch(saveRecord(config, recordTypeConfig, vocabularyConfig, csid))
          .then(() => {
            const actions = store.getActions();

            actions.should.have.lengthOf(10);

            actions[0].should.deep.equal({
              type: RECORD_SAVE_STARTED,
              meta: {
                csid,
              },
            });

            actions[1].should.deep.equal({
              type: 'VALIDATION_PASSED',
              meta: {
                csid,
                path: [],
              },
            });

            actions[2].should.deep.equal({
              type: REMOVE_NOTIFICATION,
              meta: {
                notificationID: NOTIFICATION_ID_VALIDATION,
              },
            });

            actions[3].should.have.property('type', SHOW_NOTIFICATION);
            actions[3].should.have.deep.property('payload.status', STATUS_PENDING);

            actions[4].should.deep.equal({
              type: RECORD_SAVE_STARTED,
              meta: {
                csid: subrecordCsid,
              },
            });

            actions[5].should.deep.equal({
              type: 'VALIDATION_PASSED',
              meta: {
                csid: subrecordCsid,
                path: [],
              },
            });

            actions[6].should.deep.equal({
              type: REMOVE_NOTIFICATION,
              meta: {
                notificationID: NOTIFICATION_ID_VALIDATION,
              },
            });

            actions[7].should.deep.equal({
              type: RECORD_SAVE_FULFILLED,
              payload: {
                status: 200,
                statusText: undefined,
                headers: undefined,
                data: {},
              },
              meta: {
                csid: subrecordCsid,
                relatedSubjectCsid: undefined,
              },
            });

            actions[8].should.have.property('type', SHOW_NOTIFICATION);
            actions[8].should.have.deep.property('payload.status', STATUS_SUCCESS);

            actions[9].should.deep.equal({
              type: RECORD_SAVE_FULFILLED,
              payload: {
                status: 200,
                statusText: undefined,
                headers: undefined,
                data: {},
              },
              meta: {
                csid,
                relatedSubjectCsid: undefined,
              },
            });
          });
      });

      it('should dispatch SUBRECORD_CREATED if a subrecord is created', function test() {
        const newRecordCsid = '8888';
        const saveNewRecordUrl = `/cspace-services/${recordServicePath}/${vocabularyServicePath}/items/${csid}/${subrecordSubresourceServicePath}`;
        const readNewRecordUrl = `/cspace-services/${subrecordServicePath}/${newRecordCsid}?showRelations=true&wf_deleted=false`;

        moxios.stubRequest(saveNewRecordUrl, {
          status: 201,
          headers: {
            location: `/cspace-services/${recordServicePath}/${vocabularyServicePath}/items/${csid}/${subrecordSubresourceServicePath}/${newRecordCsid}`,
          },
        });

        moxios.stubRequest(readNewRecordUrl, {
          status: 200,
          response: {},
        });

        moxios.stubRequest(saveRecordUrl, {
          status: 200,
          response: {},
        });

        moxios.stubRequest(readRecordUrl, {
          status: 200,
          response: {},
        });

        const newSubrecordCsid = 'new';

        const store = mockStore({
          record: Immutable.fromJS({
            [csid]: {
              data: {
                current: {
                  document: {
                    'ns2:collectionspace_core': {
                      uri: `/${recordServicePath}/${vocabularyServicePath}/items/${csid}`,
                    },
                  },
                },
              },
              subrecord: {
                [subrecordName]: newSubrecordCsid,
              },
            },
            [newSubrecordCsid]: {
              data: {
                current: {
                  document: {
                    'ns2:collectionspace_core': {
                      // No uri, since it's a new record.
                    },
                  },
                },
              },
            },
          }),
        });

        return store.dispatch(saveRecord(config, recordTypeConfig, vocabularyConfig, csid))
          .then(() => {
            const actions = store.getActions();

            actions.should.have.lengthOf(12);

            actions[9].should.deep.equal({
              type: SUBRECORD_CREATED,
              meta: {
                csid,
                subrecordName,
                subrecordCsid: newRecordCsid,
              },
            });
          });
      });
    });
  });

  describe('revertRecord', function actionSuite() {
    const mockStore = configureMockStore([thunk]);

    it('should dispatch REVERT_RECORD', function test() {
      const store = mockStore({
        record: Immutable.Map(),
      });

      const recordTypeConfig = {};
      const csid = '1234';

      store.dispatch(revertRecord(recordTypeConfig, csid));

      const actions = store.getActions();

      actions.should.have.lengthOf(3);

      actions[0].should.deep.equal({
        type: REVERT_RECORD,
        meta: {
          csid,
        },
      });

      actions[1].should.deep.equal({
        type: 'VALIDATION_PASSED',
        meta: {
          csid,
          path: [],
        },
      });

      actions[2].should.deep.equal({
        type: REMOVE_NOTIFICATION,
        meta: {
          notificationID: NOTIFICATION_ID_VALIDATION,
        },
      });
    });
  });

  describe('addFieldInstance', function actionSuite() {
    const mockStore = configureMockStore([thunk]);

    it('should create an ADD_FIELD_INSTANCE action', function test() {
      const store = mockStore({
        record: Immutable.Map(),
      });

      const csid = '1234';
      const path = ['path', 'to', 'a', 'field'];
      const recordTypeConfig = {};

      store.dispatch(addFieldInstance(recordTypeConfig, csid, path));

      return new Promise((resolve) => {
        window.setTimeout(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(3);

          actions[0].should.deep.equal({
            type: ADD_FIELD_INSTANCE,
            meta: {
              csid,
              path,
              recordTypeConfig,
            },
          });

          actions[1].should.deep.equal({
            type: VALIDATION_PASSED,
            meta: {
              csid,
              path: [],
            },
          });

          actions[2].should.deep.equal({
            type: REMOVE_NOTIFICATION,
            meta: {
              notificationID: NOTIFICATION_ID_VALIDATION,
            },
          });

          resolve();
        }, 0);
      });
    });
  });

  describe('deleteFieldValue', function actionSuite() {
    const mockStore = configureMockStore([thunk]);

    it('should dispatch DELETE_FIELD_VALUE', function test() {
      const store = mockStore({
        record: Immutable.Map(),
      });

      const recordTypeConfig = {};
      const csid = '1234';
      const path = ['path', 'to', 'a', 'field'];

      store.dispatch(deleteFieldValue(recordTypeConfig, csid, path));

      return new Promise((resolve) => {
        window.setTimeout(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(3);

          actions[0].should.deep.equal({
            type: DELETE_FIELD_VALUE,
            meta: {
              csid,
              path,
            },
          });

          actions[1].should.deep.equal({
            type: 'VALIDATION_PASSED',
            meta: {
              csid,
              path: [],
            },
          });

          actions[2].should.deep.equal({
            type: REMOVE_NOTIFICATION,
            meta: {
              notificationID: NOTIFICATION_ID_VALIDATION,
            },
          });

          resolve();
        }, 0);
      });
    });
  });

  describe('moveFieldValue', function actionSuite() {
    const mockStore = configureMockStore([thunk]);

    it('should dispatch MOVE_FIELD_VALUE', function test() {
      const store = mockStore({
        record: Immutable.Map(),
      });

      const recordTypeConfig = {};
      const csid = '1234';
      const path = ['path', 'to', 'a', 'field', '2'];
      const newPosition = '0';

      store.dispatch(moveFieldValue(recordTypeConfig, csid, path, newPosition));

      return new Promise((resolve) => {
        window.setTimeout(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(3);

          actions[0].should.deep.equal({
            type: MOVE_FIELD_VALUE,
            meta: {
              csid,
              path,
              newPosition,
            },
          });

          actions[1].should.deep.equal({
            type: 'VALIDATION_PASSED',
            meta: {
              csid,
              path: [],
            },
          });

          actions[2].should.deep.equal({
            type: REMOVE_NOTIFICATION,
            meta: {
              notificationID: NOTIFICATION_ID_VALIDATION,
            },
          });

          resolve();
        }, 0);
      });
    });
  });

  describe('setFieldValue', function actionSuite() {
    const mockStore = configureMockStore([thunk]);

    it('should dispatch SET_FIELD_VALUE', function test() {
      const store = mockStore({
        record: Immutable.Map(),
      });

      const recordTypeConfig = {};
      const csid = '1234';
      const path = ['path', 'to', 'a', 'field'];
      const value = 'foo';

      store.dispatch(setFieldValue(recordTypeConfig, csid, path, value));

      return new Promise((resolve) => {
        window.setTimeout(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(3);

          actions[0].should.deep.equal({
            type: SET_FIELD_VALUE,
            payload: value,
            meta: {
              csid,
              path,
            },
          });

          actions[1].should.deep.equal({
            type: 'VALIDATION_PASSED',
            meta: {
              csid,
              path: [],
            },
          });

          actions[2].should.deep.equal({
            type: REMOVE_NOTIFICATION,
            meta: {
              notificationID: NOTIFICATION_ID_VALIDATION,
            },
          });

          resolve();
        }, 0);
      });
    });
  });

  describe('transitionRecord', function actionSuite() {
    context('for an object/procedure', function contextSuite() {
      const mockStore = configureMockStore([thunk]);
      const recordType = 'collectionobject';
      const servicePath = 'collectionobjects';
      const csid = '5678';
      const transitionName = 'delete';
      const transitionRecordUrl = new RegExp(`^/cspace-services/${servicePath}/${csid}/workflow/${transitionName}.*`);

      const recordTypeConfig = {
        name: recordType,
        serviceConfig: {
          servicePath,
        },
        title: () => '',
      };

      before(() => {
        const store = mockStore({
          user: Immutable.Map(),
        });

        return store.dispatch(configureCSpace());
      });

      beforeEach(() => {
        moxios.install();
      });

      afterEach(() => {
        moxios.uninstall();
      });

      it('should dispatch RECORD_TRANSITION_FULFILLED on success', function test() {
        moxios.stubRequest(transitionRecordUrl, {
          status: 200,
          response: {},
        });

        const store = mockStore({
          record: Immutable.fromJS({
            [csid]: {
              data: {
                current: {
                  document: {},
                },
              },
            },
          }),
        });

        return store.dispatch(transitionRecord(recordTypeConfig, undefined, csid, transitionName))
          .then(() => {
            const actions = store.getActions();

            actions.should.have.lengthOf(4);

            actions[0].should.have.property('type', SHOW_NOTIFICATION);
            actions[0].should.have.deep.property('payload.status', STATUS_PENDING);

            actions[1].should.deep.equal({
              type: RECORD_TRANSITION_STARTED,
              meta: {
                csid,
                recordTypeConfig,
                transitionName,
              },
            });

            actions[2].should.have.property('type', SHOW_NOTIFICATION);
            actions[2].should.have.deep.property('payload.status', STATUS_SUCCESS);

            actions[3].should.deep.equal({
              type: RECORD_TRANSITION_FULFILLED,
              payload: {
                status: 200,
                statusText: undefined,
                headers: undefined,
                data: {},
              },
              meta: {
                csid,
                recordTypeConfig,
                transitionName,
              },
            });
          });
      });

      it('should dispatch RECORD_TRANSITION_REJECTED on error', function test() {
        moxios.stubRequest(transitionRecordUrl, {
          status: 400,
          response: {},
        });

        const store = mockStore({
          record: Immutable.fromJS({
            [csid]: {
              data: {
                current: {
                  document: {},
                },
              },
            },
          }),
        });

        return store.dispatch(transitionRecord(recordTypeConfig, undefined, csid, transitionName))
          .then(() => {
            const actions = store.getActions();

            actions.should.have.lengthOf(4);

            actions[0].should.have.property('type', SHOW_NOTIFICATION);
            actions[0].should.have.deep.property('payload.status', STATUS_PENDING);

            actions[1].should.deep.equal({
              type: RECORD_TRANSITION_STARTED,
              meta: {
                csid,
                recordTypeConfig,
                transitionName,
              },
            });

            actions[2].should.have.property('type', SHOW_NOTIFICATION);
            actions[2].should.have.deep.property('payload.status', STATUS_ERROR);

            actions[3].should.have.property('type', RECORD_TRANSITION_REJECTED);
            actions[3].should.have.property('meta')
              .that.deep.equals({
                csid,
                recordTypeConfig,
                transitionName,
              });
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
      const transitionName = 'delete';
      const transitionRecordUrl = new RegExp(`^/cspace-services/${recordServicePath}/${vocabularyServicePath.replace('(', '\\(').replace(')', '\\)')}/items/${csid}/workflow/${transitionName}.*`);

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
        title: () => '',
        vocabularies: {
          [vocabulary]: vocabularyConfig,
        },
      };

      before(() => {
        const store = mockStore({
          user: Immutable.Map(),
        });

        return store.dispatch(configureCSpace());
      });

      beforeEach(() => {
        moxios.install();
      });

      afterEach(() => {
        moxios.uninstall();
      });

      it('should dispatch RECORD_SAVE_FULFILLED on success', function test() {
        moxios.stubRequest(transitionRecordUrl, {
          status: 200,
          response: {},
        });

        const store = mockStore({
          record: Immutable.fromJS({
            [csid]: {
              data: {
                current: {
                  document: {},
                },
              },
            },
          }),
        });

        return store.dispatch(
          transitionRecord(recordTypeConfig, vocabularyConfig, csid, transitionName)
        )
          .then(() => {
            const actions = store.getActions();

            actions.should.have.lengthOf(4);

            actions[0].should.have.property('type', SHOW_NOTIFICATION);
            actions[0].should.have.deep.property('payload.status', STATUS_PENDING);

            actions[1].should.deep.equal({
              type: RECORD_TRANSITION_STARTED,
              meta: {
                csid,
                recordTypeConfig,
                transitionName,
              },
            });

            actions[2].should.have.property('type', SHOW_NOTIFICATION);
            actions[2].should.have.deep.property('payload.status', STATUS_SUCCESS);

            actions[3].should.deep.equal({
              type: RECORD_TRANSITION_FULFILLED,
              payload: {
                status: 200,
                statusText: undefined,
                headers: undefined,
                data: {},
              },
              meta: {
                csid,
                recordTypeConfig,
                transitionName,
              },
            });
          });
      });
    });
  });
});
