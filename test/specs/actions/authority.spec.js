import Immutable from 'immutable';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

import {
  configureCSpace,
} from '../../../src/actions/cspace';

import {
  AUTH_VOCABS_READ_STARTED,
  AUTH_VOCABS_READ_FULFILLED,
  AUTH_VOCABS_READ_REJECTED,
  readAuthVocabs,
} from '../../../src/actions/authority';

describe('authority action creator', function suite() {
  describe('readAuthVocabs', function actionSuite() {
    const mockStore = configureMockStore([thunk]);

    const store = mockStore({
      authority: Immutable.Map(),
      // user: Immutable.Map(),
    });

    const config = {
      recordTypes: {
        group: {
          serviceConfig: {
            serviceType: 'procedure',
          },
        },
        person: {
          serviceConfig: {
            servicePath: 'personauthorities',
            serviceType: 'authority',
          },
        },
        organization: {
          serviceConfig: {
            servicePath: 'orgauthorities',
            serviceType: 'authority',
          },
        },
      },
    };

    const readAuthorityUrl = /^\/cspace-services\/.*authorities?/;

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

    it('should dispatch AUTH_VOCABS_READ_FULFILLED on success', function test() {
      moxios.stubRequest(readAuthorityUrl, {
        status: 200,
        response: {},
      });

      return store.dispatch(readAuthVocabs(config))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(2);

          actions[0].should.deep.equal({
            type: AUTH_VOCABS_READ_STARTED,
          });

          actions[1].should.deep.equal({
            type: AUTH_VOCABS_READ_FULFILLED,
            payload: [
              {
                status: 200,
                statusText: undefined,
                headers: undefined,
                data: {},
              },
              {
                status: 200,
                statusText: undefined,
                headers: undefined,
                data: {},
              },
            ],
            meta: {
              config,
            },
          });
        });
    });

    it('should dispatch AUTH_VOCABS_READ_REJECTED on error', function test() {
      moxios.stubRequest(readAuthorityUrl, {
        status: 400,
        response: {},
      });

      return store.dispatch(readAuthVocabs(config))
        .catch(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(2);

          actions[0].should.deep.equal({
            type: AUTH_VOCABS_READ_STARTED,
          });

          actions[1].should.contain({
            type: AUTH_VOCABS_READ_REJECTED,
          });
        });
    });
  });
});
