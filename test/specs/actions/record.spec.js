/* global window */

import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import merge from 'lodash/merge';
import { setupWorker, rest } from 'msw';
import { searchKey } from '../../../src/reducers/search';
import HierarchyReparentNotifier from '../../../src/components/record/HierarchyReparentNotifier';

import {
  SHOW_NOTIFICATION,
  REMOVE_NOTIFICATION,
  SET_STICKY_FIELDS,
  CLEAR_RECORD,
  CREATE_NEW_RECORD,
  CREATE_NEW_SUBRECORD,
  DETACH_SUBRECORD,
  FIELD_COMPUTE_FULFILLED,
  FIELD_COMPUTE_REJECTED,
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
  SORT_FIELD_INSTANCES,
  SUBRECORD_CREATED,
  SUBRECORD_READ_FULFILLED,
  REVERT_RECORD,
  ADD_FIELD_INSTANCE,
  DELETE_FIELD_VALUE,
  MOVE_FIELD_VALUE,
  SET_FIELD_VALUE,
  VALIDATION_FAILED,
  VALIDATION_PASSED,
  SEARCH_STARTED,
  SEARCH_FULFILLED,
  SET_MOST_RECENT_SEARCH,
} from '../../../src/constants/actionCodes';

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
  NOTIFICATION_ID_VALIDATION,
} from '../../../src/actions/notification';

import {
  clearRecord,
  computeFieldValue,
  createNewRecord,
  createNewSubrecord,
  deleteRecord,
  detachSubrecord,
  readRecord,
  saveRecord,
  saveRecordWithTransition,
  revertRecord,
  transitionRecord,
  addFieldInstance,
  sortFieldInstances,
  deleteFieldValue,
  moveFieldValue,
  setFieldValue,
} from '../../../src/actions/record';

chai.use(chaiImmutable);
chai.should();

