import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import Immutable from 'immutable';

import {
  configureCSpace,
} from '../../../src/actions/cspace';

import {
  SEARCH_STARTED,
  SEARCH_FULFILLED,
  SEARCH_REJECTED,
  ERR_INVALID_SORT,
  ERR_NO_RECORD_SERVICE,
  ERR_NO_VOCABULARY_SERVICE,
  search,
} from '../../../src/actions/search';

const expect = chai.expect;

chai.should();

const mockStore = configureMockStore([thunk]);

describe('search action creator', function suite() {
  describe('search', function actionSuite() {
    const recordType = 'person';
    const servicePath = 'personauthorities';
    const vocabulary = 'local';
    const vocabularyServicePath = 'urn:cspace:name(person)';
    const searchUrl = new RegExp(`^/cspace-services/${servicePath}/${vocabularyServicePath.replace('(', '\\(').replace(')', '\\)')}/items.*`);

    const config = {
      recordTypes: {
        [recordType]: {
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
          columns: {
            search: [
              {
                name: 'updatedAt',
                sortBy: 'collectionspace_core:updatedAt',
              },
            ],
          },
        },
      },
    };

    const searchQuery = {
      kw: 'abcd',
      pgNum: 0,
    };

    const searchDescriptor = {
      recordType,
      vocabulary,
      searchQuery,
    };

    before(() => {
      configureCSpace({});
    });

    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });

    it('should dispatch SEARCH_FULFILLED on success', function test() {
      moxios.stubRequest(searchUrl, {
        status: 200,
        response: {},
      });

      const store = mockStore({
        search: Immutable.Map(),
      });

      return store.dispatch(search(config, searchDescriptor))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(2);

          actions[0].should.deep.equal({
            type: SEARCH_STARTED,
            meta: searchDescriptor,
          });

          actions[1].should.deep.equal({
            type: SEARCH_FULFILLED,
            payload: {
              status: 200,
              statusText: undefined,
              headers: undefined,
              data: {},
            },
            meta: searchDescriptor,
          });
        });
    });

    it('should dispatch no action when a search with a given descriptor is already pending', function test() {
      moxios.stubRequest(searchUrl, {
        status: 200,
        response: {},
      });

      const store = mockStore({
        search: Immutable.fromJS({
          byKey: {
            [JSON.stringify(searchDescriptor)]: {
              isPending: true,
            },
          },
        }),
      });

      expect(store.dispatch(search(config, searchDescriptor))).to.equal(null);
    });

    it('should dispatch no action when a search with a given descriptor has already completed successfully', function test() {
      moxios.stubRequest(searchUrl, {
        status: 200,
        response: {},
      });

      const store = mockStore({
        search: Immutable.fromJS({
          byKey: {
            [JSON.stringify(searchDescriptor)]: {
              result: {},
            },
          },
        }),
      });

      expect(store.dispatch(search(config, searchDescriptor))).to.equal(null);
    });

    it('should accept null/undefined vocabulary name', function test() {
      const noVocabularySearchUrl = new RegExp(`^/cspace-services/${servicePath}.*`);

      moxios.stubRequest(noVocabularySearchUrl, {
        status: 200,
        response: {},
      });

      const store = mockStore({
        search: Immutable.Map(),
      });

      const noVocabularySearchDescriptor = {
        recordType,
        searchQuery,
      };

      return store.dispatch(search(config, noVocabularySearchDescriptor))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(2);

          actions[0].should.deep.equal({
            type: SEARCH_STARTED,
            meta: noVocabularySearchDescriptor,
          });

          actions[1].should.deep.equal({
            type: SEARCH_FULFILLED,
            payload: {
              status: 200,
              statusText: undefined,
              headers: undefined,
              data: {},
            },
            meta: noVocabularySearchDescriptor,
          });
        });
    });

    it('should generate the sort parameter', function test() {
      const sortedSearchUrl = new RegExp('\\?.*sortBy=collectionspace_core:updatedAt');

      moxios.stubRequest(sortedSearchUrl, {
        status: 200,
        response: {},
      });

      const store = mockStore({
        search: Immutable.Map(),
      });

      const sortedSearchDescriptor = {
        recordType,
        searchQuery: Object.assign({}, searchQuery, {
          sort: 'updatedAt',
        }),
      };

      return store.dispatch(search(config, sortedSearchDescriptor))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(2);

          actions[0].should.deep.equal({
            type: SEARCH_STARTED,
            meta: sortedSearchDescriptor,
          });

          actions[1].should.deep.equal({
            type: SEARCH_FULFILLED,
            payload: {
              status: 200,
              statusText: undefined,
              headers: undefined,
              data: {},
            },
            meta: sortedSearchDescriptor,
          });
        });
    });

    it('should generate the sort parameter for descending searches', function test() {
      const sortedSearchUrl = new RegExp('\\?.*sortBy=collectionspace_core:updatedAt\\+DESC');

      moxios.stubRequest(sortedSearchUrl, {
        status: 200,
        response: {},
      });

      const store = mockStore({
        search: Immutable.Map(),
      });

      const sortedSearchDescriptor = {
        recordType,
        searchQuery: Object.assign({}, searchQuery, {
          sort: 'updatedAt desc',
        }),
      };

      return store.dispatch(search(config, sortedSearchDescriptor))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(2);

          actions[0].should.deep.equal({
            type: SEARCH_STARTED,
            meta: sortedSearchDescriptor,
          });

          actions[1].should.deep.equal({
            type: SEARCH_FULFILLED,
            payload: {
              status: 200,
              statusText: undefined,
              headers: undefined,
              data: {},
            },
            meta: sortedSearchDescriptor,
          });
        });
    });

    it('should dispatch SEARCH_REJECTED when an unknown search column is specified', function test() {
      const store = mockStore({
        search: Immutable.Map(),
      });

      const sortedSearchDescriptor = {
        recordType,
        searchQuery: Object.assign({}, searchQuery, {
          sort: 'foobar',
        }),
      };

      store.dispatch(search(config, sortedSearchDescriptor)).should.deep.equal({
        type: SEARCH_REJECTED,
        payload: {
          code: ERR_INVALID_SORT,
        },
        meta: sortedSearchDescriptor,
      });
    });

    it('should dispatch SEARCH_REJECTED when an invalid search order is specified', function test() {
      const store = mockStore({
        search: Immutable.Map(),
      });

      const sortedSearchDescriptor = {
        recordType,
        searchQuery: Object.assign({}, searchQuery, {
          sort: 'updatedAt foo',
        }),
      };

      store.dispatch(search(config, sortedSearchDescriptor)).should.deep.equal({
        type: SEARCH_REJECTED,
        payload: {
          code: ERR_INVALID_SORT,
        },
        meta: sortedSearchDescriptor,
      });
    });

    it('should dispatch SEARCH_REJECTED on error', function test() {
      moxios.stubRequest(searchUrl, {
        status: 400,
        response: {},
      });

      const store = mockStore({
        search: Immutable.Map(),
      });

      return store.dispatch(search(config, searchDescriptor))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(2);

          actions[0].should.deep.equal({
            type: SEARCH_STARTED,
            meta: searchDescriptor,
          });

          actions[1].should.have.property('type', SEARCH_REJECTED);
          actions[1].should.have.property('meta').that.deep.equals(searchDescriptor);
        });
    });

    it('should dispatch SEARCH_REJECTED if the record type is unknown', function test() {
      const badSearchDescriptor = Object.assign({}, searchDescriptor, {
        recordType: 'foobar',
      });

      const store = mockStore({
        search: Immutable.Map(),
      });

      store.dispatch(search(config, badSearchDescriptor)).should.deep.equal({
        type: SEARCH_REJECTED,
        payload: {
          code: ERR_NO_RECORD_SERVICE,
        },
        meta: badSearchDescriptor,
      });
    });

    it('should dispatch SEARCH_REJECTED if the record type does not have a service path', function test() {
      const badConfig = {
        recordTypes: {
          [recordType]: {
            serviceConfig: {},
          },
        },
      };

      const store = mockStore({
        search: Immutable.Map(),
      });

      store.dispatch(search(badConfig, searchDescriptor)).should.deep.equal({
        type: SEARCH_REJECTED,
        payload: {
          code: ERR_NO_RECORD_SERVICE,
        },
        meta: searchDescriptor,
      });
    });

    it('should dispatch SEARCH_REJECTED if the vocabulary does not have a service path', function test() {
      const badConfig = {
        recordTypes: {
          [recordType]: {
            serviceConfig: {
              servicePath,
            },
            vocabularies: {
              [vocabulary]: {
                serviceConfig: {},
              },
            },
          },
        },
      };

      const store = mockStore({
        search: Immutable.Map(),
      });

      store.dispatch(search(badConfig, searchDescriptor)).should.deep.equal({
        type: SEARCH_REJECTED,
        payload: {
          code: ERR_NO_VOCABULARY_SERVICE,
        },
        meta: searchDescriptor,
      });
    });
  });
});
