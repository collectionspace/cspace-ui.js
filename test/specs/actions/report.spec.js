/* global window */

import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
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

const assert = chai.assert;
const expect = chai.expect;

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
      invocableName: data =>
        data.getIn(['document', 'ns2:reports_common', 'filename']),
    },
  },
};

const mockStore = configureMockStore([thunk]);

describe('report action creator', function suite() {
  describe('invoke', function actionSuite() {
    const store = mockStore({
      user: Immutable.Map(),
    });

    before(() =>
      store.dispatch(configureCSpace())
        .then(() => store.clearActions())
    );

    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      store.clearActions();
      moxios.uninstall();
    });

    it('should invoke a report in single mode', function test() {
      moxios.stubRequest(/./, {
        status: 200,
        response: {},
      });

      const reportCsid = 'abcd';
      const recordCsid = '1234';
      const recordType = 'group';

      const invocationDescriptor = {
        recordType,
        csid: recordCsid,
        mode: 'single',
      };

      return store.dispatch(invoke(config, reportCsid, invocationDescriptor))
        .then(() => {
          const request = moxios.requests.mostRecent();

          request.url.should.equal(`/cspace-services/reports/${reportCsid}`);

          const data = JSON.parse(request.config.data);

          data.should.deep.equal({
            'ns2:invocationContext': {
              '@xmlns:ns2': 'http://collectionspace.org/services/common/invocable',
              docType: 'Group',
              mode: 'single',
              singleCSID: recordCsid,
            },
          });
        });
    });

    it('should invoke a report in list mode', function test() {
      moxios.stubRequest(/./, {
        status: 200,
        response: {},
      });

      const reportCsid = 'abcd';
      const recordCsid = '1234';
      const recordType = 'group';

      const invocationDescriptor = {
        recordType,
        csid: [
          recordCsid,
        ],
        mode: 'list',
      };

      return store.dispatch(invoke(config, reportCsid, invocationDescriptor))
        .then(() => {
          const request = moxios.requests.mostRecent();

          request.url.should.equal(`/cspace-services/reports/${reportCsid}`);

          const data = JSON.parse(request.config.data);

          data.should.deep.equal({
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

    it('should invoke a report in nocontext mode', function test() {
      moxios.stubRequest(/./, {
        status: 200,
        response: {},
      });

      const reportCsid = 'abcd';
      const recordType = 'group';

      const invocationDescriptor = {
        recordType,
        mode: 'nocontext',
      };

      return store.dispatch(invoke(config, reportCsid, invocationDescriptor))
        .then(() => {
          const request = moxios.requests.mostRecent();

          request.url.should.equal(`/cspace-services/reports/${reportCsid}`);

          const data = JSON.parse(request.config.data);

          data.should.deep.equal({
            'ns2:invocationContext': {
              '@xmlns:ns2': 'http://collectionspace.org/services/common/invocable',
              docType: 'Group',
              mode: 'nocontext',
            },
          });
        });
    });

    it('should dispatch SHOW_NOTIFICATION with STATUS_ERROR when an invocation fails', function test() {
      moxios.wait(() => {
        moxios.requests.mostRecent().respondWith({
          status: 400,
          response: {},
        });
      });

      const reportCsid = 'abcd';
      const recordType = 'group';

      const invocationDescriptor = {
        recordType,
        mode: 'nocontext',
      };

      return store.dispatch(invoke(config, reportCsid, invocationDescriptor))
        .catch(() => {
          const actions = store.getActions();

          actions[0].type.should.equal(SHOW_NOTIFICATION);
          actions[0].payload.status.should.equal(STATUS_ERROR);
        });
    });
  });

  describe('openReport', function actionSuite() {
    const params = {
      foo: 'abc',
      bar: 'def',
    };

    const store = mockStore({
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

    before(() =>
      store.dispatch(configureCSpace())
        .then(() => store.clearActions())
    );

    beforeEach(() => {
    });

    afterEach(() => {
      store.clearActions();
    });

    it('should open a window with the URL of the report', function test() {
      const reportCsid = 'abcd';
      const recordCsid = '1234';
      const recordType = 'group';

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

      const invocationDescriptor = {
        recordType,
        csid: recordCsid,
        mode: 'single',
      };

      const savedWindowOpen = window.open;

      let openedPath = null;

      window.open = (path) => {
        openedPath = path;
      };

      return store.dispatch(openReport(config, reportMetadata, invocationDescriptor))
        .then(() => {
          openedPath.should.equal(`/report/${reportCsid}?mode=single&csid=${recordCsid}&recordType=${recordType}`);

          window.open = savedWindowOpen;
        });
    });

    it('should include parameters', function test() {
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

      const invocationDescriptor = {
        recordType,
        csid: recordCsid,
        mode: 'single',
      };

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

    it('should not call window.open if parameter validation fails', function test() {
      const invalidDataStore = mockStore({
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

      const invocationDescriptor = {
        recordType,
        csid: recordCsid,
        mode: 'single',
      };

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
