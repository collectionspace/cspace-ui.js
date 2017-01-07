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
  ERR_NO_RECORD_SERVICE,
  ERR_NO_VOCABULARY_SERVICE,
  search,
} from '../../../src/actions/search';

chai.should();

const mockStore = configureMockStore([thunk]);

describe('search action creator', function suite() {
  describe('search', function actionSuite() {
    const servicePath = 'personauthorities';
    const vocabularyName = 'local';
    const vocabularyServicePath = 'urn:cspace:name(person)';
    const searchUrl = new RegExp(`^/cspace-services/${servicePath}/${vocabularyServicePath.replace('(', '\\(').replace(')', '\\)')}/items.*`);

    const recordTypeConfig = {
      serviceConfig: {
        servicePath,
      },
      vocabularies: {
        [vocabularyName]: {
          serviceConfig: {
            servicePath: vocabularyServicePath,
          },
        },
      },
    };

    const searchQuery = {
      kw: 'abcd',
      pgNum: 0,
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

      return store.dispatch(search(recordTypeConfig, vocabularyName, searchQuery))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(2);

          actions[0].should.deep.equal({
            type: SEARCH_STARTED,
            meta: {
              recordTypeConfig,
              vocabularyName,
              searchQuery,
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
              recordTypeConfig,
              vocabularyName,
              searchQuery,
            },
          });
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

      return store.dispatch(search(recordTypeConfig, null, searchQuery))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(2);

          actions[0].should.deep.equal({
            type: SEARCH_STARTED,
            meta: {
              recordTypeConfig,
              vocabularyName: null,
              searchQuery,
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
              recordTypeConfig,
              vocabularyName: null,
              searchQuery,
            },
          });
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

      return store.dispatch(search(recordTypeConfig, vocabularyName, searchQuery))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(2);

          actions[0].should.deep.equal({
            type: SEARCH_STARTED,
            meta: {
              recordTypeConfig,
              vocabularyName,
              searchQuery,
            },
          });

          actions[1].should.have.property('type', SEARCH_REJECTED);
          actions[1].should.have.property('meta')
            .that.deep.equals({
              recordTypeConfig,
              vocabularyName,
              searchQuery,
            });
        });
    });

    it('should dispatch SEARCH_REJECTED if the record type does not have a service path', function test() {
      const badRecordTypeConfig = {
        serviceConfig: {},
      };

      const store = mockStore({
        search: Immutable.Map(),
      });

      store.dispatch(search(badRecordTypeConfig, vocabularyName, searchQuery)).should.deep.equal({
        type: SEARCH_REJECTED,
        payload: ERR_NO_RECORD_SERVICE,
        meta: {
          vocabularyName,
          searchQuery,
          recordTypeConfig: badRecordTypeConfig,
        },
      });
    });

    it('should dispatch SEARCH_REJECTED if the vocabulary does not have a service path', function test() {
      const badRecordTypeConfig = {
        serviceConfig: {
          servicePath,
        },
        vocabularies: {
          [vocabularyName]: {
            serviceConfig: {},
          },
        },
      };

      const store = mockStore({
        search: Immutable.Map(),
      });

      store.dispatch(search(badRecordTypeConfig, vocabularyName, searchQuery)).should.deep.equal({
        type: SEARCH_REJECTED,
        payload: ERR_NO_VOCABULARY_SERVICE,
        meta: {
          vocabularyName,
          searchQuery,
          recordTypeConfig: badRecordTypeConfig,
        },
      });
    });
  });
});
