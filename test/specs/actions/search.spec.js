import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Immutable from 'immutable';
import chaiAsPromised from 'chai-as-promised';
import { setupWorker, rest } from 'msw';

import {
  CLEAR_SEARCH_RESULTS,
  CLEAR_SELECTED,
  CREATE_EMPTY_SEARCH_RESULT,
  DESELECT_RESULT_ITEM,
  SET_MOST_RECENT_SEARCH,
  SET_RESULT_ITEM_SELECTED,
  SEARCH_STARTED,
  SEARCH_FULFILLED,
  SEARCH_REJECTED,
  SET_ALL_RESULT_ITEMS_SELECTED,
} from '../../../src/constants/actionCodes';

import {
  configureCSpace,
} from '../../../src/actions/cspace';

import {
  clearSelected,
  clearSearchResults,
  deselectResultItem,
  findFirst,
  search,
  setResultItemSelected,
  setAllResultItemsSelected,
  searchCsid,
} from '../../../src/actions/search';

import {
  ERR_INVALID_SORT,
  ERR_UNKNOWN_RECORD_TYPE,
  ERR_UNKNOWN_VOCABULARY,
} from '../../../src/constants/errorCodes';

import {
  searchKey,
} from '../../../src/reducers/search';

chai.use(chaiAsPromised);
chai.should();

const mockStore = configureMockStore([thunk]);

