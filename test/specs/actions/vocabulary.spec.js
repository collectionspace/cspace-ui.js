import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Immutable from 'immutable';
import { setupWorker, rest } from 'msw';

import {
  READ_VOCABULARY_ITEMS_STARTED,
  READ_VOCABULARY_ITEMS_FULFILLED,
  READ_VOCABULARY_ITEMS_REJECTED,
  READ_VOCABULARY_ITEM_REFS_STARTED,
  READ_VOCABULARY_ITEM_REFS_FULFILLED,
  READ_VOCABULARY_ITEM_REFS_REJECTED,
} from '../../../src/constants/actionCodes';

import {
  configureCSpace,
} from '../../../src/actions/cspace';

import {
  readVocabularyItems,
  readVocabularyItemRefs,
} from '../../../src/actions/vocabulary';

chai.should();

describe('vocabulary action creator', () => {
  const worker = setupWorker();

  before(async function setup() {
    this.timeout(3000);

    await worker.start({ quiet: true });
  });

  after(() => {
    worker.stop();
  });

  describe('readVocabularyItems', () => {
    const mockStore = configureMockStore([thunk]);
    const vocabulary = 'languages';
    const readVocabularyItemsUrl = '/cspace-services/vocabularies/:vocabulary/items';

    before(() => {
      const store = mockStore({
        user: Immutable.Map(),
      });

      return store.dispatch(configureCSpace());
    });

    afterEach(() => {
      worker.resetHandlers();
    });

    it('should dispatch READ_VOCABULARY_ITEMS_FULFILLED on success', () => {
      worker.use(
        rest.get(readVocabularyItemsUrl, (req, res, ctx) => {
          const { params } = req;

          if (params.vocabulary === `urn:cspace:name(${vocabulary})`) {
            return res(ctx.json({}));
          }

          return res(ctx.status(400));
        }),
      );

      const store = mockStore({
        vocabulary: {},
      });

      return store.dispatch(readVocabularyItems(vocabulary))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(2);

          actions[0].should.deep.equal({
            type: READ_VOCABULARY_ITEMS_STARTED,
            meta: {
              vocabulary,
            },
          });

          actions[1].type.should.equal(READ_VOCABULARY_ITEMS_FULFILLED);
          actions[1].payload.status.should.equal(200);
          actions[1].payload.data.should.deep.equal({});

          actions[1].meta.should.deep.equal({
            vocabulary,
          });
        });
    });

    it('should dispatch READ_VOCABULARY_ITEMS_REJECTED on error', () => {
      worker.use(
        rest.get(readVocabularyItemsUrl, (req, res, ctx) => res(ctx.status(400))),
      );

      const store = mockStore({
        vocabulary: {},
      });

      return store.dispatch(readVocabularyItems(vocabulary))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(2);

          actions[0].should.deep.equal({
            type: READ_VOCABULARY_ITEMS_STARTED,
            meta: {
              vocabulary,
            },
          });

          actions[1].should.have.property('type', READ_VOCABULARY_ITEMS_REJECTED);
          actions[1].should.have.property('meta')
            .that.deep.equals({
              vocabulary,
            });
        });
    });

    it('should dispatch nothing if the vocabulary already has a pending read', () => {
      const store = mockStore({
        vocabulary: {
          [vocabulary]: {
            isReadPending: true,
          },
        },
      });

      return store.dispatch(readVocabularyItems(vocabulary))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(0);
        });
    });

    it('should dispatch nothing if the vocabulary already has items', () => {
      const store = mockStore({
        vocabulary: {
          [vocabulary]: {
            items: [],
          },
        },
      });

      return store.dispatch(readVocabularyItems(vocabulary))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(0);
        });
    });
  });

  describe('readVocabularyItemRefs', () => {
    const mockStore = configureMockStore([thunk]);
    const csid = '1234';
    const vocabulary = 'languages';
    const readVocabularyItemsUrl = '/cspace-services/vocabularies/:vocabulary/items';

    before(() => {
      const store = mockStore({
        user: Immutable.Map(),
      });

      return store.dispatch(configureCSpace());
    });

    afterEach(() => {
      worker.resetHandlers();
    });

    it('should dispatch READ_VOCABULARY_ITEM_REFS_FULFILLED on success', () => {
      worker.use(
        rest.get(readVocabularyItemsUrl, (req, res, ctx) => {
          const { params } = req;

          if (params.vocabulary === `urn:cspace:name(${vocabulary})`) {
            return res(ctx.json({}));
          }

          return res(ctx.status(400));
        }),
      );

      const store = mockStore({
        record: Immutable.Map(),
        vocabulary: {},
      });

      return store.dispatch(readVocabularyItemRefs(csid, vocabulary))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(2);

          actions[0].should.deep.equal({
            type: READ_VOCABULARY_ITEM_REFS_STARTED,
            meta: {
              csid,
              vocabulary,
            },
          });

          actions[1].type.should.equal(READ_VOCABULARY_ITEM_REFS_FULFILLED);
          actions[1].payload.status.should.equal(200);
          actions[1].payload.data.should.deep.equal({});

          actions[1].meta.should.deep.equal({
            csid,
            vocabulary,
          });
        });
    });

    it('should dispatch READ_VOCABULARY_ITEM_REFS_REJECTED on error', () => {
      worker.use(
        rest.get(readVocabularyItemsUrl, (req, res, ctx) => res(ctx.status(400))),
      );

      const store = mockStore({
        record: Immutable.Map(),
        vocabulary: {},
      });

      return store.dispatch(readVocabularyItemRefs(csid, vocabulary))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(2);

          actions[0].should.deep.equal({
            type: READ_VOCABULARY_ITEM_REFS_STARTED,
            meta: {
              csid,
              vocabulary,
            },
          });

          actions[1].should.have.property('type', READ_VOCABULARY_ITEM_REFS_REJECTED);
          actions[1].should.have.property('meta')
            .that.deep.equals({
              csid,
              vocabulary,
            });
        });
    });

    it('should dispatch nothing if the vocabulary already has a pending read', () => {
      const store = mockStore({
        record: Immutable.fromJS({
          [csid]: {
            isReadVocabularyItemRefsPending: true,
          },
        }),
      });

      return store.dispatch(readVocabularyItemRefs(csid, vocabulary))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(0);
        });
    });
  });
});
