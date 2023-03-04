import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { setupWorker, rest } from 'msw';

import {
  BATCH_INVOKE_STARTED,
  BATCH_INVOKE_FULFILLED,
  BATCH_INVOKE_REJECTED,
  SHOW_NOTIFICATION,
} from '../../../src/constants/actionCodes';

import {
  STATUS_ERROR,
  STATUS_PENDING,
  STATUS_SUCCESS,
} from '../../../src/constants/notificationStatusCodes';

import {
  configureCSpace,
} from '../../../src/actions/cspace';

import {
  invoke,
} from '../../../src/actions/batch';

const {
  assert,
} = chai;

chai.use(chaiImmutable);
chai.should();

const config = {
  invocables: {
    batch: {
      paramBatch: {},
    },
  },
  recordTypes: {
    batch: {
      invocableName: (data) => data.getIn(['document', 'ns2:batch_common', 'name']),
    },
    group: {
      serviceConfig: {
        objectName: 'Group',
      },
    },
  },
};

const mockStore = configureMockStore([thunk]);

describe('batch action creator', () => {
  const worker = setupWorker();

  before(() => {
    worker.start({ quiet: true });
  });

  after(() => {
    worker.stop();
  });

  describe('invoke', () => {
    const store = mockStore({
      prefs: Immutable.Map(),
      record: Immutable.fromJS({
        '': {
          data: {
            current: {
              params: {
                foo: 'abc',
                bar: 'def',
              },
            },
          },
        },
      }),
      user: Immutable.Map(),
    });

    const invokeBatchUrl = '/cspace-services/batch/:batchCsid/invoke';

    before(() => store.dispatch(configureCSpace())
      .then(() => store.clearActions()));

    afterEach(() => {
      store.clearActions();
      worker.resetHandlers();
    });

    it('should invoke a batch job in single mode', () => {
      const batchCsid = 'abcd';
      const recordCsid = '1234';
      const recordType = 'group';
      const mode = 'single';

      let requestPayload = null;

      worker.use(
        rest.post(invokeBatchUrl, async (req, res, ctx) => {
          const { params } = req;

          if (
            params.batchCsid === batchCsid
          ) {
            requestPayload = await req.json();

            return res(ctx.json({}));
          }

          return res(ctx.status(400));
        }),
      );

      const batchMetadata = Immutable.fromJS({
        document: {
          'ns2:collectionspace_core': {
            uri: `/batch/${batchCsid}`,
          },
        },
      });

      const invocationDescriptor = Immutable.Map({
        mode,
        recordType,
        csid: recordCsid,
      });

      return store.dispatch(invoke(config, batchMetadata, invocationDescriptor))
        .then((result) => {
          result.status.should.equal(200);

          requestPayload.should.deep.equal({
            'ns2:invocationContext': {
              '@xmlns:ns2': 'http://collectionspace.org/services/common/invocable',
              docType: 'Group',
              mode,
              singleCSID: recordCsid,
            },
          });
        });
    });

    it('should invoke a batch job in list mode', () => {
      const batchCsid = 'abcd';
      const recordCsid = '1234';
      const recordType = 'group';
      const mode = 'list';

      let requestPayload = null;

      worker.use(
        rest.post(invokeBatchUrl, async (req, res, ctx) => {
          const { params } = req;

          if (
            params.batchCsid === batchCsid
          ) {
            requestPayload = await req.json();

            return res(ctx.json({}));
          }

          return res(ctx.status(400));
        }),
      );

      const batchMetadata = Immutable.fromJS({
        document: {
          'ns2:collectionspace_core': {
            uri: `/batch/${batchCsid}`,
          },
        },
      });

      const invocationDescriptor = Immutable.Map({
        mode,
        recordType,
        csid: [ recordCsid ],
      });

      return store.dispatch(invoke(config, batchMetadata, invocationDescriptor))
        .then((response) => {
          response.status.should.equal(200);

          requestPayload.should.deep.equal({
            'ns2:invocationContext': {
              '@xmlns:ns2': 'http://collectionspace.org/services/common/invocable',
              docType: 'Group',
              mode,
              listCSIDs: {
                csid: [
                  '1234',
                ],
              },
            },
          });
        });
    });

    it('should invoke a batch job in nocontext mode', () => {
      const batchCsid = 'abcd';
      const recordType = 'group';
      const mode = 'nocontext';

      let requestPayload = null;

      worker.use(
        rest.post(invokeBatchUrl, async (req, res, ctx) => {
          const { params } = req;

          if (
            params.batchCsid === batchCsid
          ) {
            requestPayload = await req.json();

            return res(ctx.json({}));
          }

          return res(ctx.status(400));
        }),
      );

      const batchMetadata = Immutable.fromJS({
        document: {
          'ns2:collectionspace_core': {
            uri: `/batch/${batchCsid}`,
          },
        },
      });

      const invocationDescriptor = Immutable.Map({
        mode,
        recordType,
      });

      return store.dispatch(invoke(config, batchMetadata, invocationDescriptor))
        .then((response) => {
          response.status.should.equal(200);

          requestPayload.should.deep.equal({
            'ns2:invocationContext': {
              '@xmlns:ns2': 'http://collectionspace.org/services/common/invocable',
              docType: 'Group',
              mode,
            },
          });
        });
    });

    it('should send parameters', () => {
      const batchCsid = 'abcd';
      const recordCsid = '1234';
      const recordType = 'group';
      const mode = 'single';

      let requestPayload = null;

      worker.use(
        rest.post(invokeBatchUrl, async (req, res, ctx) => {
          const { params } = req;

          if (
            params.batchCsid === batchCsid
          ) {
            requestPayload = await req.json();

            return res(ctx.json({}));
          }

          return res(ctx.status(400));
        }),
      );

      const batchMetadata = Immutable.fromJS({
        document: {
          'ns2:collectionspace_core': {
            uri: `/batch/${batchCsid}`,
          },
          'ns2:batch_common': {
            name: 'paramBatch',
          },
        },
      });

      const invocationDescriptor = Immutable.Map({
        mode,
        recordType,
        csid: recordCsid,
      });

      return store.dispatch(invoke(config, batchMetadata, invocationDescriptor))
        .then(() => {
          requestPayload.should.deep.equal({
            'ns2:invocationContext': {
              '@xmlns:ns2': 'http://collectionspace.org/services/common/invocable',
              docType: 'Group',
              mode,
              singleCSID: recordCsid,
              params: {
                param: [
                  { key: 'foo', value: 'abc' },
                  { key: 'bar', value: 'def' },
                ],
              },
            },
          });
        });
    });

    it('should call the onValidationSuccess callback if parameter validation succeeds', () => {
      const batchCsid = 'abcd';
      const recordCsid = '1234';
      const recordType = 'group';
      const mode = 'single';

      worker.use(
        rest.post(invokeBatchUrl, (req, res, ctx) => res(ctx.json({}))),
      );

      const batchMetadata = Immutable.fromJS({
        document: {
          'ns2:collectionspace_core': {
            uri: `/batch/${batchCsid}`,
          },
          'ns2:batch_common': {
            name: 'paramBatch',
          },
        },
      });

      const invocationDescriptor = Immutable.Map({
        mode,
        recordType,
        csid: recordCsid,
      });

      let onValidationSuccessCalled = false;

      const handleValidationSuccess = () => {
        onValidationSuccessCalled = true;
      };

      return store.dispatch(
        invoke(config, batchMetadata, invocationDescriptor, handleValidationSuccess),
      )
        .then(() => {
          onValidationSuccessCalled.should.equal(true);
        });
    });

    it('should not dispatch any actions when parameter validation fails', () => {
      const batchCsid = 'abcd';
      const recordCsid = '1234';
      const recordType = 'group';
      const mode = 'single';

      const invalidDataStore = mockStore({
        notification: Immutable.Map(),
        prefs: Immutable.Map(),
        record: Immutable.fromJS({
          '': {
            validation: {
              params: {
                baz: {
                  '[error]': {
                    code: 'ERR_MISSING_REQ_FIELD',
                  },
                },
              },
            },
            data: {
              current: {
                params: {
                  foo: 'abc',
                  bar: 'def',
                },
              },
            },
          },
        }),
        user: Immutable.Map(),
      });

      worker.use(
        rest.post(invokeBatchUrl, (req, res, ctx) => res(ctx.json({}))),
      );

      const batchMetadata = Immutable.fromJS({
        document: {
          'ns2:collectionspace_core': {
            uri: `/batch/${batchCsid}`,
          },
          'ns2:batch_common': {
            name: 'paramBatch',
          },
        },
      });

      const invocationDescriptor = Immutable.Map({
        mode,
        recordType,
        csid: recordCsid,
      });

      return invalidDataStore.dispatch(invoke(config, batchMetadata, invocationDescriptor))
        .then(() => {
          assert.fail('action should be rejected');
        })
        .catch(() => {
          const actions = store.getActions();
          actions.should.have.lengthOf(0);
        })
    });

    it('should dispatch BATCH_INVOKE_FULFILLED when an invocation completes successfully', () => {
      const batchCsid = 'abcd';
      const recordCsid = '1234';
      const recordType = 'group';
      const mode = 'single';

      worker.use(
        rest.post(invokeBatchUrl, (req, res, ctx) => res(ctx.json({}))),
      );

      const batchMetadata = Immutable.fromJS({
        document: {
          'ns2:collectionspace_core': {
            uri: `/batch/${batchCsid}`,
          },
        },
      });

      const invocationDescriptor = Immutable.Map({
        mode,
        recordType,
        csid: recordCsid,
      });

      return store.dispatch(invoke(config, batchMetadata, invocationDescriptor))
        .then(() => {
          const actions = store.getActions();
          actions.should.have.lengthOf(4);

          actions[0].type.should.equal(BATCH_INVOKE_STARTED);
          actions[0].meta.should.deep.equal({
            csid: batchCsid,
          });

          actions[1].type.should.equal(SHOW_NOTIFICATION);
          actions[1].payload.status.should.equal(STATUS_PENDING);

          actions[2].type.should.equal(BATCH_INVOKE_FULFILLED);
          actions[2].meta.should.deep.equal({
            csid: batchCsid,
            numAffected: undefined,
          });

          actions[3].type.should.equal(SHOW_NOTIFICATION);
          actions[3].payload.status.should.equal(STATUS_SUCCESS);
        });
    });

    it('should dispatch BATCH_INVOKE_REJECTED when an invocation fails', () => {
      const batchCsid = 'abcd';
      const recordCsid = '1234';
      const recordType = 'group';
      const mode = 'single';

      worker.use(
        rest.post(invokeBatchUrl, (req, res, ctx) => res(ctx.status(400))),
      );

      const batchMetadata = Immutable.fromJS({
        document: {
          'ns2:collectionspace_core': {
            uri: `/batch/${batchCsid}`,
          },
        },
      });

      const invocationDescriptor = Immutable.Map({
        mode,
        recordType,
        csid: recordCsid,
      });

      return store.dispatch(invoke(config, batchMetadata, invocationDescriptor))
        .then(() => {
          const actions = store.getActions();
          actions.should.have.lengthOf(4);

          actions[0].type.should.equal(BATCH_INVOKE_STARTED);
          actions[0].meta.should.deep.equal({
            csid: batchCsid,
          });

          actions[1].type.should.equal(SHOW_NOTIFICATION);
          actions[1].payload.status.should.equal(STATUS_PENDING);

          actions[2].type.should.equal(BATCH_INVOKE_REJECTED);
          actions[2].meta.should.deep.equal({
            csid: batchCsid,
          });

          actions[3].type.should.equal(SHOW_NOTIFICATION);
          actions[3].payload.status.should.equal(STATUS_ERROR);
        });
    });
  });
});