describe('search action creator', () => {
  const worker = setupWorker();

  before(() => {
    worker.start({ quiet: true });
  });

  after(() => {
    worker.stop();
  });

  describe('search', () => {
    const recordType = 'person';
    const servicePath = 'personauthorities';
    const vocabulary = 'local';
    const vocabularyServicePath = 'urn:cspace:name(person)';
    const termsServicePath = 'authorityrefs';
    const searchUrl = `/cspace-services/${servicePath}/:vocabulary/items`;

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
            default: {
              updatedAt: {
                sortBy: 'collectionspace_core:updatedAt',
              },
            },
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

    const searchDescriptor = Immutable.fromJS({
      recordType,
      vocabulary,
      searchQuery,
    });

    before(() => {
      const store = mockStore({
        user: Immutable.Map(),
      });

      return store.dispatch(configureCSpace());
    });

    afterEach(() => {
      worker.resetHandlers();
    });

    it('should dispatch SEARCH_FULFILLED on success', () => {
      worker.use(
        rest.get(searchUrl, (req, res, ctx) => {
          const { params } = req;

          if (params.vocabulary === vocabularyServicePath) {
            return res(ctx.json({}));
          }

          return res(ctx.status(400));
        }),
      );

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

          actions[1].type.should.equal(SEARCH_FULFILLED);
          actions[1].payload.status.should.equal(200);
          actions[1].payload.data.should.deep.equal({});

          actions[1].meta.should.deep.equal({
            listTypeConfig: listTypes.common,
            searchName,
            searchDescriptor,
          });
        });
    });

    it('should dispatch SET_MOST_RECENT_SEARCH when a search with a given descriptor is already pending', () => {
      worker.use(
        rest.get(searchUrl, (req, res, ctx) => {
          const { params } = req;

          if (params.vocabulary === vocabularyServicePath) {
            return res(ctx.json({}));
          }

          return res(ctx.status(400));
        }),
      );

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

    it('should dispatch SET_MOST_RECENT_SEARCH when a search with a given descriptor already has a result', () => {
      worker.use(
        rest.get(searchUrl, (req, res, ctx) => {
          const { params } = req;

          if (params.vocabulary === vocabularyServicePath) {
            return res(ctx.json({}));
          }

          return res(ctx.status(400));
        }),
      );

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

    it('should dispatch CREATE_EMPTY_SEARCH_RESULT on a related record query with empty csid', () => {
      const relSearchDescriptor = Immutable.fromJS({
        recordType,
        vocabulary,
        searchQuery: {
          rel: '',
        },
      });

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

    it('should accept null/undefined vocabulary name', () => {
      const noVocabularySearchUrl = `/cspace-services/${servicePath}`;

      worker.use(
        rest.get(noVocabularySearchUrl, (req, res, ctx) => res(ctx.json({}))),
      );

      const store = mockStore({
        search: Immutable.Map(),
      });

      const noVocabularySearchDescriptor = Immutable.fromJS({
        recordType,
        searchQuery,
      });

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

          actions[1].type.should.equal(SEARCH_FULFILLED);
          actions[1].payload.status.should.equal(200);
          actions[1].payload.data.should.deep.equal({});

          actions[1].meta.should.deep.equal({
            listTypeConfig: listTypes.common,
            searchName,
            searchDescriptor: noVocabularySearchDescriptor,
          });
        });
    });

    it('should accept searches for subresources', () => {
      const csid = '1234';
      const subresource = 'terms';
      const subresourceSearchUrl = `/cspace-services/${servicePath}/:vocabulary/items/${csid}/${termsServicePath}`;

      worker.use(
        rest.get(subresourceSearchUrl, (req, res, ctx) => {
          const { params } = req;

          if (params.vocabulary === vocabularyServicePath) {
            return res(ctx.json({}));
          }

          return res(ctx.status(400));
        }),
      );

      const store = mockStore({
        search: Immutable.Map(),
      });

      const subresourceSearchQuery = {
        p: 0,
        size: 10,
      };

      const subresourceSearchDescriptor = Immutable.fromJS({
        recordType,
        vocabulary,
        csid,
        subresource,
        searchQuery: subresourceSearchQuery,
      });

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

          actions[1].type.should.equal(SEARCH_FULFILLED);
          actions[1].payload.status.should.equal(200);
          actions[1].payload.data.should.deep.equal({});

          actions[1].meta.should.deep.equal({
            listTypeConfig: listTypes.common,
            searchName,
            searchDescriptor: subresourceSearchDescriptor,
          });
        });
    });

    it('should generate the sort parameter', () => {
      const noVocabularySearchUrl = `/cspace-services/${servicePath}`;

      worker.use(
        rest.get(noVocabularySearchUrl, (req, res, ctx) => {
          const { searchParams } = req.url;

          if (
            searchParams.get('sortBy') === 'collectionspace_core:updatedAt'
          ) {
            return res(ctx.json({}));
          }

          return res(ctx.status(400));
        }),
      );

      const store = mockStore({
        search: Immutable.Map(),
      });

      const sortedSearchDescriptor = Immutable.fromJS({
        recordType,
        searchQuery: { ...searchQuery, sort: 'updatedAt' },
      });

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

          actions[1].type.should.equal(SEARCH_FULFILLED);
          actions[1].payload.status.should.equal(200);
          actions[1].payload.data.should.deep.equal({});

          actions[1].meta.should.deep.equal({
            listTypeConfig: listTypes.common,
            searchName,
            searchDescriptor: sortedSearchDescriptor,
          });
        });
    });

    it('should generate the sort parameter for descending searches', () => {
      const noVocabularySearchUrl = `/cspace-services/${servicePath}`;

      worker.use(
        rest.get(noVocabularySearchUrl, (req, res, ctx) => {
          const { searchParams } = req.url;

          if (
            searchParams.get('sortBy') === 'collectionspace_core:updatedAt DESC'
          ) {
            return res(ctx.json({}));
          }

          return res(ctx.status(400));
        }),
      );

      const store = mockStore({
        search: Immutable.Map(),
      });

      const sortedSearchDescriptor = Immutable.fromJS({
        recordType,
        searchQuery: { ...searchQuery, sort: 'updatedAt desc' },
      });

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

          actions[1].type.should.equal(SEARCH_FULFILLED);
          actions[1].payload.status.should.equal(200);
          actions[1].payload.data.should.deep.equal({});

          actions[1].meta.should.deep.equal({
            listTypeConfig: listTypes.common,
            searchName,
            searchDescriptor: sortedSearchDescriptor,
          });
        });
    });

    it('should dispatch SEARCH_REJECTED when an unknown search column is specified', () => {
      const store = mockStore({
        search: Immutable.Map(),
      });

      const sortedSearchDescriptor = Immutable.fromJS({
        recordType,
        searchQuery: { ...searchQuery, sort: 'foobar' },
      });

      return store.dispatch(search(config, searchName, sortedSearchDescriptor)).should.eventually
        .be.rejected.then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(2);

          actions[1].should.deep.equal({
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
    });

    it('should dispatch SEARCH_REJECTED when an invalid search order is specified', () => {
      const store = mockStore({
        search: Immutable.Map(),
      });

      const sortedSearchDescriptor = Immutable.fromJS({
        recordType,
        searchQuery: { ...searchQuery, sort: 'updatedAt foo' },
      });

      return store.dispatch(search(config, searchName, sortedSearchDescriptor)).should.eventually
        .be.rejected.then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(2);

          actions[1].should.deep.equal({
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
    });

    it('should dispatch SEARCH_REJECTED on API error', () => {
      worker.use(
        rest.get(searchUrl, (req, res, ctx) => res(ctx.status(400))),
      );

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

    it('should dispatch SEARCH_REJECTED if the record type is unknown', () => {
      const badSearchDescriptor = searchDescriptor.set('recordType', 'foobar');

      const store = mockStore({
        search: Immutable.Map(),
      });

      store.dispatch(search(config, searchName, badSearchDescriptor))
        .catch(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(1);

          actions[0].should.deep.equal({
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
    });

    it('should dispatch SEARCH_REJECTED if the record type does not have a service path', () => {
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

      store.dispatch(search(badConfig, searchName, searchDescriptor))
        .catch(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(1);

          actions[0].should.deep.equal({
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
    });

    it('should dispatch SEARCH_REJECTED if the vocabulary does not have a service path', () => {
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

      store.dispatch(search(badConfig, searchName, searchDescriptor))
        .catch(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(1);

          actions[0].should.deep.equal({
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

  describe('findFirst', () => {
    afterEach(() => {
      worker.resetHandlers();
    });

    it('should make an advanced search request for procedures', () => {
      const config = {
        recordTypes: {
          loanin: {
            serviceConfig: {
              servicePath: 'loansin',
            },
          },
        },
      };

      const data = {
        foo: 'bar',
      };

      worker.use(
        rest.get('/cspace-services/loansin', (req, res, ctx) => {
          const { searchParams } = req.url;

          if (
            searchParams.get('as') === '(part:baz = "1234")'
            && searchParams.get('pgSz') === '1'
            && searchParams.get('wf_deleted') === 'false'
          ) {
            return res(ctx.json(data));
          }

          return res(ctx.status(400));
        }),
      );

      return findFirst(config, 'loanin', 'part:baz', '1234')
        .then((response) => {
          response.data.should.deep.equal(data);
        });
    });

    it('should make an advanced search request for authorities', () => {
      const config = {
        recordTypes: {
          person: {
            serviceConfig: {
              servicePath: 'personauthorities',
              serviceType: 'authority',
            },
            vocabularies: {
              all: {
                serviceConfig: {
                  servicePath: '_ALL_',
                },
              },
            },
          },
        },
      };

      const data = {
        foo: 'bar',
      };

      worker.use(
        rest.get('/cspace-services/personauthorities/_ALL_/items', (req, res, ctx) => {
          const { searchParams } = req.url;

          if (
            searchParams.get('as') === '(part:baz = "1234")'
            && searchParams.get('pgSz') === '1'
            && searchParams.get('wf_deleted') === 'false'
          ) {
            return res(ctx.json(data));
          }

          return res(ctx.status(400));
        }),
      );

      return findFirst(config, 'person', 'part:baz', '1234')
        .then((response) => {
          response.data.should.deep.equal(data);
        });
    });

    it('should escape quotes in the value', () => {
      const config = {
        recordTypes: {
          loanin: {
            serviceConfig: {
              servicePath: 'loansin',
            },
          },
        },
      };

      const data = {
        foo: 'bar',
      };

      worker.use(
        rest.get('/cspace-services/loansin', (req, res, ctx) => {
          const { searchParams } = req.url;

          if (
            searchParams.get('as') === '(part:baz = "\\"1234\\"")'
            && searchParams.get('pgSz') === '1'
            && searchParams.get('wf_deleted') === 'false'
          ) {
            return res(ctx.json(data));
          }

          return res(ctx.status(400));
        }),
      );

      return findFirst(config, 'loanin', 'part:baz', '"1234"')
        .then((response) => {
          response.data.should.deep.equal(data);
        });
    });

    it('should reject if no record type config is found', () => {
      const config = {
        recordTypes: {},
      };

      return findFirst(config, 'person', 'part:baz', '1234').should.eventually.be.rejected;
    });

    it('should reject if no record service path is found', () => {
      const config = {
        recordTypes: {
          group: {
            serviceConfig: {},
          },
        },
      };

      return findFirst(config, 'group', 'part:baz', '1234').should.eventually.be.rejected;
    });

    it('should reject if no vocabulary service path is found for an authority', () => {
      const config = {
        recordTypes: {
          person: {
            serviceConfig: {
              servicePath: 'personauthorities',
              serviceType: 'authority',
            },
            vocabularies: {
              all: {
                serviceConfig: {},
              },
            },
          },
        },
      };

      return findFirst(config, 'person', 'part:baz', '1234').should.eventually.be.rejected;
    });

    it('should reject if the field name is invalid', () => {
      const config = {
        recordTypes: {
          loanin: {
            serviceConfig: {
              servicePath: 'loansin',
            },
          },
        },
      };

      return findFirst(config, 'loanin', '"part:baz"', '1234').should.eventually.be.rejected;
    });
  });

  describe('searchCsid', () => {
    afterEach(() => {
      worker.resetHandlers();
    });

    it('should make an advanced search request for procedures', () => {
      const config = {
        recordTypes: {
          collectionobject: {
            serviceConfig: {
              servicePath: 'collectionobjects',
            },
          },
        },
      };

      const data = {
        foo: 'bar',
      };

      worker.use(
        rest.get('/cspace-services/collectionobjects', (req, res, ctx) => {
          const { searchParams } = req.url;

          if (
            searchParams.get('as') === '(ecm:name = "1234")'
            && searchParams.get('pgSz') === '1'
            && searchParams.get('wf_deleted') === 'false'
          ) {
            return res(ctx.json(data));
          }

          return res(ctx.status(400));
        }),
      );

      const store = mockStore({});

      return store.dispatch(searchCsid(config, 'collectionobject', '1234'))
        .then((response) => {
          response.data.should.deep.equal(data);
        });
    });

    it('should make an advanced search request for authorities', () => {
      const config = {
        recordTypes: {
          person: {
            serviceConfig: {
              servicePath: 'personauthorities',
              serviceType: 'authority',
            },
            vocabularies: {
              all: {
                serviceConfig: {
                  servicePath: '_ALL_',
                },
              },
            },
          },
        },
      };

      const data = {
        foo: 'bar',
      };

      worker.use(
        rest.get('/cspace-services/personauthorities/_ALL_/items', (req, res, ctx) => {
          const { searchParams } = req.url;

          if (
            searchParams.get('as') === '(ecm:name = "1234")'
            && searchParams.get('pgSz') === '1'
            && searchParams.get('wf_deleted') === 'false'
          ) {
            return res(ctx.json(data));
          }

          return res(ctx.status(400));
        }),
      );

      const store = mockStore({});

      return store.dispatch(searchCsid(config, 'person', '1234'))
        .then((response) => {
          response.data.should.deep.equal(data);
        });
    });

    it('should reject if no record type config is found', () => {
      const config = {
        recordTypes: {},
      };

      const store = mockStore({});

      return store.dispatch(searchCsid(config, 'person', '1234')).should.eventually.be.rejected;
    });

    it('should reject if no record service path is found', () => {
      const config = {
        recordTypes: {
          group: {
            serviceConfig: {},
          },
        },
      };

      const store = mockStore({});

      return store.dispatch(searchCsid(config, 'group', '1234')).should.eventually.be.rejected;
    });

    it('should reject if no vocabulary service path is found for an authority', () => {
      const config = {
        recordTypes: {
          person: {
            serviceConfig: {
              servicePath: 'personauthorities',
              serviceType: 'authority',
            },
            vocabularies: {
              all: {
                serviceConfig: {},
              },
            },
          },
        },
      };

      const store = mockStore({});

      return store.dispatch(searchCsid(config, 'person', '1234')).should.eventually.be.rejected;
    });
  });

  describe('setResultItemSelected', () => {
    const listTypes = {
      common: {
        listNodeName: 'ns2:abstract-common-list',
        itemNodeName: 'list-item',
      },
    };

    const config = {
      listTypes,
    };

    it('should dispatch SET_RESULT_ITEM_SELECTED', () => {
      const searchName = 'searchName';

      const searchDescriptor = Immutable.fromJS({
        recordType: 'collectionobjects',
        searchQuery: {
          kw: 'foo',
        },
      });

      const index = 3;
      const checked = true;
      const listType = 'common';

      setResultItemSelected(config, searchName, searchDescriptor, listType, index, checked).should
        .deep.equal({
          type: SET_RESULT_ITEM_SELECTED,
          payload: checked,
          meta: {
            listTypeConfig: listTypes[listType],
            searchName,
            searchDescriptor,
            index,
          },
        });
    });
  });

  describe('clearSearchResults', () => {
    it('should dispatch CLEAR_SEARCH_RESULTS', () => {
      const searchName = 'searchName';

      clearSearchResults(searchName).should.deep.equal({
        type: CLEAR_SEARCH_RESULTS,
        meta: {
          searchName,
        },
      });
    });
  });

  describe('setAllResultItemsSelected', () => {
    it('should dispatch SET_ALL_RESULT_ITEMS_SELECTED', () => {
      const listType = 'common';

      const listTypeConfig = {
        listNodeName: 'ns2:abstract-common-list',
        itemNodeName: 'list-item',
      };

      const config = {
        listTypes: {
          [listType]: listTypeConfig,
        },
      };

      const searchName = 'searchName';

      const searchDescriptor = Immutable.fromJS({
        recordType: 'group',
      });

      const isSelected = true;
      const filter = () => true;

      setAllResultItemsSelected(
        config, searchName, searchDescriptor, listType, isSelected, filter,
      ).should.deep.equal({
        type: SET_ALL_RESULT_ITEMS_SELECTED,
        payload: isSelected,
        meta: {
          filter,
          listTypeConfig,
          searchName,
          searchDescriptor,
        },
      });
    });
  });

  describe('clearSelected', () => {
    it('should dispatch CLEAR_SELECTED', () => {
      const searchName = 'searchName';

      clearSelected(searchName).should.deep.equal({
        type: CLEAR_SELECTED,
        meta: {
          searchName,
        },
      });
    });
  });

  describe('deselectResultItem', () => {
    it('should dispatch DESELECT_RESULT_ITEM', () => {
      const searchName = 'searchName';
      const csid = '1234';

      deselectResultItem(searchName, csid).should.deep.equal({
        type: DESELECT_RESULT_ITEM,
        meta: {
          searchName,
          csid,
        },
      });
    });
  });
});
