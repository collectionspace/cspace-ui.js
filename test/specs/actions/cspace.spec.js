import Immutable from 'immutable';
import configureMockStore from 'redux-mock-store';
import chaiAsPromised from 'chai-as-promised';
import thunk from 'redux-thunk';
import { setupWorker, rest } from 'msw';
import getSession from '../../../src/helpers/session';
import { MODAL_LOGIN } from '../../../src/constants/modalNames';

import {
  CSPACE_CONFIGURED,
  SYSTEM_INFO_READ_FULFILLED,
  SYSTEM_INFO_READ_REJECTED,
  OPEN_MODAL,
} from '../../../src/constants/actionCodes';

import {
  configureCSpace,
  createSession,
  setSession,
  readSystemInfo,
} from '../../../src/actions/cspace';

chai.use(chaiAsPromised);
chai.should();

const mockStore = configureMockStore([thunk]);

describe('cspace action creator', () => {
  const worker = setupWorker();

  before(async () => {
    await worker.start({ quiet: true });
  });

  after(() => {
    worker.stop();
  });

  describe('configureCSpace', () => {
    const serverUrl = 'http://something.org';

    afterEach(() => {
      worker.resetHandlers();
    });

    it('should create a CSpace session and make it the active session', () => {
      const store = mockStore({
        user: Immutable.Map(),
      });

      const cspaceConfig = {
        foo: 'bar',
        serverUrl,
      };

      store.dispatch(configureCSpace(cspaceConfig));

      const session = getSession();

      session.should.be.an('object');
      session.config().should.have.property('url', serverUrl);
    });

    it('should dispatch CSPACE_CONFIGURED', () => {
      const store = mockStore({
        user: Immutable.Map(),
      });

      const cspaceConfig = {
        foo: 'bar',
        serverUrl,
        recordTypes: {
          person: {
            serviceConfig: {
              servicePath: 'personauthorities',
              serviceType: 'authority',
            },
          },
        },
      };

      store.dispatch(configureCSpace(cspaceConfig));

      const actions = store.getActions();

      actions.should.have.lengthOf(1);

      actions[0].should
        .include({ type: CSPACE_CONFIGURED })
        .and.have.property('payload')
        .that.has.property('url', serverUrl);
    });

    it('should configure an onError callback that is a function', () => {
      const store = mockStore({
        user: Immutable.Map(),
      });

      store.dispatch(configureCSpace());

      const session = getSession();
      const config = session.config();

      config.onError.should.be.a('function');
    });
  });

  describe('onError callback', () => {
    const store = mockStore({
      notification: Immutable.Map(),
      user: Immutable.Map(),
    });

    store.dispatch(configureCSpace());

    const { onError } = getSession().config();

    afterEach(() => {
      store.clearActions();
      worker.resetHandlers();
    });

    it('should reject with the error', () => {
      const error = new Error();

      return onError(error).should.eventually.be.rejectedWith(error);
    });

    it('should dispatch OPEN_MODAL if the error is an invalid token 401 error', () => {
      const error = {
        response: {
          status: 401,
          headers: new Map([
            ['Www-Authenticate', 'Bearer error="invalid_token"'],
          ]),
        },
      };

      onError(error);

      const actions = store.getActions();

      actions.length.should.equal(1);

      actions[0].should.deep.equal({
        type: OPEN_MODAL,
        meta: {
          name: MODAL_LOGIN,
        },
      });
    });
  });

  describe('createSession', () => {
    it('should return a cspace session', () => {
      const authCode = '1234';
      const codeVerifier = 'topsecret';
      const redirectUri = '/authorized';

      const session = createSession(authCode, codeVerifier, redirectUri);

      session.should.be.an('object');
      session.config().should.have.property('authCode', authCode);
      session.config().should.have.property('codeVerifier', codeVerifier);
      session.config().should.have.property('redirectUri', redirectUri);
    });
  });

  describe('setSession', () => {
    it('should create a CSPACE_CONFIGURED action', () => {
      const authCode = '1234';
      const codeVerifier = 'topsecret';
      const redirectUri = '/authorized';

      const session = createSession(authCode, codeVerifier, redirectUri);

      setSession(session).should
        .include({ type: CSPACE_CONFIGURED })
        .and.have.property('payload')
        .that.includes({
          authCode,
          codeVerifier,
          redirectUri,
        });
    });

    it('should update the active session', () => {
      const authCode = '1234';
      const codeVerifier = 'topsecret';
      const redirectUri = 'authorized';

      const session = createSession(authCode, codeVerifier, redirectUri);

      setSession(session);

      getSession().should.equal(session);
    });
  });

  describe('readSystemInfo', () => {
    const store = mockStore({
      cspace: Immutable.Map(),
    });

    const tenantId = '123';

    const config = {
      tenantId,
    };

    const systemInfoUrl = '/cspace-services/systeminfo';

    const systemInfoPayload = {
      'ns2:system_info_common': {
        version: {
          major: '5',
          minor: '1',
        },
      },
    };

    before(() => store.dispatch(configureCSpace())
      .then(() => store.clearActions()));

    afterEach(() => {
      store.clearActions();
      worker.resetHandlers();
    });

    it('should dispatch SYSTEM_INFO_READ_FULFILLED on success', () => {
      worker.use(
        rest.get(systemInfoUrl, (req, res, ctx) => {
          const {
            searchParams,
          } = req.url;

          if (searchParams.get('tid') === tenantId) {
            return res(ctx.json(systemInfoPayload));
          }

          return res(ctx.status(400));
        }),
      );

      return store.dispatch(readSystemInfo(config))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(1);

          actions[0].type.should.equal(SYSTEM_INFO_READ_FULFILLED);
          actions[0].payload.status.should.equal(200);
          actions[0].payload.data.should.deep.equal(systemInfoPayload);
        });
    });

    it('should dispatch SYSTEM_INFO_READ_REJECTED on error', () => {
      worker.use(
        rest.get(systemInfoUrl, (req, res, ctx) => res(ctx.status(404))),
      );

      return store.dispatch(readSystemInfo(config))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(1);

          actions[0].type.should.equal(SYSTEM_INFO_READ_REJECTED);
        });
    });
  });
});
