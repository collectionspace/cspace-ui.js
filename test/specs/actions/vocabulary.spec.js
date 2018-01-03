import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import Immutable from 'immutable';

import {
  configureCSpace,
} from '../../../src/actions/cspace';

import {
  READ_VOCABULARY_ITEMS_STARTED,
  READ_VOCABULARY_ITEMS_FULFILLED,
  READ_VOCABULARY_ITEMS_REJECTED,
  readVocabularyItems,
} from '../../../src/actions/vocabulary';

chai.should();

describe('vocabulary action creator', function suite() {
  describe('readVocabularyItems', function actionSuite() {
    const mockStore = configureMockStore([thunk]);
    const vocabulary = 'languages';
    const readVocabularyItemsUrl = new RegExp(`^/cspace-services/vocabularies/urn:cspace:name\\(${vocabulary}\\)/items.*`);

    before(() => {
      const store = mockStore({
        user: Immutable.Map(),
      });

      return store.dispatch(configureCSpace());
    });

    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });

    it('should dispatch READ_VOCABULARY_ITEMS_FULFILLED on success', function test() {
      moxios.stubRequest(readVocabularyItemsUrl, {
        status: 200,
        response: {},
      });

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

          actions[1].should.deep.equal({
            type: READ_VOCABULARY_ITEMS_FULFILLED,
            payload: {
              status: 200,
              statusText: undefined,
              headers: undefined,
              data: {},
            },
            meta: {
              vocabulary,
            },
          });
        });
    });

    it('should dispatch READ_VOCABULARY_ITEMS_REJECTED on error', function test() {
      moxios.stubRequest(readVocabularyItemsUrl, {
        status: 400,
        response: {},
      });

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

    it('should dispatch nothing if the vocabulary already has a pending read', function test() {
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

    it('should dispatch nothing if the vocabulary already has items', function test() {
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
});
