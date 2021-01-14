/* global window */

import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

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
  describe('invoke', () => {
    const store = mockStore({
      user: Immutable.Map(),
    });

    before(() => store.dispatch(configureCSpace())
      .then(() => store.clearActions()));

    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      store.clearActions();
      moxios.uninstall();
    });

    it('should invoke a export in single mode', () => {
      moxios.stubRequest(/./, {
        status: 200,
        response: {},
      });

      const recordCsid = '1234';
      const recordType = 'group';

      const invocationDescriptor = Immutable.fromJS({
        recordType,
        csid: recordCsid,
        mode: 'single',
        outputMIME: 'text/csv',
        includeFields: [
          'ns2:collectionspace_core/updatedAt',
        ],
      });

      return store.dispatch(invoke(config, invocationDescriptor))
        .then(() => {
          const request = moxios.requests.mostRecent();

          request.url.should.equal('/cspace-services/exports');

          const data = JSON.parse(request.config.data);

          data.should.deep.equal({
            'ns2:invocationContext': {
              '@xmlns:ns2': 'http://collectionspace.org/services/common/invocable',
              docType: 'Group',
              mode: 'single',
              singleCSID: recordCsid,
              outputMIME: 'text/csv',
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
      moxios.stubRequest(/./, {
        status: 200,
        response: {},
      });

      const recordCsid = '1234';
      const recordType = 'group';

      const invocationDescriptor = Immutable.fromJS({
        recordType,
        csid: [
          recordCsid,
        ],
        mode: 'list',
        includeFields: [
          'ns2:groups_common/some/field/path',
        ],
      });

      return store.dispatch(invoke(config, invocationDescriptor))
        .then(() => {
          const request = moxios.requests.mostRecent();

          request.url.should.equal('/cspace-services/exports');

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
      moxios.stubRequest(/./, {
        status: 200,
        response: {},
      });

      const recordType = 'group';

      const invocationDescriptor = Immutable.Map({
        recordType,
        mode: 'nocontext',
      });

      return store.dispatch(invoke(config, invocationDescriptor))
        .then(() => {
          const request = moxios.requests.mostRecent();

          request.url.should.equal('/cspace-services/exports');

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

    it('should dispatch SHOW_NOTIFICATION with STATUS_ERROR when an invocation fails', () => {
      moxios.wait(() => {
        moxios.requests.mostRecent().respondWith({
          status: 400,
          response: {},
        });
      });

      const recordType = 'group';

      const invocationDescriptor = Immutable.Map({
        recordType,
        mode: 'nocontext',
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

      const invocationDescriptor = Immutable.fromJS({
        outputMIME,
        recordType,
        csid: [recordCsid],
        mode: 'list',
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

      const invocationDescriptor = Immutable.fromJS({
        outputMIME,
        recordType,
        csid: [recordCsid],
        mode: 'list',
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
