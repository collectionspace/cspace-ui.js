import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import Immutable from 'immutable';

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

describe('partialTermSearch action creator', function suite() {
  describe('addTerm', function actionSuite() {
    const mockStore = configureMockStore([thunk]);
    const recordType = 'person';
    const servicePath = 'personauthorities';
    const vocabulary = 'local';
    const vocabularyServicePath = 'urn:cspace:name(person)';
    const termAddUrl = `/cspace-services/${servicePath}/${vocabularyServicePath}/items`;
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

    it('should dispatch ADD_TERM_FULFILLED on success', function test() {
      moxios.stubRequest(termAddUrl, {
        status: 201,
        headers: {
          location: termReadUrl,
        },
      });

      moxios.stubRequest(termReadUrl, {
        status: 200,
        response: {},
      });

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

          actions[1].should.deep.equal({
            type: ADD_TERM_FULFILLED,
            payload: {
              status: 200,
              statusText: undefined,
              headers: undefined,
              data: {},
            },
            meta: {
              displayName,
              partialTerm,
              recordType,
              vocabulary,
            },
          });
        });
    });

    it('should clone the primary record data if clone is true', function test() {
      moxios.stubRequest(termAddUrl, {
        status: 201,
        headers: {
          location: termReadUrl,
        },
      });

      moxios.stubRequest(termReadUrl, {
        status: 200,
        response: {},
      });

      return store.dispatch(addTerm(recordTypeConfig, vocabulary, displayName, partialTerm, true))
        .then(() => {
          const termAddRequest = moxios.requests.first();

          termAddRequest.config.data.should.equal(JSON.stringify({
            document: {
              foo: 'bar',
            },
          }));
        });
    });

    it('should dispatch ADD_TERM_REJECTED on error', function test() {
      moxios.stubRequest(termAddUrl, {
        status: 400,
        response: {},
      });

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

  describe('findMatchingTerms', function actionSuite() {
    const mockStore = configureMockStore([thunk]);
    const recordType = 'person';
    const servicePath = 'personauthorities';
    const vocabulary = 'person';
    const vocabularyServicePath = 'urn:cspace:name(person)';
    const partialTerm = 'abc';
    const termSearchUrl = `/cspace-services/${servicePath}/${vocabularyServicePath}/items?pt=${partialTerm}&wf_deleted=false`;

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

    it('should dispatch PARTIAL_TERM_SEARCH_FULFILLED on success', function test() {
      moxios.stubRequest(termSearchUrl, {
        status: 200,
        response: {},
      });

      return store.dispatch(
        findMatchingTerms(recordTypeConfig, vocabulary, partialTerm)
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

          actions[1].should.deep.equal({
            type: PARTIAL_TERM_SEARCH_FULFILLED,
            payload: {
              status: 200,
              statusText: undefined,
              headers: undefined,
              data: {},
            },
            meta: {
              partialTerm,
              recordType,
              vocabulary,
            },
          });
        });
    });

    it('should dispatch PARTIAL_TERM_SEARCH_REJECTED on error', function test() {
      moxios.stubRequest(termSearchUrl, {
        status: 400,
        response: {},
      });

      return store.dispatch(
        findMatchingTerms(recordTypeConfig, vocabulary, partialTerm)
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

    it('should dispatch no action if the vocabulary does not have a service path', function test() {
      const invalidVocabulary = `${vocabulary}abcd`;

      store.dispatch(
        findMatchingTerms(recordTypeConfig, invalidVocabulary, partialTerm)
      );

      store.getActions().should.have.lengthOf(0);
    });
  });

  describe('clearMatchedTerms', function actionSuite() {
    it('should create a CLEAR_PARTIAL_TERM_SEARCH_RESULTS action', function test() {
      clearMatchedTerms().should.deep.equal({
        type: CLEAR_PARTIAL_TERM_SEARCH_RESULTS,
      });
    });
  });
});
