/* global window */

import Immutable from 'immutable';
import chaiAsPromised from 'chai-as-promised';
import chaiImmutable from 'chai-immutable';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { setupWorker, rest } from 'msw';
import qs from 'qs';

import {
  SHOW_NOTIFICATION,
} from '../../../src/constants/actionCodes';

import {
  configureCSpace,
} from '../../../src/actions/cspace';

import {
  invoke,
  openReport,
} from '../../../src/actions/report';

import {
  STATUS_ERROR,
} from '../../../src/constants/notificationStatusCodes';

const {
  assert,
  expect,
} = chai;

chai.use(chaiAsPromised);
chai.use(chaiImmutable);
chai.should();

const config = {
  invocables: {
    report: {
      paramReport: {},
    },
  },
  recordTypes: {
    group: {
      serviceConfig: {
        objectName: 'Group',
      },
    },
    report: {
      invocableName: (data) => data.getIn(['document', 'ns2:reports_common', 'filename']),
    },
  },
};

const mockStore = configureMockStore([thunk]);

describe('report action creator', () => {
  const worker = setupWorker();

  before(async function setup() {
    this.timeout(3000);

    await worker.start({ quiet: true });
  });

  after(() => {
    worker.stop();
  });

  describe('invoke', () => {
    const store = mockStore({
      user: Immutable.Map(),
    });

    before(() => store.dispatch(configureCSpace())
      .then(() => store.clearActions()));

    afterEach(() => {
      store.clearActions();
      worker.resetHandlers();
    });

    it('should invoke a report in single mode', () => {
      const reportCsid = 'abcd';
      const recordCsid = '1234';
      const recordType = 'group';

      const invokeUrl = `/cspace-services/reports/${reportCsid}/invoke`;

      let requestPayload = null;

      worker.use(
        rest.post(invokeUrl, async (req, res, ctx) => {
          requestPayload = await req.json();

          return res(ctx.json({}));
        }),
      );

      const invocationDescriptor = Immutable.Map({
        recordType,
        csid: recordCsid,
        mode: 'single',
        outputMIME: 'text/html',
      });

      return store.dispatch(invoke(config, reportCsid, invocationDescriptor))
        .then(() => {
          requestPayload.should.deep.equal({
            'ns2:invocationContext': {
              '@xmlns:ns2': 'http://collectionspace.org/services/common/invocable',
              docType: 'Group',
              mode: 'single',
              singleCSID: recordCsid,
              outputMIME: 'text/html',
            },
          });
        });
    });

    it('should invoke a report in list mode', () => {
      const reportCsid = 'abcd';
      const recordCsid = '1234';
      const recordType = 'group';

      const invokeUrl = `/cspace-services/reports/${reportCsid}/invoke`;

      let requestPayload = null;

      worker.use(
        rest.post(invokeUrl, async (req, res, ctx) => {
          requestPayload = await req.json();

          return res(ctx.json({}));
        }),
      );

      const invocationDescriptor = Immutable.Map({
        recordType,
        csid: [
          recordCsid,
        ],
        mode: 'list',
      });

      return store.dispatch(invoke(config, reportCsid, invocationDescriptor))
        .then(() => {
          requestPayload.should.deep.equal({
            'ns2:invocationContext': {
              '@xmlns:ns2': 'http://collectionspace.org/services/common/invocable',
              docType: 'Group',
              mode: 'list',
              listCSIDs: {
                csid: [
                  '1234',
                ],
              },
            },
          });
        });
    });

    it('should invoke a report in nocontext mode', () => {
      const reportCsid = 'abcd';
      const recordType = 'group';

      const invokeUrl = `/cspace-services/reports/${reportCsid}/invoke`;

      let requestPayload = null;

      worker.use(
        rest.post(invokeUrl, async (req, res, ctx) => {
          requestPayload = await req.json();

          return res(ctx.json({}));
        }),
      );

      const invocationDescriptor = Immutable.Map({
        recordType,
        mode: 'nocontext',
      });

      return store.dispatch(invoke(config, reportCsid, invocationDescriptor))
        .then(() => {
          requestPayload.should.deep.equal({
            'ns2:invocationContext': {
              '@xmlns:ns2': 'http://collectionspace.org/services/common/invocable',
              docType: 'Group',
              mode: 'nocontext',
            },
          });
        });
    });

    it('should dispatch SHOW_NOTIFICATION with STATUS_ERROR when an invocation fails', () => {
      const reportCsid = 'abcd';
      const recordType = 'group';

      const invokeUrl = `/cspace-services/reports/${reportCsid}/invoke`;

      worker.use(
        rest.post(invokeUrl, (req, res, ctx) => res(ctx.status(400))),
      );

      const invocationDescriptor = Immutable.Map({
        recordType,
        mode: 'nocontext',
      });

      return store.dispatch(invoke(config, reportCsid, invocationDescriptor)).should.eventually
        .be.rejected.then(() => {
          const actions = store.getActions();

          actions[0].type.should.equal(SHOW_NOTIFICATION);
          actions[0].payload.status.should.equal(STATUS_ERROR);
        });
    });
  });

  describe('openReport', () => {
    const params = {
      foo: 'abc',
      bar: 'def',
    };

    const store = mockStore({
      prefs: Immutable.Map(),
      record: Immutable.fromJS({
        '': {
          data: {
            current: {
              params,
            },
          },
        },
      }),
      user: Immutable.Map(),
    });

    before(() => store.dispatch(configureCSpace())
      .then(() => store.clearActions()));

    afterEach(() => {
      store.clearActions();
    });

    it('should open a window with the URL of the report', () => {
      const reportCsid = 'abcd';
      const recordCsid = '1234';
      const recordType = 'group';
      const outputMIME = 'someMimeType';

      const reportMetadata = Immutable.fromJS({
        document: {
          'ns2:collectionspace_core': {
            uri: `/report/${reportCsid}`,
          },
          'ns2:reports_common': {
            filename: 'report',
          },
        },
      });

      const invocationDescriptor = Immutable.Map({
        outputMIME,
        recordType,
        csid: recordCsid,
        mode: 'single',
      });

      const savedWindowOpen = window.open;

      let openedPath = null;

      window.open = (path) => {
        openedPath = path;
      };

      return store.dispatch(openReport(config, reportMetadata, invocationDescriptor))
        .then(() => {
          openedPath.should.equal(`/report/${reportCsid}?mode=single&csid=${recordCsid}&outputMIME=${outputMIME}&recordType=${recordType}`);

          window.open = savedWindowOpen;
        });
    });

    it('should include parameters', () => {
      const reportCsid = 'abcd';
      const recordCsid = '1234';
      const recordType = 'group';

      const reportMetadata = Immutable.fromJS({
        document: {
          'ns2:collectionspace_core': {
            uri: `/report/${reportCsid}`,
          },
          'ns2:reports_common': {
            filename: 'paramReport',
          },
        },
      });

      const invocationDescriptor = Immutable.Map({
        recordType,
        csid: recordCsid,
        mode: 'single',
      });

      const savedWindowOpen = window.open;

      let openedPath = null;

      window.open = (path) => {
        openedPath = path;
      };

      return store.dispatch(openReport(config, reportMetadata, invocationDescriptor))
        .then(() => {
          const expectedParams = qs.stringify({
            params: JSON.stringify(params),
          });

          openedPath.should.equal(`/report/${reportCsid}?mode=single&csid=${recordCsid}&recordType=${recordType}&${expectedParams}`);

          window.open = savedWindowOpen;
        });
    });

    it('should not call window.open if parameter validation fails', () => {
      const invalidDataStore = mockStore({
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
                params,
              },
            },
          },
        }),
        user: Immutable.Map(),
      });

      const reportCsid = 'abcd';
      const recordCsid = '1234';
      const recordType = 'group';

      const reportMetadata = Immutable.fromJS({
        document: {
          'ns2:collectionspace_core': {
            uri: `/report/${reportCsid}`,
          },
          'ns2:reports_common': {
            filename: 'paramReport',
          },
        },
      });

      const invocationDescriptor = Immutable.Map({
        recordType,
        csid: recordCsid,
        mode: 'single',
      });

      const savedWindowOpen = window.open;

      let openedPath = null;

      window.open = (path) => {
        openedPath = path;
      };

      return invalidDataStore.dispatch(openReport(config, reportMetadata, invocationDescriptor))
        .then(() => {
          assert.fail('dispatch should be rejected');
        })
        .catch(() => {
          expect(openedPath).to.equal(null);

          window.open = savedWindowOpen;
        });
    });
  });
});
