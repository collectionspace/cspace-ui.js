import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import Immutable from 'immutable';

import {
  configureCSpace,
} from '../../../src/actions/cspace';

import {
  CREATE_EMPTY_SEARCH_RESULT,
  SET_MOST_RECENT_SEARCH,
  SEARCH_STARTED,
  SEARCH_FULFILLED,
  SEARCH_REJECTED,
  search,
} from '../../../src/actions/search';

import {
  ERR_INVALID_SORT,
  ERR_UNKNOWN_RECORD_TYPE,
  ERR_UNKNOWN_VOCABULARY,
} from '../../../src/constants/errorCodes';

import {
  searchKey,
} from '../../../src/reducers/search';

chai.should();

const mockStore = configureMockStore([thunk]);

describe('search action creator', function suite() {
  describe('search', function actionSuite() {
    const recordType = 'person';
    const servicePath = 'personauthorities';
    const vocabulary = 'local';
    const vocabularyServicePath = 'urn:cspace:name(person)';
    const termsServicePath = 'authorityrefs';
    const searchUrl = new RegExp(`^/cspace-services/${servicePath}/${vocabularyServicePath.replace('(', '\\(').replace(')', '\\)')}/items.*`);

    const listTypes = {
      common: {
        listNodeName: 'ns2:abstract-common-list',
        itemNodeName: 'list-item',
      },
    };

    const config = {
      listTypes,
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
            default: [
              {
                name: 'updatedAt',
                sortBy: 'collectionspace_core:updatedAt',
              },
            ],
          },
        },
      },
      subresources: {
        terms: {
          serviceConfig: {
            servicePath: termsServicePath,
          },
        },
      },
    };

    const searchQuery = {
      kw: 'abcd',
      p: 0,
    };

    const searchName = 'testSearch';

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

      return store.dispatch(search(config, searchName, searchDescriptor))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(2);

          actions[0].should.deep.equal({
            type: SEARCH_STARTED,
            meta: {
              listTypeConfig: listTypes.common,
              searchName,
              searchDescriptor,
            },
          });

          actions[1].should.deep.equal({
            type: SEARCH_FULFILLED,
            payload: {
              status: 200,
              statusText: undefined,
              headers: undefined,
              data: {},
            },
            meta: {
              searchName,
              searchDescriptor,
            },
          });
        });
    });

    it('should dispatch SET_MOST_RECENT_SEARCH when a search with a given descriptor is already pending', function test() {
      moxios.stubRequest(searchUrl, {
        status: 200,
        response: {},
      });

      const store = mockStore({
        search: Immutable.fromJS({
          [searchName]: {
            byKey: {
              [searchKey(searchDescriptor)]: {
                isPending: true,
              },
            },
          },
        }),
      });

      store.dispatch(search(config, searchName, searchDescriptor));

      const actions = store.getActions();

      actions.should.have.lengthOf(1);

      actions[0].should.deep.equal({
        type: SET_MOST_RECENT_SEARCH,
        meta: {
          searchName,
          searchDescriptor,
        },
      });
    });

    it('should dispatch SET_MOST_RECENT_SEARCH when a search with a given descriptor already has a result', function test() {
      moxios.stubRequest(searchUrl, {
        status: 200,
        response: {},
      });

      const store = mockStore({
        search: Immutable.fromJS({
          [searchName]: {
            byKey: {
              [searchKey(searchDescriptor)]: {
                result: {},
              },
            },
          },
        }),
      });

      store.dispatch(search(config, searchName, searchDescriptor));

      const actions = store.getActions();

      actions.should.have.lengthOf(1);

      actions[0].should.deep.equal({
        type: SET_MOST_RECENT_SEARCH,
        meta: {
          searchName,
          searchDescriptor,
        },
      });
    });

    it('should dispatch CREATE_EMPTY_SEARCH_RESULT on a related record query with empty csid', function test() {
      const relSearchDescriptor = {
        recordType,
        vocabulary,
        searchQuery: {
          rel: '',
        },
      };

      const store = mockStore({
        search: Immutable.fromJS({
          [searchName]: {
            byKey: {},
          },
        }),
      });

      store.dispatch(search(config, searchName, relSearchDescriptor));

      const actions = store.getActions();

      actions.should.have.lengthOf(2);

      actions[0].should.deep.equal({
        type: SEARCH_STARTED,
        meta: {
          listTypeConfig: listTypes.common,
          searchName,
          searchDescriptor: relSearchDescriptor,
        },
      });

      actions[1].should.deep.equal({
        type: CREATE_EMPTY_SEARCH_RESULT,
        meta: {
          listTypeConfig: listTypes.common,
          searchName,
          searchDescriptor: relSearchDescriptor,
        },
      });
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

      return store.dispatch(search(config, searchName, noVocabularySearchDescriptor))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(2);

          actions[0].should.deep.equal({
            type: SEARCH_STARTED,
            meta: {
              listTypeConfig: listTypes.common,
              searchName,
              searchDescriptor: noVocabularySearchDescriptor,
            },
          });

          actions[1].should.deep.equal({
            type: SEARCH_FULFILLED,
            payload: {
              status: 200,
              statusText: undefined,
              headers: undefined,
              data: {},
            },
            meta: {
              searchName,
              searchDescriptor: noVocabularySearchDescriptor,
            },
          });
        });
    });

    it('should accept searches for subresources', function test() {
      const csid = '1234';
      const subresource = 'terms';
      const subresourceSearchUrl = new RegExp(`^/cspace-services/${servicePath}/${vocabularyServicePath.replace('(', '\\(').replace(')', '\\)')}/items/${csid}/${termsServicePath}.*`);

      moxios.stubRequest(subresourceSearchUrl, {
        status: 200,
        response: {},
      });

      const store = mockStore({
        search: Immutable.Map(),
      });

      const subresourceSearchQuery = {
        p: 0,
        size: 10,
      };

      const subresourceSearchDescriptor = {
        recordType,
        vocabulary,
        csid,
        subresource,
        searchQuery: subresourceSearchQuery,
      };

      return store.dispatch(search(config, searchName, subresourceSearchDescriptor))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(2);

          actions[0].should.deep.equal({
            type: SEARCH_STARTED,
            meta: {
              listTypeConfig: listTypes.common,
              searchName,
              searchDescriptor: subresourceSearchDescriptor,
            },
          });

          actions[1].should.deep.equal({
            type: SEARCH_FULFILLED,
            payload: {
              status: 200,
              statusText: undefined,
              headers: undefined,
              data: {},
            },
            meta: {
              searchName,
              searchDescriptor: subresourceSearchDescriptor,
            },
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

      return store.dispatch(search(config, searchName, sortedSearchDescriptor))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(2);

          actions[0].should.deep.equal({
            type: SEARCH_STARTED,
            meta: {
              listTypeConfig: listTypes.common,
              searchName,
              searchDescriptor: sortedSearchDescriptor,
            },
          });

          actions[1].should.deep.equal({
            type: SEARCH_FULFILLED,
            payload: {
              status: 200,
              statusText: undefined,
              headers: undefined,
              data: {},
            },
            meta: {
              searchName,
              searchDescriptor: sortedSearchDescriptor,
            },
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

      return store.dispatch(search(config, searchName, sortedSearchDescriptor))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(2);

          actions[0].should.deep.equal({
            type: SEARCH_STARTED,
            meta: {
              listTypeConfig: listTypes.common,
              searchName,
              searchDescriptor: sortedSearchDescriptor,
            },
          });

          actions[1].should.deep.equal({
            type: SEARCH_FULFILLED,
            payload: {
              status: 200,
              statusText: undefined,
              headers: undefined,
              data: {},
            },
            meta: {
              searchName,
              searchDescriptor: sortedSearchDescriptor,
            },
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

      store.dispatch(search(config, searchName, sortedSearchDescriptor)).should.deep.equal({
        type: SEARCH_REJECTED,
        payload: {
          code: ERR_INVALID_SORT,
        },
        meta: {
          searchName,
          searchDescriptor: sortedSearchDescriptor,
        },
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

      store.dispatch(search(config, searchName, sortedSearchDescriptor)).should.deep.equal({
        type: SEARCH_REJECTED,
        payload: {
          code: ERR_INVALID_SORT,
        },
        meta: {
          searchName,
          searchDescriptor: sortedSearchDescriptor,
        },
      });
    });

    it('should dispatch SEARCH_REJECTED on API error', function test() {
      moxios.stubRequest(searchUrl, {
        status: 400,
        response: {},
      });

      const store = mockStore({
        search: Immutable.Map(),
      });

      return store.dispatch(search(config, searchName, searchDescriptor))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(2);

          actions[0].should.deep.equal({
            type: SEARCH_STARTED,
            meta: {
              listTypeConfig: listTypes.common,
              searchName,
              searchDescriptor,
            },
          });

          actions[1].should.have.property('type', SEARCH_REJECTED);
          actions[1].should.have.property('meta').that.deep.equals({
            searchName,
            searchDescriptor,
          });
        });
    });

    it('should dispatch SEARCH_REJECTED if the record type is unknown', function test() {
      const badSearchDescriptor = Object.assign({}, searchDescriptor, {
        recordType: 'foobar',
      });

      const store = mockStore({
        search: Immutable.Map(),
      });

      store.dispatch(search(config, searchName, badSearchDescriptor)).should.deep.equal({
        type: SEARCH_REJECTED,
        payload: {
          code: ERR_UNKNOWN_RECORD_TYPE,
        },
        meta: {
          searchName,
          searchDescriptor: badSearchDescriptor,
        },
      });
    });

    it('should dispatch SEARCH_REJECTED if the record type does not have a service path', function test() {
      const badConfig = {
        listTypes,
        recordTypes: {
          [recordType]: {
            serviceConfig: {},
          },
        },
      };

      const store = mockStore({
        search: Immutable.Map(),
      });

      store.dispatch(search(badConfig, searchName, searchDescriptor)).should.deep.equal({
        type: SEARCH_REJECTED,
        payload: {
          code: ERR_UNKNOWN_RECORD_TYPE,
        },
        meta: {
          searchName,
          searchDescriptor,
        },
      });
    });

    it('should dispatch SEARCH_REJECTED if the vocabulary does not have a service path', function test() {
      const badConfig = {
        listTypes,
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

      store.dispatch(search(badConfig, searchName, searchDescriptor)).should.deep.equal({
        type: SEARCH_REJECTED,
        payload: {
          code: ERR_UNKNOWN_VOCABULARY,
        },
        meta: {
          searchName,
          searchDescriptor,
        },
      });
    });
  });
});
