import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

import {
  configureCSpace,
} from '../../../src/actions/cspace';

import {
  invoke,
} from '../../../src/actions/report';

import {
  SHOW_NOTIFICATION,
} from '../../../src/actions/notification';

import {
  STATUS_ERROR,
} from '../../../src/constants/notificationStatusCodes';

chai.use(chaiImmutable);
chai.should();

const config = {
  recordTypes: {
    group: {
      serviceConfig: {
        objectName: 'Group',
      },
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

    it('should invoke a report for a single csid', function test() {
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

    it('should invoke a report for list csids', function test() {
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

    it('should invoke a report for no csid', function test() {
      moxios.stubRequest(/./, {
        status: 200,
        response: {},
      });

      const reportCsid = 'abcd';
      const recordType = 'group';

      const invocationDescriptor = {
        recordType,
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
          status: 200,
          response: {},
        }).then(() => {
          moxios.requests.mostRecent().respondWith({
            status: 400,
          });
        });
      });

      const reportCsid = 'abcd';
      const recordType = 'group';

      const invocationDescriptor = {
        recordType,
      };

      return store.dispatch(invoke(config, reportCsid, invocationDescriptor))
        .catch(() => {
          const actions = store.getActions();

          actions[0].type.should.equal(SHOW_NOTIFICATION);
          actions[0].payload.status.should.equal(STATUS_ERROR);
        });
    });
  });
});