describe('record action creator', () => {
  const worker = setupWorker();

  before(() => {
    worker.start({ quiet: true });
  });

  after(() => {
    worker.stop();
  });

  describe('createNewRecord', () => {
    const mockStore = configureMockStore([thunk]);

    before(() => {
      const store = mockStore({
        user: Immutable.Map(),
      });

      return store.dispatch(configureCSpace());
    });

    afterEach(() => {
      worker.resetHandlers();
    });

    it('should dispatch CREATE_NEW_RECORD', () => {
      const store = mockStore({
        prefs: Immutable.Map(),
      });

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
              stickyFields: undefined,
            },
          });
        });
    });

    it('should read the record to be cloned', () => {
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
      const readRecordUrl = `/cspace-services/${servicePath}/${cloneCsid}`;

      worker.use(
        rest.get(readRecordUrl, (req, res, ctx) => res(ctx.json({}))),
      );

      const store = mockStore({
        prefs: Immutable.Map(),
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

          actions[1].type.should.equal(RECORD_READ_FULFILLED);
          actions[1].payload.status.should.equal(200);
          actions[1].payload.data.should.deep.equal({});

          actions[1].meta.should.deep.equal({
            config,
            recordTypeConfig,
            csid: cloneCsid,
          });

          actions[2].should.deep.equal({
            type: CREATE_NEW_RECORD,
            meta: {
              config,
              recordTypeConfig,
              cloneCsid,
              stickyFields: undefined,
            },
          });
        });
    });
  });

  describe('createNewSubrecord', () => {
    const mockStore = configureMockStore([thunk]);

    before(() => {
      const store = mockStore({
        user: Immutable.Map(),
      });

      return store.dispatch(configureCSpace());
    });

    afterEach(() => {
      worker.resetHandlers();
    });

    it('should dispatch CREATE_NEW_SUBRECORD', () => {
      const store = mockStore({
        prefs: Immutable.Map(),
      });

      const config = {
        foo: 'abc',
      };

      const csid = '1234';
      const csidField = ['document', 'csid'];
      const subrecordName = 'blob';

      const subrecordTypeConfig = {
        bar: '123',
      };

      const subrecordVocabularyConfig = {
        baz: 'xyz',
      };

      const cloneCsid = undefined;
      const isDefault = true;

      return store.dispatch(createNewSubrecord(
        config, csid, csidField, subrecordName,
        subrecordTypeConfig, subrecordVocabularyConfig, cloneCsid, isDefault,
      ))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(1);

          actions[0].should.deep.equal({
            type: CREATE_NEW_SUBRECORD,
            meta: {
              config,
              csid,
              csidField,
              subrecordName,
              subrecordTypeConfig,
              cloneCsid,
              isDefault,
              stickyFields: undefined,
            },
          });
        });
    });

    it('should read the record to be cloned', () => {
      const store = mockStore({
        prefs: Immutable.Map(),
        record: Immutable.Map(),
      });

      const config = {
        foo: 'abc',
      };

      const csid = '1234';
      const csidField = ['document', 'csid'];
      const subrecordName = 'blob';

      const subrecordServicePath = 'blobs';

      const subrecordTypeConfig = {
        serviceConfig: {
          servicePath: subrecordServicePath,
        },
      };

      const cloneCsid = '9999';
      const isDefault = true;

      const readRecordUrl = `/cspace-services/${subrecordServicePath}/${cloneCsid}`;

      worker.use(
        rest.get(readRecordUrl, (req, res, ctx) => res(ctx.json({}))),
      );

      return store.dispatch(createNewSubrecord(
        config, csid, csidField, subrecordName,
        subrecordTypeConfig, undefined, cloneCsid, isDefault,
      ))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(3);

          actions[0].should.deep.equal({
            type: RECORD_READ_STARTED,
            meta: {
              csid: cloneCsid,
              recordTypeConfig: subrecordTypeConfig,
            },
          });

          actions[1].type.should.equal(RECORD_READ_FULFILLED);
          actions[1].payload.status.should.equal(200);
          actions[1].payload.data.should.deep.equal({});

          actions[1].meta.should.deep.equal({
            config,
            csid: cloneCsid,
            recordTypeConfig: subrecordTypeConfig,
          });

          actions[2].should.deep.equal({
            type: CREATE_NEW_SUBRECORD,
            meta: {
              config,
              csid,
              csidField,
              subrecordName,
              subrecordTypeConfig,
              cloneCsid,
              isDefault,
              stickyFields: undefined,
            },
          });
        });
    });
  });

  describe('detachSubrecord', () => {
    it('should return a DETACH_SUBRECORD action', () => {
      const config = {
        foo: 'bar',
      };

      const csid = '1234';
      const csidField = ['document', 'blobCsid'];
      const subrecordName = 'blob';

      const subrecordTypeConfig = {
        bar: 'baz',
      };

      detachSubrecord(config, csid, csidField, subrecordName, subrecordTypeConfig).should
        .deep.equal({
          type: DETACH_SUBRECORD,
          meta: {
            config,
            csid,
            csidField,
            subrecordName,
            subrecordTypeConfig,
          },
        });
    });
  });

  describe('clearRecord', () => {
    it('should return a CLEAR_RECORD action', () => {
      const csid = '1234';
      const clearSubrecords = true;

      clearRecord(csid, true).should
        .deep.equal({
          type: CLEAR_RECORD,
          meta: {
            csid,
            clearSubrecords,
          },
        });
    });
  });

  describe('readRecord', () => {
    context('for an object/procedure', () => {
      const mockStore = configureMockStore([thunk]);
      const servicePath = 'collectionobjects';
      const csid = '1234';
      const readRecordUrl = `/cspace-services/${servicePath}/${csid}`;

      const config = {};

      const recordTypeConfig = {
        requestConfig: () => ({
          params: {
            customParam: 'hello',
          },
        }),
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

      afterEach(() => {
        worker.resetHandlers();
      });

      it('should dispatch RECORD_READ_FULFILLED on success', () => {
        worker.use(
          rest.get(readRecordUrl, (req, res, ctx) => res(ctx.json({}))),
        );

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

            actions[1].type.should.equal(RECORD_READ_FULFILLED);
            actions[1].payload.status.should.equal(200);
            actions[1].payload.data.should.deep.equal({});

            actions[1].meta.should.deep.equal({
              config,
              csid,
              recordTypeConfig,
            });
          });
      });

      it('should dispatch RECORD_READ_REJECTED on error', () => {
        worker.use(
          rest.get(readRecordUrl, (req, res, ctx) => res(ctx.status(400))),
        );

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

      it('should dispatch no actions if a read is already pending for the given csid', () => {
        const store = mockStore({
          record: Immutable.fromJS({
            [csid]: {
              isReadPending: true,
            },
          }),
        });

        store.dispatch(readRecord(config, recordTypeConfig, vocabularyConfig, csid))
          .then(() => {
            store.getActions().should.have.lengthOf(0);
          });
      });

      it('should dispatch no actions if data is already available for the given csid', () => {
        const store = mockStore({
          record: Immutable.fromJS({
            [csid]: {
              data: {
                current: {},
              },
            },
          }),
        });

        store.dispatch(readRecord(config, recordTypeConfig, vocabularyConfig, csid))
          .then(() => {
            store.getActions().should.have.lengthOf(0);
          });
      });

      it('should merge request configuration from the record type config', () => {
        worker.use(
          rest.get(readRecordUrl, (req, res, ctx) => {
            const {
              searchParams,
            } = req.url;

            if (searchParams.get('customParam') === 'hello') {
              return res(ctx.json({}));
            }

            return res(ctx.status(400));
          }),
        );

        const store = mockStore({
          record: Immutable.Map(),
        });

        return store.dispatch(readRecord(config, recordTypeConfig, vocabularyConfig, csid))
          .then((result) => {
            if (result) {
              result.should.not.have.property('type', RECORD_READ_REJECTED);
            }
          });
      });
    });

    context('for an authority', () => {
      const mockStore = configureMockStore([thunk]);
      const recordServicePath = 'personauthorities';
      const vocabularyServicePath = 'urn:cspace:name(person)';
      const csid = '1234';
      const readRecordUrl = `/cspace-services/${recordServicePath}/:vocabulary/items/${csid}`;

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

      afterEach(() => {
        worker.resetHandlers();
      });

      it('should dispatch RECORD_READ_FULFILLED on success', () => {
        worker.use(
          rest.get(readRecordUrl, (req, res, ctx) => {
            const { params } = req;

            if (params.vocabulary === vocabularyServicePath) {
              return res(ctx.json({}));
            }

            return res(ctx.status(400));
          }),
        );

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

            actions[1].type.should.equal(RECORD_READ_FULFILLED);
            actions[1].payload.status.should.equal(200);
            actions[1].payload.data.should.deep.equal({});

            actions[1].meta.should.deep.equal({
              config,
              csid,
              recordTypeConfig,
            });
          });
      });
    });

    context('for a record with subrecords', () => {
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
      const readRecordUrl = `/cspace-services/${recordServicePath}/:vocabulary/items/${csid}`;
      const searchSubrecordUrl = `/cspace-services/${recordServicePath}/:vocabulary/items/${csid}/${subrecordSubresourceServicePath}`;
      const readSubrecordUrl = `/cspace-services/${subrecordServicePath}/${subrecordCsid}`;

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
          serviceType: 'authority',
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
          serviceType: 'utility',
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

      const expectedSubrecordSearchName = `subrecord/${csid}/${subrecordName}`;

      before(() => {
        const store = mockStore({
          user: Immutable.Map(),
        });

        return store.dispatch(configureCSpace());
      });

      afterEach(() => {
        worker.resetHandlers();
      });

      it('should dispatch SEARCH_STARTED and SEARCH_FULFILLED when a subrecord search is needed', () => {
        worker.use(
          rest.get(searchSubrecordUrl, (req, res, ctx) => {
            const { params } = req;

            if (params.vocabulary === vocabularyServicePath) {
              return res(ctx.json({
                'ns2:abstract-common-list': {
                  // No results.
                },
              }));
            }

            return res(ctx.status(400));
          }),

          rest.get(readRecordUrl, (req, res, ctx) => {
            const { params } = req;

            if (params.vocabulary === vocabularyServicePath) {
              return res(ctx.json({}));
            }

            return res(ctx.status(400));
          }),
        );

        const store = mockStore({
          prefs: Immutable.Map(),
          record: Immutable.Map(),
          search: Immutable.Map(
            // No subrecord search results, so a subrecord search should be initiated.
          ),
        });

        return store.dispatch(readRecord(config, recordTypeConfig, vocabularyConfig, csid))
          .then(() => {
            const actions = store.getActions();

            actions.should.have.lengthOf(5);

            actions[0].should.deep.equal({
              type: RECORD_READ_STARTED,
              meta: {
                csid,
                recordTypeConfig,
              },
            });

            actions[1].type.should.equal(RECORD_READ_FULFILLED);
            actions[1].payload.status.should.equal(200);
            actions[1].payload.data.should.deep.equal({});

            actions[1].meta.should.deep.equal({
              config,
              csid,
              recordTypeConfig,
            });

            actions[2].type.should.equal(SEARCH_STARTED);
            actions[2].meta.searchDescriptor.should.equal(expectedSubrecordSearchDescriptor);
            actions[2].meta.searchName.should.equal(expectedSubrecordSearchName);

            actions[3].type.should.equal(SEARCH_FULFILLED);
            actions[3].meta.searchDescriptor.should.equal(expectedSubrecordSearchDescriptor);
            actions[3].meta.searchName.should.equal(expectedSubrecordSearchName);

            actions[4].type.should.equal(CREATE_NEW_SUBRECORD);
            actions[4].meta.csid.should.equal(csid);
            actions[4].meta.isDefault.should.equal(true);
            actions[4].meta.subrecordName.should.equal(subrecordName);
          });
      });

      it('should dispatch SUBRECORD_READ_FULFILLED after reading the container record and subrecord', () => {
        worker.use(
          rest.get(readSubrecordUrl, (req, res, ctx) => res(ctx.json({}))),

          rest.get(readRecordUrl, (req, res, ctx) => {
            const { params } = req;

            if (params.vocabulary === vocabularyServicePath) {
              return res(ctx.json({}));
            }

            return res(ctx.status(400));
          }),
        );

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

            actions[1].type.should.equal(RECORD_READ_FULFILLED);
            actions[1].payload.status.should.equal(200);
            actions[1].payload.data.should.deep.equal({});

            actions[1].meta.should.deep.equal({
              config,
              csid,
              recordTypeConfig,
            });

            actions[2].type.should.equal(SET_MOST_RECENT_SEARCH);

            actions[3].should.deep.equal({
              type: RECORD_READ_STARTED,
              meta: {
                csid: subrecordCsid,
                recordTypeConfig: subrecordTypeConfig,
              },
            });

            actions[4].type.should.equal(RECORD_READ_FULFILLED);
            actions[4].payload.status.should.equal(200);
            actions[4].payload.data.should.deep.equal({});

            actions[4].meta.should.deep.equal({
              config,
              csid: subrecordCsid,
              recordTypeConfig: subrecordTypeConfig,
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

  describe('saveRecord', () => {
    context('for an object/procedure', () => {
      const mockStore = configureMockStore([thunk]);
      const recordType = 'collectionobject';
      const servicePath = 'collectionobjects';
      const csid = '5678';
      const saveRecordUrl = `/cspace-services/${servicePath}/${csid}`;
      const readRecordUrl = `/cspace-services/${servicePath}/${csid}`;
      const saveNewRecordUrl = `/cspace-services/${servicePath}`;

      const config = {};

      const recordTypeConfig = {
        name: recordType,
        serviceConfig: {
          servicePath,
          serviceType: 'object',
        },
        title: () => '',
      };

      before(() => {
        const store = mockStore({
          user: Immutable.Map(),
        });

        return store.dispatch(configureCSpace());
      });

      afterEach(() => {
        worker.resetHandlers();
      });

      it('should dispatch VALIDATION_FAILED if there are blocking validation errors', () => {
        const recordTypeConfigWithRequiredField = {
          ...recordTypeConfig,
          fields: {
            objectNumber: {
              [configKey]: {
                required: true,
              },
            },
          },
        };

        const store = mockStore({
          prefs: Immutable.Map(),
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
              validation: {
                [ERROR_KEY]: {},
              },
            },
          }),
          user: Immutable.Map(),
        });

        return store.dispatch(
          saveRecord(config, recordTypeConfigWithRequiredField, undefined, csid),
        )
          .then(() => {
            const actions = store.getActions();

            actions.should.have.lengthOf(2);

            actions[0].type.should.equal(VALIDATION_FAILED);

            actions[0].payload.should.equal(
              Immutable.fromJS({
                objectNumber: {
                  [ERROR_KEY]: {
                    code: ERR_MISSING_REQ_FIELD,
                    message: undefined,
                  },
                },
              }),
            );

            actions[0].meta.should.deep.equal({
              csid,
              path: [],
            });

            actions[1].should.have.property('type', SHOW_NOTIFICATION);
            actions[1].should.have.deep.property('payload.status', STATUS_ERROR);
          });
      });

      it('should dispatch RECORD_SAVE_FULFILLED on success', () => {
        worker.use(
          rest.put(saveRecordUrl, (req, res, ctx) => res(ctx.json({}))),
          rest.get(readRecordUrl, (req, res, ctx) => res(ctx.json({}))),
        );

        const store = mockStore({
          prefs: Immutable.Map(),
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
          recordPage: Immutable.Map(),
          user: Immutable.Map(),
        });

        return store.dispatch(saveRecord(config, recordTypeConfig, undefined, csid))
          .then(() => {
            const actions = store.getActions();

            actions.should.have.lengthOf(7);

            actions[0].should.deep.equal({
              type: 'VALIDATION_PASSED',
              meta: {
                csid,
                path: [],
              },
            });

            actions[1].should.deep.equal({
              type: REMOVE_NOTIFICATION,
              meta: {
                notificationID: NOTIFICATION_ID_VALIDATION,
              },
            });

            actions[2].should.deep.equal({
              type: RECORD_SAVE_STARTED,
              meta: {
                csid,
              },
            });

            actions[3].should.have.property('type', SHOW_NOTIFICATION);
            actions[3].should.have.deep.property('payload.status', STATUS_PENDING);

            actions[4].should.deep.equal({
              type: SET_STICKY_FIELDS,
              payload: Immutable.Map(),
              meta: {
                recordTypeConfig,
              },
            });

            actions[5].should.have.property('type', SHOW_NOTIFICATION);
            actions[5].should.have.deep.property('payload.status', STATUS_SUCCESS);

            actions[6].type.should.equal(RECORD_SAVE_FULFILLED);
            actions[6].payload.status.should.equal(200);
            actions[6].payload.data.should.deep.equal({});

            actions[6].meta.should.deep.equal({
              recordTypeConfig,
              csid,
              relatedSubjectCsid: undefined,
              recordPagePrimaryCsid: undefined,
            });
          });
      });

      it('should dispatch RECORD_SAVE_REJECTED on an update error', () => {
        worker.use(
          rest.put(saveRecordUrl, (req, res, ctx) => res(ctx.status(400))),
        );

        const store = mockStore({
          prefs: Immutable.Map(),
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
          user: Immutable.Map(),
        });

        return store.dispatch(saveRecord(config, recordTypeConfig, undefined, csid))
          .catch(() => {
            const actions = store.getActions();

            actions.should.have.lengthOf(7);

            actions[0].should.deep.equal({
              type: 'VALIDATION_PASSED',
              meta: {
                csid,
                path: [],
              },
            });

            actions[1].should.deep.equal({
              type: REMOVE_NOTIFICATION,
              meta: {
                notificationID: NOTIFICATION_ID_VALIDATION,
              },
            });

            actions[2].should.deep.equal({
              type: RECORD_SAVE_STARTED,
              meta: {
                csid,
              },
            });

            actions[3].should.have.property('type', SHOW_NOTIFICATION);
            actions[3].should.have.deep.property('payload.status', STATUS_PENDING);

            actions[4].should.deep.equal({
              type: SET_STICKY_FIELDS,
              payload: Immutable.Map(),
              meta: {
                recordTypeConfig,
              },
            });

            actions[5].should.have.property('type', SHOW_NOTIFICATION);
            actions[5].should.have.deep.property('payload.status', STATUS_ERROR);

            actions[6].should.have.property('type', RECORD_SAVE_REJECTED);
            actions[6].should.have.property('meta')
              .that.deep.equals({
                csid,
              });
          });
      });

      it('should dispatch RECORD_SAVE_REJECTED on a create error', () => {
        worker.use(
          rest.post(saveNewRecordUrl, (req, res, ctx) => res(ctx.status(400))),
        );

        const store = mockStore({
          prefs: Immutable.Map(),
          record: Immutable.fromJS({
            '': {
              data: {
                current: {
                  document: {},
                },
              },
            },
          }),
          user: Immutable.Map(),
        });

        return store.dispatch(saveRecord(config, recordTypeConfig, undefined, ''))
          .catch(() => {
            const actions = store.getActions();

            actions.should.have.lengthOf(7);

            actions[0].should.deep.equal({
              type: 'VALIDATION_PASSED',
              meta: {
                csid: '',
                path: [],
              },
            });

            actions[1].should.deep.equal({
              type: REMOVE_NOTIFICATION,
              meta: {
                notificationID: NOTIFICATION_ID_VALIDATION,
              },
            });

            actions[2].should.deep.equal({
              type: RECORD_SAVE_STARTED,
              meta: {
                csid: '',
              },
            });

            actions[3].should.have.property('type', SHOW_NOTIFICATION);
            actions[3].should.have.deep.property('payload.status', STATUS_PENDING);

            actions[4].should.deep.equal({
              type: SET_STICKY_FIELDS,
              payload: Immutable.Map(),
              meta: {
                recordTypeConfig,
              },
            });

            actions[5].should.have.property('type', SHOW_NOTIFICATION);
            actions[5].should.have.deep.property('payload.status', STATUS_ERROR);

            actions[6].should.have.property('type', RECORD_SAVE_REJECTED);
            actions[6].should.have.property('meta')
              .that.deep.equals({
                csid: '',
              });
          });
      });

      it('should dispatch RECORD_SAVE_REJECTED if a create request does not return a 201 with a location', () => {
        worker.use(
          rest.post(saveNewRecordUrl, (req, res, ctx) => res(ctx.json({}))),
        );

        const store = mockStore({
          prefs: Immutable.Map(),
          record: Immutable.fromJS({
            '': {
              data: {
                current: {
                  document: {},
                },
              },
            },
          }),
          user: Immutable.Map(),
        });

        return store.dispatch(saveRecord(config, recordTypeConfig, undefined, ''))
          .catch(() => {
            const actions = store.getActions();

            actions.should.have.lengthOf(7);

            actions[0].should.deep.equal({
              type: 'VALIDATION_PASSED',
              meta: {
                csid: '',
                path: [],
              },
            });

            actions[1].should.deep.equal({
              type: REMOVE_NOTIFICATION,
              meta: {
                notificationID: NOTIFICATION_ID_VALIDATION,
              },
            });

            actions[2].should.deep.equal({
              type: RECORD_SAVE_STARTED,
              meta: {
                csid: '',
              },
            });

            actions[3].should.have.property('type', SHOW_NOTIFICATION);
            actions[3].should.have.deep.property('payload.status', STATUS_PENDING);

            actions[4].should.deep.equal({
              type: SET_STICKY_FIELDS,
              payload: Immutable.Map(),
              meta: {
                recordTypeConfig,
              },
            });

            actions[5].should.have.property('type', SHOW_NOTIFICATION);
            actions[5].should.have.deep.property('payload.status', STATUS_ERROR);

            actions[6].should.have.property('type', RECORD_SAVE_REJECTED);
            actions[6].should.have.property('meta')
              .that.deep.equals({
                csid: '',
              });
          });
      });

      it('should call the passed callback when a new record is saved', () => {
        const createdCsid = '6789';

        let reportedCreatedCsid = null;

        const handleRecordCreated = (createdCsidArg) => {
          reportedCreatedCsid = createdCsidArg;
        };

        // Mock a response for a newly created record.

        worker.use(
          rest.post(saveNewRecordUrl, (req, res, ctx) => res(
            ctx.status(201),
            ctx.set('location', `some/new/url/${createdCsid}`),
          )),

          rest.get(`${saveNewRecordUrl}/${createdCsid}`, (req, res, ctx) => res(ctx.json({}))),
        );

        const store = mockStore({
          prefs: Immutable.Map(),
          record: Immutable.fromJS({
            '': {
              data: {
                current: {
                  document: {},
                },
              },
            },
          }),
          recordPage: Immutable.Map(),
          user: Immutable.Map(),
        });

        // Pass an empty csid and a replace function to saveRecord.

        return store.dispatch(saveRecord(config, recordTypeConfig, undefined, '', undefined, undefined, undefined, handleRecordCreated))
          .then(() => {
            const actions = store.getActions();

            actions.should.have.lengthOf(8);

            actions[0].should.deep.equal({
              type: 'VALIDATION_PASSED',
              meta: {
                csid: '',
                path: [],
              },
            });

            actions[1].should.deep.equal({
              type: REMOVE_NOTIFICATION,
              meta: {
                notificationID: NOTIFICATION_ID_VALIDATION,
              },
            });

            actions[2].should.deep.equal({
              type: RECORD_SAVE_STARTED,
              meta: {
                csid: '',
              },
            });

            actions[3].should.have.property('type', SHOW_NOTIFICATION);
            actions[3].should.have.deep.property('payload.status', STATUS_PENDING);

            actions[4].should.deep.equal({
              type: SET_STICKY_FIELDS,
              payload: Immutable.Map(),
              meta: {
                recordTypeConfig,
              },
            });

            actions[5].should.deep.equal({
              type: RECORD_CREATED,
              meta: {
                recordTypeConfig,
                currentCsid: '',
                newRecordCsid: createdCsid,
              },
            });

            actions[6].should.have.property('type', SHOW_NOTIFICATION);
            actions[6].should.have.deep.property('payload.status', STATUS_SUCCESS);

            actions[7].type.should.equal(RECORD_SAVE_FULFILLED);
            actions[7].payload.status.should.equal(200);
            actions[7].payload.data.should.deep.equal({});

            actions[7].meta.should.deep.equal({
              recordTypeConfig,
              csid: createdCsid,
              relatedSubjectCsid: undefined,
              recordPagePrimaryCsid: undefined,
            });

            reportedCreatedCsid.should.equal(createdCsid);
          });
      });

      it('should merge in a request config contribution from the record type config', () => {
        let requestConfigRequestType = null;
        let requestConfigData = null;

        const recordTypeConfigWithRequestConfig = merge({}, recordTypeConfig, {
          requestConfig: (requestTypeArg, dataArg) => {
            requestConfigRequestType = requestTypeArg;
            requestConfigData = dataArg;

            return {
              params: {
                foo: 'bar',
              },
            };
          },
        });

        worker.use(
          rest.put(saveRecordUrl, async (req, res, ctx) => {
            const { searchParams } = req.url;

            if (searchParams.get('foo') === 'bar') {
              return res(ctx.json({}));
            }

            return res(ctx.status(400));
          }),

          rest.get(readRecordUrl, (req, res, ctx) => res(ctx.json({}))),
        );

        const data = Immutable.fromJS({
          document: {
            'ns2:collectionspace_core': {
              uri: `/${servicePath}/${csid}`,
            },
          },
        });

        const store = mockStore({
          prefs: Immutable.Map(),
          record: Immutable.fromJS({
            [csid]: {
              data: {
                current: data,
              },
            },
          }),
          recordPage: Immutable.Map(),
          user: Immutable.Map(),
        });

        return store.dispatch(
          saveRecord(config, recordTypeConfigWithRequestConfig, undefined, csid),
        )
          .then(() => {
            requestConfigRequestType.should.equal('save');
            requestConfigData.should.equal(data);
          });
      });
    });

    context('for an authority', () => {
      const mockStore = configureMockStore([thunk]);
      const recordType = 'person';
      const recordServicePath = 'personauthorities';
      const vocabulary = 'ulan';
      const vocabularyServicePath = 'urn:cspace:name(ulan)';
      const csid = '5678';
      const saveRecordUrl = `/cspace-services/${recordServicePath}/:vocabulary/items/${csid}`;
      const readRecordUrl = `/cspace-services/${recordServicePath}/:vocabulary/items/${csid}`;

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

      afterEach(() => {
        worker.resetHandlers();
      });

      it('should dispatch RECORD_SAVE_FULFILLED on success', () => {
        worker.use(
          rest.put(saveRecordUrl, (req, res, ctx) => {
            const { params } = req;

            if (params.vocabulary === vocabularyServicePath) {
              return res(ctx.json({}));
            }

            return res(ctx.status(400));
          }),

          rest.get(readRecordUrl, (req, res, ctx) => {
            const { params } = req;

            if (params.vocabulary === vocabularyServicePath) {
              return res(ctx.json({}));
            }

            return res(ctx.status(400));
          }),
        );

        const store = mockStore({
          prefs: Immutable.Map(),
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
          recordPage: Immutable.Map(),
          user: Immutable.Map(),
        });

        return store.dispatch(saveRecord(config, recordTypeConfig, vocabularyConfig, csid))
          .then(() => {
            const actions = store.getActions();

            actions.should.have.lengthOf(7);

            actions[0].should.deep.equal({
              type: 'VALIDATION_PASSED',
              meta: {
                csid,
                path: [],
              },
            });

            actions[1].should.deep.equal({
              type: REMOVE_NOTIFICATION,
              meta: {
                notificationID: NOTIFICATION_ID_VALIDATION,
              },
            });

            actions[2].should.deep.equal({
              type: RECORD_SAVE_STARTED,
              meta: {
                csid,
              },
            });

            actions[3].should.have.property('type', SHOW_NOTIFICATION);
            actions[3].should.have.deep.property('payload.status', STATUS_PENDING);

            actions[4].should.deep.equal({
              type: SET_STICKY_FIELDS,
              payload: Immutable.Map(),
              meta: {
                recordTypeConfig,
              },
            });

            actions[5].should.have.property('type', SHOW_NOTIFICATION);
            actions[5].should.have.deep.property('payload.status', STATUS_SUCCESS);

            actions[6].type.should.equal(RECORD_SAVE_FULFILLED);
            actions[6].payload.status.should.equal(200);
            actions[6].payload.data.should.deep.equal({});

            actions[6].meta.should.deep.equal({
              recordTypeConfig,
              csid,
              relatedSubjectCsid: undefined,
              recordPagePrimaryCsid: undefined,
            });
          });
      });
    });

    context('for a record with subresource subrecords', () => {
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
      const saveRecordUrl = `/cspace-services/${recordServicePath}/:vocabulary/items/${csid}`;
      const saveSubrecordUrl = `/cspace-services/${recordServicePath}/:vocabulary/items/${csid}/${subrecordSubresourceServicePath}/${subrecordCsid}`;
      const readRecordUrl = `/cspace-services/${recordServicePath}/:vocabulary/items/${csid}`;
      const readSubrecordsUrl = `/cspace-services/${recordServicePath}/:vocabulary/items/${csid}/${subrecordSubresourceServicePath}`;

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
          serviceType: 'authority',
        },
        subrecords: {
          [subrecordName]: {
            subresource: subrecordSubresource,
            saveStage: 'after',
          },
          foo: {
            // This subrecord config doesn't contain a subresource or csidField, so it should have
            // no effect.
            saveStage: 'after',
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
          serviceType: 'utility',
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

      before(() => {
        const store = mockStore({
          user: Immutable.Map(),
        });

        return store.dispatch(configureCSpace());
      });

      afterEach(() => {
        worker.resetHandlers();
      });

      it('should dispatch RECORD_SAVE_FULFILLED on success', () => {
        worker.use(
          rest.put(saveRecordUrl, (req, res, ctx) => {
            const { params } = req;

            if (params.vocabulary === vocabularyServicePath) {
              return res(ctx.json({}));
            }

            return res(ctx.status(400));
          }),

          rest.put(saveSubrecordUrl, (req, res, ctx) => {
            const { params } = req;

            if (params.vocabulary === vocabularyServicePath) {
              return res(ctx.json({}));
            }

            return res(ctx.status(400));
          }),

          rest.get(readRecordUrl, (req, res, ctx) => {
            const { params } = req;

            if (params.vocabulary === vocabularyServicePath) {
              return res(ctx.json({}));
            }

            return res(ctx.status(400));
          }),

          rest.get(readSubrecordsUrl, (req, res, ctx) => {
            const { params } = req;

            if (params.vocabulary === vocabularyServicePath) {
              return res(ctx.json({}));
            }

            return res(ctx.status(400));
          }),
        );

        const store = mockStore({
          prefs: Immutable.Map(),
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
          recordPage: Immutable.Map(),
          search: Immutable.Map(),
          user: Immutable.Map(),
        });

        return store.dispatch(saveRecord(config, recordTypeConfig, vocabularyConfig, csid))
          .then(() => {
            const actions = store.getActions();

            actions.should.have.lengthOf(15);

            actions[0].should.deep.equal({
              type: 'VALIDATION_PASSED',
              meta: {
                csid,
                path: [],
              },
            });

            actions[1].should.deep.equal({
              type: REMOVE_NOTIFICATION,
              meta: {
                notificationID: NOTIFICATION_ID_VALIDATION,
              },
            });

            actions[2].should.deep.equal({
              type: RECORD_SAVE_STARTED,
              meta: {
                csid,
              },
            });

            actions[3].should.have.property('type', SHOW_NOTIFICATION);
            actions[3].should.have.deep.property('payload.status', STATUS_PENDING);

            actions[4].should.deep.equal({
              type: SET_STICKY_FIELDS,
              payload: Immutable.Map(),
              meta: {
                recordTypeConfig,
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
              type: RECORD_SAVE_STARTED,
              meta: {
                csid: subrecordCsid,
              },
            });

            actions[8].should.deep.equal({
              type: SET_STICKY_FIELDS,
              payload: Immutable.Map(),
              meta: {
                recordTypeConfig: subrecordTypeConfig,
              },
            });

            actions[9].type.should.equal(RECORD_SAVE_FULFILLED);
            actions[9].payload.status.should.equal(200);
            actions[9].payload.data.should.deep.equal({});

            actions[9].meta.should.deep.equal({
              recordTypeConfig: subrecordTypeConfig,
              csid: subrecordCsid,
              relatedSubjectCsid: undefined,
              recordPagePrimaryCsid: undefined,
            });

            actions[10].should.have.property('type', SHOW_NOTIFICATION);
            actions[10].should.have.deep.property('payload.status', STATUS_SUCCESS);

            actions[11].type.should.equal(RECORD_SAVE_FULFILLED);
            actions[11].payload.status.should.equal(200);
            actions[11].payload.data.should.deep.equal({});

            actions[11].meta.should.deep.equal({
              recordTypeConfig,
              csid,
              relatedSubjectCsid: undefined,
              recordPagePrimaryCsid: undefined,
            });

            actions[12].should.have.property('type', SEARCH_STARTED);
            actions[13].should.have.property('type', SEARCH_FULFILLED);
            actions[14].should.have.property('type', CREATE_NEW_SUBRECORD);
          });
      });

      it('should dispatch RECORD_SAVE_REJECTED if the subrecord save fails', () => {
        worker.use(
          rest.put(saveRecordUrl, (req, res, ctx) => {
            const { params } = req;

            if (params.vocabulary === vocabularyServicePath) {
              return res(ctx.json({}));
            }

            return res(ctx.status(400));
          }),

          rest.put(saveSubrecordUrl, (req, res, ctx) => res(ctx.status(400))),

          rest.get(readRecordUrl, (req, res, ctx) => {
            const { params } = req;

            if (params.vocabulary === vocabularyServicePath) {
              return res(ctx.json({}));
            }

            return res(ctx.status(400));
          }),
        );

        const store = mockStore({
          prefs: Immutable.Map(),
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
          search: Immutable.Map(),
          user: Immutable.Map(),
        });

        return store.dispatch(saveRecord(config, recordTypeConfig, vocabularyConfig, csid))
          .catch(() => {
            const actions = store.getActions();

            actions.should.have.lengthOf(12);

            actions[0].should.deep.equal({
              type: 'VALIDATION_PASSED',
              meta: {
                csid,
                path: [],
              },
            });

            actions[1].should.deep.equal({
              type: REMOVE_NOTIFICATION,
              meta: {
                notificationID: NOTIFICATION_ID_VALIDATION,
              },
            });

            actions[2].should.deep.equal({
              type: RECORD_SAVE_STARTED,
              meta: {
                csid,
              },
            });

            actions[3].should.have.property('type', SHOW_NOTIFICATION);
            actions[3].should.have.deep.property('payload.status', STATUS_PENDING);

            actions[4].should.deep.equal({
              type: SET_STICKY_FIELDS,
              payload: Immutable.Map(),
              meta: {
                recordTypeConfig,
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
              type: RECORD_SAVE_STARTED,
              meta: {
                csid: subrecordCsid,
              },
            });

            actions[8].should.deep.equal({
              type: SET_STICKY_FIELDS,
              payload: Immutable.Map(),
              meta: {
                recordTypeConfig: subrecordTypeConfig,
              },
            });

            actions[9].should.have.property('type', RECORD_SAVE_REJECTED);
            actions[9].should.have.property('meta')
              .that.deep.equals({
                csid: subrecordCsid,
              });

            actions[10].should.have.property('type', SHOW_NOTIFICATION);
            actions[10].should.have.deep.property('payload.status', STATUS_ERROR);

            actions[11].should.have.property('type', RECORD_SAVE_REJECTED);
            actions[11].should.have.property('meta')
              .that.deep.equals({
                csid,
              });
          });
      });

      it('should dispatch SUBRECORD_CREATED if a subrecord is created', () => {
        const newRecordCsid = '8888';
        const saveNewRecordUrl = `/cspace-services/${recordServicePath}/:vocabulary/items/${csid}/${subrecordSubresourceServicePath}`;
        const readNewRecordUrl = `/cspace-services/${subrecordServicePath}/${newRecordCsid}`;
        const expectedSubrecordSearchName = `subrecord/${csid}/${subrecordName}`;

        worker.use(
          rest.post(saveNewRecordUrl, (req, res, ctx) => {
            const { params } = req;

            if (params.vocabulary === vocabularyServicePath) {
              return res(
                ctx.status(201),
                ctx.set('location', `/cspace-services/${recordServicePath}/${vocabularyServicePath}/items/${csid}/${subrecordSubresourceServicePath}/${newRecordCsid}`),
              );
            }

            return res(ctx.status(400));
          }),

          rest.put(saveRecordUrl, (req, res, ctx) => {
            const { params } = req;

            if (params.vocabulary === vocabularyServicePath) {
              return res(ctx.json({}));
            }

            return res(ctx.status(400));
          }),

          rest.get(readNewRecordUrl, (req, res, ctx) => res(ctx.json({}))),

          rest.get(readRecordUrl, (req, res, ctx) => {
            const { params } = req;

            if (params.vocabulary === vocabularyServicePath) {
              return res(ctx.json({}));
            }

            return res(ctx.status(400));
          }),

          rest.get(readSubrecordsUrl, (req, res, ctx) => {
            const { params } = req;

            if (params.vocabulary === vocabularyServicePath) {
              return res(ctx.json({}));
            }

            return res(ctx.status(400));
          }),
        );

        const newSubrecordCsid = 'new';

        const store = mockStore({
          prefs: Immutable.Map(),
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
          recordPage: Immutable.Map(),
          search: Immutable.Map(),
          user: Immutable.Map(),
        });

        return store.dispatch(saveRecord(config, recordTypeConfig, vocabularyConfig, csid))
          .then(() => {
            const actions = store.getActions();

            actions.should.have.lengthOf(17);

            actions[11].should.deep.equal({
              type: SUBRECORD_CREATED,
              meta: {
                csid,
                subrecordName,
                searchName: expectedSubrecordSearchName,
                subrecordCsid: newRecordCsid,
              },
            });
          });
      });
    });

    context('for a record with field-referenced subrecords', () => {
      const mockStore = configureMockStore([thunk]);
      const recordType = 'person';
      const recordServicePath = 'personauthorities';
      const vocabulary = 'local';
      const vocabularyServicePath = 'urn:cspace:name(person)';
      const csid = '5678';
      const subrecordName = 'blob';
      const subrecordType = 'blob';
      const subrecordServicePath = 'blobs';
      const subrecordCsidField = ['document', 'ns2:persons_common', 'blobCsid'];
      const subrecordCsid = 'abcd';
      const saveRecordUrl = `/cspace-services/${recordServicePath}/:vocabulary/items/${csid}`;
      const saveSubrecordUrl = `/cspace-services/${subrecordServicePath}/${subrecordCsid}`;

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
          serviceType: 'authority',
        },
        subrecords: {
          [subrecordName]: {
            csidField: subrecordCsidField,
            recordType: subrecordType,
            saveCondition: (data) => !data.getIn(['document', 'noSave']),
            saveStage: 'before',
          },
        },
        title: () => '',
        vocabularies: {
          [vocabulary]: vocabularyConfig,
        },
      };

      const subrecordTypeConfig = {
        name: subrecordType,
        serviceConfig: {
          servicePath: subrecordServicePath,
          serviceType: 'utility',
        },
        title: () => '',
      };

      const config = {
        recordTypes: {
          [recordType]: recordTypeConfig,
          [subrecordType]: subrecordTypeConfig,
        },
      };

      before(() => {
        const store = mockStore({
          user: Immutable.Map(),
        });

        return store.dispatch(configureCSpace());
      });

      afterEach(() => {
        worker.resetHandlers();
      });

      it('should dispatch RECORD_SAVE_FULFILLED on success', () => {
        worker.use(
          rest.put(saveRecordUrl, (req, res, ctx) => {
            const { params } = req;

            if (params.vocabulary === vocabularyServicePath) {
              return res(ctx.json({}));
            }

            return res(ctx.status(400));
          }),

          rest.put(saveSubrecordUrl, (req, res, ctx) => res(ctx.json({}))),
        );

        const store = mockStore({
          prefs: Immutable.Map(),
          record: Immutable.fromJS({
            [csid]: {
              data: {
                current: {
                  document: {
                    'ns2:collectionspace_core': {
                      uri: `/${recordServicePath}/${vocabularyServicePath}/items/${csid}`,
                    },
                    'ns2:persons_common': {
                      blobCsid: subrecordCsid,
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
                      uri: `/${subrecordServicePath}/${subrecordCsid}`,
                    },
                  },
                },
              },
            },
          }),
          recordPage: Immutable.Map(),
          search: Immutable.Map(),
          user: Immutable.Map(),
        });

        return store.dispatch(saveRecord(config, recordTypeConfig, vocabularyConfig, csid))
          .then(() => {
            const actions = store.getActions();

            actions.should.have.lengthOf(13);

            actions[0].should.deep.equal({
              type: 'VALIDATION_PASSED',
              meta: {
                csid,
                path: [],
              },
            });

            actions[1].should.deep.equal({
              type: REMOVE_NOTIFICATION,
              meta: {
                notificationID: NOTIFICATION_ID_VALIDATION,
              },
            });

            actions[2].should.deep.equal({
              type: RECORD_SAVE_STARTED,
              meta: {
                csid,
              },
            });

            actions[3].should.have.property('type', SHOW_NOTIFICATION);
            actions[3].should.have.deep.property('payload.status', STATUS_PENDING);

            actions[4].should.deep.equal({
              type: 'VALIDATION_PASSED',
              meta: {
                csid: subrecordCsid,
                path: [],
              },
            });

            actions[5].should.deep.equal({
              type: REMOVE_NOTIFICATION,
              meta: {
                notificationID: NOTIFICATION_ID_VALIDATION,
              },
            });

            actions[6].should.deep.equal({
              type: RECORD_SAVE_STARTED,
              meta: {
                csid: subrecordCsid,
              },
            });

            actions[7].should.deep.equal({
              type: SET_STICKY_FIELDS,
              payload: Immutable.Map(),
              meta: {
                recordTypeConfig: subrecordTypeConfig,
              },
            });

            actions[8].type.should.equal(RECORD_SAVE_FULFILLED);
            actions[8].payload.status.should.equal(200);
            actions[8].payload.data.should.deep.equal({});

            actions[8].meta.should.deep.equal({
              recordTypeConfig: subrecordTypeConfig,
              csid: subrecordCsid,
              relatedSubjectCsid: undefined,
              recordPagePrimaryCsid: undefined,
            });

            actions[9].should.deep.equal({
              type: SET_STICKY_FIELDS,
              payload: Immutable.Map(),
              meta: {
                recordTypeConfig,
              },
            });

            actions[10].should.have.property('type', SHOW_NOTIFICATION);
            actions[10].should.have.deep.property('payload.status', STATUS_SUCCESS);

            actions[11].type.should.equal(RECORD_SAVE_FULFILLED);
            actions[11].payload.status.should.equal(200);
            actions[11].payload.data.should.deep.equal({});

            actions[11].meta.should.deep.equal({
              recordTypeConfig,
              csid,
              relatedSubjectCsid: undefined,
              recordPagePrimaryCsid: undefined,
            });

            actions[12].should.deep.equal({
              type: SUBRECORD_READ_FULFILLED,
              meta: {
                csid,
                subrecordCsid,
                subrecordName,
              },
            });
          });
      });

      it('should dispatch SUBRECORD_CREATED if a new subrecord is created', () => {
        const saveNewSubrecordUrl = `/cspace-services/${subrecordServicePath}`;
        const createdSubrecordCsid = '8888';
        const readNewSubrecordUrl = `/cspace-services/${subrecordServicePath}/${createdSubrecordCsid}`;

        worker.use(
          rest.put(saveRecordUrl, (req, res, ctx) => {
            const { params } = req;

            if (params.vocabulary === vocabularyServicePath) {
              return res(ctx.json({}));
            }

            return res(ctx.status(400));
          }),

          rest.post(saveNewSubrecordUrl, (req, res, ctx) => res(
            ctx.status(201),
            ctx.set('location', `some/new/url/${createdSubrecordCsid}`),
          )),

          rest.get(readNewSubrecordUrl, (req, res, ctx) => res(ctx.json({}))),
        );

        const store = mockStore({
          prefs: Immutable.Map(),
          record: Immutable.fromJS({
            [csid]: {
              data: {
                current: {
                  document: {
                    'ns2:collectionspace_core': {
                      uri: `/${recordServicePath}/${vocabularyServicePath}/items/${csid}`,
                    },
                    'ns2:persons_common': {
                      blobCsid: subrecordCsid,
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
                      // No uri, so it's a new record.
                    },
                  },
                },
              },
            },
          }),
          recordPage: Immutable.Map(),
          search: Immutable.Map(),
          user: Immutable.Map(),
        });

        return store.dispatch(saveRecord(config, recordTypeConfig, vocabularyConfig, csid))
          .then(() => {
            const actions = store.getActions();

            actions.should.have.lengthOf(15);

            actions[0].should.deep.equal({
              type: 'VALIDATION_PASSED',
              meta: {
                csid,
                path: [],
              },
            });

            actions[1].should.deep.equal({
              type: REMOVE_NOTIFICATION,
              meta: {
                notificationID: NOTIFICATION_ID_VALIDATION,
              },
            });

            actions[2].should.deep.equal({
              type: RECORD_SAVE_STARTED,
              meta: {
                csid,
              },
            });

            actions[3].should.have.property('type', SHOW_NOTIFICATION);
            actions[3].should.have.deep.property('payload.status', STATUS_PENDING);

            actions[4].should.deep.equal({
              type: 'VALIDATION_PASSED',
              meta: {
                csid: subrecordCsid,
                path: [],
              },
            });

            actions[5].should.deep.equal({
              type: REMOVE_NOTIFICATION,
              meta: {
                notificationID: NOTIFICATION_ID_VALIDATION,
              },
            });

            actions[6].should.deep.equal({
              type: RECORD_SAVE_STARTED,
              meta: {
                csid: subrecordCsid,
              },
            });

            actions[7].should.deep.equal({
              type: SET_STICKY_FIELDS,
              payload: Immutable.Map(),
              meta: {
                recordTypeConfig: subrecordTypeConfig,
              },
            });

            actions[8].should.deep.equal({
              type: RECORD_CREATED,
              meta: {
                recordTypeConfig: subrecordTypeConfig,
                currentCsid: subrecordCsid,
                newRecordCsid: createdSubrecordCsid,
              },
            });

            actions[9].type.should.equal(RECORD_SAVE_FULFILLED);
            actions[9].payload.status.should.equal(200);
            actions[9].payload.data.should.deep.equal({});

            actions[9].meta.should.deep.equal({
              recordTypeConfig: subrecordTypeConfig,
              csid: createdSubrecordCsid,
              relatedSubjectCsid: undefined,
              recordPagePrimaryCsid: undefined,
            });

            actions[10].should.deep.equal({
              type: SUBRECORD_CREATED,
              meta: {
                csid,
                subrecordName,
                csidField: subrecordCsidField,
                subrecordCsid: createdSubrecordCsid,
              },
            });

            actions[11].should.deep.equal({
              type: SET_STICKY_FIELDS,
              payload: Immutable.Map(),
              meta: {
                recordTypeConfig,
              },
            });

            actions[12].should.have.property('type', SHOW_NOTIFICATION);
            actions[12].should.have.deep.property('payload.status', STATUS_SUCCESS);

            actions[13].type.should.equal(RECORD_SAVE_FULFILLED);
            actions[13].payload.status.should.equal(200);
            actions[13].payload.data.should.deep.equal({});

            actions[13].meta.should.deep.equal({
              recordTypeConfig,
              csid,
              relatedSubjectCsid: undefined,
              recordPagePrimaryCsid: undefined,
            });
          });
      });

      it('should not save the subrecord if the configured save condition function returns false', () => {
        worker.use(
          rest.put(saveRecordUrl, (req, res, ctx) => {
            const { params } = req;

            if (params.vocabulary === vocabularyServicePath) {
              return res(ctx.json({}));
            }

            return res(ctx.status(400));
          }),
        );

        const store = mockStore({
          prefs: Immutable.Map(),
          record: Immutable.fromJS({
            [csid]: {
              data: {
                current: {
                  document: {
                    'ns2:collectionspace_core': {
                      uri: `/${recordServicePath}/${vocabularyServicePath}/items/${csid}`,
                    },
                    'ns2:persons_common': {
                      blobCsid: subrecordCsid,
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
                      uri: `/${subrecordServicePath}/${subrecordCsid}`,
                    },
                    // The configured saveCondition checks this field.
                    noSave: true,
                  },
                },
              },
            },
          }),
          recordPage: Immutable.Map(),
          search: Immutable.Map(),
          user: Immutable.Map(),
        });

        return store.dispatch(saveRecord(config, recordTypeConfig, vocabularyConfig, csid))
          .then(() => {
            const actions = store.getActions();

            actions.should.have.lengthOf(8);

            actions[0].should.deep.equal({
              type: 'VALIDATION_PASSED',
              meta: {
                csid,
                path: [],
              },
            });

            actions[1].should.deep.equal({
              type: REMOVE_NOTIFICATION,
              meta: {
                notificationID: NOTIFICATION_ID_VALIDATION,
              },
            });

            actions[2].should.deep.equal({
              type: RECORD_SAVE_STARTED,
              meta: {
                csid,
              },
            });

            actions[3].should.have.property('type', SHOW_NOTIFICATION);
            actions[3].should.have.deep.property('payload.status', STATUS_PENDING);

            actions[4].should.deep.equal({
              type: SET_STICKY_FIELDS,
              payload: Immutable.Map(),
              meta: {
                recordTypeConfig,
              },
            });

            actions[5].should.have.property('type', SHOW_NOTIFICATION);
            actions[5].should.have.deep.property('payload.status', STATUS_SUCCESS);

            actions[6].type.should.equal(RECORD_SAVE_FULFILLED);
            actions[6].payload.status.should.equal(200);
            actions[6].payload.data.should.deep.equal({});

            actions[6].meta.should.deep.equal({
              recordTypeConfig,
              csid,
              relatedSubjectCsid: undefined,
              recordPagePrimaryCsid: undefined,
            });

            actions[7].should.deep.equal({
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

    context('for a role', () => {
      const mockStore = configureMockStore([thunk]);
      const recordType = 'authrole';
      const servicePath = 'authorization/roles';
      const saveNewRecordUrl = `/cspace-services/${servicePath}`;

      const config = {};

      const recordTypeConfig = {
        name: recordType,
        serviceConfig: {
          servicePath,
          serviceType: 'security',
        },
        title: () => '',
      };

      before(() => {
        const store = mockStore({
          user: Immutable.Map(),
        });

        return store.dispatch(configureCSpace());
      });

      afterEach(() => {
        worker.resetHandlers();
      });

      it('should show a specific notification message for a duplicate role name error during a create', () => {
        worker.use(
          rest.post(saveNewRecordUrl, (req, res, ctx) => res(
            ctx.status(400),
            ctx.text('ERROR: duplicate key value violates unique constraint "roles_rolename_tenant_id_key"'),
          )),
        );

        const store = mockStore({
          prefs: Immutable.Map(),
          record: Immutable.fromJS({
            '': {
              data: {
                current: {
                  document: {
                    'n2:role': {
                      displayName: 'Test',
                      roleName: 'TEST',
                    },
                  },
                },
              },
            },
          }),
          user: Immutable.Map(),
        });

        return store.dispatch(saveRecord(config, recordTypeConfig, undefined, ''))
          .catch(() => {
            const actions = store.getActions();

            actions.should.have.lengthOf(7);

            actions[0].should.deep.equal({
              type: 'VALIDATION_PASSED',
              meta: {
                csid: '',
                path: [],
              },
            });

            actions[1].should.deep.equal({
              type: REMOVE_NOTIFICATION,
              meta: {
                notificationID: NOTIFICATION_ID_VALIDATION,
              },
            });

            actions[2].should.deep.equal({
              type: RECORD_SAVE_STARTED,
              meta: {
                csid: '',
              },
            });

            actions[3].should.have.property('type', SHOW_NOTIFICATION);
            actions[3].should.have.deep.property('payload.status', STATUS_PENDING);

            actions[4].should.deep.equal({
              type: SET_STICKY_FIELDS,
              payload: Immutable.Map(),
              meta: {
                recordTypeConfig,
              },
            });

            actions[5].should.have.property('type', SHOW_NOTIFICATION);
            actions[5].should.have.property('type', SHOW_NOTIFICATION);
            actions[5].payload.items[0].message.id.should.equal('action.record.errorDupRoleName');
          });
      });
    });
  });

  describe('revertRecord', () => {
    const mockStore = configureMockStore([thunk]);

    it('should dispatch REVERT_RECORD', () => {
      const store = mockStore({
        record: Immutable.Map(),
      });

      const recordTypeConfig = {};
      const csid = '1234';

      store.dispatch(revertRecord(recordTypeConfig, csid));

      const actions = store.getActions();

      actions.should.have.lengthOf(4);

      actions[0].should.deep.equal({
        type: REVERT_RECORD,
        meta: {
          csid,
          recordTypeConfig,
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

      actions[3].should.deep.equal({
        type: REMOVE_NOTIFICATION,
        meta: {
          notificationID: HierarchyReparentNotifier.notificationID,
        },
      });
    });
  });

  describe('addFieldInstance', () => {
    const mockStore = configureMockStore([thunk]);

    it('should create an ADD_FIELD_INSTANCE action', () => {
      const store = mockStore({
        prefs: Immutable.Map(),
        record: Immutable.Map(),
        user: Immutable.Map(),
      });

      const csid = '1234';
      const path = ['path', 'to', 'a', 'field'];
      const position = 1;
      const recordTypeConfig = {};

      store.dispatch(addFieldInstance(recordTypeConfig, csid, path, position));

      return new Promise((resolve) => {
        window.setTimeout(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(3);

          actions[0].should.deep.equal({
            type: ADD_FIELD_INSTANCE,
            meta: {
              csid,
              path,
              position,
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

  describe('sortFieldInstances', () => {
    const mockStore = configureMockStore([thunk]);

    it('should create a SORT_FIELD_INSTANCES action', () => {
      const store = mockStore({
        prefs: Immutable.Map(),
        record: Immutable.Map(),
        user: Immutable.Map(),
      });

      const config = { locale: 'en-US' };
      const csid = '1234';
      const path = ['path', 'to', 'a', 'field'];
      const byField = 'subfield';
      const recordTypeConfig = {};

      store.dispatch(sortFieldInstances(config, recordTypeConfig, csid, path, byField));

      return new Promise((resolve) => {
        window.setTimeout(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(3);

          actions[0].should.deep.equal({
            type: SORT_FIELD_INSTANCES,
            meta: {
              config,
              csid,
              path,
              byField,
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

  describe('deleteFieldValue', () => {
    const mockStore = configureMockStore([thunk]);

    it('should dispatch DELETE_FIELD_VALUE', () => {
      const store = mockStore({
        prefs: Immutable.Map(),
        record: Immutable.Map(),
        user: Immutable.Map(),
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

  describe('moveFieldValue', () => {
    const mockStore = configureMockStore([thunk]);

    it('should dispatch MOVE_FIELD_VALUE', () => {
      const store = mockStore({
        prefs: Immutable.Map(),
        record: Immutable.Map(),
        user: Immutable.Map(),
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

  describe('setFieldValue', () => {
    const mockStore = configureMockStore([thunk]);

    it('should dispatch SET_FIELD_VALUE', () => {
      const store = mockStore({
        prefs: Immutable.Map(),
        record: Immutable.Map(),
        user: Immutable.Map(),
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

  describe('transitionRecord', () => {
    context('for an object/procedure', () => {
      const mockStore = configureMockStore([thunk]);
      const recordType = 'collectionobject';
      const servicePath = 'collectionobjects';
      const csid = '5678';
      const transitionName = 'delete';
      const transitionRecordUrl = `/cspace-services/${servicePath}/${csid}/workflow/${transitionName}`;

      const recordTypeConfig = {
        name: recordType,
        serviceConfig: {
          servicePath,
        },
        title: () => '',
      };

      const config = {
        recordTypes: {
          [recordType]: recordTypeConfig,
        },
      };

      before(() => {
        const store = mockStore({
          user: Immutable.Map(),
        });

        return store.dispatch(configureCSpace());
      });

      afterEach(() => {
        worker.resetHandlers();
      });

      it('should dispatch RECORD_TRANSITION_FULFILLED on success', () => {
        worker.use(
          rest.put(transitionRecordUrl, (req, res, ctx) => res(ctx.json({}))),
        );

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
          recordPage: Immutable.Map(),
        });

        return store.dispatch(
          transitionRecord(config, recordTypeConfig, undefined, csid, transitionName),
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

            actions[3].should.have.property('type', RECORD_TRANSITION_FULFILLED);
            actions[3].payload.status.should.equal(200);
            actions[3].payload.data.should.deep.equal({});

            actions[3].meta.should.include({
              csid,
              recordTypeConfig,
              transitionName,
              relatedSubjectCsid: undefined,
            });

            actions[3].meta.should.have.property('updatedTimestamp');
          });
      });

      it('should dispatch RECORD_TRANSITION_REJECTED on error', () => {
        worker.use(
          rest.put(transitionRecordUrl, (req, res, ctx) => res(ctx.status(400))),
        );

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
          transitionRecord(config, recordTypeConfig, undefined, csid, transitionName),
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

    context('for an authority', () => {
      const mockStore = configureMockStore([thunk]);
      const recordType = 'person';
      const recordServicePath = 'personauthorities';
      const vocabulary = 'ulan';
      const vocabularyServicePath = 'urn:cspace:name(ulan)';
      const csid = '5678';
      const transitionName = 'delete';
      const transitionRecordUrl = `/cspace-services/${recordServicePath}/:vocabulary/items/${csid}/workflow/${transitionName}`;

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

      const config = {
        recordTypes: {
          [recordType]: recordTypeConfig,
        },
      };

      before(() => {
        const store = mockStore({
          user: Immutable.Map(),
        });

        return store.dispatch(configureCSpace());
      });

      afterEach(() => {
        worker.resetHandlers();
      });

      it('should dispatch RECORD_SAVE_FULFILLED on success', () => {
        worker.use(
          rest.put(transitionRecordUrl, (req, res, ctx) => {
            const { params } = req;

            if (params.vocabulary === vocabularyServicePath) {
              return res(ctx.json({}));
            }

            return res(ctx.status(400));
          }),
        );

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
          recordPage: Immutable.Map(),
        });

        return store.dispatch(
          transitionRecord(config, recordTypeConfig, vocabularyConfig, csid, transitionName),
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

            actions[3].should.have.property('type', RECORD_TRANSITION_FULFILLED);
            actions[3].payload.status.should.equal(200);
            actions[3].payload.data.should.deep.equal({});

            actions[3].meta.should.include({
              csid,
              recordTypeConfig,
              transitionName,
              relatedSubjectCsid: undefined,
            });

            actions[3].meta.should.have.property('updatedTimestamp');
          });
      });
    });
  });

  describe('saveRecordWithTransition', () => {
    const mockStore = configureMockStore([thunk]);
    const recordType = 'collectionobject';
    const servicePath = 'collectionobjects';
    const csid = '5678';
    const transitionName = 'lock';
    const saveRecordUrl = `/cspace-services/${servicePath}/${csid}`;
    const readRecordUrl = `/cspace-services/${servicePath}/${csid}`;
    const transitionRecordUrl = `/cspace-services/${servicePath}/${csid}/workflow/${transitionName}`;

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

    afterEach(() => {
      worker.resetHandlers();
    });

    it('should dispatch saveRecord actions followed by transitionRecord actions', () => {
      worker.use(
        rest.put(saveRecordUrl, (req, res, ctx) => res(ctx.json({}))),
        rest.put(transitionRecordUrl, (req, res, ctx) => res(ctx.json({}))),
        rest.get(readRecordUrl, (req, res, ctx) => res(ctx.json({}))),
      );

      const store = mockStore({
        prefs: Immutable.Map(),
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
        recordPage: Immutable.Map(),
        user: Immutable.Map(),
      });

      return store.dispatch(saveRecordWithTransition(
        config, recordTypeConfig, undefined, csid, undefined, undefined, undefined, transitionName,
      ))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(11);

          actions[0].should.deep.equal({
            type: 'VALIDATION_PASSED',
            meta: {
              csid,
              path: [],
            },
          });

          actions[1].should.deep.equal({
            type: REMOVE_NOTIFICATION,
            meta: {
              notificationID: NOTIFICATION_ID_VALIDATION,
            },
          });

          actions[2].should.deep.equal({
            type: RECORD_SAVE_STARTED,
            meta: {
              csid,
            },
          });

          actions[3].should.have.property('type', SHOW_NOTIFICATION);
          actions[3].should.have.deep.property('payload.status', STATUS_PENDING);

          actions[4].should.deep.equal({
            type: SET_STICKY_FIELDS,
            payload: Immutable.Map(),
            meta: {
              recordTypeConfig,
            },
          });

          actions[5].should.have.property('type', SHOW_NOTIFICATION);
          actions[5].should.have.deep.property('payload.status', STATUS_SUCCESS);

          actions[6].type.should.equal(RECORD_SAVE_FULFILLED);
          actions[6].payload.status.should.equal(200);
          actions[6].payload.data.should.deep.equal({});

          actions[6].meta.should.deep.equal({
            recordTypeConfig,
            csid,
            relatedSubjectCsid: undefined,
            recordPagePrimaryCsid: undefined,
          });

          actions[7].should.have.property('type', SHOW_NOTIFICATION);
          actions[7].should.have.deep.property('payload.status', STATUS_PENDING);

          actions[8].should.deep.equal({
            type: RECORD_TRANSITION_STARTED,
            meta: {
              csid,
              recordTypeConfig,
              transitionName,
            },
          });

          actions[9].should.have.property('type', SHOW_NOTIFICATION);
          actions[9].should.have.deep.property('payload.status', STATUS_SUCCESS);

          actions[10].should.have.property('type', RECORD_TRANSITION_FULFILLED);
          actions[10].payload.status.should.equal(200);
          actions[10].payload.data.should.deep.equal({});

          actions[10].meta.should.include({
            csid,
            recordTypeConfig,
            transitionName,
            relatedSubjectCsid: undefined,
          });

          actions[10].meta.should.have.property('updatedTimestamp');
        });
    });
  });

  describe('deleteRecord', () => {
    context('for an object/procedure', () => {
      const mockStore = configureMockStore([thunk]);
      const recordType = 'collectionobject';
      const servicePath = 'collectionobjects';
      const csid = '5678';
      const deleteRecordUrl = `/cspace-services/${servicePath}/${csid}`;

      const recordTypeConfig = {
        name: recordType,
        serviceConfig: {
          servicePath,
        },
        title: () => '',
      };

      const config = {
        recordTypes: {
          [recordType]: recordTypeConfig,
        },
      };

      before(() => {
        const store = mockStore({
          user: Immutable.Map(),
        });

        return store.dispatch(configureCSpace());
      });

      afterEach(() => {
        worker.resetHandlers();
      });

      it('should dispatch RECORD_DELETE_FULFILLED on success', () => {
        worker.use(
          rest.delete(deleteRecordUrl, (req, res, ctx) => res(ctx.json({}))),
        );

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

        return store.dispatch(deleteRecord(config, recordTypeConfig, undefined, csid))
          .then(() => {
            const actions = store.getActions();

            actions.should.have.lengthOf(4);

            actions[0].should.have.property('type', SHOW_NOTIFICATION);
            actions[0].should.have.deep.property('payload.status', STATUS_PENDING);

            actions[1].should.deep.equal({
              type: RECORD_DELETE_STARTED,
              meta: {
                csid,
                recordTypeConfig,
              },
            });

            actions[2].should.have.property('type', SHOW_NOTIFICATION);
            actions[2].should.have.deep.property('payload.status', STATUS_SUCCESS);

            actions[3].should.have.property('type', RECORD_DELETE_FULFILLED);
            actions[3].payload.status.should.equal(200);
            actions[3].payload.data.should.deep.equal({});

            actions[3].meta.should.include({
              csid,
              recordTypeConfig,
              relatedSubjectCsid: undefined,
            });
          });
      });

      it('should dispatch RECORD_DELETE_REJECTED on error', () => {
        worker.use(
          rest.delete(deleteRecordUrl, (req, res, ctx) => res(ctx.status(400))),
        );

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

        return store.dispatch(deleteRecord(config, recordTypeConfig, undefined, csid))
          .then(() => {
            const actions = store.getActions();

            actions.should.have.lengthOf(4);

            actions[0].should.have.property('type', SHOW_NOTIFICATION);
            actions[0].should.have.deep.property('payload.status', STATUS_PENDING);

            actions[1].should.deep.equal({
              type: RECORD_DELETE_STARTED,
              meta: {
                csid,
                recordTypeConfig,
              },
            });

            actions[2].should.have.property('type', SHOW_NOTIFICATION);
            actions[2].should.have.deep.property('payload.status', STATUS_ERROR);

            actions[3].should.have.property('type', RECORD_DELETE_REJECTED);
            actions[3].should.have.property('meta')
              .that.deep.equals({
                csid,
                recordTypeConfig,
              });
          });
      });
    });

    context('for an authority', () => {
      const mockStore = configureMockStore([thunk]);
      const recordType = 'person';
      const recordServicePath = 'personauthorities';
      const vocabulary = 'ulan';
      const vocabularyServicePath = 'urn:cspace:name(ulan)';
      const csid = '5678';
      const deleteRecordUrl = `/cspace-services/${recordServicePath}/:vocabulary/items/${csid}`;

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

      const config = {
        recordTypes: {
          [recordType]: recordTypeConfig,
        },
      };

      before(() => {
        const store = mockStore({
          user: Immutable.Map(),
        });

        return store.dispatch(configureCSpace());
      });

      afterEach(() => {
        worker.resetHandlers();
      });

      it('should dispatch RECORD_DELETE_FULFILLED on success', () => {
        worker.use(
          rest.delete(deleteRecordUrl, (req, res, ctx) => {
            const { params } = req;

            if (params.vocabulary === vocabularyServicePath) {
              return res(ctx.json({}));
            }

            return res(ctx.status(400));
          }),
        );

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
          deleteRecord(config, recordTypeConfig, vocabularyConfig, csid),
        )
          .then(() => {
            const actions = store.getActions();

            actions.should.have.lengthOf(4);

            actions[0].should.have.property('type', SHOW_NOTIFICATION);
            actions[0].should.have.deep.property('payload.status', STATUS_PENDING);

            actions[1].should.deep.equal({
              type: RECORD_DELETE_STARTED,
              meta: {
                csid,
                recordTypeConfig,
              },
            });

            actions[2].should.have.property('type', SHOW_NOTIFICATION);
            actions[2].should.have.deep.property('payload.status', STATUS_SUCCESS);

            actions[3].should.have.property('type', RECORD_DELETE_FULFILLED);
            actions[3].payload.status.should.equal(200);
            actions[3].payload.data.should.deep.equal({});

            actions[3].meta.should.include({
              csid,
              recordTypeConfig,
              relatedSubjectCsid: undefined,
            });
          });
      });
    });
  });

  describe('computeFieldValue', () => {
    const mockStore = configureMockStore([thunk]);

    const recordTypeConfig = {
      fields: {
        document: {
          sayHello: {
            [configKey]: {
              compute: ({ data }) => `Hello ${data}`,
            },
          },
          badCompute: {
            [configKey]: {
              compute: () => {
                throw new Error();
              },
            },
          },
        },
      },
    };

    const csid = '1234';

    before(() => {
      const store = mockStore({
        user: Immutable.Map(),
      });

      return store.dispatch(configureCSpace());
    });

    it('should dispatch FIELD_COMPUTE_FULFILLED when field values are computed', () => {
      const path = ['document', 'sayHello'];
      const value = 'world';

      const store = mockStore({
        prefs: Immutable.Map(),
        record: Immutable.fromJS({
          [csid]: {
            data: {
              current: {
                document: {
                  sayHello: value,
                },
              },
            },
          },
        }),
        user: Immutable.Map(),
      });

      return store.dispatch(computeFieldValue(recordTypeConfig, csid, path, value))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(1);

          actions[0].should.deep.equal({
            type: FIELD_COMPUTE_FULFILLED,
            payload: 'Hello world',
            meta: {
              path,
              csid,
            },
          });
        });
    });

    it('should dispatch FIELD_COMPUTE_REJECTED when there is an error computing field values', () => {
      const path = ['document', 'badCompute'];
      const value = 'foo';

      const store = mockStore({
        prefs: Immutable.Map(),
        record: Immutable.fromJS({
          [csid]: {
            data: {
              current: {},
            },
          },
        }),
        user: Immutable.Map(),
      });

      return store.dispatch(computeFieldValue(recordTypeConfig, csid, path, value))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(1);

          actions[0].should.have.property('type', FIELD_COMPUTE_REJECTED);

          actions[0].should.have.property('meta').that.deep.equals({
            path,
            csid,
          });
        });
    });
  });
});
