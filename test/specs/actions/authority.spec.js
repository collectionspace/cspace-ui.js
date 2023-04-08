import Immutable from 'immutable';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { setupWorker, rest } from 'msw';

import {
  AUTH_VOCABS_READ_STARTED,
  AUTH_VOCABS_READ_FULFILLED,
  AUTH_VOCABS_READ_REJECTED,
} from '../../../src/constants/actionCodes';

import {
  configureCSpace,
} from '../../../src/actions/cspace';

import {
  checkForUses,
  readAuthVocabs,
} from '../../../src/actions/authority';

const mockStore = configureMockStore([thunk]);

describe('authority action creator', () => {
  const worker = setupWorker();

  before(async function setup() {
    await worker.start({ quiet: true });
  });

  after(() => {
    worker.stop();
  });

  describe('readAuthVocabs', () => {
    const store = mockStore({
      authority: Immutable.Map(),
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

    const readAuthorityUrl = /\/cspace-services\/.*authorities?/;

    before(() => store.dispatch(configureCSpace())
      .then(() => store.clearActions()));

    afterEach(() => {
      store.clearActions();
      worker.resetHandlers();
    });

    it('should dispatch AUTH_VOCABS_READ_FULFILLED on success', () => {
      worker.use(
        rest.get(readAuthorityUrl, (req, res, ctx) => res(ctx.json({}))),
      );

      return store.dispatch(readAuthVocabs(config))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(2);

          actions[0].should.deep.equal({
            type: AUTH_VOCABS_READ_STARTED,
          });

          actions[1].type.should.equal(AUTH_VOCABS_READ_FULFILLED);

          actions[1].payload.should.have.lengthOf(2);

          actions[1].payload[0].status.should.equal(200);
          actions[1].payload[0].data.should.deep.equal({});
          actions[1].payload[1].status.should.equal(200);
          actions[1].payload[1].data.should.deep.equal({});

          actions[1].meta.config.should.deep.equal(config);
        });
    });

    it('should dispatch AUTH_VOCABS_READ_FULFILLED if there are errors, but they are all 403', () => {
      worker.use(
        rest.get(readAuthorityUrl, (req, res, ctx) => res(ctx.status(403))),
      );

      return store.dispatch(readAuthVocabs(config))
        .catch(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(2);

          actions[0].should.deep.equal({
            type: AUTH_VOCABS_READ_STARTED,
          });

          actions[1].should.contain({
            type: AUTH_VOCABS_READ_FULFILLED,
          });
        });
    });

    it('should dispatch AUTH_VOCABS_READ_REJECTED on errors other than 403', () => {
      worker.use(
        rest.get(readAuthorityUrl, (req, res, ctx) => res(ctx.status(400))),
      );

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

  describe('checkForUses', () => {
    const recordType = 'person';
    const recordTypeServicePath = 'personauthorities';
    const vocabulary = 'local';
    const vocabularyServicePath = 'urn:cspace:name(person)';
    const csid = '1234';
    const checkUrl = '/cspace-services/:recordTypeServicePath/:vocabularyServicePath/items/:csid/refObjs';

    const config = {
      recordTypes: {
        [recordType]: {
          serviceConfig: {
            servicePath: recordTypeServicePath,
          },
          vocabularies: {
            [vocabulary]: {
              serviceConfig: {
                servicePath: vocabularyServicePath,
              },
            },
          },
        },
      },
    };

    before(() => {
      const store = mockStore();

      return store.dispatch(configureCSpace());
    });

    afterEach(() => {
      worker.resetHandlers();
    });

    it('should resolve to true if uses are found for the given authority item', () => {
      const store = mockStore();

      worker.use(
        rest.get(checkUrl, (req, res, ctx) => {
          const { params } = req;

          if (
            params.recordTypeServicePath === recordTypeServicePath
            && params.vocabularyServicePath === vocabularyServicePath
            && params.csid === csid
          ) {
            return res(ctx.json({
              'ns3:authority-ref-doc-list': {
                totalItems: '2',
              },
            }));
          }

          return res(ctx.status(400));
        }),
      );

      return store.dispatch(checkForUses(config, recordType, vocabulary, csid)).then((result) => {
        result.should.equal(true);
      });
    });

    it('should resolve to false if no uses are found for the authority item', () => {
      const store = mockStore();

      worker.use(
        rest.get(checkUrl, (req, res, ctx) => {
          const { params } = req;

          if (
            params.recordTypeServicePath === recordTypeServicePath
            && params.vocabularyServicePath === vocabularyServicePath
            && params.csid === csid
          ) {
            return res(ctx.json({
              'ns3:authority-ref-doc-list': {
                totalItems: '0',
              },
            }));
          }

          return res(ctx.status(400));
        }),
      );

      return store.dispatch(checkForUses(config, recordType, vocabulary, csid)).then((result) => {
        result.should.equal(false);
      });
    });
  });
});
