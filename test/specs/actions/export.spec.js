/* global window */

import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { setupWorker, rest } from 'msw';

import {
  SHOW_NOTIFICATION,
} from '../../../src/constants/actionCodes';

import {
  configureCSpace,
} from '../../../src/actions/cspace';

import {
  invoke,
  openExport,
} from '../../../src/actions/export';

import {
  STATUS_ERROR,
} from '../../../src/constants/notificationStatusCodes';

import {
  loadInvocationDescriptor,
} from '../../../src/helpers/invocationHelpers';

chai.use(chaiImmutable);
chai.should();

const config = {
  invocables: {
    export: {
      paramExport: {},
    },
  },
  recordTypes: {
    group: {
      serviceConfig: {
        objectName: 'Group',
      },
    },
    export: {
      invocableName: (data) => data.getIn(['document', 'ns2:exports_common', 'filename']),
    },
  },
};

const mockStore = configureMockStore([thunk]);

describe('export action creator', () => {
  const worker = setupWorker();

  before(() => worker.start({ quiet: true }));

  after(() => {
    worker.stop();
  });

  describe('invoke', () => {
    const store = mockStore({
      user: Immutable.Map(),
    });

    const invokeExportUrl = '/cspace-services/exports';

    before(() => store.dispatch(configureCSpace())
      .then(() => store.clearActions()));

    afterEach(() => {
      store.clearActions();
      worker.resetHandlers();
    });

    it('should invoke a export in single mode', () => {
      const recordCsid = '1234';
      const recordType = 'group';
      const mode = 'single';
      const outputMIME = 'text/csv';
      const includeFields = ['ns2:collectionspace_core/updatedAt'];

      let requestPayload = null;

      worker.use(
        rest.post(invokeExportUrl, async (req, res, ctx) => {
          requestPayload = await req.json();

          return res(ctx.json({}));
        }),
      );

      const invocationDescriptor = Immutable.fromJS({
        recordType,
        csid: recordCsid,
        mode,
        outputMIME,
        includeFields,
      });

      return store.dispatch(invoke(config, invocationDescriptor))
        .then(() => {
          requestPayload.should.deep.equal({
            'ns2:invocationContext': {
              '@xmlns:ns2': 'http://collectionspace.org/services/common/invocable',
              docType: 'Group',
              mode,
              singleCSID: recordCsid,
              outputMIME,
              includeFields: {
                field: [
                  'collectionspace_core:updatedAt',
                ],
              },
            },
          });
        });
    });

    it('should invoke a export in list mode', () => {
      const recordCsid = '1234';
      const recordType = 'group';
      const mode = 'list';
      const includeFields = ['ns2:groups_common/some/field/path'];

      let requestPayload = null;

      worker.use(
        rest.post(invokeExportUrl, async (req, res, ctx) => {
          requestPayload = await req.json();

          return res(ctx.json({}));
        }),
      );

      const invocationDescriptor = Immutable.fromJS({
        recordType,
        csid: [
          recordCsid,
        ],
        mode,
        includeFields,
      });

      return store.dispatch(invoke(config, invocationDescriptor))
        .then(() => {
          requestPayload.should.deep.equal({
            'ns2:invocationContext': {
              '@xmlns:ns2': 'http://collectionspace.org/services/common/invocable',
              docType: 'Group',
              mode,
              listCSIDs: {
                csid: [
                  recordCsid,
                ],
              },
              includeFields: {
                field: [
                  'groups_common:some/field/path',
                ],
              },
            },
          });
        });
    });

    it('should invoke a export in nocontext mode', () => {
      const recordType = 'group';
      const mode = 'nocontext';

      let requestPayload = null;

      worker.use(
        rest.post(invokeExportUrl, async (req, res, ctx) => {
          requestPayload = await req.json();

          return res(ctx.json({}));
        }),
      );

      const invocationDescriptor = Immutable.Map({
        recordType,
        mode,
      });

      return store.dispatch(invoke(config, invocationDescriptor))
        .then(() => {
          requestPayload.should.deep.equal({
            'ns2:invocationContext': {
              '@xmlns:ns2': 'http://collectionspace.org/services/common/invocable',
              docType: 'Group',
              mode,
            },
          });
        });
    });

    it('should dispatch SHOW_NOTIFICATION with STATUS_ERROR when an invocation fails', () => {
      const recordType = 'group';
      const mode = 'nocontext';

      worker.use(
        rest.post(invokeExportUrl, (req, res, ctx) => res(ctx.status(400))),
      );

      const invocationDescriptor = Immutable.Map({
        recordType,
        mode,
      });

      return store.dispatch(invoke(config, invocationDescriptor))
        .catch(() => {
          const actions = store.getActions();

          actions[0].type.should.equal(SHOW_NOTIFICATION);
          actions[0].payload.status.should.equal(STATUS_ERROR);
        });
    });
  });

  describe('openExport', () => {
    const store = mockStore();

    it('should open a window with the URL of the export', () => {
      const recordCsid = '1234';
      const recordType = 'group';
      const outputMIME = 'someMimeType';
      const includeField = 'someFieldPath';
      const mode = 'list';

      const invocationDescriptor = Immutable.fromJS({
        outputMIME,
        recordType,
        csid: [recordCsid],
        mode,
        includeFields: [includeField],
      });

      const savedWindowOpen = window.open;

      let openedPath = null;

      window.open = (path) => {
        openedPath = path;
      };

      return store.dispatch(openExport(config, invocationDescriptor))
        .then(() => {
          openedPath.should.equal('/export');

          window.open = savedWindowOpen;
        });
    });

    it('should store the invocation descriptor', () => {
      const recordCsid = '1234';
      const recordType = 'group';
      const outputMIME = 'someMimeType';
      const includeField = 'someFieldPath';
      const mode = 'list';

      const invocationDescriptor = Immutable.fromJS({
        outputMIME,
        recordType,
        csid: [recordCsid],
        mode,
        includeFields: [includeField],
      });

      const savedWindowOpen = window.open;

      window.open = () => {};

      return store.dispatch(openExport(config, invocationDescriptor))
        .then(() => {
          loadInvocationDescriptor().should.equal(invocationDescriptor);

          window.open = savedWindowOpen;
        });
    });
  });
});
