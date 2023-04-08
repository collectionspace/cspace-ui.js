import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Immutable from 'immutable';
import { setupWorker, rest } from 'msw';

import {
  ADD_TERM_STARTED,
  ADD_TERM_FULFILLED,
  ADD_TERM_REJECTED,
  PARTIAL_TERM_SEARCH_STARTED,
  PARTIAL_TERM_SEARCH_FULFILLED,
  PARTIAL_TERM_SEARCH_REJECTED,
  CLEAR_PARTIAL_TERM_SEARCH_RESULTS,
} from '../../../src/constants/actionCodes';

import {
  configureCSpace,
} from '../../../src/actions/cspace';

import {
  addTerm,
  findMatchingTerms,
  clearMatchedTerms,
} from '../../../src/actions/partialTermSearch';

chai.should();

describe('partialTermSearch action creator', () => {
  const worker = setupWorker();

  before(async function setup() {
    await worker.start({ quiet: true });
  });

  after(() => {
    worker.stop();
  });

  describe('addTerm', () => {
    const mockStore = configureMockStore([thunk]);
    const recordType = 'person';
    const servicePath = 'personauthorities';
    const vocabulary = 'local';
    const vocabularyServicePath = 'urn:cspace:name(person)';
    const termAddUrl = `/cspace-services/${servicePath}/:vocabulary/items`;
    const termReadUrl = '/cspace-services/new/url/csid';
    const displayName = 'abc';
    const partialTerm = '^abc';
    const primaryRecordCsid = '1111';

    const recordTypeConfig = {
      name: recordType,
      serviceConfig: {
        servicePath,
        quickAddData: () => ({
          document: {},
        }),
      },
      vocabularies: {
        [vocabulary]: {
          serviceConfig: {
            servicePath: vocabularyServicePath,
          },
        },
      },
    };

    const store = mockStore({
      record: Immutable.fromJS({
        [primaryRecordCsid]: {
          data: {
            current: {
              document: {
                foo: 'bar',
              },
            },
          },
        },
      }),
      recordPage: Immutable.Map({
        primaryCsid: primaryRecordCsid,
      }),
      user: Immutable.Map(),
    });

    before(() => store.dispatch(configureCSpace())
      .then(() => store.clearActions()));

    afterEach(() => {
      store.clearActions();
      worker.resetHandlers();
    });

    it('should dispatch ADD_TERM_FULFILLED on success', () => {
      worker.use(
        rest.post(termAddUrl, (req, res, ctx) => {
          const { params } = req;

          if (params.vocabulary === vocabularyServicePath) {
            return res(
              ctx.status(201),
              ctx.set('location', termReadUrl),
            );
          }

          return res(ctx.status(400));
        }),

        rest.get(termReadUrl, (req, res, ctx) => res(ctx.json({}))),
      );

      return store.dispatch(addTerm(recordTypeConfig, vocabulary, displayName, partialTerm))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(2);

          actions[0].should.deep.equal({
            type: ADD_TERM_STARTED,
            meta: {
              displayName,
              partialTerm,
              recordType,
              vocabulary,
            },
          });

          actions[1].type.should.equal(ADD_TERM_FULFILLED);
          actions[1].payload.status.should.equal(200);
          actions[1].payload.data.should.deep.equal({});

          actions[1].meta.should.deep.equal({
            displayName,
            partialTerm,
            recordType,
            vocabulary,
          });
        });
    });

    it('should clone the primary record data if clone is true', () => {
      let requestPayload = null;

      worker.use(
        rest.post(termAddUrl, async (req, res, ctx) => {
          const { params } = req;

          if (params.vocabulary === vocabularyServicePath) {
            requestPayload = await req.json();

            return res(
              ctx.status(201),
              ctx.set('location', termReadUrl),
            );
          }

          return res(ctx.status(400));
        }),

        rest.get(termReadUrl, (req, res, ctx) => res(ctx.json({}))),
      );

      return store.dispatch(addTerm(recordTypeConfig, vocabulary, displayName, partialTerm, true))
        .then(() => {
          requestPayload.should.deep.equal({
            document: {
              foo: 'bar',
            },
          });
        });
    });

    it('should dispatch ADD_TERM_REJECTED on error', () => {
      worker.use(
        rest.post(termAddUrl, (req, res, ctx) => res(ctx.status(400))),
      );

      return store.dispatch(addTerm(recordTypeConfig, vocabulary, displayName, partialTerm))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(2);

          actions[0].should.deep.equal({
            type: ADD_TERM_STARTED,
            meta: {
              displayName,
              partialTerm,
              recordType,
              vocabulary,
            },
          });

          actions[1].should.have.property('type', ADD_TERM_REJECTED);
          actions[1].should.have.property('meta')
            .that.deep.equals({
              displayName,
              partialTerm,
              recordType,
              vocabulary,
            });
        });
    });
  });

  describe('findMatchingTerms', () => {
    const mockStore = configureMockStore([thunk]);
    const recordType = 'person';
    const servicePath = 'personauthorities';
    const vocabulary = 'person';
    const vocabularyServicePath = 'urn:cspace:name(person)';
    const partialTerm = 'abc';
    const termSearchUrl = `/cspace-services/${servicePath}/:vocabulary/items`;

    const recordTypeConfig = {
      name: recordType,
      serviceConfig: {
        servicePath,
      },
      vocabularies: {
        [vocabulary]: {
          serviceConfig: {
            servicePath: vocabularyServicePath,
          },
        },
      },
    };

    const store = mockStore({
      user: Immutable.Map(),
    });

    before(() => store.dispatch(configureCSpace())
      .then(() => store.clearActions()));

    afterEach(() => {
      store.clearActions();
      worker.resetHandlers();
    });

    it('should dispatch PARTIAL_TERM_SEARCH_FULFILLED on success', () => {
      worker.use(
        rest.get(termSearchUrl, (req, res, ctx) => {
          const { params, url } = req;

          if (params.vocabulary === vocabularyServicePath) {
            const { searchParams } = url;

            if (
              searchParams.get('pt') === partialTerm
              && searchParams.get('wf_deleted') === 'false'
            ) {
              return res(ctx.json({}));
            }
          }

          return res(ctx.status(400));
        }),
      );

      return store.dispatch(
        findMatchingTerms(recordTypeConfig, vocabulary, partialTerm),
      )
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(2);

          actions[0].should.deep.equal({
            type: PARTIAL_TERM_SEARCH_STARTED,
            meta: {
              partialTerm,
              recordType,
              vocabulary,
            },
          });

          actions[1].type.should.equal(PARTIAL_TERM_SEARCH_FULFILLED);
          actions[1].payload.status.should.equal(200);
          actions[1].payload.data.should.deep.equal({});

          actions[1].meta.should.deep.equal({
            partialTerm,
            recordType,
            vocabulary,
          });
        });
    });

    it('should dispatch PARTIAL_TERM_SEARCH_REJECTED on error', () => {
      worker.use(
        rest.get(termSearchUrl, (req, res, ctx) => res(ctx.status(400))),
      );

      return store.dispatch(
        findMatchingTerms(recordTypeConfig, vocabulary, partialTerm),
      )
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(2);

          actions[0].should.deep.equal({
            type: PARTIAL_TERM_SEARCH_STARTED,
            meta: {
              partialTerm,
              recordType,
              vocabulary,
            },
          });

          actions[1].should.have.property('type', PARTIAL_TERM_SEARCH_REJECTED);
          actions[1].should.have.property('meta')
            .that.deep.equals({
              partialTerm,
              recordType,
              vocabulary,
            });
        });
    });

    it('should dispatch no action if the vocabulary does not have a service path', () => {
      const invalidVocabulary = `${vocabulary}abcd`;

      store.dispatch(
        findMatchingTerms(recordTypeConfig, invalidVocabulary, partialTerm),
      );

      store.getActions().should.have.lengthOf(0);
    });
  });

  describe('clearMatchedTerms', () => {
    it('should create a CLEAR_PARTIAL_TERM_SEARCH_RESULTS action', () => {
      clearMatchedTerms().should.deep.equal({
        type: CLEAR_PARTIAL_TERM_SEARCH_RESULTS,
      });
    });
  });
});
